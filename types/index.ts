export type UserRole = 'client' | 'admin' | 'operator';

export type ServiceType = 
  | 'Air Freight' 
  | 'Ocean Freight' 
  | 'Road Freight' 
  | 'Express Delivery' 
  | 'Warehousing' 
  | 'Customs Clearance';

export type ShipmentStatus = 
  | 'Pending' 
  | 'In Transit' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'On Hold' 
  | 'Cancelled';

export interface Profile {
  id: string;
  email: string;
  full_name?: string | null;
  company_name?: string | null;
  phone?: string | null;
  role: UserRole;
  created_at: string;
}

export interface Shipment {
  id: string;
  tracking_number: string;
  client_id?: string | null;
  sender_name: string;
  sender_phone?: string | null;
  sender_email?: string | null;
  sender_address: string;
  recipient_name: string;
  recipient_phone?: string | null;
  recipient_email?: string | null;
  recipient_address: string;
  origin_country: string;
  destination_country: string;
  service_type: ServiceType;
  status: ShipmentStatus;
  weight_kg?: number | null;
  dimensions_cm?: string | null;
  payment_method?: string | null;
  estimated_delivery?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShipmentUpdate {
  id: string;
  shipment_id: string;
  location: string;
  status_title: string;
  description?: string | null;
  timestamp: string;
  created_by?: string | null;
}

export interface QuoteRequest {
  origin_country: string;
  destination_country: string;
  service_type: ServiceType;
  weight_kg: number;
  dimensions?: string;
  is_dangerous_goods?: boolean;
}

export interface QuoteResult {
  estimated_cost_usd: number;
  estimated_days: string;
  carrier_options: {
    name: string;
    speed: string;
    price: number;
  }[];
}
