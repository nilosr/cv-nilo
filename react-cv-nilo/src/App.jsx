import { useState, useEffect, useRef } from "react";

const DATA = {
  name: "Nilo Romero",
  title: "Engenheiro de Controle e Automação | Desenvolvedor",
  tagline: "Desenvolvendo aplicações web e sistemas de automação para um futuro mais conectado e eficiente.",
  location: "Brasil",
  email: "nilosromero@gmail.com",
  github: "github.com/nilosr",
  linkedin: "linkedin.com/in/nilo-sromero",
  about: `Desenvolvedor com mais de 4 anos de experiência criando aplicações web e sistemas distribuídos. 
          Acredito que juntar boas práticas de engenharia, com soluções criativas e foco no usuário é a chave para construir produtos de impacto. 
          Tenho experiências profissionais em setores diversos, como energia, saúde e tecnologia, trazendo uma visão de negócio ampla e valiosa.`,
  experience: [
    {
      company: "WEG - Transmissão e Distribuição",
      role: "Desenvolvedor SCADA",
      period: "2025 — Presente",
      stack: ["Python", "VBA", "SQL Server"],
      bullets: [
        "Participou do desenvolvimento de sistema SCADA para monitoramento de subestações com mais de 2000 pontos de dados",
        "Desenvolveu scripts de automação para análise de falhas, reduzindo o tempo de diagnóstico em 30%",
        "Implementou scripts de automação de processos para desenvolvimento da plataforma SAGE, reduzindo o tempo de tarefas repetitivas em 50%",
      ],
    },
    {
      company: "Schneider Electric",
      role: "Project Manager Assistant",
      period: "2024 — 2025",
      stack: [],
      bullets: [
        "Gerenciou projetos de cubículos de Media Tensão, coordenando equipes multidisciplinares e garantindo entregas dentro do prazo",
        "Desenvolveu dashboards de monitoramento de KPIs usando Power BI, melhorando a visibilidade do progresso dos projetos para stakeholders",
        "Automatizou integrações entre sistema SAP e ferramentas de gestão de projetos, reduzindo o tempo gasto em tarefas administrativas em 50%",
      ],
    },
    {
      company: "Webmed do Brasil",
      role: "Desenvolvedor Front-end",
      period: "2022 — 2023",
      stack: ["JavaScript", "React", "Figma", "Tailwind CSS"],
      bullets: [
        "Participou do desenvolvimento de plataforma de telemedicina com mais de 100 mil usuários, focando na experiência do usuário e performance",
        "Criou design system reutilizável adotado por toda a agência",
        "Colaborou com equipes de back-end e design para implementação de novos usuários e funcionalidades, seguindo metodologias ágeis e melhores práticas de desenvolvimento",
      ],
    },
  ],
  skills: {
    "Front-end": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    "Back-end": ["Node.js", "Python", "FastAPI", "REST / GraphQL"],
    "Dados & Cloud": ["PostgreSQL", "AWS", "Docker"],
    "Práticas": ["TDD", "CI/CD", "DDD", "Code Review", "Agile / Scrum", "Git"],
    "Protocolos de Comunicação": ["IEC 61850", "DNP3", "Modbus", "OPC UA"],
    "Outras Skills": ["Modelagem 3d", "Sistemas Embarcados", "Linux"],

  },
  education: [
    {
      degree: "Bacharelado em Engenharia de Controle e Automação",
      institution: "Universidade Federal de Santa Catarina",
      period: "2018 — 2026",
      note: "TCC: Cibersegurança em Subestações de Transmissão e Distribuição de Energia",
    },
    {
      degree: "Excel Avançado",
      institution: "PEP - UFSC",
      period: "2021",
      note: "Curso de Excel avançado focado em automação de tarefas, análise de dados, tabelas dinâmicas e criação de dashboards",
    },
    {
      degree: "AWS Certified Solutions Architect",
      institution: "Amazon Web Services",
      period: "2026",
      note: "Em andamento",
    },
    
  ],
  projects: [
    {
      name: "SAGEAI",
      description: "Agente de inteligência artificial para suporte a operações de subestações. Integra dados em tempo real, documentação técnica e protocolos de comunicação para fornecer insights acionáveis e suporte à tomada de decisão.",
      stack: ["Python"],
      status: "ativo",
    },
    {
      name: "CID to Excel Converter",
      description: "Ferramenta de Linha de Comando para converter arquivos CID (backups de relés Siemens) em planilhas Excel organizadas, facilitando a análise e documentação de configurações de proteção.",
      stack: ["Python"],
      link: "github.com/nilosr/CIDtoExcel",
      status: "ativo",
    },
    {
      name: "Portfolio Website",
      description: "Site pessoal para exibir meu portfólio e projetos.",
      stack: ["React", "TypeScript"],
      link: "github.com/nilosr/cv-nilo",
      status: "ativo",
    },
  ],
};

// ─── NAV SECTIONS ────────────────────────────────────────────────────────────

const SECTIONS = ["sobre", "experiência", "habilidades", "educação", "projetos", "contato"];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useTypingEffect(text, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return { displayed, done };
}

function useScrollSpy() {
  const [active, setActive] = useState("sobre");
  useEffect(() => {
    const handleScroll = () => {
      const offsets = SECTIONS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      const nearest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(nearest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return active;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function GlowDot({ color = "cyan" }) {
  const colors = {
    cyan: "bg-cyan-400",
    green: "bg-green-400",
    amber: "bg-amber-400",
  };
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[color]} animate-pulse`} />
  );
}

function Tag({ children, variant = "default" }) {
  const variants = {
    default: "border border-slate-600 text-slate-400 bg-slate-800/50",
    cyan: "border border-cyan-800 text-cyan-400 bg-cyan-950/50",
    green: "border border-green-800 text-green-400 bg-green-950/50",
    amber: "border border-amber-800 text-amber-400 bg-amber-950/50",
  };
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded ${variants[variant]}`}>
      {children}
    </span>
  );
}

function SectionLabel({ id, children }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs text-cyan-500 select-none">{"// "}</span>
      <h2
        id={id}
        className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 scroll-mt-24"
      >
        {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-900 to-transparent" />
    </div>
  );
}

function HeroSection() {
  const { displayed, done } = useTypingEffect(DATA.name, 60);
  return (
    <section id="sobre" className="min-h-screen flex flex-col justify-center pt-20 pb-16 scroll-mt-20">

      <h1 className="font-mono text-5xl md:text-7xl font-bold text-white leading-none mb-2 tracking-tight">
        {displayed}
        {!done && (
          <span className="inline-block w-0.5 h-14 md:h-20 bg-cyan-400 ml-1 animate-pulse align-bottom" />
        )}
      </h1>

      <p className="font-mono text-lg md:text-xl text-cyan-400 mt-3 mb-6">
        <span className="text-slate-500">{">"} </span>
        {DATA.title}
      </p>

      <p className="text-slate-400 max-w-xl leading-relaxed mb-8 font-light">
        {DATA.tagline}
      </p>

      <div className="flex items-center gap-2 font-mono text-xs text-slate-500 mb-12">
        <GlowDot color="green" />
        <span>disponível para projetos</span>
        <span className="mx-2 text-slate-700">|</span>
        <span className="text-slate-600">{DATA.location}</span>
      </div>

      <div className="border border-slate-700 rounded-lg p-5 max-w-xl bg-slate-900/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="font-mono text-xs text-slate-600 ml-2">sobre.txt</span>
        </div>
        {DATA.about.trim().split("\n").map((line, i) => (
          <p key={i} className="font-mono text-sm text-slate-300 leading-relaxed">
            {line.trim()}
          </p>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-1">
      <SectionLabel id="experiência">experiência</SectionLabel>
      <div className="space-y-3">
        {DATA.experience.map((job, i) => (
          <div
            key={i}
            className={`border rounded-lg overflow-hidden transition-colors ${
              open === i ? "border-cyan-800 bg-slate-900/80" : "border-slate-800 bg-slate-900/30"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between p-5 text-left group"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-semibold text-white">{job.role}</span>
                  {i === 0 && <Tag variant="green">atual</Tag>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-cyan-400">{job.company}</span>
                  <span className="text-xs text-slate-600 font-mono">{job.period}</span>
                </div>
              </div>
              <span
                className={`text-slate-500 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-5 pb-5 border-t border-slate-800">
                <div className="flex flex-wrap gap-2 mt-4 mb-5">
                  {job.stack.map((s) => (
                    <Tag key={s} variant="cyan">{s}</Tag>
                  ))}
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-400">
                      <span className="text-cyan-600 mt-0.5 shrink-0">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="py-16">
      <SectionLabel id="habilidades">habilidades</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Object.entries(DATA.skills).map(([cat, items]) => (
          <div key={cat} className="border border-slate-800 rounded-lg p-5 bg-slate-900/30">
            <p className="font-mono text-xs text-cyan-500 mb-4">{cat.toLowerCase()}/</p>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3 py-1.5 border border-slate-700 text-slate-300 rounded hover:border-cyan-700 hover:text-cyan-300 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="py-16">
      <SectionLabel id="educação">educação</SectionLabel>
      <div className="space-y-4">
        {DATA.education.map((edu, i) => (
          <div key={i} className="flex gap-5 border border-slate-800 rounded-lg p-5 bg-slate-900/30">
            <div className="shrink-0 font-mono text-xs text-slate-600 pt-1 w-20 text-right">
              {edu.period}
            </div>
            <div className="border-l border-slate-700 pl-5">
              <p className="font-semibold text-white text-sm mb-1">{edu.degree}</p>
              <p className="text-cyan-400 text-sm mb-2">{edu.institution}</p>
              <p className="text-slate-500 text-xs">{edu.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
<section className="py-16">
  <SectionLabel id="projetos">projetos</SectionLabel>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {DATA.projects.map((proj) => (
      <div
        key={proj.name}
        className="border border-slate-800 rounded-lg p-5 bg-slate-900/30 hover:border-slate-600 transition-colors group flex flex-col"
      >
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
            {proj.name}
          </span>
          <Tag variant={proj.status === "ativo" ? "green" : "default"}>
            {proj.status}
          </Tag>
        </div>
        
        <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
          {proj.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {proj.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        {proj.link && (
          <a
            href={`https://${proj.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-slate-600 hover:text-cyan-400 transition-colors mt-auto"
          >
            {proj.link} →
          </a>
        )}
      </div>
    ))}
  </div>
</section>
  );
}

function ContactSection() {
  const links = [
    { label: "email", value: DATA.email, href: `mailto:${DATA.email}` },
    { label: "github", value: DATA.github, href: `https://${DATA.github}` },
    { label: "linkedin", value: DATA.linkedin, href: `https://${DATA.linkedin}` },
  ];
  return (
    <section className="py-16 pb-32">
      <SectionLabel id="contato">contato</SectionLabel>
      <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/30 max-w-lg">
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          Aberto a conversas sobre oportunidades e colaborações.
        </p>
        <div className="space-y-4">
          {links.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="font-mono text-xs text-slate-600 w-16 text-right shrink-0">
                {label}
              </span>
              <div className="flex-1 h-px bg-slate-800 group-hover:bg-cyan-900 transition-colors" />
              <span className="font-mono text-sm text-slate-400 group-hover:text-cyan-300 transition-colors">
                {value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Nav() {
  const active = useScrollSpy();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-sm">
      <span className="font-mono text-xs text-cyan-500">
        <span className="text-slate-500">~/</span>
        {DATA.name.split(" ")[0].toLowerCase()}
      </span>
      <ul className="hidden md:flex items-center gap-6">
        {SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`font-mono text-xs transition-colors ${
                active === id ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {active === id && <span className="text-cyan-600 mr-1">{">"}</span>}
              {id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Nav />

      <main className="relative max-w-3xl mx-auto px-6">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
