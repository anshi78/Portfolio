import React, { useEffect, useRef, useState } from "react";
import {
    Github,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    ArrowUpRight,
    ExternalLink,
    GitBranch,
    Cpu,
    Database,
    Cloud,
    Code2,
    Layers,
    ChevronUp,
} from "lucide-react";

/* ----------------------------------------------------------------------
   DATA — sourced only from resume, expanded in language, not in fact.
---------------------------------------------------------------------- */

const ROLES = ["Software Engineer", "AI Engineer", "Backend Engineer", "Full-Stack Developer"];

const PROFILE = {
    name: "Anshika Rastogi",
    location: "Dehradun, India",
    email: "rastogianshika05@gmail.com",
    phone: "+91-8601845778",
    github: "https://github.com/anshi78",
    linkedin: "https://linkedin.com/in/anshika-rastogi",
};

const STATS = [
    { value: "1.2M", label: "node knowledge graph", suffix: "" },
    { value: "100", label: "concurrent workflows", suffix: "+" },
    { value: "10\u201320", label: "state updates / sec", suffix: "" },
    { value: "240", label: "LeetCode problems solved", suffix: "+" },
];

const SKILLS = [
    {
        ref: "01",
        title: "Languages",
        icon: Code2,
        items: ["Python", "TypeScript", "JavaScript (ES6+)", "C++", "SQL"],
    },
    {
        ref: "02",
        title: "Frontend",
        icon: Layers,
        items: ["React.js", "Next.js", "Tailwind CSS", "React Flow", "HTML / CSS"],
    },
    {
        ref: "03",
        title: "Backend",
        icon: GitBranch,
        items: ["FastAPI", "Flask", "Node.js", "REST APIs", "OAuth 2.0", "RBAC", "Microservices"],
    },
    {
        ref: "04",
        title: "AI & Machine Learning",
        icon: Cpu,
        items: [
            "LLM Integration (Gemini, OpenAI, LLaMA)",
            "Reinforcement Learning",
            "Gymnasium",
            "RAG",
            "Prompt Engineering",
            "NLP",
            "YOLOv8",
            "TensorFlow",
            "PyTorch",
            "Scikit-learn",
        ],
    },
    {
        ref: "05",
        title: "Databases & DevOps",
        icon: Database,
        items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Supabase", "Docker", "Git", "CI/CD", "Vercel", "Hugging Face Spaces", "GCP"],
    },
];

const PROJECTS = [
    {
        ref: "[01]",
        name: "Citation Agent",
        tagline: "An RL environment that teaches language models to cite correctly",
        description:
            "A Gymnasium-compatible reinforcement learning environment for LLM citation retrieval, evaluated against a 1.2M-node knowledge graph built from Semantic Scholar and ArXiv. Fifty structured tasks span three difficulty tiers \u2014 single-hop, multi-hop, and adversarial \u2014 giving a reproducible benchmark for citation-grounded generation.",
        achievements: [
            "Designed potential-based reward shaping using F1-score against ground-truth citation sets, plus step-efficiency penalties",
            "Benchmarked LLaMA-3.3-70B at 80% accuracy on single-hop and 40% on multi-hop retrieval tasks",
            "Containerized and deployed the evaluation server to Hugging Face Spaces via Docker",
            "Built an async FastAPI layer for agent action submission with sub-100ms response latency",
        ],
        stack: ["Python", "Gymnasium", "LLaMA-3.3-70B", "SQLite", "FastAPI", "Docker", "Hugging Face"],
        href: "https://github.com/anshi78/Citation-Agent",
    },
    {
        ref: "[02]",
        name: "MetaFlow",
        tagline: "A low-code canvas for orchestrating multi-step AI pipelines",
        description:
            "A full-stack workflow builder where teams compose AI agent pipelines visually and run them concurrently. The state layer is built for real-time collaboration \u2014 multiple people editing the same workflow graph, watching each other's changes land live.",
        achievements: [
            "Supported 100+ concurrent workflow executions with strong consistency and fault tolerance",
            "Built a real-time sync layer sustaining 10\u201320 state updates/sec on Convex, enabling live collaborative editing",
            "Secured backend services with OAuth 2.0 and Arcjet rate limiting to prevent unauthorized access and abuse",
            "Cut frontend render cycles by 35% by decoupling React node state on graphs with 50+ nodes",
        ],
        stack: ["Next.js", "React.js", "React Flow", "Convex", "OAuth 2.0", "TypeScript"],
        href: "https://github.com/anshi78/MetaFlow",
    },
    {
        ref: "[03]",
        name: "Wildlife Monitoring System",
        tagline: "Edge AI for real-time wildlife detection in the field",
        description:
            "A production edge-AI system that detects wildlife in real time from field sensors, built to keep working when connectivity doesn't \u2014 capturing and syncing data the moment a connection reappears.",
        achievements: [
            "Achieved sub-200ms inference latency under concurrent load using YOLOv8",
            "Designed async REST APIs in FastAPI for real-time sensor data ingestion at scale",
            "Ran end-to-end model training, fine-tuning, and F1-score evaluation for production-grade detection accuracy",
            "Integrated Supabase pipelines for offline-first persistence and edge-to-cloud sync",
        ],
        stack: ["YOLOv8", "FastAPI", "Next.js", "Supabase", "Python"],
        href: "https://github.com/anshi78/Wildlife-Monitoring",
    },
];

const EXPERIENCE = [
    {
        role: "Image Processing & Computer Vision Intern",
        org: "Graphic Era Deemed to be University",
        dept: "Department of Computer Science & Engineering",
        duration: "1 Jun \u2014 10 Jul 2026",
        location: "Dehradun, India",
        supervisor: "Dr. Parul Madan, Professor, Dept. of CSE",
        tagline: "Built an AI-powered cough monitoring system, end to end",
        description:
            "Designed and built a full-stack health-monitoring application that classifies cough audio in real time and correlates detections with live air-quality and weather data \u2014 exploring whether environmental irritants track with respiratory symptom onset.",
        achievements: [
            "Trained a convolutional network (SimpleCoughCNN) on Mel-spectrogram audio, reaching 0.932 ROC-AUC, 92.2% accuracy, and a 0.640 F1-score at an optimized decision threshold",
            "Built an async FastAPI backend with SQLAlchemy + SQLite, concurrently fetching and caching the WAQI and OpenWeatherMap APIs for real-time AQI, temperature, and humidity readings",
            "Shipped a Next.js dashboard with live time-series and correlation charts for session history and diagnostics",
            "Co-authoring a research paper on the system's methodology and findings, currently in preparation for submission",
        ],
        stack: ["PyTorch", "FastAPI", "Next.js", "SQLite", "WAQI API", "OpenWeatherMap API"],
        href: "https://github.com/anshi78/Cough-Monitoring",
    },
];


const ACHIEVEMENTS = [
    { title: "Top 10 of 120 Teams \u2014 Grapethon 3.0 Hackathon", detail: "Ranked in the top 10 nationwide out of 120 competing teams for a high-impact engineering solution." },
    { title: "Semi-Finalist \u2014 Flipkart GRID 7.0", detail: "Placed in the top 5% nationally across algorithm optimization and system design challenges." },
    { title: "300+ LeetCode Problems", detail: "Solved across Graphs, Dynamic Programming, and Trees." },
];

/* ----------------------------------------------------------------------
   HOOKS
---------------------------------------------------------------------- */

function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(18px)",
                transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function useTyping(words, speed = 55, pause = 1400) {
    const [text, setText] = useState("");
    const [idx, setIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[idx % words.length];
        let timeout;
        if (!deleting && text.length < word.length) {
            timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
        } else if (!deleting && text.length === word.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && text.length > 0) {
            timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), speed / 1.6);
        } else if (deleting && text.length === 0) {
            setDeleting(false);
            setIdx((i) => (i + 1) % words.length);
        }
        return () => clearTimeout(timeout);
    }, [text, deleting, idx, words, speed, pause]);

    return text;
}

/* ----------------------------------------------------------------------
   SIGNATURE ELEMENT — an animated citation / knowledge graph
---------------------------------------------------------------------- */

const NODES = [
    { id: "n0", x: 300, y: 190, r: 7, label: "Query" },
    { id: "n1", x: 150, y: 90, r: 5 },
    { id: "n2", x: 460, y: 80, r: 5 },
    { id: "n3", x: 80, y: 240, r: 4 },
    { id: "n4", x: 210, y: 320, r: 5 },
    { id: "n5", x: 390, y: 300, r: 4 },
    { id: "n6", x: 520, y: 220, r: 5 },
    { id: "n7", x: 470, y: 350, r: 4 },
    { id: "n8", x: 40, y: 130, r: 3.5 },
    { id: "n9", x: 570, y: 130, r: 3.5 },
];

const EDGES = [
    ["n0", "n1"], ["n0", "n2"], ["n0", "n4"], ["n0", "n5"], ["n0", "n6"],
    ["n1", "n3"], ["n1", "n8"], ["n2", "n9"], ["n2", "n6"], ["n4", "n3"],
    ["n5", "n7"], ["n6", "n7"], ["n6", "n9"],
];

function CitationGraph() {
    const [active, setActive] = useState("n0");
    const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
    const connected = new Set(
        EDGES.filter(([a, b]) => a === active || b === active).flatMap(([a, b]) => [a, b])
    );

    return (
        <svg viewBox="0 0 620 400" className="graph-svg" role="img" aria-label="Animated knowledge-graph diagram">
            {EDGES.map(([a, b], i) => {
                const A = byId[a], B = byId[b];
                const isActive = connected.has(a) && connected.has(b);
                return (
                    <line
                        key={i}
                        x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                        className={`graph-edge ${isActive ? "graph-edge-active" : ""}`}
                        style={{ animationDelay: `${i * 0.18}s` }}
                    />
                );
            })}
            {NODES.map((n) => (
                <g
                    key={n.id}
                    transform={`translate(${n.x},${n.y})`}
                    onMouseEnter={() => setActive(n.id)}
                    className="graph-node-group"
                >
                    <circle
                        r={n.r + (connected.has(n.id) ? 3 : 0)}
                        className={`graph-node ${connected.has(n.id) ? "graph-node-active" : ""}`}
                    />
                    {n.label && (
                        <text x={0} y={-16} textAnchor="middle" className="graph-label">
                            {n.label}
                        </text>
                    )}
                </g>
            ))}
        </svg>
    );
}

/* ----------------------------------------------------------------------
   SHARED UI
---------------------------------------------------------------------- */

function Eyebrow({ index, children }) {
    return (
        <div className="eyebrow">
            <span className="eyebrow-ref">{index}</span>
            <span className="eyebrow-rule" />
            <span>{children}</span>
        </div>
    );
}

function Counter({ value, suffix }) {
    const [ref, visible] = useReveal();
    const [display, setDisplay] = useState("0");
    const numeric = parseFloat(String(value).replace(/[^\d.]/g, ""));

    useEffect(() => {
        if (!visible || isNaN(numeric)) {
            if (visible) setDisplay(value);
            return;
        }
        let frame;
        const duration = 1200;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(numeric * eased).toString());
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [visible]);

    return (
        <span ref={ref} className="stat-value">
            {display}
            {suffix}
        </span>
    );
}

/* ----------------------------------------------------------------------
   MAIN
---------------------------------------------------------------------- */

export default function Portfolio() {
    const typed = useTyping(ROLES);
    const [scrolled, setScrolled] = useState(false);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            setShowTop(window.scrollY > 900);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="site">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --ink: #090C10;
          --surface: #10151C;
          --surface-2: #161C25;
          --line: #232B36;
          --text: #E7EAEE;
          --text-dim: #8B94A3;
          --text-faint: #5B6472;
          --amber: #E8B94D;
          --teal: #4FD1C5;
        }

        * { box-sizing: border-box; }

        .site {
          background: var(--ink);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .site h1, .site h2, .site h3 {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .mono { font-family: 'IBM Plex Mono', monospace; }

        .site a { color: inherit; text-decoration: none; }

        .wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 28px;
        }

        /* subtle grain / gradient backdrop */
        .bg-atmosphere {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(600px 400px at 12% 8%, rgba(232,185,77,0.06), transparent 60%),
            radial-gradient(700px 500px at 88% 20%, rgba(79,209,197,0.05), transparent 60%);
        }

        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 18px 0;
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(9,12,16,0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 17px; }
        .nav-logo span { color: var(--amber); }
        .nav-links { display: flex; gap: 28px; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          color: var(--text-dim); font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px; letter-spacing: 0.04em; text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .nav-links button:hover, .nav-links button:focus-visible { color: var(--text); }
        .nav-icons { display: flex; gap: 16px; align-items: center; }
        .nav-icons a { color: var(--text-dim); transition: color 0.2s ease; }
        .nav-icons a:hover { color: var(--amber); }
        @media (max-width: 720px) { .nav-links { display: none; } }

        /* EYEBROW */
        .eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 20px;
        }
        .eyebrow-ref { color: var(--amber); }
        .eyebrow-rule { width: 32px; height: 1px; background: var(--line); }

        /* HERO */
        .hero {
          position: relative; z-index: 1;
          padding: 130px 0 90px;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center;
        }
        @media (max-width: 900px) { .hero { grid-template-columns: 1fr; padding-top: 100px; } }

        .hero-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--amber);
          letter-spacing: 0.06em; margin-bottom: 22px; min-height: 20px;
        }
        .hero-eyebrow::before { content: '['; color: var(--text-faint); }
        .hero-eyebrow::after { content: ']'; color: var(--text-faint); }
        .cursor { display: inline-block; width: 8px; height: 1em; background: var(--amber); margin-left: 3px; vertical-align: -2px; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        .hero h1 {
          font-size: clamp(38px, 5.4vw, 64px);
          font-weight: 700; line-height: 1.04; color: var(--text);
        }
        .hero-lede {
          margin-top: 22px; max-width: 480px; color: var(--text-dim); font-size: 17px; line-height: 1.7;
        }
        .hero-actions { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }

        .btn {
          font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.03em;
          padding: 13px 22px; border-radius: 2px; display: inline-flex; align-items: center; gap: 8px;
          cursor: pointer; border: 1px solid var(--line); transition: all 0.22s ease;
        }
        .btn-primary { background: var(--amber); color: #100C04; border-color: var(--amber); font-weight: 500; }
        .btn-primary:hover { background: #f2c766; transform: translateY(-1px); }
        .btn-ghost { background: transparent; color: var(--text); }
        .btn-ghost:hover { border-color: var(--text-dim); background: var(--surface); }

        .graph-svg { width: 100%; height: auto; overflow: visible; }
        .graph-edge { stroke: var(--line); stroke-width: 1; opacity: 0.7; transition: stroke 0.4s ease, opacity 0.4s ease; }
        .graph-edge-active { stroke: var(--teal); opacity: 0.9; stroke-dasharray: 4 3; animation: dash 1.2s linear infinite; }
        @keyframes dash { to { stroke-dashoffset: -14; } }
        .graph-node { fill: var(--surface-2); stroke: var(--text-faint); stroke-width: 1.2; transition: all 0.3s ease; cursor: pointer; }
        .graph-node-active { fill: var(--amber); stroke: var(--amber); filter: drop-shadow(0 0 6px rgba(232,185,77,0.5)); }
        .graph-label { fill: var(--text-dim); font-family: 'IBM Plex Mono', monospace; font-size: 11px; }

        /* SECTION generic */
        section { position: relative; z-index: 1; padding: 96px 0; border-top: 1px solid var(--line); }
        .section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 44px; flex-wrap: wrap; gap: 16px; }
        .section-title { font-size: clamp(26px, 3.4vw, 36px); font-weight: 600; }
        .section-intro { color: var(--text-dim); max-width: 460px; font-size: 15px; }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 56px; }
        @media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; } }
        .about-text { color: var(--text-dim); font-size: 16.5px; line-height: 1.85; }
        .about-text strong { color: var(--text); font-weight: 500; }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .stat-cell { background: var(--surface); padding: 26px 22px; }
        .stat-value { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 600; color: var(--amber); display: block; }
        .stat-label { color: var(--text-dim); font-size: 12.5px; margin-top: 6px; font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; letter-spacing: 0.03em; }

        /* SKILLS */
        .skill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        @media (max-width: 860px) { .skill-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .skill-grid { grid-template-columns: 1fr; } }
        .skill-card { background: var(--surface); padding: 28px 24px; transition: background 0.25s ease; }
        .skill-card:hover { background: var(--surface-2); }
        .skill-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; color: var(--teal); }
        .skill-card-head h3 { font-size: 16px; font-weight: 600; color: var(--text); }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--text-dim); border: 1px solid var(--line); padding: 5px 10px; border-radius: 2px; }

        /* PROJECTS */
        .project-card {
          border: 1px solid var(--line); background: var(--surface); margin-bottom: 22px;
          display: grid; grid-template-columns: 220px 1fr; transition: border-color 0.25s ease;
        }
        .project-card:hover { border-color: var(--teal); }
        @media (max-width: 780px) { .project-card { grid-template-columns: 1fr; } }
        .project-rail {
          background: var(--surface-2); padding: 28px 22px; display: flex; flex-direction: column; justify-content: space-between;
          border-right: 1px solid var(--line);
        }
        @media (max-width: 780px) { .project-rail { border-right: none; border-bottom: 1px solid var(--line); flex-direction: row; align-items: center; } }
        .project-ref { font-family: 'IBM Plex Mono', monospace; color: var(--amber); font-size: 13px; }
        .project-link { display: inline-flex; align-items: center; gap: 6px; color: var(--text-dim); font-size: 12.5px; font-family: 'IBM Plex Mono', monospace; transition: color 0.2s ease; margin-top: 18px; }
        .project-link:hover { color: var(--teal); }
        .project-body { padding: 30px 32px; }
        .project-body h3 { font-size: 22px; font-weight: 600; margin-bottom: 6px; }
        .project-tagline { color: var(--teal); font-size: 14px; margin-bottom: 16px; font-family: 'IBM Plex Mono', monospace; }
        .project-desc { color: var(--text-dim); font-size: 15px; line-height: 1.75; margin-bottom: 18px; }
        .project-achievements { list-style: none; padding: 0; margin: 0 0 20px; display: grid; gap: 9px; }
        .project-achievements li { color: var(--text-dim); font-size: 14.5px; padding-left: 18px; position: relative; line-height: 1.6; }
        .project-achievements li::before { content: ''; position: absolute; left: 0; top: 8px; width: 6px; height: 1px; background: var(--amber); }
        .project-stack { display: flex; flex-wrap: wrap; gap: 8px; }
        .stack-chip { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--text); background: var(--surface-2); border: 1px solid var(--line); padding: 5px 10px; border-radius: 2px; }

        /* EXPERIENCE */
        .exp-card {
          border: 1px solid var(--line); background: var(--surface);
          display: grid; grid-template-columns: 200px 1fr; transition: border-color 0.25s ease;
        }
        .exp-card:hover { border-color: var(--amber); }
        @media (max-width: 700px) { .exp-card { grid-template-columns: 1fr; } }
        .exp-rail {
          background: var(--surface-2); padding: 26px 22px; border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 8px; justify-content: center;
        }
        @media (max-width: 700px) { .exp-rail { border-right: none; border-bottom: 1px solid var(--line); flex-direction: row; justify-content: space-between; align-items: center; } }
        .exp-duration { color: var(--amber); font-size: 13px; }
        .exp-location { color: var(--text-faint); font-size: 12.5px; font-family: 'IBM Plex Mono', monospace; }
        .exp-body { padding: 28px 30px; }
        .exp-body h3 { font-size: 19px; font-weight: 600; margin-bottom: 6px; }
        .exp-org { color: var(--teal); font-size: 13.5px; font-family: 'IBM Plex Mono', monospace; margin-bottom: 14px; }
        .exp-detail { color: var(--text-dim); font-size: 15px; line-height: 1.75; margin: 0 0 12px; }
        .exp-supervisor { color: var(--text-faint); font-size: 13px; font-family: 'IBM Plex Mono', monospace; }

        /* EDU / CERTS */
        .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
        @media (max-width: 860px) { .split-grid { grid-template-columns: 1fr; gap: 48px; } }
        .timeline-item { border-left: 1px solid var(--line); padding-left: 22px; position: relative; padding-bottom: 6px; }
        .timeline-item::before { content: ''; position: absolute; left: -5px; top: 4px; width: 9px; height: 9px; border-radius: 50%; background: var(--amber); }
        .timeline-item h3 { font-size: 18px; font-weight: 600; }
        .timeline-meta { color: var(--text-dim); font-size: 13.5px; margin-top: 4px; font-family: 'IBM Plex Mono', monospace; }
        .cgpa-badge { display: inline-block; margin-top: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--amber); border: 1px solid var(--line); padding: 4px 10px; }

        .cert-line { color: var(--text-dim); font-size: 15px; line-height: 1.75; border-left: 2px solid var(--amber); padding-left: 16px; }
        .cert-card { border: 1px solid var(--line); background: var(--surface); padding: 22px 24px; margin-bottom: 16px; }
        .cert-org { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.04em; }
        .cert-card h3 { font-size: 16.5px; font-weight: 600; margin-top: 6px; }
        .cert-via { color: var(--text-faint); font-size: 12.5px; margin-top: 4px; font-family: 'IBM Plex Mono', monospace; }
        .cert-detail { color: var(--text-dim); font-size: 14px; margin-top: 10px; line-height: 1.6; }

        /* ACHIEVEMENTS */
        .ach-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        @media (max-width: 780px) { .ach-grid { grid-template-columns: 1fr; } }
        .ach-card { background: var(--surface); padding: 30px 26px; }
        .ach-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 10px; line-height: 1.4; }
        .ach-card p { color: var(--text-dim); font-size: 14px; line-height: 1.7; margin: 0; }

        /* CONTACT */
        .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        @media (max-width: 860px) { .contact-inner { grid-template-columns: 1fr; } }
        .contact-title { font-size: clamp(30px, 4.2vw, 46px); font-weight: 600; line-height: 1.1; }
        .contact-list { display: grid; gap: 14px; margin-top: 32px; }
        .contact-row { display: flex; align-items: center; gap: 14px; color: var(--text-dim); font-size: 15px; transition: color 0.2s ease; }
        a.contact-row:hover { color: var(--teal); }
        .contact-row .icon-box { width: 36px; height: 36px; border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; color: var(--amber); flex-shrink: 0; }

        /* FOOTER */
        footer { border-top: 1px solid var(--line); padding: 32px 0; position: relative; z-index: 1; }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .footer-copy { color: var(--text-faint); font-size: 13px; font-family: 'IBM Plex Mono', monospace; }
        .footer-links { display: flex; gap: 20px; }
        .footer-links a { color: var(--text-dim); transition: color 0.2s ease; }
        .footer-links a:hover { color: var(--amber); }

        .to-top {
          position: fixed; right: 24px; bottom: 24px; z-index: 60;
          width: 44px; height: 44px; border-radius: 50%; background: var(--surface-2);
          border: 1px solid var(--line); color: var(--text); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .to-top:hover { border-color: var(--amber); color: var(--amber); }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

            <div className="bg-atmosphere" />

            {/* NAV */}
            <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
                <div className="wrap nav-inner">
                    <div className="nav-logo">AR<span>.</span></div>
                    <div className="nav-links">
                        <button onClick={() => scrollTo("about")}>About</button>
                        <button onClick={() => scrollTo("skills")}>Stack</button>
                        <button onClick={() => scrollTo("projects")}>Projects</button>
                        <button onClick={() => scrollTo("experience")}>Experience</button>
                        <button onClick={() => scrollTo("credentials")}>Credentials</button>
                        <button onClick={() => scrollTo("contact")}>Contact</button>
                    </div>
                    <div className="nav-icons">
                        <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
                        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="wrap hero" id="top">
                <div>
                    <div className="hero-eyebrow">{typed}<span className="cursor" /></div>
                    <h1>
                        Anshika Rastogi builds systems that reason<br className="hide-mobile" /> over graphs, not just data.
                    </h1>
                    <p className="hero-lede">
                        Final-year CS engineer shipping full-stack platforms and RL-based AI agents in production \u2014 from
                        a 1.2M-node citation graph to real-time workflow engines syncing 10\u201320 updates a second.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
                            View Projects <ArrowRight size={15} />
                        </button>
                        <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>
                            Get in Touch
                        </button>
                    </div>
                </div>
                <div>
                    <CitationGraph />
                </div>
            </header>

            {/* ABOUT */}
            <section id="about">
                <div className="wrap">
                    <Reveal>
                        <Eyebrow index="[00]">Profile</Eyebrow>
                    </Reveal>
                    <div className="about-grid">
                        <Reveal>
                            <div className="about-text">
                                <p>
                                    I'm a <strong>final-year B.Tech Computer Science</strong> student at Graphic Era University,
                                    focused on the overlap between <strong>backend systems, reinforcement learning, and applied AI</strong>.
                                    My work tends to start where most tutorials stop \u2014 at the point where a system has to hold up
                                    under real concurrency, real latency budgets, and real failure modes.
                                </p>
                                <p style={{ marginTop: 18 }}>
                                    That's shown up as an RL agent benchmarked against a knowledge graph of over a million nodes,
                                    a workflow engine keeping 100+ pipelines consistent in real time, and an edge-AI system that
                                    keeps detecting wildlife even when the network doesn't cooperate. I care about the same things
                                    end to end: <strong>system design, API architecture, cloud deployment, and squeezing out
                                        the performance</strong> that makes a demo feel like a product.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={120}>
                            <div className="stat-grid">
                                {STATS.map((s) => (
                                    <div className="stat-cell" key={s.label}>
                                        <Counter value={s.value} suffix={s.suffix} />
                                        <div className="stat-label">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* SKILLS */}
            <section id="skills">
                <div className="wrap">
                    <Reveal>
                        <div className="section-head">
                            <div>
                                <Eyebrow index="[00]">Stack</Eyebrow>
                                <h2 className="section-title">What I build with</h2>
                            </div>
                            <p className="section-intro">
                                Grouped the way I actually reach for them \u2014 by the layer of the system they belong to.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <div className="skill-grid">
                            {SKILLS.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <div className="skill-card" key={cat.title}>
                                        <div className="skill-card-head">
                                            <Icon size={18} />
                                            <h3>{cat.title}</h3>
                                        </div>
                                        <div className="skill-tags">
                                            {cat.items.map((i) => (
                                                <span className="skill-tag" key={i}>{i}</span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects">
                <div className="wrap">
                    <Reveal>
                        <div className="section-head">
                            <div>
                                <Eyebrow index="[00]">Selected Work</Eyebrow>
                                <h2 className="section-title">Featured projects</h2>
                            </div>
                            <p className="section-intro">
                                Three systems, three different failure modes solved: reward sparsity, state consistency,
                                and unreliable connectivity.
                            </p>
                        </div>
                    </Reveal>
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.name} delay={i * 90}>
                            <div className="project-card">
                                <div className="project-rail">
                                    <span className="project-ref mono">{p.ref}</span>
                                    <a className="project-link" href={p.href} target="_blank" rel="noreferrer">
                                        <Github size={13} /> Source <ArrowUpRight size={12} />
                                    </a>
                                </div>
                                <div className="project-body">
                                    <h3>{p.name}</h3>
                                    <div className="project-tagline">{p.tagline}</div>
                                    <p className="project-desc">{p.description}</p>
                                    <ul className="project-achievements">
                                        {p.achievements.map((a) => (
                                            <li key={a}>{a}</li>
                                        ))}
                                    </ul>
                                    <div className="project-stack">
                                        {p.stack.map((s) => (
                                            <span className="stack-chip" key={s}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience">
                <div className="wrap">
                    <Reveal>
                        <Eyebrow index="[00]">Experience</Eyebrow>
                        <h2 className="section-title" style={{ marginBottom: 40 }}>Internship, completed</h2>
                    </Reveal>
                    {EXPERIENCE.map((e, i) => (
                        <Reveal delay={i * 90} key={e.role}>
                            <div className="exp-card">
                                <div className="exp-rail">
                                    <span className="exp-duration mono">{e.duration}</span>
                                    <span className="exp-location">{e.location}</span>
                                    <a className="project-link" href={e.href} target="_blank" rel="noreferrer">
                                        <Github size={13} /> Source <ArrowUpRight size={12} />
                                    </a>
                                </div>
                                <div className="exp-body">
                                    <h3>{e.role}</h3>
                                    <div className="exp-org">{e.org} \u2014 {e.dept}</div>
                                    <div className="project-tagline">{e.tagline}</div>
                                    <p className="exp-detail">{e.description}</p>
                                    <ul className="project-achievements">
                                        {e.achievements.map((a) => (
                                            <li key={a}>{a}</li>
                                        ))}
                                    </ul>
                                    <div className="project-stack" style={{ marginBottom: 14 }}>
                                        {e.stack.map((s) => (
                                            <span className="stack-chip" key={s}>{s}</span>
                                        ))}
                                    </div>
                                    <div className="exp-supervisor">Supervised by {e.supervisor}</div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* EDUCATION + CERTS */}
            <section id="credentials">
                <div className="wrap split-grid">
                    <div>
                        <Reveal>
                            <Eyebrow index="[00]">Education</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <div className="timeline-item">
                                <h3>Graphic Era University</h3>
                                <div className="timeline-meta">B.Tech, Computer Science &amp; Engineering \u00b7 2023 \u2014 2027</div>
                                <div className="timeline-meta">Dehradun, India</div>
                                <span className="cgpa-badge">CGPA 7.9</span>
                            </div>
                        </Reveal>
                    </div>
                    <div>
                        <Reveal>
                            <Eyebrow index="[00]">Certifications</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <p className="cert-line">{CERTS}</p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section id="achievements">
                <div className="wrap">
                    <Reveal>
                        <Eyebrow index="[00]">Track Record</Eyebrow>
                        <h2 className="section-title" style={{ marginBottom: 40 }}>Achievements</h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <div className="ach-grid">
                            {ACHIEVEMENTS.map((a) => (
                                <div className="ach-card" key={a.title}>
                                    <h3>{a.title}</h3>
                                    <p>{a.detail}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact">
                <div className="wrap contact-inner">
                    <Reveal>
                        <div>
                            <Eyebrow index="[00]">Contact</Eyebrow>
                            <h2 className="contact-title">Let's build<br />something that holds up.</h2>
                            <p className="section-intro" style={{ marginTop: 18 }}>
                                Open to Software Engineer, Backend, Full-Stack, and AI Engineer roles \u2014 internship or full-time.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <div className="contact-list">
                            <a className="contact-row" href={`mailto:${PROFILE.email}`}>
                                <span className="icon-box"><Mail size={16} /></span> {PROFILE.email}
                            </a>
                            <a className="contact-row" href={`tel:${PROFILE.phone}`}>
                                <span className="icon-box"><Phone size={16} /></span> {PROFILE.phone}
                            </a>
                            <a className="contact-row" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                                <span className="icon-box"><Linkedin size={16} /></span> linkedin.com/in/anshika-rastogi
                            </a>
                            <a className="contact-row" href={PROFILE.github} target="_blank" rel="noreferrer">
                                <span className="icon-box"><Github size={16} /></span> github.com/anshi78
                            </a>
                            <div className="contact-row">
                                <span className="icon-box"><MapPin size={16} /></span> {PROFILE.location}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <footer>
                <div className="wrap footer-inner">
                    <span className="footer-copy">\u00a9 {new Date().getFullYear()} Anshika Rastogi</span>
                    <div className="footer-links">
                        <a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={16} /></a>
                        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /></a>
                        <a href={`mailto:${PROFILE.email}`}><Mail size={16} /></a>
                    </div>
                </div>
            </footer>

            {showTop && (
                <button className="to-top" onClick={() => scrollTo("top")} aria-label="Back to top">
                    <ChevronUp size={18} />
                </button>
            )}
        </div>
    );
}