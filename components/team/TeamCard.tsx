"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/components/team/teamData";
import { services } from "@/lib/data/services";

interface TeamCardProps {
  member: TeamMember;
  onSelect?: (member: TeamMember) => void;
  isActive?: boolean;
  isAnyActive?: boolean;
}

export function TeamCard({ member, onSelect, isActive = false, isAnyActive = false }: TeamCardProps) {
  const serviceTags = services
    .filter((service) => member.serviceIds.includes(service.id))
    .slice(0, 2);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={isActive ? undefined : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex h-full min-w-[17.25rem] snap-start flex-col overflow-hidden rounded-[1.75rem] border bg-card shadow-[0_18px_48px_rgb(35_33_36_/_0.07)] transition-all duration-300 sm:min-w-0",
        isActive && "relative z-50 border-2 border-primary ring-2 ring-primary/15",
        !isActive && isAnyActive && "opacity-60 border-border/80",
        !isActive && !isAnyActive && "border-border/80"
      )}
      data-active={isActive}
    >
      <div className="relative aspect-square overflow-hidden bg-[#f4e6dd]">
        <Image
          src={member.imageUrl}
          alt={`${member.name}: ${member.specialty}`}
          fill
          sizes="(max-width: 768px) 78vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-ui)] group-hover:scale-[1.025]"
          style={{ objectPosition: member.imagePosition }}
        />
        <div className={cn("absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35", isActive && "hidden")}>
          <button
            type="button"
            onClick={() => onSelect?.(member)}
            className="tap-motion rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
          >
            Записаться
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
            <p className="mt-1 text-sm text-primary">{member.role}</p>
          </div>
          <p className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            {member.experience}
          </p>
        </div>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{member.specialty}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {serviceTags.map((service) => (
            <span key={service.id} className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
              {service.shortName}
            </span>
          ))}
        </div>
        <p className="mt-1 line-clamp-1 text-sm leading-5 text-muted-foreground">{member.description}</p>
      </div>
    </motion.article>
  );
}
