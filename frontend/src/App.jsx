import { useState, useEffect } from 'react'
import './App.css'
import ChatBubble from './components/ChatBubble'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLocationFlipped, setIsLocationFlipped] = useState(false)
  const [flippedProjectIndex, setFlippedProjectIndex] = useState(null)
  
  // États pour les données chargées depuis les JSON
  const [projects, setProjects] = useState([])
  const [hard_skills, setHardSkills] = useState([])
  const [soft_skills, setSoftSkills] = useState([])
  const [experiencePro, setExperiencePro] = useState([])
  const [experienceAcademique, setExperienceAcademique] = useState([])
  const [readings, setReadings] = useState([])

  // Charger les données depuis les fichiers JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsRes, skillsRes, experienceRes, readingsRes] = await Promise.all([
          fetch('/data/projects.json'),
          fetch('/data/skills.json'),
          fetch('/data/experience.json'),
          fetch('/data/readings.json')
        ])

        const projectsData = await projectsRes.json()
        const skillsData = await skillsRes.json()
        const experienceData = await experienceRes.json()
        const readingsData = await readingsRes.json()

        setProjects(projectsData)
        setHardSkills(skillsData.hardSkills)
        setSoftSkills(skillsData.softSkills)
        setExperiencePro(experienceData.professional)
        setExperienceAcademique(experienceData.academic)
        setReadings(readingsData)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Créer un observer pour détecter les sections visibles
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observer toutes les sections
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <h2 className="logo">Mon Portfolio</h2>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => setActiveSection('home')} className={activeSection === 'home' ? 'active' : ''}>Accueil</a></li>
            <li><a href="#about" onClick={() => setActiveSection('about')} className={activeSection === 'about' ? 'active' : ''}>À propos</a></li>
            <li><a href="#projects" onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projets</a></li>
            <li><a href="#experience" onClick={() => setActiveSection('experience')} className={activeSection === 'experience' ? 'active' : ''}>Expérience</a></li>
            <li><a href="#readings" onClick={() => setActiveSection('readings')} className={activeSection === 'readings' ? 'active' : ''}>Lectures</a></li>
            <li><a href="#contact" onClick={() => setActiveSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bonjour, je suis <br/> <span className="gradient-text" itemProp="name">Noël Jumin</span>
          </h1>
          <div className="status-badge">
            <span className="status-dot pulsing"></span>
            🔍 Recherche CDI/Mission · Disponible Octobre 2026
          </div>
          <p className="hero-subtitle">
            Je suis passionné d'innovation et adore découvrir, apprendre et utiliser toutes sortes de technologies
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={() => setActiveSection('projects')}>Voir mes projets</a>
            <a href="#contact" className="btn btn-secondary" onClick={() => setActiveSection('contact')}>Me contacter</a>
          </div>
        </div>
        <div className="hero-animation">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">À propos de moi</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Passionné de technologies, je développe différents types de projets, passant des applications web à des solutions embarquées. 
                J'aime relever des défis techniques et apprendre de nouvelles compétences.
              </p>
              <p>
                Avec mes différentes expériences, j'ai acquis une vision globale de l'ingénierie logicielle, du bas niveau avec le développement bare metal et embarqué temps réel, jusqu'au niveau applicatif avec l'analyse de données et le développement web.
                Je développe également mes compétences en ingénierie système afin d'acquérir une vision systémique des projets et de comprendre leurs interactions avec leur environnement.
              </p>
              <p>
                Mon objectif est de participer à des innovations technologiques significatives qui ont un impact positif sur la société. J'aspire à travailler dans un environnement stimulant où je peux continuer à apprendre tout en contribuant au développement de solutions innovantes et souveraines.
              </p>
              <div className="about-personal">
                <h4 className="about-personal-title">Et aussi</h4>
                <p>
                  Sur mon temps libre, je suis un lecteur passionné sur des sujets variés : startup, relations humaines, géopolitique, et fiction. Consultez la <a href="#readings" onClick={() => setActiveSection('readings')} className="about-link">section Lectures</a> pour découvrir mes recommandations.
                </p>
                <p>
                  J'aime aussi réaliser des impressions 3D avec ma propre imprimante (Creality Ender 3), ce qui me permet de concrétiser mes idées et de créer des objets personnalisés.
                </p>
                <p>
                  J'accorde également une grande importance à ma santé physique et mentale, en pratiquant régulièrement de la musculation et en voyageant pour découvrir de nouvelles cultures et perspectives.
                </p>
                <p>
                  Je travaille également mes capacités logique et créative à travers les jeux vidéo dans lesquels je puise une partie de mon inspiration.
                  En parallèle, je développe aussi ces mêmes capacités lors de sessions de jeu de société avec mes amis où j'applique mes compétences en stratégie, créativité et médiation.
                </p>
              </div>
            </div>
            <div className="skills-container">
              <div className="hard-skills-section">
                <h3 className="skills-subtitle">Hard Skills</h3>
                <div className="hard-skills-grid">
                  {hard_skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="soft-skills-section">
                <h3 className="skills-subtitle">Soft Skills</h3>
                <div className="soft-skills-grid">
                  {soft_skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Mes Projets</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              project.summary ? (
                <div 
                  key={index} 
                  className="project-card project-card-flip"
                  onClick={() => setFlippedProjectIndex(flippedProjectIndex === index ? null : index)}
                >
                  <div className={`project-card-inner ${flippedProjectIndex === index ? 'flipped' : ''}`}>
                    <div className="project-card-front">
                      <div className="project-icon">{project.image}</div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                      {project.link.url ? (
                        <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="btn btn-small" onClick={(e) => e.stopPropagation()}>
                          {project.link.label}
                        </a>
                      ) : (
                        <button className="btn btn-small btn-disabled" disabled onClick={(e) => e.stopPropagation()}>
                          {project.link.label}
                        </button>
                      )}
                    </div>
                    <div className="project-card-back">
                      <div className="project-summary" dangerouslySetInnerHTML={{ __html: project.summary }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="project-card">
                  <div className="project-icon">{project.image}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  {project.link.url ? (
                    <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="btn btn-small">
                      {project.link.label}
                    </a>
                  ) : (
                    <button className="btn btn-small btn-disabled" disabled>
                      {project.link.label}
                    </button>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title">Expérience</h2>
          <div className="experience-grid">
            <div className="experience-column">
              <h3 className="experience-subtitle">Expérience professionnelle</h3>
              <div className="experience-list">
                {experiencePro.map((exp, index) => (
                  <div key={index} className="experience-card">
                    <div className="experience-header">
                      <h4 className="experience-role">{exp.title}</h4>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                    <div className="experience-org">
                      <span className="experience-company">{exp.organization}</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="experience-column">
              <h3 className="experience-subtitle">Expérience académique</h3>
              <div className="experience-list">
                {experienceAcademique.map((exp, index) => (
                  <div key={index} className="experience-card">
                    <div className="experience-header">
                      <h4 className="experience-role">{exp.title}</h4>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                    <div className="experience-org">
                      <span className="experience-company">{exp.organization}</span>
                    </div>
                    <ul className="experience-details">
                      {exp.details.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Readings Section */}
      <section id="readings" className="readings">
        <div className="container">
          <h2 className="section-title">Mes Lectures Favorites</h2>
          <div className="readings-grid">
            {readings.map((category, index) => (
              <div key={index} className="reading-category">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-title">{category.category}</h3>
                </div>
                <div className="books-list">
                  {category.books.map((book, index) => (
                    <div key={index} className="book-item">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">{book.authors}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Contactez-moi</h2>
            <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">💼</span>
              <div>
            <h4>LinkedIn</h4>
            <a href="https://www.linkedin.com/in/noël-jumin-32bb6420a/" target="_blank" rel="noopener noreferrer">
              Voir mon profil
            </a>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💻</span>
              <div>
            <h4>GitHub</h4>
            <a href="https://github.com/NoNo47400" target="_blank" rel="noopener noreferrer">
              Voir mon profil
            </a>
              </div>
            </div>
            <div className="info-item info-item-flip" onClick={() => setIsLocationFlipped(!isLocationFlipped)}>
              <div className={`info-item-inner ${isLocationFlipped ? 'flipped' : ''}`}>
                <div className="info-item-front">
                  <span className="info-icon">📍</span>
                  <div>
                    <h4>Localisation</h4>
                    <p>Massy, France</p>
                  </div>
                </div>
                <div className="info-item-back">
                  <span className="info-icon">🗺️</span>
                  <div>
                    <h4>Zones de mobilité</h4>
                    <ul className="location-list">
                      <li>Île-de-France</li>
                      <li>Occitanie (Toulouse)</li>
                      <li>Full Remote accepté</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
            <h4>Email</h4>
            <a href="mailto:noel.jumin@gmail.com">noel.jumin@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="contact-cv">
            <a href="/data/CV_Noel_Jumin.pdf" download className="btn btn-primary btn-cv">
              📄 Télécharger mon CV
            </a>
          </div>
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Mon Portfolio.</p>
        <div className="social-links">
          <a href="https://github.com/NoNo47400" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/noël-jumin-32bb6420a/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          <a href="mailto:noel.jumin@gmail.com" className="social-link">Mail</a>
        </div>
      </footer>

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  )
}

export default App
