import { useState, useEffect, useRef } from "react";

const NAV = ["Home", "Services", "Pricing", "About", "Contact"];

const SERVICES = [
  {
   
    icon: "⚡",
    title: "Lead Qualification Bot",
    desc: "The moment a lead fills your form, our AI sends a personalized SMS + email within 90 seconds, asks smart qualifying questions, and scores them automatically — so your agents only talk to serious buyers.",
    bullets: ["90-second response time", "AI lead scoring", "CRM integration", "Zero manual effort"],
  },
  {
    icon: "🔁",
    title: "Follow-Up Sequence Engine",
    desc: "Never lose a lead to silence again. Our 7-touch automated follow-up sequence runs for 45 days — personalized by property type, budget, and lead source — without a single click from your team.",
    bullets: ["7-touch 45-day sequence", "Personalized by interest", "Multi-channel: SMS + email", "Pause/resume any time"],
  },
  {
    icon: "📋",
    title: "Client Onboarding Automation",
    desc: "The moment a deal goes under contract, we auto-generate a personalized onboarding packet — title timeline, checklist, agent card — and deliver it instantly. Your clients feel taken care of before you even pick up the phone.",
    bullets: ["Auto-generated PDF packets", "Instant delivery", "Branded to your agency", "Contract-triggered"],
  },
  {
    icon: "📊",
    title: "Live Results Dashboard",
    desc: "Every client gets a real-time dashboard showing leads qualified, sequences sent, response rates, and revenue recovered. See your ROI clearly — every single week.",
    bullets: ["Real-time reporting", "Response rate tracking", "Revenue impact metrics", "Weekly summaries"],
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "1,500",
    color: "#2563EB",
    desc: "Perfect for small brokerages ready to stop losing leads",
    features: [
      "Lead Qualification Bot",
      "Basic follow-up sequence (3-touch)",
      "Up to 500 leads/month",
      "Email support",
      "Monthly report",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "2,500",
    color: "#0F172A",
    popular: true,
    desc: "The complete system for growing agencies",
    features: [
      "All 3 core automations",
      "Full 7-touch 45-day sequence",
      "Up to 2,000 leads/month",
      "Live results dashboard",
      "Monthly strategy call",
      "Priority support",
    ],
    cta: "Most Popular",
  },
  {
    name: "Scale",
    price: "4,000",
    color: "#2563EB",
    desc: "For high-volume agencies that want every edge",
    features: [
      "Everything in Growth",
      "AI voice follow-up calls",
      "Unlimited leads",
      "Custom CRM integrations",
      "Weekly optimization calls",
      "Dedicated support",
    ],
    cta: "Go All In",
  },
];

const STATS = [
  { value: "90s", label: "Lead response time" },
  { value: "3x", label: "More booked appointments" },
  { value: "45", label: "Days of automated follow-up" },
  { value: "0", label: "Extra staff needed" },
];

const TESTIMONIALS = [
  { name: "James Okafor", role: "Broker, Lagos Realty Group", text: "We went from a 12% to 41% lead response rate in the first month. Mangrainse basically runs our follow-up department." },
  { name: "Adaeze Nwosu", role: "Director, Apex Properties", text: "I was skeptical about automation. Now I can't imagine running the agency without it. Every new lead gets a response faster than any human could." },
  { name: "Emeka Eze", role: "MD, Prime Homes NG", text: "The onboarding automation alone saved us 8 hours a week. Our clients think we have a full operations team." },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #2563EB;
    --dark: #0F172A;
    --mid: #1E293B;
    --text: #334155;
    --muted: #94A3B8;
    --light: #F8FAFC;
    --white: #FFFFFF;
    --border: #E2E8F0;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--sans);
    color: var(--text);
    background: var(--white);
    line-height: 1.6;
  }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
  }

  .nav-logo {
    font-family: var(--serif);
    font-size: 22px;
    font-weight: 700;
    color: var(--dark);
    letter-spacing: -0.5px;
    cursor: pointer;
  }

  .nav-logo span { color: var(--blue); }

  .nav-links {
    display: flex; gap: 36px; list-style: none;
  }

  .nav-links button {
    background: none; border: none;
    font-family: var(--sans); font-size: 14px; font-weight: 500;
    color: var(--text); cursor: pointer; letter-spacing: 0.2px;
    transition: color 0.2s;
  }

  .nav-links button:hover, .nav-links button.active { color: var(--blue); }

  .nav-cta {
    background: var(--blue); color: white;
    border: none; border-radius: 6px;
    padding: 10px 22px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: var(--sans);
    transition: background 0.2s, transform 0.15s;
  }
  .nav-cta:hover { background: #1D4ED8; transform: translateY(-1px); }

  section { padding: 100px 5%; }

  .hero {
    padding-top: 140px;
    padding-bottom: 100px;
    background: linear-gradient(160deg, #F0F7FF 0%, #FFFFFF 50%, #F8FAFC 100%);
    min-height: 100vh;
    display: flex; align-items: center;
    position: relative; overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute; top: -100px; right: -100px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-inner {
    max-width: 760px;
    position: relative; z-index: 1;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #EFF6FF; color: var(--blue);
    border: 1px solid #BFDBFE;
    padding: 6px 14px; border-radius: 100px;
    font-size: 13px; font-weight: 500;
    margin-bottom: 28px;
  }

  .hero-badge::before { content: '●'; font-size: 8px; color: #22C55E; }

  h1 {
    font-family: var(--serif);
    font-size: clamp(38px, 6vw, 68px);
    font-weight: 700;
    line-height: 1.1;
    color: var(--dark);
    letter-spacing: -1.5px;
    margin-bottom: 24px;
  }

  h1 em { font-style: normal; color: var(--blue); }

  .hero-sub {
    font-size: clamp(16px, 2vw, 19px);
    color: var(--muted);
    font-weight: 400;
    max-width: 560px;
    margin-bottom: 40px;
    line-height: 1.7;
  }

  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

  .btn-primary {
    background: var(--blue); color: white;
    border: none; border-radius: 8px;
    padding: 15px 32px; font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: var(--sans);
    transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { background: #1D4ED8; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.25); }

  .btn-outline {
    background: transparent; color: var(--dark);
    border: 1.5px solid var(--border); border-radius: 8px;
    padding: 15px 32px; font-size: 15px; font-weight: 500;
    cursor: pointer; font-family: var(--sans);
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--blue); color: var(--blue); }

  .stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
    margin-top: 60px;
  }

  .stat {
    background: white;
    padding: 28px 24px; text-align: center;
  }

  .stat-val {
    font-family: var(--serif);
    font-size: 36px; font-weight: 700;
    color: var(--blue); line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label { font-size: 13px; color: var(--muted); font-weight: 400; }

  .section-tag {
    font-size: 12px; font-weight: 600; letter-spacing: 3px;
    text-transform: uppercase; color: var(--blue);
    margin-bottom: 12px;
  }

  h2 {
    font-family: var(--serif);
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700; color: var(--dark);
    letter-spacing: -1px; line-height: 1.15;
    margin-bottom: 16px;
  }

  .section-sub {
    font-size: 17px; color: var(--muted);
    max-width: 560px; line-height: 1.7;
    margin-bottom: 56px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .service-card {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px 28px;
    background: white;
    transition: all 0.25s;
    cursor: default;
  }

  .service-card:hover {
    border-color: var(--blue);
    box-shadow: 0 8px 32px rgba(37,99,235,0.08);
    transform: translateY(-3px);
  }

  .service-icon {
    font-size: 28px; margin-bottom: 16px;
    width: 52px; height: 52px;
    background: #EFF6FF; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }

  .service-card h3 {
    font-family: var(--serif);
    font-size: 19px; font-weight: 600;
    color: var(--dark); margin-bottom: 10px;
  }

  .service-card p {
    font-size: 14px; color: var(--muted);
    line-height: 1.7; margin-bottom: 20px;
  }

  .service-bullets { list-style: none; display: flex; flex-direction: column; gap: 8px; }

  .service-bullets li {
    font-size: 13px; color: var(--text);
    display: flex; align-items: center; gap: 8px;
  }

  .service-bullets li::before {
    content: '✓'; color: var(--blue);
    font-weight: 700; font-size: 12px;
    flex-shrink: 0;
  }

  .pricing-section { background: var(--light); }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; max-width: 1000px;
  }

  .pricing-card {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: 16px; padding: 36px 30px;
    position: relative; transition: all 0.25s;
  }

  .pricing-card.popular {
    border-color: var(--dark);
    box-shadow: 0 16px 48px rgba(15,23,42,0.12);
    transform: translateY(-4px);
  }

  .popular-badge {
    position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
    background: var(--dark); color: white;
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; padding: 5px 16px; border-radius: 100px;
    white-space: nowrap;
  }

  .pricing-name {
    font-size: 13px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 12px;
  }

  .pricing-price {
    font-family: var(--serif);
    font-size: 48px; font-weight: 700;
    color: var(--dark); line-height: 1;
    margin-bottom: 4px;
  }

  .pricing-price sup { font-size: 22px; vertical-align: super; }
  .pricing-price sub { font-size: 16px; color: var(--muted); font-family: var(--sans); font-weight: 400; }

  .pricing-desc { font-size: 14px; color: var(--muted); margin: 12px 0 24px; }

  .pricing-divider { height: 1px; background: var(--border); margin-bottom: 24px; }

  .pricing-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }

  .pricing-features li {
    font-size: 14px; color: var(--text);
    display: flex; align-items: flex-start; gap: 10px;
  }

  .pricing-features li::before {
    content: '✓'; color: #22C55E;
    font-weight: 700; font-size: 13px;
    flex-shrink: 0; margin-top: 1px;
  }

  .pricing-btn {
    width: 100%; padding: 14px;
    border-radius: 8px; font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: var(--sans);
    transition: all 0.2s;
  }

  .pricing-btn.dark {
    background: var(--dark); color: white; border: none;
  }
  .pricing-btn.dark:hover { background: #1E293B; transform: translateY(-1px); }

  .pricing-btn.outline {
    background: transparent; color: var(--dark);
    border: 1.5px solid var(--border);
  }
  .pricing-btn.outline:hover { border-color: var(--blue); color: var(--blue); }

  .about-section { background: white; }

  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
  }

  .about-visual {
    background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
    border-radius: 16px; padding: 48px;
    display: flex; flex-direction: column; gap: 20px;
  }

  .about-stat-card {
    background: white; border-radius: 10px;
    padding: 20px 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    display: flex; align-items: center; gap: 16px;
  }

  .about-stat-icon {
    width: 44px; height: 44px; border-radius: 8px;
    background: #EFF6FF; display: flex; align-items: center;
    justify-content: center; font-size: 20px; flex-shrink: 0;
  }

  .about-stat-card strong {
    display: block; font-family: var(--serif);
    font-size: 22px; color: var(--dark); line-height: 1;
  }

  .about-stat-card span { font-size: 13px; color: var(--muted); }

  .about-text p { font-size: 16px; color: var(--text); line-height: 1.8; margin-bottom: 20px; }

  .about-list { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-top: 8px; }

  .about-list li {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 15px; color: var(--text);
  }

  .about-list li span:first-child {
    color: var(--blue); font-weight: 700; flex-shrink: 0;
  }

  .testimonials-section { background: var(--dark); }

  .testimonials-section .section-tag { color: #60A5FA; }
  .testimonials-section h2 { color: white; }
  .testimonials-section .section-sub { color: #94A3B8; }

  .testimonials-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .testimonial-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 32px 28px;
  }

  .testimonial-stars { color: #FCD34D; font-size: 14px; margin-bottom: 16px; letter-spacing: 2px; }

  .testimonial-text {
    font-size: 15px; color: #CBD5E1;
    line-height: 1.75; margin-bottom: 24px;
    font-style: italic;
  }

  .testimonial-author strong { display: block; color: white; font-size: 14px; font-weight: 600; }
  .testimonial-author span { font-size: 13px; color: #64748B; }

  .contact-section { background: var(--light); }

  .contact-grid {
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 64px; align-items: start;
  }

  .contact-info h2 { margin-bottom: 16px; }

  .contact-info p { font-size: 16px; color: var(--muted); line-height: 1.7; margin-bottom: 32px; }

  .contact-detail {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 0; border-bottom: 1px solid var(--border);
    font-size: 14px; color: var(--text);
  }

  .contact-detail-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: #EFF6FF; display: flex; align-items: center;
    justify-content: center; font-size: 16px; flex-shrink: 0;
  }

  .contact-form {
    background: white; border-radius: 16px;
    padding: 40px; border: 1px solid var(--border);
  }

  .contact-form h3 {
    font-family: var(--serif); font-size: 22px;
    color: var(--dark); margin-bottom: 28px;
  }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }

  .form-group label { font-size: 13px; font-weight: 500; color: var(--text); }

  .form-group input, .form-group select, .form-group textarea {
    border: 1.5px solid var(--border); border-radius: 8px;
    padding: 12px 14px; font-size: 14px; font-family: var(--sans);
    color: var(--dark); background: white;
    transition: border-color 0.2s; outline: none;
    width: 100%;
  }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
  }

  .form-group textarea { resize: vertical; min-height: 100px; }

  .form-submit {
    width: 100%; padding: 15px;
    background: var(--blue); color: white;
    border: none; border-radius: 8px;
    font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: var(--sans);
    transition: all 0.2s; margin-top: 4px;
  }
  .form-submit:hover { background: #1D4ED8; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.25); 

  .footer {
    background: var(--dark); color: #64748B;
    padding: 40px 5%;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 16px;
    font-size: 13px;
  }

  .footer-logo {
    font-family: var(--serif); font-size: 18px;
    color: white; font-weight: 700;
  }

  .footer-logo span { color: #60A5FA; }

  .success-msg {
    background: #F0FDF4; border: 1px solid #BBF7D0;
    color: #166534; border-radius: 8px;
    padding: 14px 18px; font-size: 14px;
    margin-top: 12px; text-align: center;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

export default function App() {
  const [page, setPage] = useState("Home");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", agency: "", email: "", phone: "", tier: "", message: "" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navigate = (p) => { setPage(p); scrollToTop(); };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", agency: "", email: "", phone: "", tier: "", message: "" });
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("Home")}>
          Mangrain<span>se</span>
        </div>
        <ul className="nav-links">
          {NAV.map(n => (
            <li key={n}>
              <button className={page === n ? "active" : ""} onClick={() => navigate(n)}>{n}</button>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => navigate("Contact")}>Book a Call</button>
      </nav>

      {/* HOME */}
      {page === "Home" && (
        <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">AI-Powered Real Estate Automation</div>
              <h1>Stop losing leads.<br />Start closing <em>more deals.</em></h1>
              <p className="hero-sub">
                Mangrainse automates lead qualification, follow-ups, and client onboarding for real estate agencies — so your agents focus on selling, not chasing.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate("Contact")}>
                  Book a Free Demo →
                </button>
                <button className="btn-outline" onClick={() => navigate("Services")}>
                  See How It Works
                </button>
              </div>
              <div className="stats-row">
                {STATS.map(s => (
                  <div className="stat" key={s.label}>
                    <div className="stat-val">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services preview */}
          <section style={{ background: "white" }}>
            <div className="section-tag">What We Do</div>
            <h2>Everything your agency needs,<br />fully automated</h2>
            <p className="section-sub">Three core automations that work 24/7, so no lead goes cold and no client feels ignored.</p>
            <div className="services-grid">
              {SERVICES.slice(0, 3).map(s => (
                <div className="service-card" key={s.title}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "36px" }}>
              <button className="btn-outline" onClick={() => navigate("Services")}>View All Services →</button>
            </div>
          </section>

          {/* Testimonials */}
          <section className="testimonials-section">
            <div className="section-tag">Client Results</div>
            <h2>Agencies that never look back</h2>
            <p className="section-sub">Real results from real estate agencies across Nigeria.</p>
            <div className="testimonials-grid">
              {TESTIMONIALS.map(t => (
                <div className="testimonial-card" key={t.name}>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section style={{ background: "#EFF6FF", textAlign: "center" }}>
            <div className="section-tag" style={{ textAlign: "center" }}>Ready to Start?</div>
            <h2 style={{ margin: "0 auto 16px" }}>Your competitors are already<br />automating. Are you?</h2>
            <p className="section-sub" style={{ margin: "0 auto 36px" }}>
              Book a free 15-minute call and we'll show you exactly how Mangrainse works for your agency.
            </p>
            <button className="btn-primary" style={{ margin: "0 auto" }} onClick={() => navigate("Contact")}>
              Book Free Call →
            </button>
          </section>
        </>
      )}

      {/* SERVICES */}
      {page === "Services" && (
        <section style={{ paddingTop: "140px", background: "white" }}>
          <div className="section-tag">Our Services</div>
          <h2>Four automations.<br />One complete system.</h2>
          <p className="section-sub">
            Each automation solves a specific pain point. Together, they run your entire lead-to-client pipeline — hands-free.
          </p>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-bullets">
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "60px", padding: "40px", background: "#F8FAFC", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <div className="section-tag">How It Works</div>
            <h2 style={{ fontSize: "28px" }}>Set up in 5 business days. Run forever.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginTop: "32px" }}>
              {[
                { step: "01", title: "Onboarding Call", desc: "We learn your current workflow, CRM, and lead sources." },
                { step: "02", title: "Custom Build", desc: "We build and configure all automations to your agency." },
                { step: "03", title: "Go Live", desc: "Your system launches within 5 business days." },
                { step: "04", title: "Optimize", desc: "Monthly reviews to improve response rates and outcomes." },
              ].map(h => (
                <div key={h.step}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "36px", color: "#E2E8F0", fontWeight: "700", lineHeight: "1" }}>{h.step}</div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "17px", color: "var(--dark)", margin: "8px 0 6px" }}>{h.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      {page === "Pricing" && (
        <section className="pricing-section" style={{ paddingTop: "140px" }}>
          <div className="section-tag">Pricing</div>
          <h2>Simple, transparent pricing</h2>
          <p className="section-sub">
            Monthly retainers. No setup surprises. Cancel anytime — but you won't want to.
          </p>
          <div className="pricing-grid">
            {PRICING.map(p => (
              <div className={`pricing-card ${p.popular ? "popular" : ""}`} key={p.name}>
                {p.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">
                  <sup>$</sup>{p.price}<sub>/mo</sub>
                </div>
                <p className="pricing-desc">{p.desc}</p>
                <div className="pricing-divider" />
                <ul className="pricing-features">
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <button
                  className={`pricing-btn ${p.popular ? "dark" : "outline"}`}
                  onClick={() => navigate("Contact")}
                >
                  {p.cta} →
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "48px", padding: "32px", background: "white", borderRadius: "12px", border: "1px solid var(--border)", maxWidth: "680px" }}>
            <div className="section-tag">Not sure which plan?</div>
            <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "20px" }}>
              Book a free 15-minute call and we'll recommend the right tier for your agency's lead volume and goals.
            </p>
            <button className="btn-primary" onClick={() => navigate("Contact")}>Book Free Consultation →</button>
          </div>
        </section>
      )}

      {/* ABOUT */}
      {page === "About" && (
        <section className="about-section" style={{ paddingTop: "140px" }}>
          <div className="about-grid">
            <div className="about-visual">
              {[
                { icon: "⚡", val: "90 sec", label: "Avg. lead response time" },
                { icon: "📈", val: "3.4x", label: "Average response rate increase" },
                { icon: "🏢", val: "Real Estate", label: "Our only focus" },
              ].map(s => (
                <div className="about-stat-card" key={s.label}>
                  <div className="about-stat-icon">{s.icon}</div>
                  <div>
                    <strong>{s.val}</strong>
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="about-text">
              <div className="section-tag">About Mangrainse</div>
              <h2>Built for real estate.<br />Obsessed with results.</h2>
              <p>
                Mangrainse was built with one mission: help real estate agencies stop losing deals to slow follow-up and manual processes. We saw agencies with great agents losing 60–70% of their leads simply because no one responded fast enough.
              </p>
              <p>
                So we built an AI-powered automation system that responds in 90 seconds, follows up for 45 days, and onboards new clients automatically — all without adding a single staff member.
              </p>
              <ul className="about-list">
                {[
                  ["→", "Specialized 100% in real estate agencies"],
                  ["→", "No-code workflows that integrate with your existing CRM"],
                  ["→", "Every system set up and live in under 5 business days"],
                  ["→", "Monthly optimization to keep your results improving"],
                ].map(([icon, text]) => (
                  <li key={text}><span>{icon}</span><span>{text}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {page === "Contact" && (
        <section className="contact-section" style={{ paddingTop: "140px" }}>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="section-tag">Get In Touch</div>
              <h2>Let's talk about your agency</h2>
              <p>Book a free 15-minute call. We'll walk you through exactly how Mangrainse works and what results you can expect.</p>
              {[
                { icon: "📧", label: "Email", val: "hello@mangrainse.com" },
                { icon: "📱", label: "WhatsApp", val: "+234 800 000 0000" },
                { icon: "🕐", label: "Response time", val: "Within 2 hours" },
                { icon: "📍", label: "Location", val: "Nigeria (Remote-first)" },
              ].map(d => (
                <div className="contact-detail" key={d.label}>
                  <div className="contact-detail-icon">{d.icon}</div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{d.label}</div>
                    <div style={{ fontWeight: "500", color: "var(--dark)" }}>{d.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-form">
              <h3>Book Your Free Call</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Agency Name</label>
                  <input placeholder="Your agency" value={form.agency} onChange={e => setForm({ ...form, agency: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" placeholder="you@agency.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Phone / WhatsApp</label>
                  <input placeholder="+234..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Which plan interests you?</label>
                <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })}>
                  <option value="">Select a plan...</option>
                  <option>Starter — $500/mo</option>
                  <option>Growth — $1,500/mo</option>
                  <option>Scale — $3,000/mo</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="form-group">
                <label>Anything else?</label>
                <textarea placeholder="Tell us about your agency, lead volume, or any questions..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button className="form-submit" onClick={handleSubmit}>
                Book My Free Call →
              </button>
              {submitted && (
                <div className="success-msg">
                  ✅ Thanks! We'll reach out within 2 hours to confirm your call.
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <p style={{ textAlign: "center", fontSize: "13px", color: "#647488", marginTop: "20px"}}>
        Demo project made for fun using Claude + me
      </p>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Mangrain<span>se</span></div>
        <div>AI Automation for Real Estate Agencies</div>
        <div style={{ display: "flex", gap: "24px" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => navigate(n)} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: "13px", fontFamily: "var(--sans)" }}>
              {n}
            </button>
          ))}
        </div>
        <div>© 2026 Mangrainse. All rights reserved.</div>
      <p style={{ textAlign:"center", fontSize: "13px", color: "#647488", marginTop: "20px"}]>
        Demo project made for  fun using Claude + React
      </p>
      </footer>
      </footer>
      </footer>
      </footer>
    </>
  );
}
