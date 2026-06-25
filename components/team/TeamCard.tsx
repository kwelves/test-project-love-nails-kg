"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/components/team/teamData";

interface TeamCardProps {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
}

export function TeamCard({ member, onOpen }: TeamCardProps) {
  const [activeWork, setActiveWork] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const works = member.workImages;
  const currentWork = works[activeWork] ?? member.imageUrl;

  const moveWork = (direction: 1 | -1) => {
    setActiveWork((current) => (current + direction + works.length) % works.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) {
      return;
    }

    const delta = touchStart - clientX;
    if (Math.abs(delta) > 32) {
      moveWork(delta > 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full min-w-[18.5rem] snap-start flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-[0_18px_48px_rgb(35_33_36_/_0.07)] sm:min-w-0"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f4e6dd]">
        <Image
          src={member.imageUrl}
          alt={`${member.name}: ${member.specialty}`}
          fill
          sizes="(max-width: 768px) 78vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-ui)] group-hover:scale-[1.025]"
          style={{ objectPosition: member.imagePosition }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
            <p className="mt-1 text-sm text-primary">{member.role}</p>
          </div>
          <p className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            {member.experience}
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{member.specialty}</p>
        <p className="mt-3 text-sm font-semibold text-foreground">{member.achievement}</p>
        <div className="mt-5 rounded-[1.25rem] border border-border/80 bg-background/65 p-2.5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Работы мастера</p>
            <div className="flex gap-1.5">
              <button
                type="button"
                className="tap-motion flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
                aria-label="Предыдущая работа"
                onClick={() => moveWork(-1)}
              >
                <ChevronLeft className="size-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="tap-motion flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
                aria-label="Следующая работа"
                onClick={() => moveWork(1)}
              >
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-[#f4e6dd]"
            onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
            onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          >
            <Image
              src={currentWork}
              alt={`Работа мастера ${member.name}`}
              fill
              sizes="(max-width: 768px) 78vw, 22vw"
              className="object-cover transition-opacity duration-300 ease-[var(--ease-ui)]"
            />
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {works.map((work, index) => (
              <button
                key={work}
                type="button"
                aria-label={`Показать работу ${index + 1}`}
                aria-pressed={index === activeWork}
                className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/15"
                data-active={index === activeWork}
                onClick={() => setActiveWork(index)}
              >
                <Image src={work} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="mt-5 w-full"
          onClick={() => onOpen(member)}
        >
          Подробнее
        </Button>
      </div>
    </motion.article>
  );
}
