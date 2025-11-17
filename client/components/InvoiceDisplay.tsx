import { Button } from "@/components/ui/button";
import {
  InvoiceData,
  formatCurrency,
  formatDate,
  PACKAGE_DESCRIPTIONS,
} from "@/lib/invoice";
import { Download, Printer } from "lucide-react";
import { useRef } from "react";

interface InvoiceDisplayProps {
  invoice: InvoiceData;
  onPrint?: () => void;
  onDownload?: () => void;
}

export default function InvoiceDisplay({
  invoice,
  onPrint,
  onDownload,
}: InvoiceDisplayProps) {
  const printRef = useRef<HTMLDivElement>(null);

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

  const packageFeatures = PACKAGE_DESCRIPTIONS[invoice.packageName] || [];

  return (
    <div>
      <div className="mb-6 flex gap-3">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2"
          aria-label="Print invoice"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
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

      <div
        ref={printRef}
        className="bg-white rounded-lg shadow-lg p-10 max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-start mb-12 border-b-2 border-gold-500 pb-6">
          <div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fa31d1200efef4b74975fb36c4890f8c1%2Fbecb7a0855134344b5adf3fe9fcd377e?format=webp&width=800"
              alt="Axisphere Logo"
              className="h-16 w-auto mb-2"
            />
            <p className="text-sm text-gray-600">
              Axisphere Media Worx LLP
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Bengaluru, Karnataka, India
            </p>
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

        {packageFeatures.length > 0 && (
          <div className="bg-gray-50 border-l-4 border-gold-500 p-4 mb-8">
            <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Package Includes
            </h3>
            <ul className="space-y-1">
              {packageFeatures.slice(0, 5).map((feature, index) => (
                <li key={index} className="text-xs text-gray-700">
                  • {feature}
                </li>
              ))}
              {packageFeatures.length > 5 && (
                <li className="text-xs text-gray-600 italic mt-2">
                  + {packageFeatures.length - 5} more features...
                </li>
              )}
            </ul>
          </div>
        )}

        {invoice.notes && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
              Notes
            </h3>
            <p className="text-xs text-gray-700">{invoice.notes}</p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t-2 border-gray-300 text-center text-xs text-gray-500">
          <p>
            Thank you for your business! For inquiries, contact
            hello@ai-marketing.studio
          </p>
        </div>
      </div>
    </div>
  );
}
