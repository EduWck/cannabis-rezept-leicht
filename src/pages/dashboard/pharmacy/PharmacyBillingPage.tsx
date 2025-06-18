
import { useState } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PharmacyBillingStats } from "@/components/pharmacy/PharmacyBillingStats";
import { InvoiceListHeader } from "@/components/pharmacy/InvoiceListHeader";
import { QuickSelectionBar } from "@/components/pharmacy/QuickSelectionBar";
import { MassActionToolbar } from "@/components/pharmacy/MassActionToolbar";
import { InvoiceList } from "@/components/pharmacy/InvoiceList";

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

const PharmacyBillingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: string;
    title: string;
    description: string;
    action: () => void;
  } | null>(null);

  // Mock data
  const stats = {
    totalRevenue: 15420.50,
    pendingAmount: 2340.80,
    paidInvoices: 34,
    overdueInvoices: 3
  };

  const invoices: Invoice[] = [
    {
      id: "INV-2023-001",
      invoiceNumber: "RG-2023-001",
      orderIds: ["ORD-2023-001", "ORD-2023-002"],
      amount: 234.84,
      status: "paid",
      issueDate: "2023-05-20",
      dueDate: "2023-06-19",
      customerName: "Max Mustermann",
      description: "Cannabisblüte THC18 + THC Extrakt 25%",
      downloadUrl: "/invoices/RG-2023-001.pdf"
    },
    {
      id: "INV-2023-002",
      invoiceNumber: "RG-2023-002",
      orderIds: ["ORD-2023-003"],
      amount: 104.93,
      status: "pending",
      issueDate: "2023-05-19",
      dueDate: "2023-06-18",
      customerName: "Julia Weber",
      description: "Cannabisblüte THC18 + CBD Extrakt 15%",
      downloadUrl: "/invoices/RG-2023-002.pdf"
    },
    {
      id: "INV-2023-003",
      invoiceNumber: "RG-2023-003",
      orderIds: ["ORD-2023-004"],
      amount: 189.95,
      status: "overdue",
      issueDate: "2023-05-15",
      dueDate: "2023-06-14",
      customerName: "Peter Schmidt",
      description: "Cannabisblüte THC22",
      downloadUrl: "/invoices/RG-2023-003.pdf"
    },
    {
      id: "INV-2023-004",
      invoiceNumber: "RG-2023-004",
      orderIds: ["ORD-2023-005"],
      amount: 74.95,
      status: "paid",
      issueDate: "2023-05-18",
      dueDate: "2023-06-17",
      customerName: "Anna Schmidt",
      description: "Cannabisblüte THC22",
      downloadUrl: "/invoices/RG-2023-004.pdf"
    }
  ];

  const handleDownload = (invoice: Invoice) => {
    toast({
      title: "Download gestartet",
      description: `Rechnung ${invoice.invoiceNumber} wird heruntergeladen.`,
    });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.orderIds.some(orderId => orderId.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Mass action functions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices(prev => [...prev, invoiceId]);
    } else {
      setSelectedInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const handleQuickSelect = (type: string) => {
    switch(type) {
      case 'overdue':
        setSelectedInvoices(filteredInvoices.filter(inv => inv.status === 'overdue').map(inv => inv.id));
        break;
      case 'pending':
        setSelectedInvoices(filteredInvoices.filter(inv => inv.status === 'pending').map(inv => inv.id));
        break;
      case 'paid':
        setSelectedInvoices(filteredInvoices.filter(inv => inv.status === 'paid').map(inv => inv.id));
        break;
      case 'clear':
        setSelectedInvoices([]);
        break;
    }
  };

  const confirmMassAction = (type: string, title: string, description: string, action: () => void) => {
    setConfirmAction({ type, title, description, action });
    setIsConfirmDialogOpen(true);
  };

  const executeMassAction = () => {
    if (confirmAction) {
      confirmAction.action();
      setIsConfirmDialogOpen(false);
      setConfirmAction(null);
    }
  };

  const handleBulkDownload = () => {
    const selectedCount = selectedInvoices.length;
    toast({
      title: "Massendownload gestartet",
      description: `${selectedCount} Rechnungen werden als ZIP heruntergeladen.`,
    });
    setSelectedInvoices([]);
  };

  const handleBulkReminders = () => {
    const pendingSelected = selectedInvoices.filter(id => 
      invoices.find(inv => inv.id === id)?.status === 'pending'
    );
    toast({
      title: "Erinnerungen versendet",
      description: `${pendingSelected.length} Erinnerungen wurden versendet.`,
    });
    setSelectedInvoices([]);
  };

  const handleBulkDunning = () => {
    const overdueSelected = selectedInvoices.filter(id => 
      invoices.find(inv => inv.id === id)?.status === 'overdue'
    );
    toast({
      title: "Mahnungen versendet",
      description: `${overdueSelected.length} Mahnungen wurden versendet.`,
    });
    setSelectedInvoices([]);
  };

  const handleBulkMarkPaid = () => {
    const unpaidSelected = selectedInvoices.filter(id => 
      invoices.find(inv => inv.id === id)?.status !== 'paid'
    );
    toast({
      title: "Status aktualisiert",
      description: `${unpaidSelected.length} Rechnungen wurden als bezahlt markiert.`,
    });
    setSelectedInvoices([]);
  };

  const handleBulkExport = () => {
    const selectedCount = selectedInvoices.length;
    toast({
      title: "Export gestartet",
      description: `${selectedCount} Rechnungen werden als Excel exportiert.`,
    });
    setSelectedInvoices([]);
  };

  const isAllSelected = filteredInvoices.length > 0 && selectedInvoices.length === filteredInvoices.length;
  const isPartiallySelected = selectedInvoices.length > 0 && selectedInvoices.length < filteredInvoices.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Rechnungsübersicht</h1>
        
        <PharmacyBillingStats stats={stats} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Rechnungen
            </span>
            <InvoiceListHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </CardTitle>
          <CardDescription>Übersicht aller Rechnungen</CardDescription>
        </CardHeader>
        <CardContent>
          <QuickSelectionBar onQuickSelect={handleQuickSelect} />

          <MassActionToolbar
            selectedInvoices={selectedInvoices}
            invoices={invoices}
            onConfirmAction={confirmMassAction}
            onBulkDownload={handleBulkDownload}
            onBulkReminders={handleBulkReminders}
            onBulkDunning={handleBulkDunning}
            onBulkMarkPaid={handleBulkMarkPaid}
            onBulkExport={handleBulkExport}
          />

          <InvoiceList
            invoices={filteredInvoices}
            selectedInvoices={selectedInvoices}
            isAllSelected={isAllSelected}
            isPartiallySelected={isPartiallySelected}
            onSelectAll={handleSelectAll}
            onSelectInvoice={handleSelectInvoice}
            onDownload={handleDownload}
          />
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmAction?.title}</DialogTitle>
            <DialogDescription>
              {confirmAction?.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={executeMassAction}>
              Bestätigen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PharmacyBillingPage;
