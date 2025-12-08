import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

function Home() {
  // Technology icons with their labels
  const technologies = [
    { name: 'C#', icon: '🔷', color: '#239120' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'JavaScript', icon: '📜', color: '#F7DF1E' },
    { name: 'Java', icon: '☕', color: '#007396' },
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: '.NET', icon: '🔵', color: '#512BD4' },
    { name: 'SQL Server', icon: '🗄️', color: '#CC2927' },
    { name: 'ElasticSearch', icon: '🔍', color: '#005571' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Unity', icon: '🎮', color: '#000000' },
    { name: 'C', icon: '©️', color: '#A8B9CC' },
    { name: 'Postman', icon: '📮', color: '#FF6C37' },
    { name: 'Visual Basic', icon: '🅱️', color: '#945DB7' },
    { name: 'HTML', icon: '🌐', color: '#E34F26' },
    { name: 'CSS', icon: '🎨', color: '#1572B6' },
    { name: 'Scikit Learn', icon: '🤖', color: '#F7931E' },
    { name: 'Git', icon: '📦', color: '#F05032' },
    { name: 'Plastic SCM', icon: '🔀', color: '#4CAF50' },
  ];

  return (
    <Container className="home-container">
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
                  {tech.icon}
                </span>
                <span className="tech-label">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome text below */}
        <div className="welcome-text">
          <h1>Welcome to My Portfolio</h1>
          <p>
            Explore my projects and experience across various technologies and frameworks.
            I'm passionate about building innovative solutions and continuously learning new tools.
          </p>
          <h1>About Me</h1>
          <p>
            I am a software developer with a strong background in various technologies and frameworks.
            I enjoy tackling challenging problems and creating efficient, scalable solutions.
          </p>
        </div>
      </Container>
  )
}

export default Home;
