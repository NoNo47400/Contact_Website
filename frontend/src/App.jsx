import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

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

  const projects = [
    {
      id: 1,
      title: "Greenance",
      description: "Startup co-fondée pour l'analyse risque environnemental des entreprises.",
      tags: ["React", "Python", "Supabase", "Docker"],
      image: "🌿",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 2,
      title: "DeepFake Audio/Video Temps Réel",
      description: "Réalisation d'un POC capable de réaliser un deepfake audio/vidéo en temps réel avec des ressources limitées.",
      tags: ["Python", "Docker"],
      image: "📷",
      link: { url: "https://github.com/NoNo47400/DeepFake_Audio_Video_Realtime", label: "Voir sur GitHub" }
    },
    {
      id: 3,
      title: "Papier Federated Learning",
      description: "Papier co-écrit sur le Federated Learning pour la conférence EGC 2026.",
      tags: ["Python", "Flower", "PyTorch", "Pandas"],
      image: "📝",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 4,
      title: "Enseignement sur le Federated Learning",
      description: "Enseignnement en milieu industriel sur le Federated Learning et ses applications devant 80 personnes.",
      tags: ["Jupyter", "Python", "Centralized Learning", "Federated Learning"],
      image: "🧑🏻‍🏫",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 5,
      title: "Portfolio Personnel",
      description: "Site portfolio regroupant mes projets et compétences.",
      tags: ["React", "Vite", "CSS3"],
      image: "🌐",
      link: { url: "https://github.com/NoNo47400/Contact_Website", label: "Voir sur GitHub" }
    },
    {
      id: 6,
      title: "Assistant Personnel IA",
      description: "Workflow N8N hébergé sur un VPS pour automatiser des tâches quotidiennes (Gestion emploi du temps, rappels, etc.).",
      tags: ["N8N", "JavaScript", "VPS", "Docker"],
      image: "🤖",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 7,
      title: "Automatisation de veille IA",
      description: "Workflow N8N hébergé sur un VPS pour automatiser la réalisation de résumés quotidiens sur les actualités défense, technologie et finance.",
      tags: ["N8N", "JavaScript", "VPS", "Docker"],
      image: "📰",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 8,
      title: "Akinator pour Nao",
      description: "Interfacage de l'algorithme Akinator sur le robot Nao pour deviner à quel personnage l'utilisateur pense.",
      tags: ["Python", "Naoqi"],
      image: "🧞",
      link: { url: "https://github.com/NoNo47400/RO11_Akinator_Robotic_Project", label: "Voir sur GitHub" }
    },
    {
      id: 9,
      title: "Capteur intracrânien de pression connecté",
      description: "Réalisation d'un capteur de pression intracrânien connecté et implémentation du protocole Ruby (protocole militaire américain) pour la transmission sécurisée des données.",
      tags: ["C++", "Python", "ESP32", "Electronique"],
      image: "🤖",
      link: { url: "https://github.com/NoNo47400/WispersProject/tree/main", label: "Voir sur GitHub" }
    },
    {
      id: 10,
      title: "Développement d'un logiciel pour AOC Airbus",
      description: "Développement d'un logiciel de vérification de conformité de trames pour l'AOC d'Airbus.",
      tags: ["Python", "C", "DO-178C"],
      image: "✈️",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 11,
      title: "Robot de recharge autonome Continental",
      description: "Contribution au développement d'un robot de recharge autonome pour véhicules électriques.",
      tags: ["C", "Rust","Kalman", "Ultra Wide Band", "ROS2"],
      image: "🚗",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 12,
      title: "Réseau PAN UWB basse consommation",
      description: "Développement d’un réseau personnel UWB ultra-basse consommation intégrant des états de veille intelligents, réduisant la consommation globale à moins de 30µA par cycle (MCU, accéléromètre, antenne inclus).",
      tags: ["C", "STM32", "UWB", "Bare Metal"],
      image: "🔋",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 13,
      title: "Simulateur de réseau CAN",
      description: "Développement d’un simulateur de réseau CAN pour tester et valider des équipements embarqués pour le compte d'un start-up dans le secteur agricole.",
      tags: ["Python", "CAN"],
      image: "🚜",
      link: { url: null, label: "Non disponible sous GitHub" }
    },
    {
      id: 14,
      title: "Générateur automatisé de fichiers DBC",
      description: "Création d’un générateur automatisé de fichiers DBC pour faciliter l’intégration et la configuration des systèmes CAN.",
      tags: ["Python", "CAN", "DBC"],
      image: "📁",
      link: { url: null, label: "Non disponible sous GitHub" }
    }
  ]

  const hard_skills = [
    { name: "C/C++", level: 80 },
    { name: "Python", level: 85 },
    { name: "Rust", level: 70 },
    { name: "STM32/ESP32", level: 90 },
    { name: "Raspberry Pi", level: 90 },
    { name: "TensorFlow/PyTorch", level: 80 },
    { name: "Docker", level: 75 },
    { name: "Git", level: 90 }
  ]

  const soft_skills = [
    { name: "Vulgarisation scientifique", level: 90 },
    { name: "Travail en équipe multiculturelle", level: 85 },
    { name: "Médiation et résolution de conflits", level: 90 },
    { name: "Vision systémique", level: 90 }
  ]

  const experiencePro = [
    {
      id: 1,
      title: "Data Scientist (Apprentissage)",
      organization: "Stellantis",
      location: "Poissy, FR",
      period: "Sept. 2025 – Sept. 2026",
    },
    {
      id: 2,
      title: "Ingénieur logiciel embarqué (Apprentissage)",
      organization: "SII Sud-Ouest",
      location: "Toulouse, FR",
      period: "Sept. 2022 – Sept. 2025",
    },
    {
      id: 3,
      title: "Stagiaire en recherche",
      organization: "ETS Montréal & Spark Microsystems",
      location: "Montréal, QC, Canada",
      period: "Juin. 2024 – Sept. 2024",
    },
    {
      id: 4,
      title: "Stagiaire technicien supérieur",
      organization: "Agreenculture",
      location: "Toulouse, FR",
      period: "Avr. 2022 – Juil. 2022",
    }
  ]

  const experienceAcademique = [
    {
      id: 1,
      title: "Diplôme d’ingénieur en robotique",
      organization: "ENSTA Paris",
      period: "Sept. 2025 – Sept. 2026",
      details: [
        "Ingénierie système (MBSE), systèmes embarqués (MPSoC) et systèmes autonomes (apprentissage, perception, navigation)."
      ]
    },
    {
      id: 2,
      title: "Diplôme d’ingénieur en automatique et électronique",
      organization: "INSA Toulouse",
      period: "Sept. 2022 – Sept. 2025",
      details: [
        "Programmation embarquée C/C++ sur microcontrôleurs, conception de circuits électroniques, réseaux et virtualisation."
      ]
    },
    {
      id: 3,
      title: "Master de Recherche en Réseaux Embarqués et Objets Connectés",
      organization: "ENSEEIHT",
      period: "Sept. 2024 – Juil. 2025",
      details: [
        "Étude théorique, conception et analyse de réseaux pour systèmes embarqués critiques (incl. normes aéronautiques)."
      ]
    },
    {
      id: 4,
      title: "DUT Génie Électrique et Informatique Industrielle",
      organization: "IUT Paul Sabatier de Toulouse",
      period: "Sept. 2020 – Juil. 2022",
      details: [
        "Étude des concepts fondamentaux en électronique et en développement embarqué."
      ]
    }
  ]

  const readings = [
    {
      id: 1,
      category: "Startup & Entrepreneuriat",
      icon: "🚀",
      books: [
        { title: "Blitzscaling", authors: "Reid Hoffman et Chris Yeh" },
        { title: "Objectif Mars !", authors: "Bruno Martinaud et Alain Bloch" }
      ]
    },
    {
      id: 2,
      category: "Relations Humaines",
      icon: "🤝",
      books: [
        { title: "Les langages de l'amour", authors: "Gary Chapman" },
        { title: "The culture map", authors: "Erin Meyer" }
      ]
    },
    {
      id: 3,
      category: "Géopolitique",
      icon: "🌍",
      books: [
        { title: "L'aigle, le dragon et la crise planétaire", authors: "Jean-Michel Valantin" },
        { title: "L'affolement du monde", authors: "Thomas Gomart" }
      ]
    },
    {
      id: 4,
      category: "Fiction",
      icon: "📚",
      books: [
        { title: "L'appel de Cthulhu", authors: "Howard Phillips Lovecraft" },
        { title: "L'étranger", authors: "Albert Camus" },
        { title: "Bonne nuit Punpun", authors: "Inio Asano" }
      ]
    }
  ]

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
            Bonjour, je suis <br/> <span className="gradient-text">Noël Jumin</span>
          </h1>
          <p className="hero-subtitle">
            Je suis passionné d'innovation et adore découvrir, apprendre et utiliser toutes sortes de technologies
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setActiveSection('projects')}>Voir mes projets</button>
            <button className="btn btn-secondary" onClick={() => setActiveSection('contact')}>Me contacter</button>
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
                Avec mes différentes expériences, j'ai acquis une vision globale de l'ingénierie logicielle, du bas niveau avec le développement bare metal, embarqué temps réel, mais aussi à un niveau plus haut avec la data analysis et le développement web.
                Je développe aussi mes compétences en ingénierie système afin de développer une vision systèmique des projets et de comprendre leurs interactions avec leur environnement.
              </p>
              <p>
                Mon objectif est de participer à une innovation technologique significative, en contribuant à des projets qui ont un impact positif sur la société.
              </p>
              <div className="about-personal">
                <h4 className="about-personal-title">Et aussi</h4>
                <p>
                  Je suis un lecteur passionné sur des sujets variés : startup, relations humaines, géopolitique, et fiction. Consultez la <a href="#readings" onClick={() => setActiveSection('readings')} className="about-link">section Lectures</a> pour découvrir mes recommandations.
                </p>
                <p>
                  Je fais de l’impression 3D avec ma Creality Ender 3, je voyage, et je fais de la musculation régulièrement.
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
            {projects.map((project) => (
              <div key={project.id} className="project-card">
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
                {experiencePro.map((exp) => (
                  <div key={exp.id} className="experience-card">
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
                {experienceAcademique.map((exp) => (
                  <div key={exp.id} className="experience-card">
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
            {readings.map((category) => (
              <div key={category.id} className="reading-category">
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
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
            <h4>Localisation</h4>
            <p>Massy, France</p>
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
    </div>
  )
}

export default App
