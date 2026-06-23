import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/lib/domain/types";

export function TestimonialCard({ review }: { review: Testimonial }) {
  return (
    <Card className="p-5 shadow-none">
      <p className="font-semibold">{review.title}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{review.text}</p>
    </Card>
  );
}
