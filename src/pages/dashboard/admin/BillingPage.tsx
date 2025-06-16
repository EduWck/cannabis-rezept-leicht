
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Euro, Download, Eye, FileText } from "lucide-react";

const BillingPage = () => {
  // Mock billing data
  const billingData = [
    {
      id: "INV-2023-001",
      pharmacyName: "Apotheke Hamburg",
      amount: 1250.80,
      status: "paid",
      date: "2023-12-15",
      dueDate: "2023-12-30"
    },
    {
      id: "INV-2023-002",
      pharmacyName: "Apotheke München",
      amount: 2340.50,
      status: "pending",
      date: "2023-12-14",
      dueDate: "2023-12-29"
    },
    {
      id: "INV-2023-003",
      pharmacyName: "Apotheke Berlin Mitte",
      amount: 890.25,
      status: "overdue",
      date: "2023-12-10",
      dueDate: "2023-12-25"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-500">Bezahlt</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Ausstehend</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Überfällig</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Rechnungsverwaltung</h1>
        
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gesamtumsatz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">€ 4.481,55</div>
                <Euro className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ausstehend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">€ 2.340,50</div>
                <FileText className="h-5 w-5 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Überfällig</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">€ 890,25</div>
                <FileText className="h-5 w-5 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bezahlt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">€ 1.250,80</div>
                <FileText className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Billing Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Euro className="w-5 h-5 mr-2" />
              Rechnungen
            </span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </CardTitle>
          <CardDescription>
            Übersicht aller Rechnungen und Zahlungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rechnungs-Nr.</TableHead>
                <TableHead>Apotheke</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Fällig</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingData.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.pharmacyName}</TableCell>
                  <TableCell>€ {bill.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(bill.status)}</TableCell>
                  <TableCell>{new Date(bill.date).toLocaleDateString('de-DE')}</TableCell>
                  <TableCell>{new Date(bill.dueDate).toLocaleDateString('de-DE')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;
