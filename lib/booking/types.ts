import type { BranchId, ServiceCategory } from "@/lib/domain/types";

export type BookingProviderName = "mock" | "google_sheets" | "google_calendar" | "both";
export type BookingRecordStatus = "new" | "confirmed" | "cancelled" | "completed";
export type Messenger = "whatsapp" | "instagram" | "telegram" | "phone";

export interface BookingInput {
  branchId: BranchId;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  messenger: Messenger;
  comment: string;
  source: string;
  consentAccepted: boolean;
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  branch: string;
  branchAddress: string;
  serviceCategory: ServiceCategory;
  service: string;
  master: string;
  date: string;
  time: string;
  duration: string;
  durationMinutes: number;
  name: string;
  phone: string;
  messenger: Messenger;
  comment: string;
  status: BookingRecordStatus;
  source: string;
  consentAccepted: boolean;
  whatsappUrl: string;
}

export interface BookingProviderResult {
  provider: BookingProviderName;
  ok: boolean;
  externalId?: string;
  message?: string;
}

export interface BookingSaveResult {
  booking: BookingRecord;
  providerResults: BookingProviderResult[];
}

export interface BookingProvider {
  name: BookingProviderName;
  saveBooking(booking: BookingRecord): Promise<BookingProviderResult>;
}

export interface ValidationResult<T> {
  ok: true;
  data: T;
} 

export interface ValidationFailure {
  ok: false;
  errors: Record<string, string>;
}
