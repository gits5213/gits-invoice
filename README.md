# gits-invoice

A modern invoice generator built with Next.js. Enter invoice data, customize the design, preview in real time, and print or download as PDF.

## Features

- **Invoice form** — Seller & client details, line items, dates, tax, notes, optional P.O./S.O. number
- **Company logo** — Upload a logo; it appears in the invoice preview and in print/PDF
- **Brand colors** — Extract accent colors from your logo or pick manually
- **Design customization** — Layout, header style, table style, font, density, borders, logo size
- **Multiple templates** — Standard, Minimal, Receipt, AWS, GitHub, Atlassian, Hotel, Airlines, and more
- **Live preview** — See changes as you type
- **Print** — Print directly from the browser
- **Download PDF** — Export the invoice as a PDF

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jspdf](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) — PDF export
- [colorthief](https://github.com/lokesh/color-thief) — Color extraction from logo

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
git clone https://github.com/yourusername/gits-invoice.git
cd gits-invoice
npm install
```

> If you see peer dependency warnings, try: `npm install --legacy-peer-deps`

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (static export) |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

## Build for Production

```bash
npm run build
npm run start
```

The static site is generated in the `out/` directory.

## Deploy to GitHub Pages

The project is configured for GitHub Pages deployment via GitHub Actions.

### Setup

1. Push the repo to GitHub
2. In your repo: **Settings → Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**

### Automatic Deployment

Every push to `main` triggers a deployment. The site will be available at:

`https://<username>.github.io/<repo-name>/`

Example: `https://yourname.github.io/gits-invoice/`

### Manual Deployment

Run the **"Deploy to GitHub Pages"** workflow manually from the **Actions** tab if needed.

## Project Structure

```
gits-invoice/
├── src/
│   ├── app/           # Next.js App Router pages and layout
│   ├── components/    # Invoice form, template, design panel
│   ├── lib/           # Utilities (color extraction, etc.)
│   └── types/         # TypeScript types
├── .github/workflows/ # GitHub Actions (deploy.yml)
└── next.config.js     # Static export, basePath for GitHub Pages
```

## License

MIT
