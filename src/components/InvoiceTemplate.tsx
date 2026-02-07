"use client";

import { forwardRef } from "react";
import {
  defaultDesign,
  type InvoiceData,
  type InvoiceDesign,
} from "@/types/invoice";

interface InvoiceTemplateProps {
  data: InvoiceData;
}

function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

const DEFAULT_ACCENT = "#059669"; // emerald-600

/** AWS-style color palette */
const AWS_COLORS = {
  sectionHeader: "#E3F2FD", // light blue
  rowAccent: "#FFF3E0", // light orange
  totalRow: "#F5F5F5", // light grey
};

/** SauceLabs-style color palette */
const SAUCELABS_COLORS = {
  headerPurple: "#4A148C", // dark purple
  labelPurple: "#5E35B1", // medium purple for labels
};

/** LambdaTest-style color palette (red/orange brand) */
const LAMBDATEST_COLORS = {
  accent: "#E0234E", // LambdaTest red
  headerBg: "#E0234E",
  lightBg: "#FFF5F7",
};

/** GitHub-style color palette (dark/minimal) */
const GITHUB_COLORS = {
  dark: "#24292f",
  text: "#57606a",
};

/** Atlassian-style color palette (blue brand) */
const ATLASSIAN_COLORS = {
  accent: "#0052CC",
  headerBg: "#0052CC",
  lightBg: "#DEEBFF",
};

/** Airbnb-style color palette (coral/red brand) */
const AIRBNB_COLORS = {
  accent: "#FF5A5F",
  headerBg: "#FF5A5F",
  lightBg: "#FFF8F6",
};

/** Home Depot-style color palette (orange brand) */
const HOMEDEPOT_COLORS = {
  accent: "#F96302",
  headerBg: "#F96302",
  dark: "#333333",
};

/** Hotel-style color palette (hospitality) */
const HOTEL_COLORS = {
  accent: "#1E3A5F",
  headerBg: "#1E3A5F",
  lightBg: "#F0F4F8",
};

/** Airlines-style color palette (travel) */
const AIRLINES_COLORS = {
  accent: "#003366",
  headerBg: "#003366",
  lightBg: "#E8EEF4",
};

/** Car rental-style color palette */
const CARRENTAL_COLORS = {
  accent: "#0D9488",
  headerBg: "#0D9488",
  lightBg: "#CCFBF1",
};

const fontMap: Record<InvoiceDesign["fontFamily"], string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

const logoSizeMap: Record<InvoiceDesign["logoSize"], string> = {
  small: "h-10 max-w-[100px]",
  medium: "h-14 max-w-[140px]",
  large: "h-20 max-w-[180px]",
};

export const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  function InvoiceTemplate({ data }, ref) {
    const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = ((data.taxRate ?? 0) / 100) * subtotal;
    const total = subtotal + taxAmount;
    const accent = data.accentColor ?? DEFAULT_ACCENT;
    const d: InvoiceDesign = { ...defaultDesign, ...data.design };

    const borderColor =
      d.borderStyle === "accent"
        ? accent
        : d.borderStyle === "neutral"
          ? "rgb(212 212 212)"
          : "transparent";

    const paddingMap = {
      spacious: { container: "p-10 sm:p-14", section: "mb-12", table: "py-5", totals: "mt-10" },
      standard: { container: "p-8 sm:p-12", section: "mb-10", table: "py-4", totals: "mt-8" },
      compact: { container: "p-5 sm:p-8", section: "mb-6", table: "py-2", totals: "mt-6" },
    };
    const pad = paddingMap[d.density];

    const headerBorder = d.borderStyle !== "none" ? "border-b" : "";
    const headerPadding = d.density === "compact" ? "pb-6" : "pb-8";

    const isModern = d.layout === "modern";
    const isMinimal = d.layout === "minimal";
    const isReceipt = data.templateId === "receipt";
    const isAws = data.templateId === "aws";
    const isSaucelabs = data.templateId === "saucelabs";
    const isReadyapi = data.templateId === "readyapi";
    const isLambdatest = data.templateId === "lambdatest";
    const isHardware = data.templateId === "hardware";
    const isGithub = data.templateId === "github";
    const isAtlassian = data.templateId === "atlassian";
    const isAirbnb = data.templateId === "airbnb";
    const isHomeDepot = data.templateId === "homedepot";
    const isHotel = data.templateId === "hotel";
    const isAirlines = data.templateId === "airlines";
    const isCarRental = data.templateId === "carrental";

    const showPaid = data.paid !== false;
    const fullPaidText = `This invoice is full paid by ${data.to.name || "the client"}.`;

    const FullPaidBlock = ({ align = "center" }: { align?: "left" | "center" | "right" }) =>
      showPaid ? (
        <div className={`mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-700 ${align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center"}`}>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{fullPaidText}</p>
        </div>
      ) : null;

    return (
      <div
        ref={ref}
        className={`print-invoice relative mx-auto w-full rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-950/50 ${pad.container} ${fontMap[d.fontFamily]} ${isReceipt ? "max-w-[100mm]" : "max-w-[210mm]"}`}
        style={
          {
            "--invoice-accent": accent,
          } as React.CSSProperties & { "--invoice-accent": string }
        }
      >
        {isAws ? (
          /* AWS-style layout */
          <>
            {/* AWS Header: logo left, Bill to left; Invoice summary right */}
            <div className={`${pad.section} flex flex-col gap-6 border-b border-neutral-200 pb-8 dark:border-neutral-700 sm:flex-row sm:items-start sm:justify-between`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                  />
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Bill to
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900 dark:text-white">
                    {data.to.name || "—"}
                  </p>
                  {data.to.address && (
                    <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                      {data.to.address}
                    </pre>
                  )}
                </div>
              </div>
              <div className="sm:text-right">
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">
                  {data.from.name} Invoice
                </h1>
                <div
                  className="mt-4 rounded px-4 py-3"
                  style={{ backgroundColor: AWS_COLORS.sectionHeader }}
                >
                  <p className="text-sm text-neutral-700 dark:text-neutral-800">
                    <span className="font-semibold">Invoice number:</span> {data.invoiceNumber}
                  </p>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-800">
                    <span className="font-semibold">Invoice date:</span> {data.invoiceDate}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">
                    Total due: {formatCurrency(total, data.currency)}
                  </p>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-500">
                    Due date: {data.dueDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary section */}
            <div className={pad.section}>
              <div
                className="rounded-t px-4 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                style={{ backgroundColor: AWS_COLORS.sectionHeader }}
              >
                Summary
              </div>
              <table className="w-full border-collapse border border-neutral-200 text-sm dark:border-neutral-700">
                <tbody>
                  <tr style={{ backgroundColor: AWS_COLORS.rowAccent }}>
                    <td className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
                      Service charges
                    </td>
                    <td className="border-b border-neutral-200 px-4 py-3 text-right font-medium dark:border-neutral-700">
                      {formatCurrency(subtotal, data.currency)}
                    </td>
                  </tr>
                  {(data.taxRate ?? 0) > 0 && (
                    <tr style={{ backgroundColor: AWS_COLORS.rowAccent }}>
                      <td className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
                        Tax ({(data.taxRate ?? 0)}%)
                      </td>
                      <td className="border-b border-neutral-200 px-4 py-3 text-right font-medium dark:border-neutral-700">
                        {formatCurrency(taxAmount, data.currency)}
                      </td>
                    </tr>
                  )}
                  <tr style={{ backgroundColor: AWS_COLORS.totalRow }}>
                    <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-white">
                      Total for this invoice
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-neutral-900 dark:text-white">
                      {formatCurrency(total, data.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Detail section */}
            <div className={pad.section}>
              <div
                className="rounded-t px-4 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                style={{ backgroundColor: AWS_COLORS.sectionHeader }}
              >
                Detail
              </div>
              <table className="w-full border-collapse border border-neutral-200 text-sm dark:border-neutral-700">
                <thead>
                  <tr
                    className="border-b-2"
                    style={{
                      backgroundColor: AWS_COLORS.sectionHeader,
                      borderColor: "rgb(212 212 212)",
                    }}
                  >
                    <th className="px-4 py-3 text-left font-semibold text-neutral-800 dark:text-neutral-200">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={pad.table}
                      style={{ backgroundColor: idx % 2 === 0 ? AWS_COLORS.rowAccent : "#FFFFFF" }}
                    >
                      <td className="border-b border-neutral-200 px-4 py-3 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="border-b border-neutral-200 px-4 py-3 text-right text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                        {item.quantity}
                      </td>
                      <td className="border-b border-neutral-200 px-4 py-3 text-right text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="border-b border-neutral-200 px-4 py-3 text-right font-medium text-neutral-900 dark:border-neutral-700 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.notes && (
              <div className="mt-8 rounded p-4" style={{ backgroundColor: AWS_COLORS.sectionHeader }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">
                  {data.notes}
                </p>
              </div>
            )}
            <FullPaidBlock align="right" />
          </>
        ) : isSaucelabs ? (
          /* SauceLabs-style layout */
          <>
            {/* Header: Logo + company left; Bill From right */}
            <div className={`${pad.section} flex flex-col gap-6 border-b border-neutral-200 pb-8 dark:border-neutral-700 sm:flex-row sm:items-start sm:justify-between`}>
              <div className="flex items-center gap-4">
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                  />
                )}
                <span className="text-xl font-semibold text-neutral-800 dark:text-white">
                  {data.from.name}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  Bill From:
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {data.from.name}
                </p>
                {data.from.email && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.email}
                  </p>
                )}
                {data.from.address && (
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.address}
                  </pre>
                )}
              </div>
            </div>

            {/* Bill To, Invoice details, Amount Due */}
            <div className={`${pad.section} grid gap-6 border-b border-neutral-200 pb-8 dark:border-neutral-700 sm:grid-cols-3`}>
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  Bill To:
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {data.to.name || "—"}
                </p>
                {data.to.address && (
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.address}
                  </pre>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: SAUCELABS_COLORS.labelPurple }}>
                  Invoice Number:
                </p>
                <p className="mt-1 text-neutral-800 dark:text-neutral-200">
                  {data.invoiceNumber}
                </p>
                <p className="mt-3 text-sm font-semibold" style={{ color: SAUCELABS_COLORS.labelPurple }}>
                  Date:
                </p>
                <p className="mt-1 text-neutral-800 dark:text-neutral-200">
                  {data.invoiceDate}
                </p>
              </div>
              <div className="text-right sm:text-right">
                <p className="text-sm font-semibold" style={{ color: SAUCELABS_COLORS.labelPurple }}>
                  Amount Due ({data.currency ?? "USD"})
                </p>
                <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                  {formatCurrency(total, data.currency)}
                </p>
              </div>
            </div>

            {/* Table with dark purple header */}
            <div className={pad.section}>
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: SAUCELABS_COLORS.headerPurple }}
                  >
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-right font-semibold">Rate</th>
                    <th className="px-4 py-3 text-right font-semibold">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-800 dark:text-neutral-200">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-800 dark:text-neutral-200">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals right-aligned */}
            <div className={`${pad.totals} flex justify-end`}>
              <div className="w-full max-w-[240px] space-y-2 text-right">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(subtotal, data.currency)}
                  </span>
                </div>
                {(data.taxRate ?? 0) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Tax ({(data.taxRate ?? 0)}%)
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(taxAmount, data.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-neutral-300 pt-3 text-sm dark:border-neutral-600">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Total</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(total, data.currency)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-neutral-300 pt-3 font-semibold dark:border-neutral-600">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: SAUCELABS_COLORS.labelPurple }}
                  >
                    Amount Due ({data.currency ?? "USD"})
                  </span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">
                    {formatCurrency(total, data.currency)}
                  </span>
                </div>
              </div>
            </div>

            {data.notes && (
              <div className="mt-10">
                <p
                  className="text-sm font-semibold"
                  style={{ color: SAUCELABS_COLORS.labelPurple }}
                >
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-600 dark:text-neutral-400">
                  {data.notes}
                </p>
              </div>
            )}
            <FullPaidBlock align="right" />
          </>
        ) : isReadyapi ? (
          /* Ready API / SmartBear-style layout */
          <>
            {/* Top: Company name, Date, INVOICE, Invoice number */}
            <div className={`${pad.section} border-b border-neutral-200 pb-6 dark:border-neutral-700`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {data.logo && (
                    <img
                      src={data.logo}
                      alt="Company logo"
                      className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                    />
                  )}
                  <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {data.from.name}
                  </h1>
                </div>
                <div className="flex flex-wrap items-baseline gap-4 text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Date: {data.invoiceDate}
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">INVOICE</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    No. #{data.invoiceNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Line items table - Item, Quantity, Price, Amount */}
            <div className={pad.section}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-300 dark:border-neutral-600">
                    <th className="pb-3 text-left font-semibold text-neutral-800 dark:text-neutral-200">
                      Item
                    </th>
                    <th className="pb-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Quantity
                    </th>
                    <th className="pb-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Price
                    </th>
                    <th className="pb-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="py-4 text-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {item.quantity}
                      </td>
                      <td className="py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="py-4 text-right font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end border-t-2 border-neutral-300 pt-4 dark:border-neutral-600">
                <div className="flex gap-8 text-sm font-semibold">
                  <span className="text-neutral-700 dark:text-neutral-300">Total</span>
                  <span className="text-neutral-900 dark:text-white">
                    {formatCurrency(total, data.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Company details and Bill to side by side */}
            <div className={`${pad.section} grid gap-8 border-b border-neutral-200 pb-8 dark:border-neutral-700 sm:grid-cols-2`}>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {data.from.name}
                </p>
                <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                  {data.from.address}
                </pre>
                {data.from.phone && (
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Tel: {data.from.phone}
                  </p>
                )}
                {data.from.email && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Email: {data.from.email}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  Bill to:
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {data.to.name || "—"}
                </p>
                {data.to.address && (
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.address}
                  </pre>
                )}
              </div>
            </div>

            {/* Billing period / Notes */}
            {(data.notes || data.invoiceDate) && (
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {data.notes ? (
                  <p className="whitespace-pre-wrap">{data.notes}</p>
                ) : (
                  <p>
                    This invoice is for the billing period {data.invoiceDate} to {data.dueDate}
                  </p>
                )}
              </div>
            )}
            <FullPaidBlock align="center" />
          </>
        ) : isLambdatest ? (
          /* LambdaTest-style layout */
          <>
            {/* Header: INVOICE, DATE, INVOICE NO */}
            <div
              className={`${pad.section} flex flex-wrap items-start justify-between gap-4 border-b pb-6`}
              style={{ borderColor: LAMBDATEST_COLORS.accent }}
            >
              <div className="flex items-center gap-4">
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                  />
                )}
                <div>
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: LAMBDATEST_COLORS.accent }}
                  >
                    {data.from.name.toUpperCase()}
                  </h1>
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.address}
                  </pre>
                  {data.from.phone && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {data.from.phone}
                    </p>
                  )}
                  {data.from.email && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {data.from.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                    Invoice
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900 dark:text-white">
                    {data.invoiceNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                    Date
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900 dark:text-white">
                    {data.invoiceDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Bill to - right side */}
            <div className={`${pad.section} flex justify-end`}>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  Bill to
                </p>
                <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
                  {data.to.name || "—"}
                </p>
                {data.to.address && (
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.address}
                  </pre>
                )}
                {data.to.phone && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.phone}
                  </p>
                )}
                {data.to.email && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subscription / Payment terms row */}
            <div
              className={`${pad.section} grid grid-cols-2 gap-4 rounded px-4 py-3 text-sm sm:grid-cols-4`}
              style={{ backgroundColor: LAMBDATEST_COLORS.lightBg }}
            >
              <div>
                <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  Subscription
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {data.items[0]?.description || "Services"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  Year
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {new Date(data.invoiceDate).getFullYear()}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  Payment terms
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {data.notes ? "As per notes" : "Net 30"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  Due date
                </p>
                <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                  {data.dueDate}
                </p>
              </div>
            </div>

            {/* Line items: Quantity, Description, Unit Price, Line Total */}
            <div className={pad.section}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: LAMBDATEST_COLORS.headerBg }}
                  >
                    <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-right font-semibold">Unit Price</th>
                    <th className="px-4 py-3 text-right font-semibold">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="mt-4 space-y-2 border-t-2 pt-4"
                style={{ borderColor: LAMBDATEST_COLORS.accent }}
              >
                <div className="flex justify-end gap-8 text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                  <span className="font-medium text-neutral-900 dark:text-white w-24 text-right">
                    {formatCurrency(subtotal, data.currency)}
                  </span>
                </div>
                {(data.taxRate ?? 0) > 0 && (
                  <div className="flex justify-end gap-8 text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Sales Tax</span>
                    <span className="font-medium text-neutral-900 dark:text-white w-24 text-right">
                      {formatCurrency(taxAmount, data.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-end gap-8 text-base font-semibold">
                  <span className="text-neutral-800 dark:text-neutral-200">Total</span>
                  <span
                    className="w-24 text-right font-bold"
                    style={{ color: LAMBDATEST_COLORS.accent }}
                  >
                    {formatCurrency(total, data.currency)}
                  </span>
                </div>
              </div>
            </div>
            <FullPaidBlock align="right" />
          </>
        ) : isHardware ? (
          /* Hardware / Equipment-style layout */
          <>
            {/* Header: INVOICE + company name, address, phone */}
            <div className={`${pad.section} border-b border-neutral-200 pb-6 dark:border-neutral-700`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {data.logo && (
                      <img
                        src={data.logo}
                        alt="Company logo"
                        className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                      />
                    )}
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                      INVOICE
                    </h1>
                  </div>
                  <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
                    {data.from.name}
                  </p>
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.address}
                  </pre>
                  {data.from.phone && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {data.from.phone}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 sm:text-right">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      BILL TO
                    </p>
                    <p className="mt-1 font-medium text-neutral-900 dark:text-white">
                      {data.to.name || "—"}
                    </p>
                    {data.to.address && (
                      <pre className="mt-1 whitespace-pre-wrap font-sans text-left text-sm text-neutral-600 dark:text-neutral-400 sm:text-right">
                        {data.to.address}
                      </pre>
                    )}
                    {data.to.phone && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {data.to.phone}
                      </p>
                    )}
                    {data.to.email && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {data.to.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1 text-sm sm:text-right">
                    <p>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        Invoice Number:
                      </span>{" "}
                      {data.invoiceNumber}
                    </p>
                    <p>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        P.O./S.O. Number:
                      </span>{" "}
                      {data.poNumber ?? "—"}
                    </p>
                    <p>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        Invoice Date:
                      </span>{" "}
                      {data.invoiceDate}
                    </p>
                    <p>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        Payment Due:
                      </span>{" "}
                      {data.dueDate}
                    </p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      Amount Due ({data.currency ?? "USD"}): {formatCurrency(total, data.currency)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Line items: Items, Quantity, Price, Amount */}
            <div className={pad.section}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-300 dark:border-neutral-600">
                    <th className="pb-3 text-left font-semibold text-neutral-800 dark:text-neutral-200">
                      Items
                    </th>
                    <th className="pb-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Quantity
                    </th>
                    <th className="pb-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Price
                    </th>
                    <th className="pb-3 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="py-4 text-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {item.quantity}
                      </td>
                      <td className="py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="py-4 text-right font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 flex justify-end gap-8 border-t-2 border-neutral-300 pt-4 dark:border-neutral-600">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Total:
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {formatCurrency(total, data.currency)}
                </span>
              </div>
              <div className="mt-2 flex justify-end gap-8 text-sm font-semibold">
                <span className="text-neutral-700 dark:text-neutral-300">
                  Amount Due ({data.currency ?? "USD"}):
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {formatCurrency(total, data.currency)}
                </span>
              </div>
            </div>
            <FullPaidBlock align="right" />
          </>
        ) : isGithub ? (
          /* GitHub-style layout */
          <>
            {/* Header: Company info left, Invoice no & date right */}
            <div className={`${pad.section} flex flex-col gap-6 border-b border-neutral-200 pb-8 dark:border-neutral-700 sm:flex-row sm:items-start sm:justify-between`}>
              <div className="flex items-start gap-4">
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                  />
                )}
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.address}
                  </p>
                  {data.from.phone && (
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      Phone: {data.from.phone}
                    </p>
                  )}
                  {data.from.email && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Email: {data.from.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-sm font-semibold tracking-widest"
                  style={{ color: GITHUB_COLORS.dark }}
                >
                  INVOICE NO. {data.invoiceNumber}
                </p>
                <p
                  className="mt-1 text-sm font-semibold tracking-widest"
                  style={{ color: GITHUB_COLORS.dark }}
                >
                  DATE: {data.invoiceDate}
                </p>
              </div>
            </div>

            {/* Bill to and Line items side by side / stacked */}
            <div className={`${pad.section} grid gap-8 sm:grid-cols-3`}>
              <div>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: GITHUB_COLORS.dark }}
                >
                  Bill to:
                </p>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {data.to.name || "—"}
                </p>
                {data.to.address && (
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.address}
                  </pre>
                )}
              </div>
              <div className="sm:col-span-2">
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: GITHUB_COLORS.dark }}
                >
                  Item description
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-300 dark:border-neutral-600">
                      <th className="pb-2 text-left font-semibold text-neutral-800 dark:text-neutral-200">
                        Item
                      </th>
                      <th className="pb-2 text-left font-semibold text-neutral-800 dark:text-neutral-200">
                        Qty
                      </th>
                      <th className="pb-2 text-left font-semibold text-neutral-800 dark:text-neutral-200">
                        Price
                      </th>
                      <th className="pb-2 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-neutral-200 dark:border-neutral-700"
                      >
                        <td className="py-3 text-neutral-700 dark:text-neutral-300">
                          {item.description || "—"}
                        </td>
                        <td className="py-3 text-neutral-600 dark:text-neutral-400">
                          {item.quantity}
                        </td>
                        <td className="py-3 text-right text-neutral-600 dark:text-neutral-400">
                          {formatCurrency(item.unitPrice, data.currency)}
                        </td>
                        <td className="py-3 text-right font-medium text-neutral-900 dark:text-white">
                          {formatCurrency(item.amount, data.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 space-y-2 border-t border-neutral-300 pt-4 dark:border-neutral-600">
                  <div className="flex justify-end gap-12 text-sm">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      Sub total
                    </span>
                    <span className="w-24 text-right font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(subtotal, data.currency)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-12 font-semibold">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Grand total
                    </span>
                    <span
                      className="w-24 text-right font-bold"
                      style={{ color: GITHUB_COLORS.dark }}
                    >
                      {formatCurrency(total, data.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing period / Notes */}
            {(data.notes || data.invoiceDate) && (
              <div
                className="text-sm"
                style={{ color: GITHUB_COLORS.text }}
              >
                {data.notes ? (
                  <p className="whitespace-pre-wrap">{data.notes}</p>
                ) : (
                  <p>
                    This invoice is for the billing period {data.invoiceDate} to {data.dueDate}
                  </p>
                )}
              </div>
            )}
            <FullPaidBlock align="center" />
          </>
        ) : isAtlassian ? (
          /* Atlassian-style layout (Remittance Advice) */
          <>
            {/* Header: REMITTANCE ADVICE, Invoice, Date */}
            <div
              className={`${pad.section} border-b pb-6`}
              style={{ borderColor: ATLASSIAN_COLORS.accent }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {data.logo && (
                    <img
                      src={data.logo}
                      alt="Company logo"
                      className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                    />
                  )}
                  <div>
                    <h1
                      className="text-xl font-bold tracking-wide"
                      style={{ color: ATLASSIAN_COLORS.accent }}
                    >
                      REMITTANCE ADVICE
                    </h1>
                    <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
                      {data.from.name}
                    </p>
                    <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                      {data.from.address}
                    </pre>
                    {data.notes && (
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {data.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    INVOICE: {data.invoiceNumber}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    DATE: {data.invoiceDate}
                  </p>
                </div>
              </div>
            </div>

            {/* TO: Bill to */}
            <div className={`${pad.section} border-b border-neutral-200 pb-6 dark:border-neutral-700`}>
              <p
                className="mb-2 text-sm font-semibold"
                style={{ color: ATLASSIAN_COLORS.accent }}
              >
                TO:
              </p>
              <p className="font-medium text-neutral-900 dark:text-white">
                {data.to.name || "—"}
              </p>
              {data.to.address && (
                <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                  {data.to.address}
                </pre>
              )}
            </div>

            {/* Table: DESCRIPTION, CURRENCY, AMOUNT, PAID */}
            <div className={pad.section}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: ATLASSIAN_COLORS.headerBg }}
                  >
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-left font-semibold">Currency</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                    <th className="px-4 py-3 text-right font-semibold">Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="px-4 py-4 text-neutral-600 dark:text-neutral-400">
                        {data.currency ?? "USD"}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="mt-4 flex justify-end gap-8 border-t-2 pt-4 font-semibold"
                style={{ borderColor: ATLASSIAN_COLORS.accent }}
              >
                <span className="text-neutral-800 dark:text-neutral-200">TOTAL</span>
                <span
                  className="font-bold"
                  style={{ color: ATLASSIAN_COLORS.accent }}
                >
                  {formatCurrency(total, data.currency)}
                </span>
              </div>
            </div>
            <FullPaidBlock align="right" />
          </>
        ) : isAirbnb ? (
          /* Airbnb rental-style layout */
          <>
            {/* Header: RENTAL INVOICE with coral accent */}
            <div
              className={`${pad.section} rounded-lg px-6 py-5`}
              style={{ backgroundColor: AIRBNB_COLORS.lightBg }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {data.logo && (
                    <img
                      src={data.logo}
                      alt="Company logo"
                      className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                    />
                  )}
                  <div>
                    <h1
                      className="text-xl font-bold"
                      style={{ color: AIRBNB_COLORS.accent }}
                    >
                      Rental Invoice
                    </h1>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {data.from.name}
                    </p>
                    {data.from.address && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {data.from.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Invoice #{data.invoiceNumber}
                  </p>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                    Date: {data.invoiceDate}
                  </p>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                    Due: {data.dueDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Guest (Bill to) */}
            <div className={`${pad.section}`}>
              <p
                className="mb-2 text-sm font-semibold"
                style={{ color: AIRBNB_COLORS.accent }}
              >
                Guest
              </p>
              <p className="font-medium text-neutral-900 dark:text-white">
                {data.to.name || "—"}
              </p>
              {data.to.address && (
                <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                  {data.to.address}
                </pre>
              )}
              {data.to.email && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {data.to.email}
                </p>
              )}
              {data.to.phone && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {data.to.phone}
                </p>
              )}
            </div>

            {/* Booking charges table */}
            <div className={pad.section}>
              <p
                className="mb-3 text-sm font-semibold"
                style={{ color: AIRBNB_COLORS.accent }}
              >
                Booking details
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: AIRBNB_COLORS.headerBg }}
                  >
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-right font-semibold">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold">Rate</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.description || "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 space-y-2">
                {(data.taxRate ?? 0) > 0 && (
                  <div className="flex justify-end gap-12 text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Tax ({(data.taxRate ?? 0)}%)
                    </span>
                    <span className="w-24 text-right font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(taxAmount, data.currency)}
                    </span>
                  </div>
                )}
                <div
                  className="flex justify-end gap-12 rounded-lg px-4 py-3 font-semibold"
                  style={{ backgroundColor: AIRBNB_COLORS.lightBg }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: AIRBNB_COLORS.accent }}
                  >
                    Total ({data.currency ?? "USD"})
                  </span>
                  <span
                    className="w-24 text-right text-lg font-bold"
                    style={{ color: AIRBNB_COLORS.accent }}
                  >
                    {formatCurrency(total, data.currency)}
                  </span>
                </div>
              </div>
            </div>

            {data.notes && (
              <div
                className="rounded-lg px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400"
                style={{ backgroundColor: AIRBNB_COLORS.lightBg }}
              >
                <p className="whitespace-pre-wrap">{data.notes}</p>
              </div>
            )}
            <FullPaidBlock align="center" />
          </>
        ) : isHomeDepot ? (
          /* Home Depot retail-style layout */
          <>
            {/* Header: Company name, RECEIPT/INVOICE */}
            <div
              className={`${pad.section} border-b-4 pb-6`}
              style={{ borderColor: HOMEDEPOT_COLORS.accent }}
            >
              <div className="flex flex-col items-center text-center">
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className={`mx-auto w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                  />
                )}
                <h1
                  className="mt-4 text-2xl font-bold"
                  style={{ color: HOMEDEPOT_COLORS.accent }}
                >
                  {data.from.name}
                </h1>
                {data.from.address && (
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.address.replace(/\n/g, ", ")}
                  </p>
                )}
                {data.from.phone && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {data.from.phone}
                  </p>
                )}
                <div className="mt-4 flex gap-6 text-sm">
                  <span style={{ color: HOMEDEPOT_COLORS.dark }}>
                    <strong>Invoice:</strong> {data.invoiceNumber}
                  </span>
                  <span style={{ color: HOMEDEPOT_COLORS.dark }}>
                    <strong>Date:</strong> {data.invoiceDate}
                  </span>
                  <span style={{ color: HOMEDEPOT_COLORS.dark }}>
                    <strong>Due:</strong> {data.dueDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Sold to / Bill to */}
            <div className={`${pad.section} grid gap-4 sm:grid-cols-2`}>
              <div>
                <p
                  className="mb-2 text-xs font-bold uppercase"
                  style={{ color: HOMEDEPOT_COLORS.accent }}
                >
                  Sold to
                </p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {data.to.name || "—"}
                </p>
                {data.to.address && (
                  <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.address}
                  </pre>
                )}
                {data.to.phone && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {data.to.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Items table - retail style */}
            <div className={pad.section}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: HOMEDEPOT_COLORS.headerBg }}
                  >
                    <th className="border border-white/30 px-3 py-2 text-left font-semibold">
                      Item
                    </th>
                    <th className="border border-white/30 px-3 py-2 text-right font-semibold">
                      Qty
                    </th>
                    <th className="border border-white/30 px-3 py-2 text-right font-semibold">
                      Price
                    </th>
                    <th className="border border-white/30 px-3 py-2 text-right font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <td className="px-3 py-3 text-neutral-800 dark:text-neutral-200">
                        {item.description || "—"}
                      </td>
                      <td className="px-3 py-3 text-right text-neutral-600 dark:text-neutral-400">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-3 text-right text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(item.unitPrice, data.currency)}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-neutral-900 dark:text-white">
                        {formatCurrency(item.amount, data.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="mt-4 flex justify-end gap-8 border-t-2 py-3 text-base font-bold"
                style={{ borderColor: HOMEDEPOT_COLORS.accent }}
              >
                <span style={{ color: HOMEDEPOT_COLORS.dark }}>TOTAL DUE</span>
                <span
                  className="text-lg"
                  style={{ color: HOMEDEPOT_COLORS.accent }}
                >
                  {formatCurrency(total, data.currency)}
                </span>
              </div>
            </div>

            {data.notes && (
              <div className="mt-6 rounded border border-neutral-200 px-4 py-3 text-sm dark:border-neutral-700">
                <p className="whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">
                  {data.notes}
                </p>
              </div>
            )}
            <FullPaidBlock align="center" />
          </>
        ) : isHotel ? (
          /* Hotel invoice layout */
          <>
            <div
              className={`${pad.section} rounded-lg px-6 py-5`}
              style={{ backgroundColor: HOTEL_COLORS.lightBg }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {data.logo && (
                    <img src={data.logo} alt="Logo" className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`} />
                  )}
                  <div>
                    <h1 className="text-xl font-bold" style={{ color: HOTEL_COLORS.accent }}>
                      Hotel Invoice
                    </h1>
                    <p className="mt-1 font-semibold text-neutral-900 dark:text-white">{data.from.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.from.address?.replace(/\n/g, ", ")}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">Invoice # {data.invoiceNumber}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Date: {data.invoiceDate}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Due: {data.dueDate}</p>
                </div>
              </div>
            </div>
            <div className={`${pad.section}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: HOTEL_COLORS.accent }}>Guest</p>
              <p className="font-medium text-neutral-900 dark:text-white">{data.to.name || "—"}</p>
              {data.to.address && <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">{data.to.address}</pre>}
              {data.to.email && <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.to.email}</p>}
              {data.to.phone && <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.to.phone}</p>}
            </div>
            <div className={pad.section}>
              <p className="mb-3 text-sm font-semibold" style={{ color: HOTEL_COLORS.accent }}>Stay charges</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: HOTEL_COLORS.headerBg }}>
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-right font-semibold">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold">Rate</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id} className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">{item.description || "—"}</td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">{item.quantity}</td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">{formatCurrency(item.unitPrice, data.currency)}</td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">{formatCurrency(item.amount, data.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(data.taxRate ?? 0) > 0 && (
                <div className="mt-4 flex justify-end gap-8 text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tax ({(data.taxRate ?? 0)}%)</span>
                  <span className="font-medium">{formatCurrency(taxAmount, data.currency)}</span>
                </div>
              )}
              <div className="mt-4 flex justify-end gap-8 font-semibold" style={{ color: HOTEL_COLORS.accent }}>
                <span>Total ({data.currency ?? "USD"})</span>
                <span className="font-bold">{formatCurrency(total, data.currency)}</span>
              </div>
            </div>
            {data.notes && <div className="mt-6 rounded px-4 py-3 text-sm" style={{ backgroundColor: HOTEL_COLORS.lightBg }}><p className="whitespace-pre-wrap">{data.notes}</p></div>}
            <FullPaidBlock align="center" />
          </>
        ) : isAirlines ? (
          /* Airlines invoice layout */
          <>
            <div className={`${pad.section} border-b pb-6`} style={{ borderColor: AIRLINES_COLORS.accent }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {data.logo && <img src={data.logo} alt="Logo" className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`} />}
                  <div>
                    <h1 className="text-xl font-bold" style={{ color: AIRLINES_COLORS.accent }}>Travel Invoice</h1>
                    <p className="font-semibold text-neutral-900 dark:text-white">{data.from.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.from.address?.replace(/\n/g, ", ")}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">Ticket/Invoice # {data.invoiceNumber}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Date: {data.invoiceDate}</p>
                </div>
              </div>
            </div>
            <div className={`${pad.section}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: AIRLINES_COLORS.accent }}>Passenger</p>
              <p className="font-medium text-neutral-900 dark:text-white">{data.to.name || "—"}</p>
              {data.to.address && <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">{data.to.address}</pre>}
              {data.to.email && <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.to.email}</p>}
            </div>
            <div className={pad.section}>
              <p className="mb-3 text-sm font-semibold" style={{ color: AIRLINES_COLORS.accent }}>Fare details</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: AIRLINES_COLORS.headerBg }}>
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-right font-semibold">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold">Fare</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, i) => (
                    <tr key={item.id} className={`border-b border-neutral-200 dark:border-neutral-700 ${i % 2 === 1 ? "bg-neutral-50 dark:bg-neutral-800/30" : ""}`}>
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">{item.description || "—"}</td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">{item.quantity}</td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">{formatCurrency(item.unitPrice, data.currency)}</td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">{formatCurrency(item.amount, data.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(data.taxRate ?? 0) > 0 && (
                <div className="mt-4 flex justify-end gap-8 text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Taxes & fees ({(data.taxRate ?? 0)}%)</span>
                  <span className="font-medium">{formatCurrency(taxAmount, data.currency)}</span>
                </div>
              )}
              <div className="mt-4 flex justify-end gap-8 font-semibold" style={{ color: AIRLINES_COLORS.accent }}>
                <span>Total amount due</span>
                <span className="font-bold">{formatCurrency(total, data.currency)}</span>
              </div>
            </div>
            {data.notes && <div className="mt-6 rounded px-4 py-3 text-sm" style={{ backgroundColor: AIRLINES_COLORS.lightBg }}><p className="whitespace-pre-wrap">{data.notes}</p></div>}
            <FullPaidBlock align="right" />
          </>
        ) : isCarRental ? (
          /* Car rental invoice layout */
          <>
            <div className={`${pad.section} rounded-lg px-6 py-5`} style={{ backgroundColor: CARRENTAL_COLORS.lightBg }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {data.logo && <img src={data.logo} alt="Logo" className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`} />}
                  <div>
                    <h1 className="text-xl font-bold" style={{ color: CARRENTAL_COLORS.accent }}>Rental Invoice</h1>
                    <p className="mt-1 font-semibold text-neutral-900 dark:text-white">{data.from.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.from.address?.replace(/\n/g, ", ")}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">Invoice # {data.invoiceNumber}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Date: {data.invoiceDate}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Due: {data.dueDate}</p>
                </div>
              </div>
            </div>
            <div className={`${pad.section}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: CARRENTAL_COLORS.accent }}>Renter</p>
              <p className="font-medium text-neutral-900 dark:text-white">{data.to.name || "—"}</p>
              {data.to.address && <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-neutral-600 dark:text-neutral-400">{data.to.address}</pre>}
              {data.to.email && <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.to.email}</p>}
              {data.to.phone && <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.to.phone}</p>}
            </div>
            <div className={pad.section}>
              <p className="mb-3 text-sm font-semibold" style={{ color: CARRENTAL_COLORS.accent }}>Rental charges</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: CARRENTAL_COLORS.headerBg }}>
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-right font-semibold">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold">Rate</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id} className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">{item.description || "—"}</td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">{item.quantity}</td>
                      <td className="px-4 py-4 text-right text-neutral-600 dark:text-neutral-400">{formatCurrency(item.unitPrice, data.currency)}</td>
                      <td className="px-4 py-4 text-right font-medium text-neutral-900 dark:text-white">{formatCurrency(item.amount, data.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(data.taxRate ?? 0) > 0 && (
                <div className="mt-4 flex justify-end gap-8 text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tax ({(data.taxRate ?? 0)}%)</span>
                  <span className="font-medium">{formatCurrency(taxAmount, data.currency)}</span>
                </div>
              )}
              <div className="mt-4 flex justify-end gap-8 font-semibold" style={{ color: CARRENTAL_COLORS.accent }}>
                <span>Total due</span>
                <span className="font-bold">{formatCurrency(total, data.currency)}</span>
              </div>
            </div>
            {data.notes && <div className="mt-6 rounded px-4 py-3 text-sm" style={{ backgroundColor: CARRENTAL_COLORS.lightBg }}><p className="whitespace-pre-wrap">{data.notes}</p></div>}
            <FullPaidBlock align="right" />
          </>
        ) : (
          /* Standard layout */
          <>
        {/* Header - layout varies by headerStyle */}
        <div
          className={`${pad.section} flex flex-col gap-6 ${headerBorder} ${headerPadding} sm:flex-row sm:items-start ${
            isModern ? "-mx-8 -mt-8 px-8 pt-8 sm:-mx-12 sm:-mt-12 sm:px-12 sm:pt-12" : ""
          }`}
          style={{
            ...(d.borderStyle !== "none" ? { borderColor } : {}),
            ...(isModern
              ? { backgroundColor: `${accent}12`, borderRadius: "0.75rem 0.75rem 0 0" }
              : {}),
          }}
        >
          {d.headerStyle === "logo-centered" ? (
            <div className="flex w-full flex-col items-center text-center">
              {data.logo && (
                <img
                  src={data.logo}
                  alt="Company logo"
                  className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                />
              )}
              <div className="mt-4">
                <h1
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                  style={{ color: accent }}
                >
                  INVOICE
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  #{data.invoiceNumber}
                </p>
              </div>
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  Invoice Date:
                </span>{" "}
                {data.invoiceDate} ·{" "}
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  Due:
                </span>{" "}
                {data.dueDate}
              </div>
            </div>
          ) : (
            <>
              <div
                className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${
                  d.headerStyle === "logo-right" ? "sm:order-2 sm:flex-row-reverse" : ""
                }`}
              >
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className={`w-auto object-contain ${logoSizeMap[d.logoSize]}`}
                  />
                )}
                <div>
                  <h1
                    className="text-2xl font-bold tracking-tight sm:text-3xl"
                    style={{ color: accent }}
                  >
                    INVOICE
                  </h1>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    #{data.invoiceNumber}
                  </p>
                </div>
              </div>
              <div
                className={`text-sm text-neutral-600 dark:text-neutral-400 ${
                  d.headerStyle === "logo-right" ? "sm:order-1 sm:text-left" : "sm:ml-auto sm:text-right"
                }`}
              >
                <p>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    Invoice Date:
                  </span>{" "}
                  {data.invoiceDate}
                </p>
                <p>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    Due Date:
                  </span>{" "}
                  {data.dueDate}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Parties */}
        <div className={`${pad.section} grid gap-8 sm:grid-cols-2`}>
          <div>
            {d.showSectionLabels && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                From
              </p>
            )}
            <p className="font-semibold text-neutral-900 dark:text-white">
              {data.from.name}
            </p>
            <pre className="mt-1 whitespace-pre-wrap text-sm text-neutral-600 dark:text-neutral-400">
              {data.from.address}
            </pre>
            {data.from.email && (
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {data.from.email}
              </p>
            )}
            {data.from.phone && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {data.from.phone}
              </p>
            )}
          </div>
          <div>
            {d.showSectionLabels && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Bill To
              </p>
            )}
            <p className="font-semibold text-neutral-900 dark:text-white">
              {data.to.name || "—"}
            </p>
            {data.to.address && (
              <pre className="mt-1 whitespace-pre-wrap text-sm text-neutral-600 dark:text-neutral-400">
                {data.to.address}
              </pre>
            )}
            {data.to.email && (
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {data.to.email}
              </p>
            )}
            {data.to.phone && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {data.to.phone}
              </p>
            )}
          </div>
        </div>

        {/* Line items table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className={
                  d.tableStyle === "bordered"
                    ? "border-b-2 border-t border-x"
                    : d.tableStyle === "striped"
                      ? "border-b-2"
                      : "border-b"
                }
                style={
                  d.borderStyle !== "none" && (d.tableStyle === "bordered" || d.tableStyle === "striped")
                    ? { borderColor }
                    : d.tableStyle === "minimal"
                      ? { borderColor: "rgb(229 229 229)" }
                      : undefined
                }
              >
                <th
                  className={`pb-3 pl-4 text-left font-semibold text-neutral-800 dark:text-neutral-200 ${
                    d.tableStyle === "bordered" ? "pr-4" : ""
                  }`}
                >
                  Description
                </th>
                <th className="pb-3 pr-4 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                  Qty
                </th>
                <th className="pb-3 pr-4 text-right font-semibold text-neutral-800 dark:text-neutral-200">
                  Unit Price
                </th>
                <th
                  className={`pb-3 pr-4 text-right font-semibold text-neutral-800 dark:text-neutral-200 ${
                    d.tableStyle === "bordered" ? "pr-4" : ""
                  }`}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${pad.table} ${
                    d.tableStyle === "bordered"
                      ? "border-b border-x border-neutral-200 dark:border-neutral-700"
                      : d.tableStyle === "striped"
                        ? idx % 2 === 1
                          ? "bg-neutral-50 dark:bg-neutral-800/50"
                          : ""
                        : "border-b border-neutral-100 dark:border-neutral-800"
                  }`}
                  style={
                    d.tableStyle === "bordered" && d.borderStyle !== "none"
                      ? { borderColor }
                      : undefined
                  }
                >
                  <td
                    className={`text-neutral-700 dark:text-neutral-300 ${
                      d.tableStyle === "bordered" ? "pl-4 pr-4" : ""
                    }`}
                  >
                    {item.description || "—"}
                  </td>
                  <td className="text-right text-neutral-600 dark:text-neutral-400">
                    {item.quantity}
                  </td>
                  <td className="pr-4 text-right text-neutral-600 dark:text-neutral-400">
                    {formatCurrency(item.unitPrice, data.currency)}
                  </td>
                  <td
                    className={`pr-4 text-right font-medium text-neutral-900 dark:text-white ${
                      d.tableStyle === "bordered" ? "pr-4" : ""
                    }`}
                  >
                    {formatCurrency(item.amount, data.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className={`${pad.totals} flex justify-end`}>
          <div className="w-full max-w-[240px] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">
                Subtotal
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {formatCurrency(subtotal, data.currency)}
              </span>
            </div>
            {(data.taxRate ?? 0) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Tax ({(data.taxRate ?? 0)}%)
                </span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {formatCurrency(taxAmount, data.currency)}
                </span>
              </div>
            )}
            <div
              className={`flex justify-between border-t pt-3 text-base font-semibold ${
                d.borderStyle === "none" ? "border-neutral-200 dark:border-neutral-700" : ""
              }`}
              style={d.borderStyle !== "none" ? { borderColor } : undefined}
            >
              <span className="text-neutral-800 dark:text-neutral-200">
                Total
              </span>
              <span style={{ color: accent }}>
                {formatCurrency(total, data.currency)}
              </span>
            </div>
          </div>
        </div>

        {data.notes && (
          <div
            className={`mt-10 rounded-lg p-4 ${
              isMinimal ? "" : "dark:bg-neutral-800/50"
            }`}
            style={{
              backgroundColor: isMinimal ? "transparent" : `${accent}08`,
              borderLeft: isMinimal ? "none" : `3px solid ${accent}`,
            }}
          >
            {d.showSectionLabels && (
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Notes
              </p>
            )}
            <p className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">
              {data.notes}
            </p>
          </div>
        )}
        <FullPaidBlock align="center" />
          </>
        )}
      </div>
    );
  }
);
