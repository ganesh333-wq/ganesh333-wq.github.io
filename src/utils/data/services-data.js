export const servicesData = {
  tagline: "SERVICES & CAPABILITIES",
  headline: "Architecting AI & Web Solutions That Scale",
  description:
    "End-to-end technical execution ranging from custom RAG pipelines and autonomous AI agents to full-stack web applications engineered for speed, security, and growth.",
  cta: {
    primary: { label: "Let's Work Together", icon: "✉" },
    secondary: { label: "View Projects", icon: "⬡" },
    explore: { label: "Explore All Services", icon: "→" },
  },
  stats: [
    { value: "100%", label: "Production Ready" },
    { value: "Fast SLA", label: "Rapid Development" },
    { value: "24/7 Support", label: "Post-Launch Care" },
  ],
  solutionCard: {
    title: "Production-Grade Solutions",
    subtitle: "Full Lifecycle AI & Web Engineering",
    badge: "Available Now",
    services: [
      {
        icon: "🧠",
        title: "Generative AI & LLMs",
        description: "Custom RAG, fine-tuning & prompt systems",
        color: "#f59e0b",
      },
      {
        icon: "⚡",
        title: "Modern Full-Stack",
        description: "Next.js 14, React, Node & TypeScript",
        color: "#3b82f6",
      },
      {
        icon: "🤖",
        title: "Agentic Workflows",
        description: "Autonomous multi-agent LangGraph systems",
        color: "#f97316",
      },
      {
        icon: "🗄️",
        title: "Backend & Cloud API",
        description: "FastAPI, Node.js, PostgreSQL & Docker",
        color: "#8b5cf6",
      },
    ],
    footer: "Custom quotes & timelines provided within 24 hours",
  },

  /* ───── Detailed services shown in the expandable panel ───── */
  detailedServices: [
    {
      icon: "🧠",
      tag: "Artificial Intelligence",
      tagColor: "#16f2b3",
      title: "AI Application Development",
      description:
        "Custom AI-powered applications, generative LLM agents, and intelligent workflows tailored to solve complex business challenges.",
      features: [
        "Custom LLM Integration",
        "Autonomous AI Agents",
        "Prompt Engineering",
      ],
      tech: ["Python", "LangChain", "OpenAI", "FastAPI", "PyTorch"],
    },
    {
      icon: "💻",
      tag: "Web Engineering",
      tagColor: "#3b82f6",
      title: "Full Stack Web Development",
      description:
        "Scalable, responsive, and high-performance web applications built with modern frontend and backend architectures.",
      features: [
        "Server-Side Rendering",
        "Responsive UI/UX",
        "State Management",
      ],
      tech: ["React.js", "Next.js 14", "TypeScript", "Node.js", "Tailwind"],
    },
    {
      icon: "🔍",
      tag: "Retrieval Systems",
      tagColor: "#8b5cf6",
      title: "RAG Chatbots & AI Assistants",
      description:
        "Intelligent retrieval-augmented generation (RAG) chatbots that search through proprietary documents for hyper-accurate answers.",
      features: [
        "Vector Search",
        "Document Ingestion",
        "Context-Aware Chat",
      ],
      tech: ["LangChain", "Pinecone", "ChromaDB", "Embeddings", "OpenAI"],
    },
    {
      icon: "🤖",
      tag: "Process Automation",
      tagColor: "#f97316",
      title: "Automation & Agentic Workflows",
      description:
        "Automate repetitive business processes using graph-based AI agent routing, trigger systems, and API integrations.",
      features: [
        "Multi-Agent Routing",
        "Task Orchestration",
        "Zero Manual Overhead",
      ],
      tech: ["LangGraph", "n8n", "Python", "Webhooks", "REST APIs"],
    },
    {
      icon: "🗄️",
      tag: "Backend Architecture",
      tagColor: "#ef4444",
      title: "Backend API & Infrastructure",
      description:
        "Robust, secure, and well-documented REST & GraphQL APIs to power high-concurrency web and mobile applications.",
      features: [
        "Database Design",
        "Authentication & JWT",
        "High-Speed Caching",
      ],
      tech: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis"],
    },
    {
      icon: "🎨",
      tag: "Brand & UI/UX",
      tagColor: "#ec4899",
      title: "Portfolio & SaaS Website Design",
      description:
        "High-converting, SEO-optimized, and visually stunning digital experiences that position your brand ahead of competitors.",
      features: [
        "Pixel-Perfect Layouts",
        "SEO Best Practices",
        "Lightning Load Times",
      ],
      tech: ["Next.js", "Material UI", "Framer Motion", "SEO Optimization"],
    },
  ],

  /* ───── Development lifecycle steps ───── */
  lifecycle: {
    tagline: "DEVELOPMENT LIFECYCLE",
    title: "How I Deliver Results",
    description:
      "A structured, 4-step workflow that ensures clarity, speed, and continuous quality assurance.",
    steps: [
      {
        number: "01",
        icon: "🔍",
        title: "Discovery & Analysis",
        description:
          "I deeply analyze your business goals, target audience, and tech requirements to formulate the ideal execution strategy.",
        color: "#3b82f6",
      },
      {
        number: "02",
        icon: "📋",
        title: "Architecture & Design",
        description:
          "Blueprint system architecture, database schema, AI model selection, and UI wireframes for seamless development.",
        color: "#8b5cf6",
      },
      {
        number: "03",
        icon: "⚙️",
        title: "Development & Testing",
        description:
          "Iterative sprint building with clean, maintainable code, automated testing, and continuous feedback integration.",
        color: "#16f2b3",
      },
      {
        number: "04",
        icon: "🚀",
        title: "Deployment & Support",
        description:
          "Production deployment on cloud infrastructure with performance monitoring and post-launch maintenance.",
        color: "#f59e0b",
      },
    ],
  },

  /* ───── Bottom CTA banner ───── */
  ctaBanner: {
    title: "Have a project in mind?",
    description:
      "Let's turn your vision into intelligent, high-impact software. Contact me today to discuss requirements and get a project timeline.",
    primaryButton: "Get In Touch",
    secondaryButton: "View Portfolio Projects",
  },
};
