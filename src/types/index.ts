
import { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Prescription = Database["public"]["Tables"]["prescriptions"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type AuthCode = Database["public"]["Tables"]["auth_codes"]["Row"];

export type UserRole = "patient" | "doctor" | "admin";
export type PrescriptionStatus = "in_review" | "approved" | "rejected";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type ShippingAddress = {
  first_name: string;
  last_name: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
};
