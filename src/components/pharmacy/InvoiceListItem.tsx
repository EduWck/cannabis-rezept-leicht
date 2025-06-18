
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { toast } from "@/hooks/use-toast";

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

interface InvoiceListItemProps {
  invoice: Invoice;
  isSelected: boolean;
  onSelectChange: (invoiceId: string, checked: boolean) => void;
  onDownload: (invoice: Invoice) => void;
}

export const InvoiceListItem = ({
  invoice,
  isSelected,
  onSelectChange,
  onDownload
}: InvoiceListItemProps) => {
  const handleSendReminder = () => {
    toast({
      title: "Zahlungserinnerung",
      description: `Erinnerung für Rechnung ${invoice.invoiceNumber} versendet.`,
    });
  };

  const handleSendDunning = () => {
    toast({
      title: "Mahnung",
      description: `Mahnung für Rechnung ${invoice.invoiceNumber} versendet.`,
    });
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectChange(invoice.id, checked as boolean)}
          className="mt-1"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium">{invoice.invoiceNumber}</p>
                <InvoiceStatusBadge status={invoice.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                Kunde: {invoice.customerName}
              </p>
              <p className="text-sm text-muted-foreground">
                Bestellungen: {invoice.orderIds.join(", ")}
              </p>
              <p className="text-sm text-muted-foreground">
                Ausgestellt: {new Date(invoice.issueDate).toLocaleDateString('de-DE')} • 
                Fällig: {new Date(invoice.dueDate).toLocaleDateString('de-DE')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{invoice.amount.toFixed(2)} €</p>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-sm text-muted-foreground">{invoice.description}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onDownload(invoice)}
            >
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
            
            {invoice.status === 'pending' && (
              <Button 
                size="sm"
                onClick={handleSendReminder}
              >
                Erinnerung senden
              </Button>
            )}
            
            {invoice.status === 'overdue' && (
              <Button 
                size="sm"
                variant="destructive"
                onClick={handleSendDunning}
              >
                Mahnung senden
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
