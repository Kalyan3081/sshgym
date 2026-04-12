"use client";
import { useState, useEffect } from "react";

export default function AboutPage() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Rajdhani:wght@500;600;700&display=swap');

        :root[data-theme="dark"] {
          --bg: #0d1117;
          --bg2: #111820;
          --surface: #161d27;
          --border: #1e2a38;
          --text: #e8edf3;
          --text-muted: #7a8a9a;
          --accent: #e8800a;
          --accent2: #f5a623;
          --footer-bg: #080c10;
          --card-bg: #131b24;
          --toggle-bg: #1e2a38;
          --shadow: 0 8px 40px rgba(0,0,0,0.5);
        }

        :root[data-theme="light"] {
          --bg: #f5f0eb;
          --bg2: #ede8e2;
          --surface: #ffffff;
          --border: #d4cec7;
          --text: #1a1a1a;
          --text-muted: #6b6560;
          --accent: #c7650a;
          --accent2: #e8800a;
          --footer-bg: #1a1410;
          --card-bg: #ffffff;
          --toggle-bg: #d4cec7;
          --shadow: 0 8px 40px rgba(0,0,0,0.12);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .page-wrapper {
          background: var(--bg);
          min-height: 100vh;
          transition: background 0.3s ease;
        }

        /* ---- TOGGLE ---- */
        .toggle-bar {
          position: fixed;
          top: 18px;
          right: 20px;
          z-index: 999;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--toggle-bg);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 6px 14px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        .toggle-btn:hover { border-color: var(--accent); }

        .toggle-icon {
          font-size: 16px;
          transition: transform 0.4s ease;
        }

        /* ---- ABOUT SECTION ---- */
        .about-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 24px 60px;
        }

        .gym-badge {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 3px;
          margin-bottom: 22px;
        }

        .gym-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px, 10vw, 88px);
          line-height: 0.95;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .gym-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(16px, 3vw, 22px);
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 48px;
        }

        .divider {
          width: 60px;
          height: 3px;
          background: var(--accent);
          margin-bottom: 40px;
          border-radius: 2px;
        }

        .about-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 36px 40px;
          margin-bottom: 28px;
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .about-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(to bottom, var(--accent), var(--accent2));
          border-radius: 4px 0 0 4px;
        }

        .about-card blockquote {
          font-size: clamp(15px, 2.2vw, 17px);
          line-height: 1.85;
          color: var(--text);
          font-weight: 300;
          font-style: italic;
        }

        .about-card blockquote strong {
          color: var(--accent);
          font-style: normal;
          font-weight: 600;
        }

        .section-heading {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .owner-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 28px 36px;
          box-shadow: var(--shadow);
          margin-bottom: 60px;
          transition: background 0.3s ease;
        }

        .owner-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: #fff;
          flex-shrink: 0;
        }

        .owner-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: 1px;
        }

        .owner-role {
          font-size: 13px;
          color: var(--accent);
          font-weight: 500;
          letter-spacing: 1px;
        }

        /* ---- FOOTER ---- */
        footer {
          background: var(--footer-bg);
          color: #c8d0d9;
          padding: 56px 24px 28px;
        }

        .footer-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .footer-brand {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: var(--accent);
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .footer-tagline {
          font-size: 13px;
          color: #5a6878;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 40px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          margin-bottom: 40px;
        }

        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr; }
        }

        .footer-col-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }

        .footer-col p, .footer-col a {
          font-size: 14px;
          color: #8a9aaa;
          line-height: 1.9;
          display: block;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-col a:hover { color: var(--accent); }

        .footer-sep {
          border: none;
          border-top: 1px solid #1e2a38;
          margin-bottom: 20px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-copy {
          font-size: 12px;
          color: #3a4a5a;
        }

        .footer-dev {
          font-size: 12px;
          color: #3a4a5a;
        }

        .footer-dev a {
          color: var(--accent);
          text-decoration: none;
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 600px) {
          .about-card { padding: 26px 22px; }
          .owner-card { padding: 22px 20px; }
          .about-section { padding: 70px 16px 40px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

            <div className="page-wrapper">

                {/* Toggle */}
                <div className="toggle-bar">
                    <button className="toggle-btn" onClick={() => setDark(!dark)}>
                        <span className="toggle-icon">{dark ? "☀️" : "🌙"}</span>
                        {dark ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>

                {/* About Section */}
                <section className="about-section">
                    <div className="gym-badge">Est. March 9, 2018</div>
                    <h1 className="gym-title">Sri Shakthi<br />Hanuman Gym</h1>
                    <p className="gym-subtitle">How We Got Our Start</p>
                    <div className="divider" />

                    <div className="about-card">
                        <blockquote>
                            Established on March 9th, 2018, <strong>SRI SHAKTHI HANUMAN GYM</strong> has since
                            excelled in the realm of fitness training. Our unwavering dedication to quality,
                            exceptional services, and unparalleled customer care has fostered a loyal community
                            of patrons.
                            <br /><br />
                            Our commitment to improvement is unceasing, and we continuously enhance our offerings
                            to better serve the people of Ballari. Contact us today to discover how{" "}
                            <strong>SRI SHAKTHI HANUMAN GYM</strong>, under the guidance of Owner &amp; Trainer{" "}
                            <strong>SANTOSH KRISHNA</strong>, can assist you in achieving your fitness goals.
                        </blockquote>
                    </div>

                    <div className="owner-card">
                        <div className="owner-avatar">SK</div>
                        <div>
                            <div className="section-heading">Owner & Head Trainer</div>
                            <div className="owner-name">Santosh Krishna</div>
                            <div className="owner-role">Founder · Sri Shakthi Hanuman Gym</div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer>
                    <div className="footer-inner">
                        <div className="footer-brand">Sri Shakthi Hanuman Gym</div>
                        <div className="footer-tagline">Strength · Discipline · Results</div>

                        <div className="footer-grid">
                            <div className="footer-col">
                                <div className="footer-col-title">Contact</div>
                                <a href="tel:+918618315270">+ 91 86183 15270</a>
                                <a href="mailto:santoshkrishna34@gmail.com">santoshkrishna34@gmail.com</a>
                            </div>
                            <div className="footer-col">
                                <div className="footer-col-title">Address</div>
                                <p>Gandhi Nagar, Beside Renuka's Kitchen,</p>
                                <p>Opposite Government Hospital,</p>
                                <p>Ballari – 583101, Karnataka.</p>
                            </div>
                        </div>

                        <hr className="footer-sep" />

                        <div className="footer-bottom">
                            <span className="footer-copy">© 2023 sshgym. All rights reserved.</span>
                            <span className="footer-dev">
                                Designed &amp; Developed by{" "}
                                <a href="https://instagram.com/marketing.dct" target="_blank" rel="noreferrer">
                                    Digital Connect Tech
                                </a>
                            </span>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}