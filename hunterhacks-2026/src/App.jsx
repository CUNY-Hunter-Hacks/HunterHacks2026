import { useState } from 'react'
import './App.css'

function App() {
  const [selectedBorough, setSelectedBorough] = useState(null)
  const [currentJudgeIndex, setCurrentJudgeIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const handleBoroughClick = (e, borough) => {
    e.preventDefault()
    setSelectedBorough(borough)
  }

  const judges = [
    {
      name: "Judge Name 1",
      title: "Position at Company",
      company: "Company Name",
      bio: "Brief bio coming soon..."
    },
    {
      name: "Judge Name 2",
      title: "Position at Company",
      company: "Company Name",
      bio: "Brief bio coming soon..."
    },
    {
      name: "Judge Name 3",
      title: "Position at Company",
      company: "Company Name",
      bio: "Brief bio coming soon..."
    },
    {
      name: "Judge Name 4",
      title: "Position at Company",
      company: "Company Name",
      bio: "Brief bio coming soon..."
    },
    {
      name: "Judge Name 5",
      title: "Position at Company",
      company: "Company Name",
      bio: "Brief bio coming soon..."
    },
    {
      name: "Judge Name 6",
      title: "Position at Company",
      company: "Company Name",
      bio: "Brief bio coming soon..."
    }
  ]

  const nextJudge = () => {
    setCurrentJudgeIndex((prev) => (prev + 1) % judges.length)
  }

  const prevJudge = () => {
    setCurrentJudgeIndex((prev) => (prev - 1 + judges.length) % judges.length)
  }

  const getCardWidth = () => {
    if (window.innerWidth <= 768) return 250
    if (window.innerWidth <= 1024) return 280
    return 300
  }

  const getGap = () => {
    if (window.innerWidth <= 768) return 16
    return 32
  }

  const getTranslateX = () => {
    const cardWidth = getCardWidth()
    const gap = getGap()
    return -(currentJudgeIndex * (cardWidth + gap))
  }

  const faqs = [
    {
      question: "Who can attend?",
      answer: "HunterHacks is open to all college students! Whether you're a beginner or an experienced hacker, you're welcome to join us."
    },
    {
      question: "I wasn't able to register and RSVP! Can I still participate?",
      answer: "Please reach out to us at hunterhacks@hunter.cuny.edu and we'll do our best to accommodate you!"
    },
    {
      question: "How do teams work?",
      answer: "Teams can have up to 4 members. You can form teams before the event or during our team formation session on Friday evening."
    },
    {
      question: "Do we have to submit a project if we participate?",
      answer: "Yes! All participants are expected to submit a project by the deadline on Saturday at 11:30 AM."
    },
    {
      question: "How will tracks and prizes work?",
      answer: "We'll have multiple tracks for different categories. Winners will be selected for each track and the Battle of the Boroughs competition!"
    },
    {
      question: "How much is this going to cost me?",
      answer: "HunterHacks is completely FREE! We'll provide meals, snacks, and swag throughout the event."
    },
    {
      question: "Can I volunteer to mentor?",
      answer: "Absolutely! We'd love to have you as a mentor. Please email us at hunterhacks@hunter.cuny.edu to sign up."
    },
    {
      question: "I'm interested in sponsoring HunterHacks - who can I contact?",
      answer: "We'd love to hear from you! Please reach out to our team at hunterhacks@hunter.cuny.edu for sponsorship opportunities."
    }
  ]

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#schedule">Schedule</a>
          <a href="#tracks">Tracks</a>
          <a href="#judges">Judges</a>
          <a href="#faq">FAQ</a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-title">
          <h1>
            <span className="word-hunter">Hunter</span>
            <span className="word-hacks">Hacks</span>
          </h1>
          <span className="subtitle">APRIL 25-26, 2026</span>
        </div>
      </section>

      <section className="content-section" id="about">
        <div className="boroughs-section">
          <h2 className="section-title">Battle of the Boroughs</h2>
          <div className="boroughs-content">
            <div className="map-container">
              <img src="/boro map.gif" alt="NYC Boroughs Map" className="borough-map" />
              <div className="borough-overlay">
                <a href="#bronx" className="borough-pin bronx" title="The Bronx" onClick={(e) => handleBoroughClick(e, 'The Bronx')}></a>
                <a href="#manhattan" className="borough-pin manhattan" title="Manhattan" onClick={(e) => handleBoroughClick(e, 'Manhattan')}></a>
                <a href="#queens" className="borough-pin queens" title="Queens" onClick={(e) => handleBoroughClick(e, 'Queens')}></a>
                <a href="#brooklyn" className="borough-pin brooklyn" title="Brooklyn" onClick={(e) => handleBoroughClick(e, 'Brooklyn')}></a>
                <a href="#staten-island" className="borough-pin staten-island" title="Staten Island" onClick={(e) => handleBoroughClick(e, 'Staten Island')}></a>
              </div>
            </div>

            {selectedBorough && (
              <div className="borough-info-card">
                <button className="close-btn" onClick={() => setSelectedBorough(null)}>×</button>
                <h3 className="borough-name">{selectedBorough}</h3>
                <p className="info-coming-soon">Info Coming Soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="schedule-section" id="schedule">
        <div className="schedule-container">
          <h2 className="section-title">Schedule</h2>

          <div className="schedule-day">
            <h3 className="day-title">Friday, April 25</h3>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">6:00 PM - 7:00 PM</span>
                <span className="schedule-location">Hunter North 1000</span>
              </div>
              <h4 className="schedule-event">Check-In & Opening Ceremony</h4>
            </div>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">7:30 PM</span>
              </div>
              <h4 className="schedule-event">Hacking Begins</h4>
            </div>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">8:00 PM - 9:00 PM</span>
                <span className="schedule-location">Hunter North 1001</span>
              </div>
              <h4 className="schedule-event">Team Formation</h4>
            </div>
          </div>

          <div className="schedule-day">
            <h3 className="day-title">Saturday, April 26</h3>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">10:00 AM - 11:00 AM</span>
                <span className="schedule-location">Hunter North 1000</span>
              </div>
              <h4 className="schedule-event">🍴 Brunch</h4>
            </div>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">11:30 AM</span>
              </div>
              <h4 className="schedule-event">Hacking Ends & Submissions Due</h4>
            </div>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">12:30 PM</span>
                <span className="schedule-location">Hunter North Auditorium</span>
              </div>
              <h4 className="schedule-event">Judging Begins</h4>
            </div>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">2:00 PM - 3:00 PM</span>
                <span className="schedule-location">Hunter North 1002</span>
              </div>
              <h4 className="schedule-event">Tech Panel</h4>
            </div>

            <div className="schedule-item">
              <div className="schedule-time-location">
                <span className="schedule-time">3:30 PM - 4:30 PM</span>
                <span className="schedule-location">Hunter North Auditorium</span>
              </div>
              <h4 className="schedule-event">Closing Ceremony</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="judges-section" id="judges">
        <div className="judges-container">
          <h2 className="section-title">Judges</h2>

          <div className="carousel">
            <button className="carousel-btn prev" onClick={prevJudge}>‹</button>

            <div className="carousel-wrapper">
              <div
                className="carousel-track"
                style={{ transform: `translateX(${getTranslateX()}px)` }}
              >
                {judges.map((judge, idx) => (
                  <div key={idx} className="judge-card">
                    <div className="judge-avatar">
                      {judge.name.charAt(0)}
                    </div>
                    <h3 className="judge-name">{judge.name}</h3>
                    <p className="judge-title">{judge.title}</p>
                    <p className="judge-company">{judge.company}</p>
                    <p className="judge-bio">{judge.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-btn next" onClick={nextJudge}>›</button>
          </div>

          <div className="carousel-dots">
            {judges.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentJudgeIndex ? 'active' : ''}`}
                onClick={() => setCurrentJudgeIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-container">
          <h2 className="section-title">FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openFaqIndex === index ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">›</span>
                </button>
                {openFaqIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">HunterHacks 2026</h3>
            <p className="footer-text">Hunter College's Premier Hackathon</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <p className="footer-text">hunterhacks@hunter.cuny.edu</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="footer-socials">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
        <img src="/birds_footer.png" alt="Birds" className="footer-birds" />
        <div className="footer-bottom">
          <p>&copy; 2026 HunterHacks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
