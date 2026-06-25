"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/components/team/teamData";

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamModal({ member, onClose }: TeamModalProps) {
  useEffect(() => {
    if (!member) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/28 px-3 pb-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            className="max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] border border-border bg-background shadow-[0_28px_90px_rgb(35_33_36_/_0.16)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[19rem] bg-[#f4e6dd] md:min-h-full">
                <Image
                  src={member.imageUrl}
                  alt={`${member.name}: ${member.specialty}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                  style={{ objectPosition: member.imagePosition }}
                />
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                    <h2 id="team-modal-title" className="mt-2 text-3xl font-semibold tracking-tight">
                      {member.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть окно мастера"
                    className="tap-motion flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Info label="Стаж" value={member.experience} />
                  <Info label="Специализация" value={member.specialty} />
                </div>

                <p className="mt-6 text-sm leading-6 text-muted-foreground">{member.description}</p>

                <div className="mt-6">
                  <p className="text-sm font-semibold">Сертификаты</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.certificates.map((item) => (
                      <span key={item} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold">Лучшие работы</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.bestWorks.map((item) => (
                      <span key={item} className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-xs text-primary">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild size="lg" className="mt-7 w-full sm:w-auto">
                  <Link href="#booking" onClick={onClose}>
                    Записаться к мастеру
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Info({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-[1.1rem] border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
