"""
Test suite for DecimalLens Deterministic Math Verification Engine.

Covers:
1. Exact match cases
2. Rounding-difference (ROUNDING_MATCH) cases
3. Near-miss cases (< 1 bps relative error)
4. Material mismatch cases
5. Cross-validation (Fraction oracle agreement)
6. Expanded notation parsing ($45.2M, ($12,500), etc.)
7. Inter-claim cross-footing
8. Safe formatting (no float coercion)
9. Security & edge cases
"""

import pytest
from decimal import Decimal
from backend.evaluator import (
    clean_numeric_value,
    safe_eval_expression,
    _fraction_eval_expression,
    _format_decimal,
    verify_claim,
    cross_validate_claims,
    EXACT_MATCH,
    ROUNDING_MATCH,
    NEAR_MISS,
    MATERIAL_MISMATCH,
    FINANCIAL_CTX,
)


# ===================================================================
# 1. Exact Match Cases
# ===================================================================

class TestExactMatch:
    def test_simple_addition(self):
        result = verify_claim("$142,500,000", "45200000 + 97300000")
        assert result["verified"] is True
        assert result["confidence_tier"] == EXACT_MATCH
        assert result["recalculated"] == "$142,500,000"

    def test_simple_subtraction(self):
        result = verify_claim("$62,100,000", "142500000 - 80400000")
        assert result["verified"] is True
        assert result["confidence_tier"] == EXACT_MATCH

    def test_percentage_division(self):
        # 34600000 / 142500000 = 0.242807... ≈ 24.28% (at 2 dp)
        result = verify_claim("24.28%", "34600000 / 142500000")
        assert result["verified"] is True

    def test_integer_no_decimals(self):
        result = verify_claim("100", "50 + 50")
        assert result["verified"] is True
        assert result["confidence_tier"] == EXACT_MATCH

    def test_negative_result(self):
        result = verify_claim("-$5,000", "10000 - 15000")
        assert result["verified"] is True


# ===================================================================
# 2. Rounding Match Cases
# ===================================================================

class TestRoundingMatch:
    def test_rounding_agrees_at_precision(self):
        # Expression yields 24.2807..%, reported 24.28% — ROUND_HALF_UP
        # rounds to same value
        result = verify_claim("24.28%", "34600000 / 142500000")
        assert result["verified"] is True

    def test_exact_half_up_rounding(self):
        # 2.685 rounded to 2 dp: ROUND_HALF_UP → 2.69
        result = verify_claim("$2.69", "2.685")
        assert result["verified"] is True
        assert result["confidence_tier"] in (EXACT_MATCH, ROUNDING_MATCH)


# ===================================================================
# 3. Near-Miss Cases (< 1 bps)
# ===================================================================

class TestNearMiss:
    def test_sub_bps_difference(self):
        # Reported $142,500,000 but expression gives 142,500,001
        # Relative error = 1/142500000 ≈ 0.00000070% ≈ 0.000070 bps
        result = verify_claim("$142,500,000", "142500001")
        # After quantization to 0 dp, 142500001 rounds to 142,500,001
        # which differs from 142,500,000 → verified False
        assert result["verified"] is False
        # But relative error is extremely small
        bps = Decimal(result["relative_error_bps"])
        assert bps < Decimal("1")
        assert result["confidence_tier"] == NEAR_MISS


# ===================================================================
# 4. Material Mismatch Cases
# ===================================================================

class TestMaterialMismatch:
    def test_known_operating_income_error(self):
        # Mock data: reported $34,912,500, expression 62100000 - 15400000 - 12100000 = 34,600,000
        result = verify_claim("$34,912,500", "62100000 - 15400000 - 12100000")
        assert result["verified"] is False
        assert result["confidence_tier"] == MATERIAL_MISMATCH
        assert "Arithmetic mismatch" in result["reason"]
        assert "bps" in result["reason"]

    def test_large_discrepancy(self):
        result = verify_claim("$100,000", "50000")
        assert result["verified"] is False
        assert result["confidence_tier"] == MATERIAL_MISMATCH
        bps = Decimal(result["relative_error_bps"])
        assert bps > Decimal("100")  # > 1% error


# ===================================================================
# 5. Fraction Oracle Cross-Validation
# ===================================================================

class TestFractionOracle:
    def test_addition_agreement(self):
        dec_result = safe_eval_expression("45200000 + 97300000")
        frac_result = _fraction_eval_expression("45200000 + 97300000")
        assert dec_result == Decimal(str(frac_result))

    def test_subtraction_agreement(self):
        dec_result = safe_eval_expression("142500000 - 80400000")
        frac_result = _fraction_eval_expression("142500000 - 80400000")
        assert dec_result == Decimal(str(frac_result))

    def test_division_agreement(self):
        dec_result = safe_eval_expression("34600000 / 142500000")
        frac_result = _fraction_eval_expression("34600000 / 142500000")
        # For division, compare at high precision
        frac_as_dec = FINANCIAL_CTX.divide(
            Decimal(frac_result.numerator),
            Decimal(frac_result.denominator),
        )
        diff = abs(dec_result - frac_as_dec)
        assert diff < Decimal("1e-20")

    def test_complex_expression_agreement(self):
        expr = "62100000 - 15400000 - 12100000"
        dec_result = safe_eval_expression(expr)
        frac_result = _fraction_eval_expression(expr)
        assert dec_result == Decimal(str(frac_result))

    def test_multiplication_agreement(self):
        dec_result = safe_eval_expression("1500 * 3.5")
        frac_result = _fraction_eval_expression("1500 * 3.5")
        assert dec_result == Decimal(str(frac_result))


# ===================================================================
# 6. Expanded Notation Parsing
# ===================================================================

class TestExpandedParsing:
    def test_abbreviated_millions(self):
        val = clean_numeric_value("$45.2M")
        assert val == Decimal("45200000")

    def test_abbreviated_billions(self):
        val = clean_numeric_value("$1.3B")
        assert val == Decimal("1300000000")

    def test_abbreviated_thousands(self):
        val = clean_numeric_value("$850K")
        assert val == Decimal("850000")

    def test_abbreviated_trillions(self):
        val = clean_numeric_value("$2.5T")
        assert val == Decimal("2500000000000")

    def test_parenthetical_negative(self):
        val = clean_numeric_value("($12,500)")
        assert val == Decimal("-12500")

    def test_parenthetical_negative_with_dollar(self):
        val = clean_numeric_value("($1,234,567)")
        assert val == Decimal("-1234567")

    def test_percentage(self):
        val = clean_numeric_value("24.50%")
        assert val == Decimal("0.2450")

    def test_whitespace_groups(self):
        val = clean_numeric_value("142 500 000")
        assert val == Decimal("142500000")

    def test_plain_integer(self):
        val = clean_numeric_value("142500000")
        assert val == Decimal("142500000")

    def test_euro_symbol(self):
        val = clean_numeric_value("€1,234.56")
        assert val == Decimal("1234.56")

    def test_negative_percentage(self):
        val = clean_numeric_value("-5.25%")
        assert val == Decimal("-0.0525")


# ===================================================================
# 7. Inter-Claim Cross-Footing
# ===================================================================

class TestCrossFooting:
    def test_consistent_claims_no_warning(self):
        claims = [
            {"id": "c1", "metric": "Revenue", "reported": "$142,500,000",
             "expression": "45200000 + 97300000"},
            {"id": "c2", "metric": "COGS", "reported": "$80,400,000",
             "expression": "80400000"},
            {"id": "c3", "metric": "Gross Profit", "reported": "$62,100,000",
             "expression": "142500000 - 80400000"},
        ]
        result = cross_validate_claims(claims)
        # c3's expression operands (142500000 and 80400000) match c1 and c2's
        # reported values, so no warning
        for c in result:
            assert "cross_validation_warning" not in c or c.get("cross_validation_warning") is None or c["cross_validation_warning"] == ""

    def test_mismatched_operand_triggers_warning(self):
        claims = [
            {"id": "c1", "metric": "Revenue", "reported": "$142,500,000",
             "expression": "45200000 + 97300000"},
            {"id": "c2", "metric": "Gross Profit", "reported": "$62,100,000",
             "expression": "142500000 - 80400000"},
            # c3 uses 63000000 in expression, which is close to but doesn't
            # match c2's $62,100,000 (1.4% diff)
            {"id": "c3", "metric": "Operating Income", "reported": "$34,912,500",
             "expression": "63000000 - 15400000 - 12100000"},
        ]
        result = cross_validate_claims(claims)
        c3 = next(c for c in result if c["id"] == "c3")
        assert "cross_validation_warning" in c3
        assert "does not exactly match" in c3["cross_validation_warning"]

    def test_single_claim_no_error(self):
        claims = [
            {"id": "c1", "metric": "Revenue", "reported": "$100",
             "expression": "50 + 50"},
        ]
        result = cross_validate_claims(claims)
        assert len(result) == 1

    def test_empty_claims(self):
        result = cross_validate_claims([])
        assert result == []


# ===================================================================
# 8. Safe Formatting
# ===================================================================

class TestSafeFormatting:
    def test_dollar_format_no_decimals(self):
        s = _format_decimal(Decimal("142500000"), 0, prefix="$")
        assert s == "$142,500,000"
        assert isinstance(s, str)

    def test_dollar_format_with_decimals(self):
        s = _format_decimal(Decimal("34912500.50"), 2, prefix="$")
        assert s == "$34,912,500.50"

    def test_percentage_format(self):
        s = _format_decimal(Decimal("24.50"), 2, suffix="%")
        assert s == "24.50%"

    def test_signed_positive(self):
        s = _format_decimal(Decimal("312500"), 0, prefix="$", show_sign=True)
        assert s.startswith("+$")

    def test_signed_negative(self):
        s = _format_decimal(Decimal("-312500"), 0, prefix="$", show_sign=True)
        assert s.startswith("-$")

    def test_no_float_in_output(self):
        """Verify that the formatted string doesn't silently coerce through float."""
        # Decimal("0.1") + Decimal("0.2") == Decimal("0.3") exactly
        val = Decimal("0.1") + Decimal("0.2")
        s = _format_decimal(val, 1)
        assert s == "0.3"


# ===================================================================
# 9. Security & Edge Cases
# ===================================================================

class TestSecurityEdgeCases:
    def test_expression_too_long(self):
        with pytest.raises(ValueError, match="too long"):
            safe_eval_expression("1+" * 300 + "1")

    def test_disallowed_characters(self):
        with pytest.raises(ValueError, match="disallowed"):
            safe_eval_expression("__import__('os')")

    def test_division_by_zero(self):
        with pytest.raises(ValueError, match="Division by zero"):
            safe_eval_expression("100 / 0")

    def test_deeply_nested(self):
        # Build an expression with genuine binary-op nesting that exceeds _MAX_AST_DEPTH
        # Each "(1 + " adds 1 level of BinOp depth in the AST
        expr = "(1 + " * 55 + "1" + ")" * 55
        with pytest.raises(ValueError, match="too deeply nested"):
            safe_eval_expression(expr)

    def test_empty_expression(self):
        with pytest.raises(Exception):
            safe_eval_expression("")

    def test_reported_value_garbage(self):
        result = verify_claim("not_a_number", "100 + 200")
        assert result["verified"] is False
        assert "Failed to parse" in result["reason"]

    def test_expression_garbage(self):
        result = verify_claim("$300", "foo + bar")
        assert result["verified"] is False
        assert "Failed to evaluate" in result["reason"]

    def test_zero_reported_value(self):
        result = verify_claim("$0", "0")
        assert result["verified"] is True
        assert result["confidence_tier"] == EXACT_MATCH

    def test_fraction_oracle_injection(self):
        # Ensure Fraction eval path is safe from __builtins__ injection
        with pytest.raises(Exception):
            _fraction_eval_expression("__import__('os')")

class TestScaleAlignment:
    def test_auto_scale_millions(self):
        # Evaluates to 700, reported is 700,000,000 (missing 'in millions' header on formula)
        res = verify_claim("$700,000,000", "1500 - 800")
        assert res["verified"] is True
        assert res["confidence_tier"] == EXACT_MATCH
        assert "Auto-scaled by 1,000,000x" in res["reason"]

    def test_auto_scale_thousands(self):
        # Evaluates to 700,000, reported is 700 (missing 'in thousands' header on reported value)
        res = verify_claim("$700", "1500000 - 800000")
        assert res["verified"] is True
        assert res["confidence_tier"] == EXACT_MATCH
        assert "Auto-scaled by 0.001x" in res["reason"]

    def test_auto_scale_negative_billions(self):
        # Evaluates to -1.5, reported is ($1,500,000,000)
        res = verify_claim("($1,500,000,000)", "0 - 1.5")
        assert res["verified"] is True
        assert res["confidence_tier"] == EXACT_MATCH
        assert "Auto-scaled by 1,000,000,000x" in res["reason"]

    def test_no_scale_for_random_factors(self):
        # Evaluates to 700, reported is 7000 (10x mismatch - not a standard accounting scale)
        res = verify_claim("$7000", "1500 - 800")
        assert res["verified"] is False
        assert res["confidence_tier"] == MATERIAL_MISMATCH
        assert "Auto-scaled" not in res["reason"]
