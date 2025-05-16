
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { Loader2, ShoppingCart, PackageOpen, Truck, Check, AlertCircle, FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TableHead, TableHeader } from "@/components/ui/table";
import { useDbQuery } from "@/hooks/use-database";

// Extended type with prescription
type OrderWithPrescription = Order & {
  prescription?: {
    id: string;
    symptoms: string[] | null;
  };
};

const OrdersPage = () => {
  const { user } = useAuth();
  const { loading, data: orders, executeQuery } = useDbQuery<OrderWithPrescription>();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      
      // Mock data for orders when user exists
      const mockData: OrderWithPrescription[] = [
        {
          id: "order1",
          patient_id: user.id,
          prescription_id: "1",
          status: "pending",
          total_amount: 49.99,
          shipping_address: {
            street: "Hauptstr. 123",
            postal_code: "10115",
            city: "Berlin",
            country: "Germany"
          },
          invoice_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          prescription: {
            id: "1",
            symptoms: ["Chronic Pain", "Insomnia"]
          }
        },
        {
          id: "order2",
          patient_id: user.id,
          prescription_id: "2",
          status: "shipped",
          total_amount: 89.99,
          shipping_address: {
            street: "Friedrichstr. 45",
            postal_code: "10117",
            city: "Berlin",
            country: "Germany"
          },
          invoice_url: "https://example.com/invoice/order2.pdf",
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          prescription: {
            id: "2",
            symptoms: ["Anxiety", "Stress"]
          }
        },
        {
          id: "order3",
          patient_id: user.id,
          prescription_id: "3",
          status: "delivered",
          total_amount: 69.99,
          shipping_address: {
            street: "Alexanderplatz 1",
            postal_code: "10178",
            city: "Berlin",
            country: "Germany"
          },
          invoice_url: "https://example.com/invoice/order3.pdf",
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          prescription: {
            id: "3",
            symptoms: ["Depression"]
          }
        }
      ];
      
      // Pass mock data directly (the hook now accepts arrays directly)
      await executeQuery(mockData, {
        errorTitle: "Fehler",
        errorMessage: "Bestellungen konnten nicht geladen werden. Bitte versuchen Sie es später erneut."
      });
    };
    
    if (user?.id) {
      fetchOrders();
    }
  }, [user, executeQuery]);

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Ausstehend",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          icon: <AlertCircle className="h-4 w-4" />,
        };
      case "processing":
        return {
          label: "In Bearbeitung",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
          icon: <PackageOpen className="h-4 w-4" />,
        };
      case "shipped":
        return {
          label: "Versendet",
          color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
          icon: <Truck className="h-4 w-4" />,
        };
      case "delivered":
        return {
          label: "Geliefert",
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          icon: <Check className="h-4 w-4" />,
        };
      case "cancelled":
        return {
          label: "Storniert",
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          icon: <AlertCircle className="h-4 w-4" />,
        };
      default:
        return {
          label: "Unbekannt",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
          icon: null,
        };
    }
  };

  const formatAddress = (address: any) => {
    if (!address) return "Keine Adresse angegeben";
    return `${address.street}, ${address.postal_code} ${address.city}, ${address.country}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meine Bestellungen</h1>
        <Link to="/dashboard/prescriptions">
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Zu meinen Rezepten
          </Button>
        </Link>
      </div>
      
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">Keine Bestellungen gefunden</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Sie haben noch keine Bestellungen aufgegeben. Gehen Sie zu Ihren Rezepten, 
              um eine Bestellung zu starten.
            </p>
            <Link to="/dashboard/prescriptions">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Zu meinen Rezepten
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = getStatusDetails(order.status);
            
            return (
              <Card key={order.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Bestellung #{order.id.substring(0, 8)} vom {new Date(order.created_at).toLocaleDateString("de-DE")}
                    </CardTitle>
                    <Badge className={`flex items-center gap-1 ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 space-y-3">
                    <div>
                      <span className="text-sm font-medium">Gesamtbetrag:</span>{" "}
                      <span className="font-semibold">{order.total_amount.toFixed(2)} €</span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Lieferadresse:</span>{" "}
                      <span>{formatAddress(order.shipping_address)}</span>
                    </div>

                    {order.prescription_id && (
                      <div>
                        <span className="text-sm font-medium">Rezept:</span>{" "}
                        <Link 
                          to={`/dashboard/prescriptions`}
                          className="text-cannabis-green-600 hover:underline"
                        >
                          Zum zugehörigen Rezept
                        </Link>
                      </div>
                    )}
                  </div>

                  {order.status === "shipped" && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium">Sendungsverfolgung</h4>
                      <div className="relative">
                        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="py-2">
                                <div className="flex items-center">
                                  <div className="relative z-10 mr-4 h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                                    <Check className="h-3 w-3" />
                                  </div>
                                  <span>Paket versendet</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-sm text-gray-500">
                                {new Date(order.updated_at).toLocaleDateString("de-DE")}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="py-2">
                                <div className="flex items-center">
                                  <div className="relative z-10 mr-4 h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                  <span>In Zustellung</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-sm text-gray-500">Ausstehend</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="py-2">
                                <div className="flex items-center">
                                  <div className="relative z-10 mr-4 h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                  <span>Zugestellt</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-sm text-gray-500">Ausstehend</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {order.invoice_url && (
                    <Button variant="outline" className="mt-4">
                      <Download className="mr-2 h-4 w-4" /> Rechnung herunterladen
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
