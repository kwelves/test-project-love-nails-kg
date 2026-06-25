"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/components/team/teamData";
import { services } from "@/lib/data/services";

interface TeamCardProps {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
  onBook: (member: TeamMember) => void;
  isActive?: boolean;
}

export function TeamCard({ member, onOpen, onBook, isActive = false }: TeamCardProps) {
  const serviceTags = services
    .filter((service) => member.serviceIds.includes(service.id))
    .slice(0, 3);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full min-w-[17.25rem] snap-start flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-[0_18px_48px_rgb(35_33_36_/_0.07)] data-[active=true]:border-primary/25 data-[active=true]:shadow-[0_18px_52px_rgb(142_31_63_/_0.1)] sm:min-w-0"
      data-active={isActive}
    >
      <div className="relative aspect-[5/6] overflow-hidden bg-[#f4e6dd]">
        <Image
          src={member.imageUrl}
          alt={`${member.name}: ${member.specialty}`}
          fill
          sizes="(max-width: 768px) 78vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-ui)] group-hover:scale-[1.025]"
          style={{ objectPosition: member.imagePosition }}
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
            <p className="mt-1 text-sm text-primary">{member.role}</p>
          </div>
          <p className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            {member.experience}
          </p>
        </div>
        <p className="mt-3 text-sm leading-5 text-muted-foreground">{member.specialty}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {serviceTags.map((service) => (
            <span key={service.id} className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
              {service.shortName}
            </span>
          ))}
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-5 text-muted-foreground">{member.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button type="button" variant="secondary" className="w-full" onClick={() => onOpen(member)}>
            Подробнее
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => onBook(member)}>
            Записаться
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
