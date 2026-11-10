import type { Integrante } from "../types/integrante";

// Avatares são ilustrações conceituais (não são fotografias reais das pessoas).
// RM não é preenchido para não inventar números — adicione quando tiver o oficial.
export const integrantes: Integrante[] = [
  {
    slug: "matheus",
    nome: "Matheus Nezio",
    papel: "Front-End Design Engineering",
    disciplinas: ["Front-End Design Engineering"],
    contribuicoes: [
      "Aplicação SPA em React + Vite + TypeScript + Tailwind CSS",
      "Integração com a API Java via Fetch",
      "Design da interface e responsividade",
      "Publicação na Vercel",
    ],
    avatar: "/images/05_Integrantes/avatar_ilustrativo_matheus.png",
    github: "https://github.com/Nezio22",
  },
  {
    slug: "julia",
    nome: "Julia Almeida",
    papel: "Banco de Dados e Back-End Java",
    disciplinas: ["Building Relational Database", "Domain Driven Design Using Java"],
    contribuicoes: [
      "Modelagem e implementação do banco Oracle",
      "API REST em Java com Spring Boot (JDBC)",
      "Deploy da API no Render",
    ],
    avatar: "/images/05_Integrantes/avatar_ilustrativo_julia.png",
  },
  {
    slug: "alexandre",
    nome: "Alexandre Prazeres",
    papel: "IA, Python e Software Engineering",
    disciplinas: [
      "Artificial Intelligence & Chatbot",
      "Computational Thinking Using Python",
      "Software Engineering and Business Model",
    ],
    contribuicoes: [
      "Modelos de Machine Learning e API em Flask",
      "Aplicação em Python",
      "Documentação e modelo de negócio",
    ],
    avatar: "/images/05_Integrantes/avatar_ilustrativo_alexandre.png",
  },
];
