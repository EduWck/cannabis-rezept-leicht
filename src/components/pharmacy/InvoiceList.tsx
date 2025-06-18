
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { InvoiceListItem } from "./InvoiceListItem";

interface Invoice {
  id: string;
  invoiceNumber: string;
  orderIds: string[];
  amount: number;
  status: "paid" | "pending" | "overdue";
  issueDate: string;
  dueDate: string;
  customerName: string;
  description: string;
  downloadUrl?: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
  selectedInvoices: string[];
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectInvoice: (invoiceId: string, checked: boolean) => void;
  onDownload: (invoice: Invoice) => void;
}

export const InvoiceList = ({
  invoices,
  selectedInvoices,
  isAllSelected,
  isPartiallySelected,
  onSelectAll,
  onSelectInvoice,
  onDownload
}: InvoiceListProps) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Keine Rechnungen gefunden</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Master Checkbox */}
      <div className="flex items-center gap-3 p-3 border-b">
        <Checkbox
          checked={isAllSelected || isPartiallySelected}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm font-medium text-muted-foreground">
          {isAllSelected ? 'Alle abwählen' : 'Alle auswählen'}
        </span>
      </div>

      {/* Invoice Items */}
      {invoices.map((invoice) => (
        <InvoiceListItem
          key={invoice.id}
          invoice={invoice}
          isSelected={selectedInvoices.includes(invoice.id)}
          onSelectChange={onSelectInvoice}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};
