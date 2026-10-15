# SQL QA Master (4,200+ QA & SDET Interview Quiz Platform)

Master SQL test automation and data QA interview questions asked at **Google, Amazon, Sun King, GlobalLogic, Nagarro, Microsoft, Meta, Netflix, Apple, Uber, Flipkart, Cognizant, and TCS**.

Features an **in-browser SQL query execution engine (AlaSQL)**, live schema explorer, automated answer verification, instant MCQ "Why Correct" analysis, Glassdoor interview context, timed mock exams, and the **Skill Ladder: Easy ➔ Medium ➔ Tough**.

---

## What's New: 4,200+ Questions & Skill Ladder

- **Basic (Easy) Tier (~1,400 Questions)**:
  - Foundational QA test queries: `SELECT`, `WHERE` filtering, `NULL` boundaries (`IS NULL` vs `= NULL`), string `LIKE` wildcards, basic aggregates (`COUNT(*)`, `SUM`, `AVG`), and `ORDER BY`.
- **Medium Tier (~1,400 Questions)**:
  - SDET core topics: `INNER` & `LEFT JOINs`, `GROUP BY` with `HAVING`, Anti-joins for ETL source-to-target reconciliation, and deduplication (`HAVING COUNT(DISTINCT col) > 1`).
- **Tough (Advanced) Tier (~1,400 Questions)**:
  - Senior QA Lead & Principal Data QA: Window functions (`LAG()`, `LEAD()`, `ROW_NUMBER()`, `DENSE_RANK()`), banking double-entry balance audits (`SUM(debit) = SUM(credit)`), subscription state machine transitions, and Kafka/Debezium CDC soft-deletion tombstone verification.
- **Both Question Formats Across Every Level**:
  - **Scenario Quizzes (MCQ)**: Instant click-to-reveal feedback with **Why Correct** deep dives explaining the exact SQL mechanics and QA interview trap warnings.
  - **Write SQL Code**: In-browser interactive editor to write, run, and validate queries against sandbox database tables with automated assertions. Even MCQ questions have an optional playground toggle to test queries live!

---

## How to Run in Google Chrome (From Git)

Follow these quick steps on your computer (Windows, macOS, or Linux):

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).
You can verify by running in your terminal:
```bash
node -v
npm -v
```

### 2. Clone the Repository
Open your terminal (or Command Prompt / PowerShell) and clone the repo:
```bash
git clone <YOUR_GIT_REPOSITORY_URL>
cd <REPOSITORY_FOLDER_NAME>
```

### 3. Install Dependencies
Install all required packages:
```bash
npm install
```

### 4. Start the Local Server
Run the development server:
```bash
npm run dev
```

### 5. Open in Google Chrome
Once the terminal displays the local URL:
```text
  VITE v...  ready in ... ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
- Open **Google Chrome** and navigate to:
  **`http://localhost:3000`** (or the URL shown in your terminal, e.g. `http://localhost:5173`).
- The entire app runs directly inside your browser! The SQL engine runs in-memory in Chrome—no Postgres or MySQL server installation is required.

---

## Available Scripts

- `npm run dev`: Launches the interactive local development server with instant reload.
- `npm run build`: Compiles and bundles production-ready assets into the `dist/` folder.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs TypeScript validation.
