import { useState, useEffect } from 'react'
import { Navbar, Container, Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            return saved === 'dark';
        }
        // Default to system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const [isScrolled, setIsScrolled] = useState(false);

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

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 50;
            const shouldBeScrolled = window.scrollY > scrollThreshold;
            if (shouldBeScrolled !== isScrolled) {
                setIsScrolled(shouldBeScrolled);
            }
        };
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isScrolled]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Responsive breakpoints
    // Hide nav text at 750px, hide all right icons (social+darkmode) at 600px
    const hideNavText = windowWidth < 600;
    const hideRightIcons = windowWidth < 400;

    // Center icons only when right icons are hidden and nav text is hidden
    const onlyIcons = hideNavText && hideRightIcons;

    return (
        <div style={{
            padding: isScrolled ? '0.5rem 1rem' : '1rem 1rem 0 1rem',
            transition: 'padding 0.3s ease',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Navbar
                bg={isDarkMode ? 'dark' : 'light'}
                variant={isDarkMode ? 'dark' : 'light'}
                className="shadow"
                style={{
                    borderRadius: isScrolled ? '15px' : '20px',
                    transition: 'all 0.3s ease',
                    padding: isScrolled ? '0.25rem 0' : '0.5rem 0'
                }}
            >
                <Container fluid className={isScrolled ? 'px-3' : 'px-4'} style={{ transition: 'padding 0.3s ease' }}>
                    <Nav className={onlyIcons ? 'mx-auto' : 'me-auto'} style={onlyIcons ? { justifyContent: 'center', width: '100%' } : {}}>
                        <Nav.Link
                            as={Link}
                            to="/"
                            className="px-3"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                fontSize: isScrolled ? '0.9rem' : '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        >
                            <img
                                src='/Favicon_Home_Black.svg'
                                alt="Home"
                                style={{
                                    width: isScrolled ? '20px' : '24px',
                                    height: isScrolled ? '20px' : '24px',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    filter: isDarkMode ? 'invert(1) brightness(0.75)' : 'invert(0) brightness(0) saturate(100%) opacity(0.55)',
                                    pointerEvents: 'none'
                                }}
                            />
                            {!hideNavText && 'Home'}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/projects"
                            className="px-3"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                fontSize: isScrolled ? '0.9rem' : '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        >
                            <img
                                src='/favicon_project.png'
                                alt="Projects"
                                style={{
                                    width: isScrolled ? '20px' : '24px',
                                    height: isScrolled ? '20px' : '24px',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    filter: isDarkMode ? 'invert(1) brightness(0.75)' : 'invert(0) brightness(0) saturate(100%) opacity(0.55)',
                                    pointerEvents: 'none'
                                }}
                            />
                            {!hideNavText && 'Projects'}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/resume"
                            className="px-3"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                fontSize: isScrolled ? '0.9rem' : '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        >
                            <img
                                src='/favicon_resume.png'
                                alt="Resume"
                                style={{
                                    width: isScrolled ? '20px' : '24px',
                                    height: isScrolled ? '20px' : '24px',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    filter: isDarkMode ? 'invert(1) brightness(0.75)' : 'invert(0) brightness(0) saturate(100%) opacity(0.55)',
                                    pointerEvents: 'none'
                                }}
                            />
                            {!hideNavText && 'Resume'}
                        </Nav.Link>
                    </Nav>
                    {!hideRightIcons && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <a
                                href="https://www.linkedin.com/in/spencer-e-lewis/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            >
                                <img
                                    src='/favicon_linkedin.png'
                                    alt="LinkedIn"
                                    style={{
                                        width: isScrolled ? '20px' : '24px',
                                        height: isScrolled ? '20px' : '24px',
                                        display: 'block',
                                        transition: 'all 0.3s ease',
                                        filter: isDarkMode ? 'invert(1) brightness(0.75)' : 'invert(0) brightness(0) saturate(100%) opacity(0.55)'
                                    }}
                                />
                            </a>
                            <a
                                href="https://github.com/SpencerELewis"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            >
                                <img
                                    src='/favicon_github.png'
                                    alt="GitHub"
                                    style={{
                                        width: isScrolled ? '20px' : '24px',
                                        height: isScrolled ? '20px' : '24px',
                                        display: 'block',
                                        transition: 'all 0.3s ease',
                                        filter: isDarkMode ? 'invert(1) brightness(0.75)' : 'invert(0) brightness(0) saturate(100%) opacity(0.55)'
                                    }}
                                />
                            </a>
                            <Button
                                variant={isDarkMode ? 'light' : 'dark'}
                                onClick={toggleTheme}
                                className="p-2"
                                style={{
                                    width: isScrolled ? '32px' : '40px',
                                    height: isScrolled ? '32px' : '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '8px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img
                                    src={isDarkMode ? '/favicon_darkmode.png' : '/favicon_lightmode (2).png'}
                                    alt="Toggle theme"
                                    style={{
                                        width: isScrolled ? '18px' : '24px',
                                        height: isScrolled ? '18px' : '24px',
                                        display: 'block',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </Button>
                        </div>
                    )}
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;