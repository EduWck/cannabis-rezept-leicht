
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

interface StatsData {
  totalRevenue: number;
  pendingAmount: number;
  paidInvoices: number;
  overdueInvoices: number;
}

interface PharmacyBillingStatsProps {
  stats: StatsData;
}

export const PharmacyBillingStats = ({ stats }: PharmacyBillingStatsProps) => {
  return (
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
  );
};
