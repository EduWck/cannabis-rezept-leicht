import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Download, 
  Search,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  FileDown,
  Archive,
  Filter,
  X
} from "lucide-react";
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

const PharmacyBillingPage = () => {
  const navigate = useNavigate();
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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Bezahlt
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Ausstehend
          </Badge>
        );
      case 'overdue':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="w-3 h-3 mr-1" />
            Überfällig
          </Badge>
        );
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

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
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gesamtumsatz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} €</div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Diesen Monat</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Offene Beträge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.pendingAmount.toFixed(2)} €</div>
                <DollarSign className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Noch zu erhalten</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bezahlte Rechnungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.paidInvoices}</div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Diesen Monat</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Überfällige Rechnungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.overdueInvoices}</div>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Benötigen Aufmerksamkeit</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Rechnungen
            </span>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechnungen suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="paid">Bezahlt</SelectItem>
                  <SelectItem value="pending">Ausstehend</SelectItem>
                  <SelectItem value="overdue">Überfällig</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardDescription>Übersicht aller Rechnungen</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Quick Selection Bar */}
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickSelect('overdue')}
              className="text-xs"
            >
              <Filter className="w-3 h-3 mr-1" />
              Alle Überfälligen
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickSelect('pending')}
              className="text-xs"
            >
              <Filter className="w-3 h-3 mr-1" />
              Alle Ausstehenden
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickSelect('paid')}
              className="text-xs"
            >
              <Filter className="w-3 h-3 mr-1" />
              Alle Bezahlten
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickSelect('clear')}
              className="text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Auswahl löschen
            </Button>
          </div>

          {/* Mass Action Toolbar */}
          {selectedInvoices.length > 0 && (
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
                    onClick={() => confirmMassAction(
                      'download',
                      'Massendownload',
                      `Möchten Sie ${selectedInvoices.length} Rechnung${selectedInvoices.length !== 1 ? 'en' : ''} als ZIP herunterladen?`,
                      handleBulkDownload
                    )}
                    className="text-xs"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Alle herunterladen
                  </Button>
                  
                  {selectedInvoices.some(id => invoices.find(inv => inv.id === id)?.status === 'pending') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => confirmMassAction(
                        'reminders',
                        'Erinnerungen versenden',
                        `Möchten Sie Erinnerungen für alle ausstehenden Rechnungen versenden?`,
                        handleBulkReminders
                      )}
                      className="text-xs"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Erinnerungen
                    </Button>
                  )}
                  
                  {selectedInvoices.some(id => invoices.find(inv => inv.id === id)?.status === 'overdue') && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => confirmMassAction(
                        'dunning',
                        'Mahnungen versenden',
                        `Möchten Sie Mahnungen für alle überfälligen Rechnungen versenden?`,
                        handleBulkDunning
                      )}
                      className="text-xs"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Mahnungen
                    </Button>
                  )}
                  
                  {selectedInvoices.some(id => invoices.find(inv => inv.id === id)?.status !== 'paid') && (
                    <Button
                      size="sm"
                      onClick={() => confirmMassAction(
                        'markPaid',
                        'Als bezahlt markieren',
                        `Möchten Sie ${selectedInvoices.filter(id => invoices.find(inv => inv.id === id)?.status !== 'paid').length} Rechnung${selectedInvoices.filter(id => invoices.find(inv => inv.id === id)?.status !== 'paid').length !== 1 ? 'en' : ''} als bezahlt markieren?`,
                        handleBulkMarkPaid
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
                    onClick={() => confirmMassAction(
                      'export',
                      'Export',
                      `Möchten Sie ${selectedInvoices.length} Rechnung${selectedInvoices.length !== 1 ? 'en' : ''} als Excel exportieren?`,
                      handleBulkExport
                    )}
                    className="text-xs"
                  >
                    <FileDown className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Invoice List with Checkboxes */}
          <div className="space-y-4">
            {/* Header with Master Checkbox */}
            {filteredInvoices.length > 0 && (
              <div className="flex items-center gap-3 p-3 border-b">
                <Checkbox
                  checked={isAllSelected || isPartiallySelected}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium text-muted-foreground">
                  {isAllSelected ? 'Alle abwählen' : 'Alle auswählen'}
                </span>
              </div>
            )}

            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={(checked) => handleSelectInvoice(invoice.id, checked as boolean)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                          {getStatusBadge(invoice.status)}
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
                        onClick={() => handleDownload(invoice)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      
                      {invoice.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => toast({
                            title: "Zahlungserinnerung",
                            description: `Erinnerung für Rechnung ${invoice.invoiceNumber} versendet.`,
                          })}
                        >
                          Erinnerung senden
                        </Button>
                      )}
                      
                      {invoice.status === 'overdue' && (
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => toast({
                            title: "Mahnung",
                            description: `Mahnung für Rechnung ${invoice.invoiceNumber} versendet.`,
                          })}
                        >
                          Mahnung senden
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Keine Rechnungen gefunden</p>
            </div>
          )}
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
