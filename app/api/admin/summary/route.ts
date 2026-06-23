import { NextResponse } from "next/server";
import { branches } from "@/lib/data/branches";
import { masters } from "@/lib/data/masters";
import { services } from "@/lib/data/services";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getBookingStats, listMockBookings } from "@/lib/booking/mock-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const bookingStats = getBookingStats();
  return NextResponse.json({
    ok: true,
    stats: {
      newBookings: bookingStats.new,
      todayBookings: bookingStats.today,
      activeBranches: branches.filter((branch) => branch.isVisible && branch.bookingEnabled).length,
      activeMasters: masters.filter((master) => master.isActive).length,
      servicesMissingPriceOrDuration: services.filter(
        (service) => !service.priceFrom || !service.durationFromMinutes || !service.durationToMinutes,
      ).length,
      needsConfirmation: masters.filter((master) => master.needsConfirmation).length,
    },
    bookings: listMockBookings().slice(0, 20),
  });
}
