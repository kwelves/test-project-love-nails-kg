export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  achievement: string;
  description: string;
  imageUrl: string;
  imagePosition: string;
  certificates: string[];
  bestWorks: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "nazik",
    name: "Назик",
    role: "топ-мастер",
    experience: "7 лет опыта",
    specialty: "чистый маникюр, выравнивание, нюд",
    achievement: "1 900+ клиентов",
    description:
      "Спокойная точность в форме, бережная работа с кутикулой и аккуратное покрытие для ежедневного ухоженного результата.",
    imageUrl: "/hero/for-hero.jpeg",
    imagePosition: "50% 42%",
    certificates: ["Комбинированный маникюр", "Гель-лак без перепила"],
    bestWorks: ["Нюдовый маникюр", "Френч", "Чистое покрытие"],
  },
  {
    id: "zharkynai",
    name: "Жаркынай",
    role: "топ-мастер",
    experience: "6 лет опыта",
    specialty: "маникюр, френч, укрепление",
    achievement: "1 700+ клиентов",
    description:
      "Любит мягкую классику и чистые линии: френч, молочные оттенки и покрытия, которые выглядят дорого без лишнего шума.",
    imageUrl: "/works/french.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Френч и архитектура", "Укрепление ногтей"],
    bestWorks: ["Френч", "Молочная база", "Аккуратная форма"],
  },
  {
    id: "ishengul",
    name: "Ишенгуль",
    role: "топ-мастер",
    experience: "8 лет опыта",
    specialty: "наращивание, сложная архитектура",
    achievement: "2 100+ клиентов",
    description:
      "Работает со сложными запросами: длина, архитектура, прочность и дизайн, который сохраняет аккуратность в носке.",
    imageUrl: "/works/extension.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Моделирование ногтей", "Сложные формы"],
    bestWorks: ["Наращивание", "Длинная форма", "Укрепление"],
  },
  {
    id: "aizhan",
    name: "Айжан",
    role: "топ-мастер",
    experience: "6 лет опыта",
    specialty: "наращивание, форма, дизайн",
    achievement: "1 600+ клиентов",
    description:
      "Помогает подобрать длину и форму под образ жизни, чтобы результат был выразительным, но оставался комфортным.",
    imageUrl: "/works/minimal-art.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Nail design", "Архитектура ногтей"],
    bestWorks: ["Минималистичный дизайн", "Наращивание", "Нюд"],
  },
  {
    id: "kamila",
    name: "Камила",
    role: "мастер",
    experience: "4 года опыта",
    specialty: "маникюр и покрытие",
    achievement: "1 100+ клиентов",
    description:
      "Делает понятный, чистый маникюр на каждый день: без перегруза, с мягким подбором оттенка и формы.",
    imageUrl: "/works/clean-manicure.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Базовый маникюр", "Покрытие гель-лаком"],
    bestWorks: ["Clean manicure", "Нюд", "Короткая форма"],
  },
  {
    id: "shakhnoza",
    name: "Шахноза",
    role: "мастер-инструктор",
    experience: "9 лет опыта",
    specialty: "обучение и nail-сервис",
    achievement: "70+ учениц",
    description:
      "Системный подход к технике, гигиене и скорости. Подходит тем, кто ценит опыт и уверенную руку мастера.",
    imageUrl: "/works/nude.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Инструктор nail-сервиса", "Повышение квалификации"],
    bestWorks: ["Нюд", "Комбинированный маникюр", "Покрытие"],
  },
  {
    id: "kumush",
    name: "Кумуш",
    role: "мастер",
    experience: "5 лет опыта",
    specialty: "маникюр и педикюр",
    achievement: "1 300+ клиентов",
    description:
      "Бережный уход для рук и стоп, аккуратное покрытие и спокойная эстетика без лишней декоративности.",
    imageUrl: "/works/berry.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Педикюр", "SPA-уход"],
    bestWorks: ["Педикюр", "Маникюр", "Цветное покрытие"],
  },
  {
    id: "nura",
    name: "Нура",
    role: "мастер",
    experience: "3 года опыта",
    specialty: "nail-сервис",
    achievement: "900+ клиентов",
    description:
      "Внимательна к деталям и комфорту в процессе: помогает выбрать спокойный дизайн и удобное время для записи.",
    imageUrl: "/works/clean-manicure.jpeg",
    imagePosition: "50% 50%",
    certificates: ["Nail-сервис", "Деликатное снятие"],
    bestWorks: ["Классика", "Нюд", "Повседневный маникюр"],
  },
];
