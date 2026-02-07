"use client";

import { useState } from "react";
import {
  defaultDesign,
  invoiceTemplatePresets,
  type InvoiceData,
  type InvoiceDesign,
  type InvoiceTemplateId,
} from "@/types/invoice";

interface InvoiceDesignPanelProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const layoutOptions: { value: InvoiceDesign["layout"]; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "compact", label: "Compact" },
  { value: "minimal", label: "Minimal" },
  { value: "modern", label: "Modern" },
];

const headerOptions: { value: InvoiceDesign["headerStyle"]; label: string }[] = [
  { value: "logo-left", label: "Logo left" },
  { value: "logo-right", label: "Logo right" },
  { value: "logo-centered", label: "Logo centered" },
];

const tableOptions: { value: InvoiceDesign["tableStyle"]; label: string }[] = [
  { value: "bordered", label: "Bordered" },
  { value: "striped", label: "Striped" },
  { value: "minimal", label: "Minimal" },
];

const fontOptions: { value: InvoiceDesign["fontFamily"]; label: string }[] = [
  { value: "sans", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
];

const densityOptions: { value: InvoiceDesign["density"]; label: string }[] = [
  { value: "spacious", label: "Spacious" },
  { value: "standard", label: "Standard" },
  { value: "compact", label: "Compact" },
];

const borderOptions: { value: InvoiceDesign["borderStyle"]; label: string }[] = [
  { value: "accent", label: "Accent color" },
  { value: "neutral", label: "Neutral" },
  { value: "none", label: "None" },
];

const logoSizeOptions: { value: InvoiceDesign["logoSize"]; label: string }[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

export function InvoiceDesignPanel({ data, onChange }: InvoiceDesignPanelProps) {
  const [open, setOpen] = useState(false);
  const design = { ...defaultDesign, ...data.design };

  const updateDesign = (partial: Partial<InvoiceDesign>) => {
    onChange({
      ...data,
      design: { ...design, ...partial },
    });
  };

  const labelClass = "mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400";
  const currentTemplateId = data.templateId ?? "standard";

  const applyTemplate = (templateId: InvoiceTemplateId) => {
    const preset = invoiceTemplatePresets.find((t) => t.id === templateId);
    if (preset) {
      onChange({
        ...data,
        templateId,
        design: preset.design,
      });
    }
  };

  return (
    <div className="border-t border-neutral-200 pt-8 dark:border-neutral-700">
      {/* Template selector */}
      <div className="mb-6">
        <label className={labelClass}>Template</label>
        <select
          value={currentTemplateId}
          onChange={(e) =>
            applyTemplate(e.target.value as InvoiceTemplateId)
          }
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm font-medium text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        >
          {invoiceTemplatePresets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
        {invoiceTemplatePresets.find((t) => t.id === currentTemplateId)?.description && (
          <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            {
              invoiceTemplatePresets.find((t) => t.id === currentTemplateId)
                ?.description
            }
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Customize design
        </h3>
        <svg
          className={`h-5 w-5 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="mt-6 space-y-6">
          {/* Layout */}
          <div>
            <label className={labelClass}>Layout</label>
            <div className="flex flex-wrap gap-2">
              {layoutOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateDesign({ layout: opt.value })}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    design.layout === opt.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Header style */}
          <div>
            <label className={labelClass}>Header style</label>
            <div className="flex flex-wrap gap-2">
              {headerOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateDesign({ headerStyle: opt.value })}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    design.headerStyle === opt.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table style */}
          <div>
            <label className={labelClass}>Table style</label>
            <div className="flex flex-wrap gap-2">
              {tableOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateDesign({ tableStyle: opt.value })}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    design.tableStyle === opt.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font & density row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Font</label>
              <select
                value={design.fontFamily}
                onChange={(e) =>
                  updateDesign({
                    fontFamily: e.target.value as InvoiceDesign["fontFamily"],
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {fontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Density</label>
              <select
                value={design.density}
                onChange={(e) =>
                  updateDesign({
                    density: e.target.value as InvoiceDesign["density"],
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {densityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Border style & logo size */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Border style</label>
              <select
                value={design.borderStyle}
                onChange={(e) =>
                  updateDesign({
                    borderStyle: e.target.value as InvoiceDesign["borderStyle"],
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {borderOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Logo size</label>
              <select
                value={design.logoSize}
                onChange={(e) =>
                  updateDesign({
                    logoSize: e.target.value as InvoiceDesign["logoSize"],
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {logoSizeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section labels toggle */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={design.showSectionLabels}
              onChange={(e) =>
                updateDesign({ showSectionLabels: e.target.checked })
              }
              className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Show section labels (From, Bill To, Notes)
            </span>
          </label>

          <button
            type="button"
            onClick={() => applyTemplate("standard")}
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            Reset to Standard Template
          </button>
        </div>
      )}
    </div>
  );
}
