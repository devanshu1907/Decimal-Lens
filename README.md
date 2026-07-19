# Decimal Lens — Enterprise Financial Intelligence & Math Audit System

<div align="center">

  ### **AI-Native Single-Document Math Verification & Projections Pipeline**

  [![Live on Vercel](https://img.shields.io/badge/LIVE%20ON%20VERCEL-https%3A%2F%2Fdecimal--lens.vercel.app%2F-00E5FF?style=for-the-badge&logo=vercel&logoColor=black&labelColor=000000)](https://decimal-lens.vercel.app/)

  <br />

  [![Live Demo](https://img.shields.io/badge/%E2%9A%A1_LIVE_DEMO-VERCEL_EDGE-000000?style=flat-square&logo=vercel&logoColor=white)](https://decimal-lens.vercel.app/)
  [![Framework](https://img.shields.io/badge/NEXT.JS_16-TURBOPACK-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Styling](https://img.shields.io/badge/TAILWIND_CSS_v4-GLASSMORPHISM-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Backend](https://img.shields.io/badge/PYTHON-FASTAPI-3776AB?style=flat-square&logo=python&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Engine](https://img.shields.io/badge/DECIMAL_PRECISION-0_BPS_VARIANCE-15803D?style=flat-square)](https://docs.python.org/3/library/decimal.html)
  [![AI Inference](https://img.shields.io/badge/GROQ-LLAMA--3.3--70B-F05032?style=flat-square&logo=groq&logoColor=white)](https://groq.com/)

  <br />

  **Deterministic math verification for corporate SEC filings • Dual-Agent auditing architecture • Zero floating-point accumulation errors**

</div>

---

## 📌 Live Deployment

Decimal Lens is deployed live on Vercel edge infrastructure:

👉 **[https://decimal-lens.vercel.app/](https://decimal-lens.vercel.app/)**

---

## 🏗️ System Architecture & Workflow Flowchart

Decimal Lens operates as a **Single-Document Extraction & Verification Pipeline**. The entire ingested document goes directly into an explicit **Two-Agent sequence**, combined with a **Python `decimal` module deterministic arithmetic engine** to eliminate math hallucinations before generating projections.

```mermaid
flowchart TD
    subgraph Ingestion ["1️⃣ Ingestion & Parsing Layer"]
        A["📁 User SEC Document Upload<br/>(Form 10-K, 10-Q, 8-K / PDF, CSV, TXT)"] --> B["⚙️ Document Parser<br/>(PyPDF & Text Extractor)"]
    end

    subgraph DualAgent ["2️⃣ Dual-Agent & Deterministic Engine"]
        B --> C["🤖 Auditor Agent<br/>(Groq Llama-3.3-70B Versatile)"]
        C -->|"Extract Numeric Claims & Formulas"| D["🧮 Deterministic Math Engine<br/>(Python Decimal Module)"]
        D -->|"Re-calculate Sums with 0 bps Delta"| E{"Math Check Passed?"}
        E -- "Yes (0 bps Error)" --> F["✅ Verified Claim (OK)"]
        E -- "No (Discrepancy Found)" --> G["⚠️ Flagged Claim (Math Error)"]
        F --> H["📊 Forecaster Agent<br/>(Growth Trajectories)"]
        G -->|"Low-Confidence Flag"| H
    end

    subgraph Presentation ["3️⃣ Interactive Split-View Dashboard"]
        H --> I["💻 Next.js 16 Client App"]
        I --> J["📄 Source Document Viewer<br/>(Line Citation Auto-Scroll)"]
        I --> K["🔍 Audit Verification Grid<br/>(TanStack Table & Heatmap)"]
        I --> L["📈 3-Year Projections Chart<br/>(Magnitude Alignment Guardrail)"]
    end

    style Ingestion fill:#0F172A,stroke:#1E3A5F,stroke-width:2px,color:#FFFFFF
    style DualAgent fill:#0F172A,stroke:#15803D,stroke-width:2px,color:#FFFFFF
    style Presentation fill:#0F172A,stroke:#00E5FF,stroke-width:2px,color:#FFFFFF
```

---

## 🌟 Feature Walkthrough & Visual Tour

### 1. Dual-Pane Audit Workspace (Source Viewer + Verification Grid)
The signature interface features a split layout: the left pane renders the official source filing (with click-to-highlight citation jumping), while the right pane displays extracted numeric metrics verified with 0 bps decimal precision.

![Dual-Pane Audit Workspace](public/screenshots/dashboard_overview.png)
*Figure 1: Split-view dashboard with source document viewer on the left and verified audit grid on the right.*

---

### 2. Deterministic Math Engine & Discrepancy Heatmap
Recomputes reported line items against underlying arithmetic formulas using Python's `decimal` module. Reported totals that fail deterministic calculation are flagged in red/amber with calculated variance bounds.

![Audit Health & Discrepancies](public/screenshots/audit_health_discrepancy.png)
*Figure 2: Audit Health Bar and Discrepancy Variance Graph highlighting verified vs. flagged claims.*

---

### 3. Forecaster Projections & Magnitude Alignment Guardrail
The Forecaster Agent projects 3-year revenue and operating margin growth. It includes an automatic **Magnitude Alignment Guardrail**: if actual historical numbers and projected metrics differ by $>5\times$ order of magnitude, units are scaled dynamically ($77.7M vs $84.19M) to prevent unit distortion.

![Projections & Guardrail](public/screenshots/projection_chart_guardrail.png)
*Figure 3: 3-Year Projection Bar Chart with compact K/M/B/T formatting and magnitude alignment.*

---

### 4. Mandatory SEC Disclosures Banner & Financial Glossary
Displays filing constraint disclosures for SEC filings (Forms 10-K, 10-Q, 8-K) and embeds an interactive 8-term financial audit terminology glossary directly on the dashboard.

![SEC Filing Disclosures & Glossary](public/screenshots/required_documents_banner.png)
*Figure 4: Required Filing Disclosures callout banner and audit glossary.*

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion), TanStack Table, `cmdk`, `react-pdf` |
| **Backend** | Python 3.10+, FastAPI, Python `decimal` Module, `pypdf`, `uvicorn` |
| **AI Inference** | Groq Cloud (`llama-3.3-70b-versatile`) via OpenAI SDK Compatibility |
| **Deployment** | Vercel Monorepo Serverless Function (`api/index.py`) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Python**: `v3.10` or higher
- **Groq API Key**: Obtain a free API key from [Groq Console](https://console.groq.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/devanshu1907/Decimal-Lens.git
cd Decimal-Lens
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY="your_groq_api_key_here"
```

### 3. Install Dependencies
```bash
# Install Node.js frontend dependencies
npm install

# Set up Python backend virtual environment
python -m venv backend/venv
# On Windows:
backend\venv\Scripts\activate
# On macOS/Linux:
source backend/venv/bin/activate

pip install -r requirements.txt
```

### 4. Run Development Servers

**Run Next.js Frontend**:
```bash
npm run dev
```

**Run FastAPI Backend** *(in a second terminal)*:
```bash
backend\venv\Scripts\python.exe -m uvicorn backend.main:app --port 8000 --reload
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License & Credits

Designed & Built by **Devanshu Yadav** — Built for financial analysts, auditors, and enterprise intelligence pipelines.
