import { useState, useEffect } from 'react'
import { Navbar, Container, Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            return saved === 'dark';
        }
        // Default to system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const htmlElement = document.documentElement;
        
        if (isDarkMode) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            htmlElement.style.colorScheme = 'dark';
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            htmlElement.style.colorScheme = 'light';
        }
        
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div style={{ padding: '1rem 1rem 0 1rem' }}>
            <Navbar 
                bg={isDarkMode ? 'dark' : 'light'} 
                variant={isDarkMode ? 'dark' : 'light'} 
                className="shadow"
                style={{
                    borderRadius: '20px',
                    position: 'sticky',
                    top: '1rem',
                    zIndex: 1000
                }}
            >
                <Container fluid className="px-4">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
                        <Nav.Link as={Link} to="/projects" className="px-3">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/resume" className="px-3">Resume</Nav.Link>
                    </Nav>
                    <Button 
                        variant={isDarkMode ? 'light' : 'dark'}
                        onClick={toggleTheme} 
                        className="p-2"
                        style={{ 
                            width: '40px', 
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease',
                            borderRadius: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img 
                            src={isDarkMode ? '/favicon_darkmode.png' : '/favicon_lightmode (2).png'} 
                            alt="Toggle theme" 
                            style={{ 
                                width: '24px', 
                                height: '24px', 
                                display: 'block'
                            }}
                        />
                    </Button>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;