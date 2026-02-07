"use client";

import { useRef, useState } from "react";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoiceDesignPanel } from "@/components/InvoiceDesignPanel";
import { InvoiceActions, InvoiceActionButtons } from "@/components/InvoiceActions";
import {
  defaultInvoiceData,
  type InvoiceData,
} from "@/types/invoice";

export default function Home() {
  const [data, setData] = useState<InvoiceData>(defaultInvoiceData);
  const invoiceRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
            Invoice Generator
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Enter your invoice details, then print or download as PDF
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Form section */}
          <section className="no-print">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
              <h2 className="mb-6 text-lg font-semibold text-neutral-900 dark:text-white">
                Invoice Details
              </h2>
              <InvoiceForm data={data} onChange={setData} />
              <InvoiceDesignPanel data={data} onChange={setData} />
            </div>
          </section>

          {/* Preview */}
          <section>
            <div className="lg:sticky lg:top-8">
              <h2 className="no-print mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Preview
              </h2>
              <InvoiceActions data={data} invoiceRef={invoiceRef} />
            </div>
          </section>
        </div>
      </main>

      {/* Footer with Print & Download PDF */}
      <footer className="no-print mt-16 border-t border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InvoiceActionButtons data={data} invoiceRef={invoiceRef} />
          <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            gits-invoice — Create, print & download invoices
          </p>
        </div>
      </footer>
    </div>
  );
}
