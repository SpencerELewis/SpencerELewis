import React, { useState } from 'react';
import ProjectBox from './ProjectBox';


function Projects() {
    const projects = [
        {
            title: "JerichOS",
            description: "A x86 Operating System currently in development.",
            modalDescription: "JerichOS is a custom x86 operating system project, built from scratch to explore low-level systems programming, memory management, and hardware interfacing. Features include a custom bootloader, basic multitasking, a simple shell, and FAT file system support. Developed in C and Assembly, JerichOS is a learning platform for OS concepts and hardware-software integration.",
            image: "/assets/vr-gallery-thumb.jpg",
            images: ["/assets/vr-gallery-1.jpg", "/assets/vr-gallery-2.jpg"]
        },
        {
            title: "BananaCam",
            description: "A machine learning powered webcam filter app for identifying bananas in real time.",
            image: "/assets/portfolio-thumb.jpg",
            images: ["/assets/portfolio-1.jpg", "/assets/portfolio-2.jpg"]
        },
        {
            title: "TokenGuard",
            description: "A middleware service for assessing risk and preventing stolen tokens from accessing APIs based on IPs.",
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        },
        {
            title: "CornCob Compiler",
            description: "The CornCob Compiler is a program language compiler developed to compile my professors CornCob programming language into LLVM.",
            image: "/assets/website-thumb.png",
            images: ["/assets/website-1.png", "/assets/website-2.png"]
        },
        {
            title: "BOM CAT",
            description: "A Bill of Materials machine learning categorization tool that I lead a team to build for our capstone for DMSI.",
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        },
        {
            title: "RateMyClass",
            description: "A MVC weba application that allows users to rate and review their classes and professors.",
            image: "/assets/website-thumb.png",
            images: ["/assets/website-1.png", "/assets/website-2.png"]
        },
        {
            title: "UML Diagram Generator",
            description: "A tool for generating UML diagrams from a structured text input.",
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        },
        {
            title: "Field Vision",
            description: "A Virtual Reality application for recruitment events that was developed as part of my first capstone.",
            image: "/assets/website-thumb.png",
            images: ["/assets/website-1.png", "/assets/website-2.png"]
        },
        {
            title: "Eye Tracking Experiment",
            description: "An experiment I ran as part of a class to analyze the effects of coding themes in IDEs on eye tracking metrics.",
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        }
    ];

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const displayProject = hoverIndex !== null ? projects[hoverIndex] : projects[selectedIndex];

    return (
        <div style={{ 
            width: '100%', 
            height: 'calc(100vh - 80px)', 
            overflow: 'hidden',
            display: 'flex',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                {/* Left: Scrollable list of project cards */}
                <div 
                    className="projects-scroll-container"
                    style={{
                        width: '50%',
                        minWidth: 320,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        padding: '0 2rem 2rem 2rem',
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        width: '90%',
                        paddingTop: '1rem'
                    }}>
                        {projects.map((project, index) => (
                            <ProjectBox
                                key={index}
                                title={project.title}
                                description={project.description}
                                modalDescription={project.modalDescription}
                                image={project.image}
                                images={project.images}
                                onHover={() => setHoverIndex(index)}
                                onLeave={() => setHoverIndex(null)}
                                onSelect={() => setSelectedIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Image / preview panel */}
                <div style={{
                    width: '50%',
                    minWidth: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    boxSizing: 'border-box'
                }}>
                    <div className="projects-preview" style={{ textAlign: 'center', width: '100%', maxWidth: '900px' }}>
                        <div className="preview-frame" style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img className="preview-image" src={displayProject.image} alt={displayProject.title} style={{ width: '100%', display: 'block' }} />
                        </div>
                        <h3 style={{ marginTop: '1rem' }}>{displayProject.title}</h3>
                        <p style={{ color: '#666' }}>{displayProject.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
