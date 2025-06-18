
import { Button } from "@/components/ui/button";
import { Download, Mail, AlertCircle, CheckCircle, FileDown } from "lucide-react";

interface Invoice {
  id: string;
  status: "paid" | "pending" | "overdue";
}

interface MassActionToolbarProps {
  selectedInvoices: string[];
  invoices: Invoice[];
  onConfirmAction: (type: string, title: string, description: string, action: () => void) => void;
  onBulkDownload: () => void;
  onBulkReminders: () => void;
  onBulkDunning: () => void;
  onBulkMarkPaid: () => void;
  onBulkExport: () => void;
}

export const MassActionToolbar = ({
  selectedInvoices,
  invoices,
  onConfirmAction,
  onBulkDownload,
  onBulkReminders,
  onBulkDunning,
  onBulkMarkPaid,
  onBulkExport
}: MassActionToolbarProps) => {
  if (selectedInvoices.length === 0) return null;

  const hasPendingInvoices = selectedInvoices.some(id => 
    invoices.find(inv => inv.id === id)?.status === 'pending'
  );

  const hasOverdueInvoices = selectedInvoices.some(id => 
    invoices.find(inv => inv.id === id)?.status === 'overdue'
  );

  const hasUnpaidInvoices = selectedInvoices.some(id => 
    invoices.find(inv => inv.id === id)?.status !== 'paid'
  );

  return (
    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {selectedInvoices.length} Rechnung{selectedInvoices.length !== 1 ? 'en' : ''} ausgewählt
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onConfirmAction(
              'download',
              'Massendownload',
              `Möchten Sie ${selectedInvoices.length} Rechnung${selectedInvoices.length !== 1 ? 'en' : ''} als ZIP herunterladen?`,
              onBulkDownload
            )}
            className="text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Alle herunterladen
          </Button>
          
          {hasPendingInvoices && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onConfirmAction(
                'reminders',
                'Erinnerungen versenden',
                `Möchten Sie Erinnerungen für alle ausstehenden Rechnungen versenden?`,
                onBulkReminders
              )}
              className="text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Erinnerungen
            </Button>
          )}
          
          {hasOverdueInvoices && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onConfirmAction(
                'dunning',
                'Mahnungen versenden',
                `Möchten Sie Mahnungen für alle überfälligen Rechnungen versenden?`,
                onBulkDunning
              )}
              className="text-xs"
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              Mahnungen
            </Button>
          )}
          
          {hasUnpaidInvoices && (
            <Button
              size="sm"
              onClick={() => onConfirmAction(
                'markPaid',
                'Als bezahlt markieren',
                `Möchten Sie ${selectedInvoices.filter(id => invoices.find(inv => inv.id === id)?.status !== 'paid').length} Rechnung${selectedInvoices.filter(id => invoices.find(inv => inv.id === id)?.status !== 'paid').length !== 1 ? 'en' : ''} als bezahlt markieren?`,
                onBulkMarkPaid
              )}
              className="text-xs"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Als bezahlt markieren
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onConfirmAction(
              'export',
              'Export',
              `Möchten Sie ${selectedInvoices.length} Rechnung${selectedInvoices.length !== 1 ? 'en' : ''} als Excel exportieren?`,
              onBulkExport
            )}
            className="text-xs"
          >
            <FileDown className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
