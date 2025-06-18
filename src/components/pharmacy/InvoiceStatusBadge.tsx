
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface InvoiceStatusBadgeProps {
  status: "paid" | "pending" | "overdue";
}

export const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => {
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
