import { Button } from "@/components/ui/button";
import {
  InvoiceData,
  formatCurrency,
  formatDate,
  PACKAGE_DESCRIPTIONS,
} from "@/lib/invoice";
import { Download, Printer } from "lucide-react";
import { useRef } from "react";
import BrandLogo from "@/components/BrandLogo";

interface InvoiceDisplayProps {
  invoice: InvoiceData;
  onPrint?: () => void;
  onDownload?: () => void;
  selectedScope?: string[];
}

const COMPANY_ADDRESS =
  "Plot no.102, 103, Temple Lane, Mythri Nagar, Mathrusri Nagar, Madinaguda, Serilingampally, K.V.Rangareddy-500049, Telangana, India";

export default function InvoiceDisplay({
  invoice,
  onPrint,
  onDownload,
  selectedScope = [],
}: InvoiceDisplayProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const invoicePage = useRef<HTMLDivElement>(null);
  const scopePage = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=900");
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${invoice.invoiceNumber}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .invoice-container {
                background-color: white;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .invoice-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                border-bottom: 2px solid #f0a000;
                padding-bottom: 20px;
              }
              .company-info h1 {
                margin: 0;
                color: #f0a000;
                font-size: 28px;
              }
              .invoice-number {
                text-align: right;
              }
              .invoice-number h2 {
                margin: 0;
                color: #333;
                font-size: 14px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #f5f5f5;
                font-weight: bold;
                color: #333;
              }
              .amount-column {
                text-align: right;
              }
              .total-section {
                margin-top: 20px;
                display: flex;
                justify-content: flex-end;
              }
              .total-row {
                width: 300px;
              }
              .total-row div {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
              }
              .total-row .grand-total {
                border-bottom: 2px solid #f0a000;
                border-top: 2px solid #f0a000;
                font-weight: bold;
                font-size: 16px;
                background-color: #f9f9f9;
              }
              .client-info {
                display: flex;
                justify-content: space-between;
                margin: 30px 0;
              }
              .client-details, .terms {
                flex: 1;
              }
              .client-details h3, .terms h3 {
                margin: 0 0 10px 0;
                color: #333;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
              }
              .client-details p, .terms p {
                margin: 5px 0;
                font-size: 13px;
              }
              .features {
                margin-top: 20px;
                padding: 15px;
                background-color: #f9f9f9;
                border-left: 4px solid #f0a000;
              }
              .features h3 {
                margin: 0 0 10px 0;
                color: #333;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
              }
              .features ul {
                margin: 0;
                padding-left: 20px;
              }
              .features li {
                font-size: 12px;
                margin: 5px 0;
              }
              @media print {
                body {
                  background-color: white;
                }
                .invoice-container {
                  box-shadow: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const html2pdf = (await import("html2pdf.js")).default;

      // Create a container with both pages
      const container = document.createElement("div");

      // Page 1: Invoice
      if (invoicePage.current) {
        const invoiceClone = invoicePage.current.cloneNode(true) as HTMLElement;
        container.appendChild(invoiceClone);
      }

      // Page 2: Scope (with page break)
      if (selectedScope.length > 0 && scopePage.current) {
        const pageBreak = document.createElement("div");
        pageBreak.style.pageBreakBefore = "always";
        pageBreak.style.breakBefore = "page";
        container.appendChild(pageBreak);

        const scopeClone = scopePage.current.cloneNode(true) as HTMLElement;
        container.appendChild(scopeClone);
      }

      const options = {
        margin: 10,
        filename: `${invoice.invoiceNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(options).from(container).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const packageFeatures = PACKAGE_DESCRIPTIONS[invoice.packageName] || [];

  return (
    <div>
      <div className="mb-6 flex gap-3 flex-wrap">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2"
          aria-label="Print invoice"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </Button>
        <Button
          onClick={handleDownloadPDF}
          className="gap-2"
          aria-label="Download invoice as PDF"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        {onDownload && (
          <Button
            onClick={onDownload}
            className="gap-2"
            aria-label="Download invoice"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </Button>
        )}
      </div>

      {/* Invoice Page - Page 1 */}
      <div
        ref={invoicePage}
        className="bg-white rounded-lg shadow-lg p-10 max-w-3xl mx-auto mb-8"
      >
        {/* Header with Logo and Company Info */}
        <div className="flex justify-between items-start mb-12 border-b-2 border-gold-500 pb-6">
          <div className="flex items-start gap-4">
            <BrandLogo className="h-12 w-auto" alt="Axisphere Logo" />
            <div>
              <h1 className="text-3xl font-bold text-gold-600">Axisphere</h1>
              <p className="text-sm text-gray-600 mt-2">
                Axisphere Media Worx LLP
              </p>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                {COMPANY_ADDRESS}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Invoice Number:</span>{" "}
              {invoice.invoiceNumber}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(invoice.invoiceDate)}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <span className="font-semibold">Due Date:</span>{" "}
              {formatDate(invoice.dueDate)}
            </p>
          </div>
        </div>

        {/* Bill To and Payment Terms */}
        <div className="flex justify-between mb-12">
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Bill To
            </h3>
            <p className="text-sm font-semibold text-gray-800">
              {invoice.clientName}
            </p>
            {invoice.clientCompany && (
              <p className="text-sm text-gray-600">{invoice.clientCompany}</p>
            )}
            {invoice.clientEmail && (
              <p className="text-xs text-gray-500">{invoice.clientEmail}</p>
            )}
            {invoice.clientPhone && (
              <p className="text-xs text-gray-500">{invoice.clientPhone}</p>
            )}
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Payment Terms
            </h3>
            <p className="text-xs text-gray-600">Due within 30 days</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                Description
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-800">
                Qty
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-800">
                Rate
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-800">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4 text-sm text-gray-700">
                  {item.description}
                </td>
                <td className="text-center py-3 px-4 text-sm text-gray-700">
                  {item.quantity}
                </td>
                <td className="text-right py-3 px-4 text-sm text-gray-700">
                  {formatCurrency(item.rate)}
                </td>
                <td className="text-right py-3 px-4 text-sm font-semibold text-gray-800">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm text-gray-700 border-b border-gray-300">
              <span>Subtotal:</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-gray-700 border-b border-gray-300">
              <span>Tax (18% GST):</span>
              <span>{formatCurrency(invoice.tax)}</span>
            </div>
            <div className="flex justify-between py-3 text-base font-bold bg-gray-100 px-4 rounded-lg border-t-2 border-gold-500">
              <span>Total Amount Due:</span>
              <span className="text-gold-600">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {invoice.notes && (
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
              Notes
            </h3>
            <p className="text-xs text-gray-700">{invoice.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-gray-300 text-center text-xs text-gray-500">
          <p>
            Thank you for your business! For inquiries, contact
            hello@ai-marketing.studio
          </p>
        </div>
      </div>

      {/* Scope/Features Page - Page 2 */}
      {selectedScope.length > 0 && (
        <div
          ref={scopePage}
          className="bg-white rounded-lg shadow-lg p-10 max-w-3xl mx-auto"
        >
          {/* Header with Logo */}
          <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-gold-500">
            <BrandLogo className="h-12 w-auto" alt="Axisphere Logo" />
            <div>
              <h1 className="text-3xl font-bold text-gold-600">Axisphere</h1>
              <p className="text-sm text-gray-600 mt-2">
                Axisphere Media Worx LLP
              </p>
            </div>
          </div>

          {/* Scope Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Project Scope & Features
            </h2>
            <p className="text-sm text-gray-600">
              Invoice Number: <span className="font-semibold">{invoice.invoiceNumber}</span>
            </p>
          </div>

          {/* Client Info */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Client:</span> {invoice.clientName}
            </p>
            {invoice.clientCompany && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Company:</span>{" "}
                {invoice.clientCompany}
              </p>
            )}
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold">Package:</span>{" "}
              {invoice.packageName}
            </p>
          </div>

          {/* Features List */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Included Features
            </h3>
            <div className="bg-gray-50 border-l-4 border-gold-500 p-6 rounded-lg">
              <ul className="space-y-3">
                {selectedScope.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-gold-600 font-bold mt-1">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Total Features Included:</span>{" "}
              {selectedScope.length}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-300 text-center text-xs text-gray-500">
            <p>
              Thank you for your business! For inquiries, contact
              hello@ai-marketing.studio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
