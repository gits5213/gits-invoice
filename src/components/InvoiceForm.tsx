"use client";

import { type InvoiceData, type InvoiceLineItem } from "@/types/invoice";
import { extractBrandColors } from "@/lib/colorUtils";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const update = (partial: Partial<InvoiceData>) => {
    onChange({ ...data, ...partial });
  };

  const updateFrom = (partial: Partial<InvoiceData["from"]>) => {
    update({ from: { ...data.from, ...partial } });
  };

  const updateTo = (partial: Partial<InvoiceData["to"]>) => {
    update({ to: { ...data.to, ...partial } });
  };

  const updateItem = (id: string, partial: Partial<InvoiceLineItem>) => {
    const items = data.items.map((item) =>
      item.id === id ? { ...item, ...partial } : item
    );
    items.forEach((item) => {
      item.amount = item.quantity * item.unitPrice;
    });
    update({ items: items });
  };

  const addItem = () => {
    update({
      items: [
        ...data.items,
        {
          id: generateId(),
          description: "",
          quantity: 1,
          unitPrice: 0,
          amount: 0,
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (data.items.length <= 1) return;
    update({ items: data.items.filter((i) => i.id !== id) });
  };

  const accent = data.accentColor ?? "#059669";
  const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-400";

  const labelClass = "mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400";

  return (
    <div className="space-y-8">
      {/* Invoice meta */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Invoice Number</label>
          <input
            type="text"
            value={data.invoiceNumber}
            onChange={(e) => update({ invoiceNumber: e.target.value })}
            className={inputClass}
            placeholder="INV-001"
          />
        </div>
        <div>
          <label className={labelClass}>Invoice Date</label>
          <input
            type="date"
            value={data.invoiceDate}
            onChange={(e) => update({ invoiceDate: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            value={data.dueDate}
            onChange={(e) => update({ dueDate: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>P.O. / S.O. Number (optional)</label>
          <input
            type="text"
            value={data.poNumber ?? ""}
            onChange={(e) => update({ poNumber: e.target.value || undefined })}
            className={inputClass}
            placeholder="e.g. ps20225213isq"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={data.paid !== false}
              onChange={(e) => update({ paid: e.target.checked })}
              className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Mark as Full Paid (shows "FULL PAID" on invoice)
            </span>
          </label>
        </div>
      </div>

      {/* From / To */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            From (Seller)
          </h3>
          <div className="space-y-2">
            {/* Company logo upload */}
            <div>
              <label className={labelClass}>Company Logo</label>
              <div className="flex items-center gap-3">
                {data.logo ? (
                  <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
                    <img
                      src={data.logo}
                      alt="Company logo"
                      className="h-14 w-auto max-w-[120px] object-contain"
                    />
                    <div className="flex flex-col gap-2">
                      {data.accentColor && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            Theme:
                          </span>
                          <input
                            type="color"
                            value={data.accentColor}
                            onChange={(e) =>
                              update({ accentColor: e.target.value })
                            }
                            className="h-7 w-10 cursor-pointer rounded border border-neutral-300 dark:border-neutral-600"
                          />
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {data.accentColor}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2">
                      <label className="cursor-pointer rounded border border-neutral-300 px-2 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-800">
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = async () => {
                                const logo = reader.result as string;
                                try {
                                  const colors = await extractBrandColors(logo);
                                  update({
                                    logo,
                                    accentColor: colors.accent,
                                    secondaryColor: colors.secondary,
                                  });
                                } catch {
                                  update({ logo });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          update({
                            logo: undefined,
                            accentColor: undefined,
                            secondaryColor: undefined,
                          })
                        }
                        className="rounded border border-neutral-300 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-neutral-600 dark:hover:bg-red-900/20"
                      >
                        Remove
                      </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 px-6 py-4 text-center transition hover:border-emerald-500 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:border-emerald-500 dark:hover:bg-neutral-800/50">
                    <svg
                      className="mb-2 h-8 w-8 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Add company logo
                    </span>
                    <span className="mt-1 text-xs text-neutral-500">
                      PNG, JPG up to 2MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = async () => {
                            const logo = reader.result as string;
                            try {
                              const colors = await extractBrandColors(logo);
                              update({
                                logo,
                                accentColor: colors.accent,
                                secondaryColor: colors.secondary,
                              });
                            } catch {
                              update({ logo });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
            <input
              type="text"
              value={data.from.name}
              onChange={(e) => updateFrom({ name: e.target.value })}
              className={inputClass}
              placeholder="Company name"
            />
            <textarea
              value={data.from.address}
              onChange={(e) => updateFrom({ address: e.target.value })}
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Address"
              rows={3}
            />
            <input
              type="email"
              value={data.from.email ?? ""}
              onChange={(e) => updateFrom({ email: e.target.value })}
              className={inputClass}
              placeholder="Email"
            />
            <input
              type="tel"
              value={data.from.phone ?? ""}
              onChange={(e) => updateFrom({ phone: e.target.value })}
              className={inputClass}
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            To (Client)
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              value={data.to.name}
              onChange={(e) => updateTo({ name: e.target.value })}
              className={inputClass}
              placeholder="Client name"
            />
            <textarea
              value={data.to.address}
              onChange={(e) => updateTo({ address: e.target.value })}
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Address"
              rows={3}
            />
            <input
              type="email"
              value={data.to.email ?? ""}
              onChange={(e) => updateTo({ email: e.target.value })}
              className={inputClass}
              placeholder="Email"
            />
            <input
              type="tel"
              value={data.to.phone ?? ""}
              onChange={(e) => updateTo({ phone: e.target.value })}
              className={inputClass}
              placeholder="Phone / Account ID"
            />
          </div>
        </div>
      </div>

      {/* Line items */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Items
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="rounded-lg border px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
            style={{
              backgroundColor: accent,
              borderColor: accent,
            }}
          >
            + Add item
          </button>
        </div>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-end gap-3 rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50"
            >
              <div className="min-w-0 flex-1">
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  className={inputClass}
                  placeholder="Item description"
                />
              </div>
              <div className="w-20">
                <label className={labelClass}>Qty</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, { quantity: Number(e.target.value) })
                  }
                  className={inputClass}
                />
              </div>
              <div className="w-28">
                <label className={labelClass}>Unit Price</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.unitPrice || ""}
                  onChange={(e) =>
                    updateItem(item.id, {
                      unitPrice: Number(e.target.value),
                    })
                  }
                  className={inputClass}
                  placeholder="0.00"
                />
              </div>
              <div className="w-24 text-right text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {((item.quantity * item.unitPrice) || 0).toFixed(2)}
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                disabled={data.items.length <= 1}
                className="rounded p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 disabled:opacity-40 dark:hover:bg-neutral-700"
                aria-label="Remove item"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & notes */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tax rate (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={data.taxRate ?? 0}
            onChange={(e) => update({ taxRate: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Currency</label>
          <input
            type="text"
            value={data.currency ?? "USD"}
            onChange={(e) => update({ currency: e.target.value })}
            className={inputClass}
            placeholder="USD"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Notes</label>
          <textarea
            value={data.notes ?? ""}
            onChange={(e) => update({ notes: e.target.value })}
            className={`${inputClass} min-h-[60px] resize-y`}
            placeholder="Payment terms, bank details, etc."
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}
