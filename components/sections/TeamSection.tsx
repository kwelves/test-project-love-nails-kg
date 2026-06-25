"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamModal } from "@/components/team/TeamModal";
import { teamMembers, type TeamMember } from "@/components/team/teamData";

const trustItems = [
  { value: "8", label: "мастеров" },
  { value: "10000+", label: "клиентов" },
  { value: "4", label: "филиала" },
  { value: "4.9", label: "рейтинг" },
];

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="bg-[#fffdf9] py-7 sm:py-10" aria-label="Доверие к Love Nails">
        <Container>
          <div className="grid gap-4 border-y border-border/70 py-5 sm:grid-cols-4 sm:gap-6 sm:py-7">
            {trustItems.map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="team" className="scroll-mt-24 bg-[#fffdf9] py-9 sm:scroll-mt-28 sm:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-6 max-w-3xl sm:mb-12"
          >
            <motion.h2
              variants={titleVariants}
              transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.8rem] font-semibold leading-tight tracking-tight min-[390px]:text-[2rem] sm:text-5xl"
            >
              Наши мастера
            </motion.h2>
            <motion.p
              variants={titleVariants}
              transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-lg sm:leading-7"
            >
              Выберите специалиста, которому доверите свою красоту
            </motion.p>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          >
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} onOpen={setSelectedMember} />
            ))}
          </motion.div>
        </Container>
      </section>

      <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}
