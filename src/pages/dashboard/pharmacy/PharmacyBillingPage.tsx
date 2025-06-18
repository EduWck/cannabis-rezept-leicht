
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  Search,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
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
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4">
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
    </div>
  );
};

export default PharmacyBillingPage;
