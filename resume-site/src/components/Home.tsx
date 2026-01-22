import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

function Home() {
  // Technology icons with their labels
  const technologies = [
    { name: 'C#', icon: 'csharp.png', color: '#239120' },
    { name: 'TypeScript', icon: 'typescript.png', color: '#3178C6' },
    { name: 'JavaScript', icon: 'javascript_im.png', color: '#F7DF1E' },
    { name: 'Java', icon: 'java_im.png', color: '#007396' },
    { name: 'React', icon: 'react.png', color: '#61DAFB' },
    { name: '.NET', icon: '.net.png', color: '#512BD4' },
    { name: 'SQL Server', icon: 'sqlserver.png', color: '#CC2927' },
    { name: 'ElasticSearch', icon: 'elasticsearch.png', color: '#005571' },
    { name: 'Python', icon: 'python_im.png', color: '#3776AB' },
    { name: 'Unity', icon: 'unity.png', color: '#000000' },
    { name: 'C', icon: 'c_im.png', color: '#A8B9CC' },
    { name: 'Postman', icon: 'postman-logo.png', color: '#FF6C37' },
    { name: 'Visual Basic', icon: 'vb.png', color: '#945DB7' },
    { name: 'HTML', icon: 'html_im.png', color: '#E34F26' },
    { name: 'CSS', icon: 'css.png', color: '#1572B6' },
    { name: 'Scikit Learn', icon: 'scitkit.png', color: '#F7931E' },
    { name: 'Git', icon: 'git.png', color: '#F05032' },
    { name: 'Plastic SCM', icon: 'plasticscm.png', color: '#4CAF50' },
  ];

  return (
    <Container className="home-container">
        {/* Welcome text on the left */}
        <div className="welcome-text welcome-left">
          <h1>Welcome to My Portfolio</h1>
          <p>
            Explore my projects and experience across various technologies and frameworks.
            I'm passionate about building innovative solutions and continuously learning new tools.
          </p>
        </div>

        <div className="tech-visualization">
          {/* Central circular image */}
          <div className="center-circle">
            <div className="profile-image">
              <img src="/SL-Professional-2.jpeg" alt="Spencer Lewis" />
            </div>
          </div>

          {/* Orbiting technology bubbles */}
          <div className="tech-bubbles">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="tech-bubble"
                data-index={index}
                title={tech.name}
              >
                <span className="tech-icon" style={{ filter: `drop-shadow(0 0 3px ${tech.color})` }}>
                  <img
                    src={`/coding icons/${tech.icon}`}
                    alt={tech.name}
                    style={{ objectFit: 'contain' }}
                  />
                </span>
                <span className="tech-label">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About Me text on the right */}
        <div className="welcome-text welcome-right">
          <h1>About Me</h1>
          <p>
            I am a software developer with a strong background in various technologies and frameworks.
            I enjoy tackling challenging problems and creating efficient, scalable solutions.
          </p>
          <div className="about-buttons">
            <Link to="/projects" className="about-button">
              Projects
            </Link>
            <Link to="/resume" className="about-button">
              Resume
            </Link>
          </div>
        </div>
      </Container>
  )
}

export default Home;
