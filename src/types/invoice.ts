export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceParty {
  name: string;
  address: string;
  email?: string;
  phone?: string;
}

/** Customizable invoice design options */
export interface InvoiceDesign {
  /** Overall layout style */
  layout: "classic" | "compact" | "minimal" | "modern";
  /** Logo and header arrangement */
  headerStyle: "logo-left" | "logo-right" | "logo-centered";
  /** Line items table appearance */
  tableStyle: "bordered" | "striped" | "minimal";
  /** Typography style */
  fontFamily: "sans" | "serif" | "mono";
  /** Vertical spacing density */
  density: "spacious" | "standard" | "compact";
  /** Show From / Bill To section labels */
  showSectionLabels: boolean;
  /** Border treatment for header/totals */
  borderStyle: "accent" | "neutral" | "none";
  /** Logo size in header */
  logoSize: "small" | "medium" | "large";
}

export const defaultDesign: InvoiceDesign = {
  layout: "classic",
  headerStyle: "logo-left",
  tableStyle: "bordered",
  fontFamily: "sans",
  density: "standard",
  showSectionLabels: true,
  borderStyle: "accent",
  logoSize: "medium",
};

/** Template presets - each defines a complete design look */
export type InvoiceTemplateId = "standard" | "minimal" | "receipt" | "aws" | "saucelabs" | "readyapi" | "lambdatest" | "hardware" | "github" | "atlassian" | "airbnb" | "homedepot" | "hotel" | "airlines" | "carrental";

export interface InvoiceTemplatePreset {
  id: InvoiceTemplateId;
  name: string;
  description?: string;
  design: InvoiceDesign;
}

export const invoiceTemplatePresets: InvoiceTemplatePreset[] = [
  {
    id: "standard",
    name: "Standard Template",
    description: "Classic layout with bordered table",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "minimal",
    name: "Minimal Template",
    description: "Clean, minimal design with ample whitespace",
    design: {
      layout: "minimal",
      headerStyle: "logo-centered",
      tableStyle: "minimal",
      fontFamily: "sans",
      density: "spacious",
      showSectionLabels: false,
      borderStyle: "neutral",
      logoSize: "medium",
    },
  },
  {
    id: "receipt",
    name: "Receipt Template",
    description: "Compact receipt-style layout",
    design: {
      layout: "compact",
      headerStyle: "logo-centered",
      tableStyle: "striped",
      fontFamily: "mono",
      density: "compact",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "small",
    },
  },
  {
    id: "aws",
    name: "AWS Style Template",
    description: "Professional layout with light blue section headers and orange table accents",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "striped",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "neutral",
      logoSize: "medium",
    },
  },
  {
    id: "saucelabs",
    name: "SauceLabs Style Template",
    description: "Clean design with dark purple header band and prominent amount due",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "readyapi",
    name: "Ready API Style Template",
    description: "Clean, straightforward layout with company details and billing period",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "neutral",
      logoSize: "medium",
    },
  },
  {
    id: "lambdatest",
    name: "LambdaTest Style Template",
    description: "Layout with subscription terms and red/orange accents",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "hardware",
    name: "Hardware / Equipment Template",
    description: "Product-focused layout with Items, P.O. number, and Amount Due",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "neutral",
      logoSize: "medium",
    },
  },
  {
    id: "github",
    name: "GitHub Style Template",
    description: "Clean, minimal layout with dark accents and billing period",
    design: {
      layout: "minimal",
      headerStyle: "logo-left",
      tableStyle: "minimal",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "neutral",
      logoSize: "medium",
    },
  },
  {
    id: "atlassian",
    name: "Atlassian Style Template",
    description: "Remittance advice layout with Description, Currency, Amount columns",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "airbnb",
    name: "Airbnb Rental Template",
    description: "Vacation rental style with guest info and booking charges",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "minimal",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "homedepot",
    name: "Home Depot Style Template",
    description: "Retail/home improvement receipt style with orange accents",
    design: {
      layout: "compact",
      headerStyle: "logo-centered",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "compact",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "hotel",
    name: "Hotel Invoice Template",
    description: "Hospitality style with guest info and stay charges",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "airlines",
    name: "Airlines Invoice Template",
    description: "Travel industry style with passenger and flight details",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "striped",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
  {
    id: "carrental",
    name: "Car Rental Invoice Template",
    description: "Rental style with vehicle and rental period details",
    design: {
      layout: "classic",
      headerStyle: "logo-left",
      tableStyle: "bordered",
      fontFamily: "sans",
      density: "standard",
      showSectionLabels: true,
      borderStyle: "accent",
      logoSize: "medium",
    },
  },
];

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  from: InvoiceParty;
  to: InvoiceParty;
  items: InvoiceLineItem[];
  taxRate?: number;
  notes?: string;
  currency?: string;
  /** Company logo as base64 data URL (e.g. from file upload) */
  logo?: string;
  /** Brand accent color (hex) - extracted from logo or set manually */
  accentColor?: string;
  /** Secondary brand color (hex) - for accents */
  secondaryColor?: string;
  /** Design customization options */
  design?: Partial<InvoiceDesign>;
  /** Selected template preset (applies design when changed) */
  templateId?: InvoiceTemplateId;
  /** Purchase Order / Sales Order number (for equipment/hardware invoices) */
  poNumber?: string;
  /** Mark invoice as paid (shows "PAID" / "FULL PAID" on invoice) */
  paid?: boolean;
}

export const emptyParty: InvoiceParty = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

export const defaultInvoiceData: InvoiceData = {
  paid: true,
  invoiceNumber: "INV-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  from: {
    name: "Your Company Name",
    address: "123 Business St\nCity, State 12345",
    email: "billing@company.com",
    phone: "+1 (555) 123-4567",
  },
  to: emptyParty,
  items: [
    {
      id: "1",
      description: "Professional services",
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    },
  ],
  taxRate: 0,
  notes: "",
  currency: "USD",
};
