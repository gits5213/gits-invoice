"use client";

import React, { useRef, type RefObject } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { type InvoiceData } from "@/types/invoice";
import { InvoiceTemplate } from "./InvoiceTemplate";

interface InvoiceActionsProps {
  data: InvoiceData;
  invoiceRef?: RefObject<HTMLDivElement | null>;
}

export function InvoiceActions({ data, invoiceRef: externalRef }: InvoiceActionsProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const invoiceRef = externalRef ?? internalRef;

  return (
    <div className="space-y-6">
      <div className="bg-neutral-100/50 dark:bg-neutral-800/30">
        <InvoiceTemplate ref={invoiceRef as React.RefObject<HTMLDivElement>} data={data} />
      </div>
    </div>
  );
}

interface InvoiceActionButtonsProps {
  data: InvoiceData;
  invoiceRef: RefObject<HTMLDivElement | null>;
}

export function InvoiceActionButtons({ data, invoiceRef }: InvoiceActionButtonsProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${data.invoiceNumber}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try printing instead.");
    }
  };

  return (
    <div className="no-print flex flex-wrap justify-center gap-3">
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print
      </button>
      <button
        onClick={handleDownloadPDF}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </button>
    </div>
  );
}
