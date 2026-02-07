# gits-invoice

A modern invoice template website built with Next.js. Enter invoice data, preview the invoice, and download or print it.

## Features

- **Invoice form** — Enter seller & client details, line items, dates, tax, notes
- **Live preview** — See the invoice update as you type
- **Print** — Print directly from the browser (form and buttons hidden when printing)
- **Download PDF** — Export the invoice as a PDF file

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- jspdf + html2canvas (for PDF export)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```
