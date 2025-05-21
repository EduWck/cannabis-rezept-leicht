
// If this file already exists, we need to add these types to it
import { Json } from '@/integrations/supabase/types';

// Add the UserRole type for authentication
export type UserRole = 'patient' | 'doctor' | 'admin' | 'pharmacy';

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  status: 'in_review' | 'approved' | 'rejected';
  rejection_reason: string | null;
  symptoms: string[] | null;
  questionnaire_data: Json | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  // Add the patient relation
  patient?: {
    first_name: string | null;
    last_name: string | null;
  };
}

export interface Order {
  id: string;
  patient_id: string;
  prescription_id: string | null;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: Json | null;
  invoice_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  role: UserRole; // Updated to use UserRole which includes 'pharmacy'
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  email: string;
  phone: string | null;
  street_address: string | null;
  postal_code: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}
