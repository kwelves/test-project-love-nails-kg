export type BranchId = "suerkulova" | "beta-stores" | "vostok";

export type ServiceCategory =
  | "manicure"
  | "pedicure"
  | "design"
  | "extension"
  | "express";

export type BookingStatus =
  | "new"
  | "in_progress"
  | "confirmed"
  | "cancelled"
  | "needs_clarification";

export type MapProvider = "yandex" | "2gis";

export interface SalonContact {
  phone: string;
  whatsappPhone: string;
  instagramHandle: string;
  instagramUrl: string;
  telegramUrl?: string;
  bookingHours: string;
}

export interface SalonInfo {
  name: string;
  city: string;
  since: number;
  positioning: string;
  description: string;
  contact: SalonContact;
}

export interface Branch {
  id: BranchId;
  name: string;
  shortName: string;
  district: string;
  address: string;
  floorRoom: string;
  orientation: string;
  mapLinks: Record<MapProvider, string>;
  mapEmbeds?: Partial<Record<MapProvider, string>>;
  fallbackMapLink?: string;
  isVisible: boolean;
  bookingEnabled: boolean;
  sortOrder: number;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  shortName: string;
  description: string;
  priceFrom?: number;
  priceTo?: number;
  priceNote?: string;
  durationFromMinutes?: number;
  durationToMinutes?: number;
  isPopular: boolean;
  isHighlighted?: boolean;
  isActive: boolean;
}

export interface Master {
  id: string;
  name: string;
  needsConfirmation: boolean;
  branchId?: BranchId;
  role: string;
  specialty: string;
  approximateDuration?: string;
  isActive: boolean;
  isTopMaster: boolean;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  title: string;
  text: string;
  theme: "speed" | "accuracy" | "branches" | "master" | "price";
}

export interface BookingTimeSlot {
  label: string;
  value: string;
}

export interface BookingRequest {
  branchId: BranchId;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  comment: string;
  consent: boolean;
  status: BookingStatus;
}

export interface GalleryItem {
  id: string;
  title: string;
  tone: string;
  description: string;
  imageUrl: string;
}

export type AnalyticsEventName =
  | "click_whatsapp"
  | "click_instagram"
  | "click_telegram"
  | "select_service"
  | "select_staff"
  | "select_time_slot"
  | "complete_booking"
  | "view_gallery_item"
  | "booking_start"
  | "booking_branch_selected"
  | "booking_service_selected"
  | "booking_master_selected"
  | "booking_date_selected"
  | "booking_time_selected"
  | "booking_submit"
  | "booking_success"
  | "booking_error"
  | "map_open_yandex"
  | "map_open_2gis"
  | "admin_login_attempt"
  | "admin_update_saved";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;
