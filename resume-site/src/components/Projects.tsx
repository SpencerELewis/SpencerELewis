import { useEffect, useRef, useState } from 'react';
import ProjectBox from './ProjectBox';

function Projects() {
    const projects = [
        {
            title: "JerichOS",
            description: "A x86 Operating System currently in development.",
            imageDescription: "Exploring low-level OS concepts, bootloaders, and memory.",
            techs: ["C", "Assembly"],
            image: "/assets/vr-gallery-thumb.jpg"
        },
        {
            title: "BananaCam",
            description: "A machine learning powered webcam filter app for identifying bananas in real time.",
            imageDescription: "Real-time object detection using webcam and ML models.",
            techs: ["Python", "TensorFlow"],
            image: "/assets/portfolio-thumb.jpg"
        },
        {
            title: "TokenGuard",
            description: "A middleware service for assessing risk and preventing stolen tokens from accessing APIs based on IPs.",
            imageDescription: "Risk-based token validation and IP-based controls.",
            techs: ["JavaScript", "React"],
            image: "/assets/resume-thumb.png"
        },
        {
            title: "CornCob Compiler",
            description: "The CornCob Compiler is a program language compiler developed to compile my professors CornCob programming language into LLVM.",
            imageDescription: "Compiler front-end and LLVM IR code generation.",
            techs: ["C++", "C"],
            image: "/assets/website-thumb.png"
        },
        {
            title: "BOM CAT",
            description: "A Bill of Materials machine learning categorization tool that I lead a team to build for our capstone for DMSI.",
            imageDescription: "Automated BOM categorization with ML models.",
            techs: ["Python", "Scikit Learn"],
            image: "/assets/resume-thumb.png"
        },
        {
            title: "RateMyClass",
            description: "A MVC web application that allows users to rate and review their classes and professors.",
            imageDescription: "Course & instructor ratings with user accounts.",
            techs: ["C#", ".NET"],
            image: "/assets/website-thumb.png"
        },
        {
            title: "UML Diagram Generator",
            description: "A tool for generating UML diagrams from a structured text input.",
            imageDescription: "Text-to-UML rendering with SVG export.",
            techs: ["TypeScript", "JavaScript"],
            image: "/assets/resume-thumb.png"
        },
        {
            title: "Field Vision",
            description: "A Virtual Reality application for recruitment events that was developed as part of my first capstone.",
            imageDescription: "Recruitment VR experience with interactive scenes.",
            techs: ["Unity", "C#"],
            image: "/assets/website-thumb.png"
        },
        {
            title: "Eye Tracking Experiment",
            description: "An experiment I ran as part of a class to analyze the effects of coding themes in IDEs on eye tracking metrics.",
            imageDescription: "Study of IDE themes and eye behavior during coding tasks.",
            techs: ["Python", "Git"],
            image: "/assets/resume-thumb.png"
        }
    ];

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

    // Handle wheel scrolling to change selected project
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            
            const delta = e.deltaY;
            const threshold = 50; // Sensitivity threshold
            
            if (Math.abs(delta) > threshold) {
                if (delta > 0 && selectedIndex < projects.length - 1) {
                    setSelectedIndex(selectedIndex + 1);
                } else if (delta < 0 && selectedIndex > 0) {
                    setSelectedIndex(selectedIndex - 1);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [selectedIndex, projects.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    if (selectedIndex < projects.length - 1) {
                        setSelectedIndex(selectedIndex + 1);
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    if (selectedIndex > 0) {
                        setSelectedIndex(selectedIndex - 1);
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    setSelectedIndex(0);
                    break;
                case 'End':
                    e.preventDefault();
                    setSelectedIndex(projects.length - 1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, projects.length]);

    // Scroll the selected item into view
    const scrollToSelected = () => {
        const container = containerRef.current;
        const selectedElement = itemRefs.current[selectedIndex];
        
        if (container && selectedElement) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = selectedElement.getBoundingClientRect();
            
            const containerCenter = containerRect.top + containerRect.height / 2;
            const elementCenter = elementRect.top + elementRect.height / 2;
            const offset = elementCenter - containerCenter;
            
            container.scrollBy({
                top: offset,
                behavior: 'smooth'
            });
        }
    };

    // Scroll to selected project when index changes
    useEffect(() => {
        scrollToSelected();
    }, [selectedIndex]);

    // Handle project selection by clicking
    const handleProjectClick = (index: number) => {
        setSelectedIndex(index);
    };

    // Handle image loading states
    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageLoadStart = () => {
        setImageLoading(true);
    };

    const currentProject = projects[selectedIndex];

    return (
        <div style={{ 
            width: '100%', 
            height: 'calc(100vh - 80px)', 
            display: 'flex',
            overflow: 'hidden',
            background: 'var(--bs-body-bg)',
        }}>
            {/* Left Side - Scrollable Projects */}
            <div 
                ref={containerRef}
                style={{
                    width: '50%',
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    padding: '2rem',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    paddingTop: '10vh',
                    paddingBottom: '10vh',
                }}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={el => { itemRefs.current[index] = el; }}
                            onClick={() => handleProjectClick(index)}
                            style={{
                                marginBottom: '3rem',
                                transition: 'all 0.3s ease',
                                transform: index === selectedIndex ? 'scale(1.05)' : 'scale(1)',
                                opacity: index === selectedIndex ? 1 : 0.7,
                                cursor: 'pointer',
                            }}
                        >
                            <ProjectBox
                                title={project.title}
                                description={project.description}
                                techs={project.techs}
                                isSelected={index === selectedIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Project Image Display */}
            <div style={{
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem',
                background: 'var(--bs-secondary-bg, #f8f9fa)',
                boxSizing: 'border-box',
            }}>
                <div style={{
                    maxWidth: '100%',
                    width: '100%',
                    textAlign: 'center',
                }}>
                    {/* Image Container */}
                    <div style={{
                        position: 'relative',
                        marginBottom: '2rem',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 50px rgba(0, 0, 0, 0.15)',
                        background: '#000',
                        aspectRatio: '16 / 10',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {imageLoading && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#fff',
                                fontSize: '1rem',
                            }}>
                                Loading...
                            </div>
                        )}
                        <img
                            key={currentProject.image} // Force re-render on image change
                            src={currentProject.image}
                            alt={currentProject.title}
                            onLoadStart={handleImageLoadStart}
                            onLoad={handleImageLoad}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'opacity 0.3s ease',
                                opacity: imageLoading ? 0 : 1,
                            }}
                        />
                    </div>

                    {/* Project Info */}
                    <h2 style={{
                        margin: '0 0 1rem 0',
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: 'var(--bs-body-color)',
                    }}>
                        {currentProject.title}
                    </h2>
                    
                    <p style={{
                        margin: '0 0 1.5rem 0',
                        fontSize: '1.1rem',
                        color: 'var(--bs-secondary-color)',
                        lineHeight: '1.6',
                        maxWidth: '400px',
                        margin: '0 auto',
                    }}>
                        {currentProject.imageDescription}
                    </p>

                    {/* Project Navigation Indicators */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        marginTop: '2rem',
                    }}>
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    border: 'none',
                                    borderRadius: '50%',
                                    background: index === selectedIndex 
                                        ? 'var(--bs-primary)' 
                                        : 'var(--bs-border-color)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: index === selectedIndex ? 'scale(1.2)' : 'scale(1)',
                                }}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
