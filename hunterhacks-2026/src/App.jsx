import { useState, useEffect, useRef } from "react";
import "./App.css";
import iconA from "/A.png";
import iconB from "/B.png";
import iconS from "/S.svg";
import iconF from "/F.svg";
import boroughBX from "/BX.png";
import boroughMN from "/MN.png";
import boroughSI from "/SI.png";
import boroughBK from "/BK.png";
import boroughQN from "/QN.png";
import borosTitle from "/Boros.png";
import scheduleTitle from "/Schedule.png";
import faqTitle from "/FAQ.png";
import sponsorsTitle from "/Sponsors.png";
import yellowBird from "/yellow_bird.PNG";
import whiteBird from "/white_bird.PNG";
import halfBird from "/half_half_bird.PNG";
import pinkBird from "/pink_bird.PNG";
import purpleBird from "/purple_bird.PNG";

function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hoveredBorough, setHoveredBorough] = useState(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const boroughRefs = useRef({
    bx: null,
    mn: null,
    si: null,
    bk: null,
    qn: null,
  });
  const canvasRefs = useRef({});
  const mapContainerRef = useRef(null);
  const boroughsSectionRef = useRef(null);

  const fullText =
    "HunterHacks is CUNY Hunter College's premier hackathon. This year's theme is New York City focused, highlighting the uniqueness of each of the cities boroughs and the problems that can be solved within them.";

  useEffect(() => {
    const targetDate = new Date("2026-04-25T18:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hasStartedTyping) return;

    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setTypewriterText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
      }
    };

    const interval = setInterval(typeWriter, typingSpeed);

    return () => clearInterval(interval);
  }, [fullText, hasStartedTyping]);

  useEffect(() => {
    if (hasStartedTyping) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStartedTyping(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      },
    );

    const currentSection = boroughsSectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasStartedTyping]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;

      const scrollPosition = window.scrollY;
      const heroSection = document.querySelector(".hero-section");

      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;

        // If in hero section (which has dark background), use light text
        if (scrollPosition < heroHeight - 100) {
          navbar.classList.remove("light-bg");
          navbar.classList.add("dark-bg");
        } else {
          // Otherwise use dark text for light background sections
          navbar.classList.remove("dark-bg");
          navbar.classList.add("light-bg");
        }
      }
    };

    handleScroll(); // Run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      question: "What is HunterHacks?",
      answer:
        "HunterHacks is a 24-48 hour Hackathon where beginner or experienced hackers can come together to ideate, design, and build projects over one exciting weekend. It is brought together by the CS Departments and CS USG clubs, and completely free of charge to attend.",
    },
    {
      question: "Is HunterHacks in-person?",
      answer:
        "HunterHacks is a hybrid event with both virtual and in-person components. However, Sunday is mandatory in-person for judging and the closing ceremony.",
    },
    {
      question: "Who can participate?",
      answer:
        "Any currently enrolled CUNY student is eligible to participate, regardless of major or coding background.",
    },
    {
      question: "How do I register?",
      answer:
        "We are accepting application through April 10, 2026. Click on 'Apply Now' up top to get started!",
    },
    {
      question: "How many people in a team?",
      answer:
        "Teams can be 2-4 people. You can sign up with a team or join solo and find others during our team formation activities after the Opening Ceremony. We'll have icebreakers, team matching sessions, and mentors available to help you find teammates before hacking begins.",
    },
    {
      question: "Do I have to submit a project?",
      answer:
        "Submitting a project is highly encouraged. You can attend workshops, network, and enjoy the experience without building something. Only submitted projects are eligible for prizes by the submission deadline.",
    },
    {
      question: "Will there be food and swag?",
      answer:
        "Absolutely! Expect meals, snacks, energy drinks, and exclusive merch. Raffles and prizes will also be available for participants who stick around through the weekend! Check the schedule for location and times.",
    },
    {
      question: "Will there be workshops?",
      answer:
        "Yes! Workshops run throughout the weekend, covering both technical and non-technical topics like coding, design (Figma), resume-building, and navigating workplace scenarios. Check the schedule for location and times.",
    },
    {
      question: "I'm interested in sponsoring. How do I get in touch?",
      answer:
        "Thank you so much for your interest! Please contact our team at cunyhunterhacks@gmail.com. Please also see our prospectus under the sponsors tab for more information.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSpotlight = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const boroughInfo = {
    bx: {
      name: "Bronx",
      subtitle:
        "Resilience & Empowerment: education, health equity, sustainability",
      bird: halfBird,
    },
    mn: {
      name: "Manhattan",
      subtitle:
        "Global Connections: finance, arts, tourism, international communities",
      bird: whiteBird,
    },
    si: {
      name: "Staten Island",
      subtitle:
        "Environment & Community: green tech, local engagement, transportation",
      bird: yellowBird,
    },
    bk: {
      name: "Brooklyn",
      subtitle:
        "Creativity & Culture: music, design, community-driven solutions",
      bird: pinkBird,
    },
    qn: {
      name: "Queens",
      subtitle:
        "Diversity in Action: multilingual tools, immigrant support, global food/health",
      bird: purpleBird,
    },
  };

  const handleImageLoad = (borough, img) => {
    if (!img) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    // Calculate bounding box of visible pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let minX = canvas.width,
      minY = canvas.height,
      maxX = 0,
      maxY = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const alpha = pixels[(y * canvas.width + x) * 4 + 3];
        if (alpha > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const centerX = (minX + maxX) / 2;

    canvasRefs.current[borough] = {
      canvas,
      ctx,
      visibleBounds: { minX, maxX, minY, maxY, centerX },
    };
  };

  const [cardPosition, setCardPosition] = useState({ top: "50%", left: "50%" });

  const handleMouseMove = (e) => {
    if (!mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const boroughs = ["bx", "mn", "si", "bk", "qn"];
    let foundBorough = null;

    for (const borough of boroughs) {
      const img = boroughRefs.current[borough];
      const canvasData = canvasRefs.current[borough];

      if (!img || !canvasData) continue;

      const imgRect = img.getBoundingClientRect();
      const containerRect = mapContainerRef.current.getBoundingClientRect();

      const imgX = x - (imgRect.left - containerRect.left);
      const imgY = y - (imgRect.top - containerRect.top);

      const scaleX = img.naturalWidth / imgRect.width;
      const scaleY = img.naturalHeight / imgRect.height;

      const canvasX = Math.floor(imgX * scaleX);
      const canvasY = Math.floor(imgY * scaleY);

      if (
        canvasX >= 0 &&
        canvasX < canvasData.canvas.width &&
        canvasY >= 0 &&
        canvasY < canvasData.canvas.height
      ) {
        const pixel = canvasData.ctx.getImageData(canvasX, canvasY, 1, 1).data;
        if (pixel[3] > 10) {
          foundBorough = borough;

          // Calculate card position - centered horizontally, above the visible area
          if (canvasData.visibleBounds) {
            const scaleX = imgRect.width / img.naturalWidth;
            const scaleY = imgRect.height / img.naturalHeight;

            const boroughCenterX =
              imgRect.left -
              containerRect.left +
              canvasData.visibleBounds.centerX * scaleX;
            const boroughTopY =
              imgRect.top -
              containerRect.top +
              canvasData.visibleBounds.minY * scaleY -
              60;

            setCardPosition({
              top: `${boroughTopY}px`,
              left: `${boroughCenterX}px`,
            });
          }
          break;
        }
      }
    }

    setHoveredBorough(foundBorough);
  };

  return (
    <div className="app">
      <nav className="navbar dark-bg">
        <div className="nav-brand">HH</div>
        <div className="nav-links">
          <a href="#hero">
            <img src={iconA} alt="A" className="nav-icon" />
            BOUT
          </a>
          <a href="#about">
            <img src={iconB} alt="B" className="nav-icon" />
            OROUGHS
          </a>
          <a href="#schedule">
            <img src={iconS} alt="S" className="nav-icon" />
            CHEDULE
          </a>
          <a href="#faq">
            <img src={iconF} alt="F" className="nav-icon" />
            AQ
          </a>
          <a href="#sponsors">
            <img src={iconS} alt="S" className="nav-icon" />
            PONSORS
          </a>
        </div>
      </nav>

      <section className="hero-section" id="hero">
        <div className="hero-title">
          <h1>
            <span className="word-hunter">Hunter</span>
            <span className="word-hacks">Hacks</span>
          </h1>
          <span className="subtitle">APRIL 25-26, 2026</span>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScpHTvrN-lQDza87mipyb7YAIR766syYSYsdgjdw8DqNMpBTg/viewform"
            className="apply-btn"
          >
            APPLY NOW
          </a>
          <div className="countdown-container">
            <div className="countdown-unit">
              <div className="countdown-value">
                {String(countdown.days)
                  .padStart(2, "0")
                  .split("")
                  .map((digit, idx) => (
                    <span key={idx} className="digit">
                      {digit}
                    </span>
                  ))}
              </div>
              <div className="countdown-label">DAYS</div>
            </div>
            <div className="countdown-unit">
              <div className="countdown-value">
                {String(countdown.hours)
                  .padStart(2, "0")
                  .split("")
                  .map((digit, idx) => (
                    <span key={idx} className="digit">
                      {digit}
                    </span>
                  ))}
              </div>
              <div className="countdown-label">HOURS</div>
            </div>
            <div className="countdown-unit">
              <div className="countdown-value">
                {String(countdown.minutes)
                  .padStart(2, "0")
                  .split("")
                  .map((digit, idx) => (
                    <span key={idx} className="digit">
                      {digit}
                    </span>
                  ))}
              </div>
              <div className="countdown-label">MINUTES</div>
            </div>
            <div className="countdown-unit">
              <div className="countdown-value">
                {String(countdown.seconds)
                  .padStart(2, "0")
                  .split("")
                  .map((digit, idx) => (
                    <span key={idx} className="digit">
                      {digit}
                    </span>
                  ))}
              </div>
              <div className="countdown-label">SECONDS</div>
            </div>
          </div>
        </div>
      </section>

      <div className="sections-wrapper">
        <section className="content-section" id="about">
          <div className="boroughs-section" ref={boroughsSectionRef}>
            <img
              src={borosTitle}
              alt="Battle of the Boroughs"
              className="section-title"
            />
            <div className="boroughs-content">
              <div className="map-container">
                <div
                  className="map-visual"
                  ref={mapContainerRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoveredBorough(null)}
                >
                  <div className="map-text-container">
                    <p
                      className={`map-description ${isTyping ? "typing" : ""}`}
                    >
                      {typewriterText}
                    </p>
                    {!isTyping && (
                      <p className="map-hint-inline">
                        Click a borough to learn more about the track.
                      </p>
                    )}
                  </div>
                  <img
                    src={boroughQN}
                    alt="Queens"
                    className={`borough-layer borough-qn ${hoveredBorough === "qn" ? "hovered" : ""}`}
                    ref={(el) => (boroughRefs.current.qn = el)}
                    onLoad={(e) => handleImageLoad("qn", e.target)}
                    crossOrigin="anonymous"
                  />
                  <img
                    src={boroughBK}
                    alt="Brooklyn"
                    className={`borough-layer borough-bk ${hoveredBorough === "bk" ? "hovered" : ""}`}
                    ref={(el) => (boroughRefs.current.bk = el)}
                    onLoad={(e) => handleImageLoad("bk", e.target)}
                    crossOrigin="anonymous"
                  />
                  <img
                    src={boroughSI}
                    alt="Staten Island"
                    className={`borough-layer borough-si ${hoveredBorough === "si" ? "hovered" : ""}`}
                    ref={(el) => (boroughRefs.current.si = el)}
                    onLoad={(e) => handleImageLoad("si", e.target)}
                    crossOrigin="anonymous"
                  />
                  <img
                    src={boroughMN}
                    alt="Manhattan"
                    className={`borough-layer borough-mn ${hoveredBorough === "mn" ? "hovered" : ""}`}
                    ref={(el) => (boroughRefs.current.mn = el)}
                    onLoad={(e) => handleImageLoad("mn", e.target)}
                    crossOrigin="anonymous"
                  />
                  <img
                    src={boroughBX}
                    alt="The Bronx"
                    className={`borough-layer borough-bx ${hoveredBorough === "bx" ? "hovered" : ""}`}
                    ref={(el) => (boroughRefs.current.bx = el)}
                    onLoad={(e) => handleImageLoad("bx", e.target)}
                    crossOrigin="anonymous"
                  />

                  {hoveredBorough && (
                    <div
                      className="borough-info-card"
                      style={{ top: cardPosition.top, left: cardPosition.left }}
                    >
                      <h3 className="borough-name">
                        {boroughInfo[hoveredBorough].name}
                      </h3>
                      <img
                        src={boroughInfo[hoveredBorough].bird}
                        alt={`${boroughInfo[hoveredBorough].name} bird`}
                        className="borough-bird"
                      />
                      <p className="borough-subtitle">
                        {boroughInfo[hoveredBorough].subtitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="schedule-section" id="schedule">
          <div className="schedule-container">
            <img src={scheduleTitle} alt="Schedule" className="section-title" />

            <div className="schedule-menus">
              <div className="schedule-day" onMouseMove={handleSpotlight}>
                <h3 className="day-title">Saturday, April 25</h3>
                <div className="schedule-item">
                  <span className="schedule-time">10:00 AM</span>
                  <h4 className="schedule-event">Doors Open | North 10th Flr&amp; Check-In</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">10:15 AM</span>
                  <h4 className="schedule-event">Team Confirmations</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">10:30 AM</span>
                  <h4 className="schedule-event">
                    Opening Remarks &amp; Breakfast
                  </h4>
                </div>
                <div className="schedule-item schedule-item--highlight">
                  <span className="schedule-time">11:00 AM</span>
                  <h4 className="schedule-event">Hacking Starts</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">11:30 AM</span>
                  <h4 className="schedule-event">Figma Workshop</h4>
                  <span className="schedule-location">HN1036</span>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">12:00 PM</span>
                  <h4 className="schedule-event">BASTA Workshop</h4>
                  <span className="schedule-location">HN1036</span>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">1:00 PM</span>
                  <h4 className="schedule-event">Lunch</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">6:00 PM</span>
                  <h4 className="schedule-event">Dinner</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">9:00 PM</span>
                  <h4 className="schedule-event">
                    Last Call to Leave Building
                  </h4>
                </div>
              </div>

              <div className="schedule-day" onMouseMove={handleSpotlight}>
                <h3 className="day-title">Sunday, April 26</h3>
                <div className="schedule-item">
                  <span className="schedule-time">10:00 AM</span>
                  <h4 className="schedule-event">Breakfast | West 8th Flr</h4>
                </div>
                <div className="schedule-item schedule-item--highlight">
                  <span className="schedule-time">11:30 AM</span>
                  <h4 className="schedule-event">Hacking Ends</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">12:00 PM</span>
                  <h4 className="schedule-event">Judge Briefing</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">12:30 PM</span>
                  <h4 className="schedule-event">Judging Begins</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">2:30 PM</span>
                  <h4 className="schedule-event">
                    Tallying Scores &amp; Lunch
                  </h4>
                </div>
                <div className="schedule-item schedule-item--highlight">
                  <span className="schedule-time">3:30 PM</span>
                  <h4 className="schedule-event">Closing Ceremony</h4>
                </div>
                <div className="schedule-item">
                  <span className="schedule-time">4:30 PM</span>
                  <h4 className="schedule-event">Clean Up &amp; Departure</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-container">
            <img src={faqTitle} alt="FAQ" className="section-title faq-title" />
            <div className="faq-list">
              <div className="faq-questions">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-question ${openFaqIndex === index ? "open" : ""}`}
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="faq-answer-container">
                {openFaqIndex !== null && (
                  <div className="faq-answer">
                    <p>{faqs[openFaqIndex].answer}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="sponsors-section" id="sponsors">
          <div className="sponsors-container">
            <img src={sponsorsTitle} alt="Sponsors" className="section-title" />
            <div className="sponsors-content">
              <div className="card-fan">
                <img
                  src="/Hunter_Card.png"
                  alt="Hunter College"
                  className="sponsor-card card-1"
                />
                <img
                  src="/Bloomberg_Card.png"
                  alt="Bloomberg"
                  className="sponsor-card card-2"
                />
                <img
                  src="/BASTA_Card.png"
                  alt="BASTA"
                  className="sponsor-card card-3"
                />
                <img
                  src="/Career_Center_Card.png"
                  alt="Sponsor"
                  className="sponsor-card card-4"
                />
                <img
                  src="/Metrocard_default.png"
                  alt="Sponsor"
                  className="sponsor-card card-5"
                />
              </div>
              <p className="sponsor-text">
                Want a custom metrocard? Become a sponsor! <br></br>Email us at{" "}
                <a
                  href="mailto:cunyhunterhacks@gmail.com"
                  className="sponsor-email"
                >
                  cunyhunterhacks@gmail.com
                </a>
                <br></br>
                <br></br>
                Please take a look at our latest prospectus{" "}
                <a
                  href="/prospectus.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-link"
                >
                  {" "}
                  here
                </a>
                !
              </p>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-social">
                <a
                  href="https://www.instagram.com/cunyhunterhacks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/cunyhunterhacks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/b5M2UCQB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
              <div className="footer-credits">
                <p className="footer-copyright">HunterHacks © Copyright 2026</p>
                <p className="footer-designer">
                  Designed and coded by Kelly Lin @ GWC
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
