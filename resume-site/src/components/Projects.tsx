import React, { useEffect, useRef, useState } from 'react';
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

    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const ticking = useRef(false);

    // Right-side preview shows whichever project is centered in the scroll container
    const displayProject = hoverIndex !== null ? projects[hoverIndex] : projects[selectedIndex];

    // Calculate padding so the first and last cards can be scrolled to the center
    const recalcPadding = () => {
        const container = containerRef.current;
        const firstItem = itemRefs.current[0];
        if (!container || !firstItem || !wrapperRef.current) return;
        const containerH = container.clientHeight;
        const itemH = firstItem.clientHeight;
        const pad = Math.max(0, Math.round(containerH / 2 - itemH / 2));
        wrapperRef.current.style.paddingTop = pad + 'px';
        wrapperRef.current.style.paddingBottom = pad + 'px';
    };

    const scrollToCenter = (index: number, behavior: ScrollBehavior = 'smooth') => {
        const container = containerRef.current;
        const el = itemRefs.current[index];
        if (!container || !el) return;
        const offsetTop = el.offsetTop - (container.clientHeight / 2 - el.clientHeight / 2);
        container.scrollTo({ top: offsetTop, behavior });
    };

    const updateCenteredIndex = () => {
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const containerCenterY = containerRect.top + containerRect.height / 2;

        let closestIdx = 0;
        let closestDist = Infinity;

        itemRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const elCenterY = rect.top + rect.height / 2;
            const dist = Math.abs(elCenterY - containerCenterY);
            if (dist < closestDist) {
                closestDist = dist;
                closestIdx = idx;
            }
        });

        if (closestIdx !== selectedIndex) {
            setSelectedIndex(closestIdx);
        }
    };

    useEffect(() => {
        recalcPadding();
        setTimeout(() => scrollToCenter(selectedIndex, 'auto'), 50);

        const onResize = () => {
            recalcPadding();
            scrollToCenter(selectedIndex, 'auto');
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            window.requestAnimationFrame(() => {
                updateCenteredIndex();
                ticking.current = false;
            });
        };

        // Wheel handler: snap one card per wheel gesture
        const wheelState = {
            acc: 0
        } as { acc: number };
        const wheelLock = { locked: false } as { locked: boolean };
        const WHEEL_THRESHOLD = 40; // px-ish threshold
        const ANIM_LOCK_MS = 550;

        const onWheel = (e: WheelEvent) => {
            // only handle vertical scrolling
            if (Math.abs(e.deltaY) < 0.5) return;
            // prevent native scroll for precise snapping behavior
            e.preventDefault();

            if (wheelLock.locked) return;

            wheelState.acc += e.deltaY;

            // trigger when accumulated delta exceeds threshold
            if (Math.abs(wheelState.acc) >= WHEEL_THRESHOLD) {
                const dir = wheelState.acc > 0 ? 1 : -1;
                let next = selectedIndex + dir;
                next = Math.max(0, Math.min(projects.length - 1, next));
                if (next !== selectedIndex) {
                    wheelLock.locked = true;
                    setSelectedIndex(next);
                    scrollToCenter(next, 'smooth');
                    setTimeout(() => { wheelLock.locked = false; }, ANIM_LOCK_MS);
                }
                wheelState.acc = 0;
            }
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        container.addEventListener('wheel', onWheel, { passive: false });
        updateCenteredIndex();

        return () => {
            container.removeEventListener('scroll', onScroll);
            container.removeEventListener('wheel', onWheel);
        };
    }, [projects, selectedIndex]);

    useEffect(() => {
        scrollToCenter(selectedIndex, 'smooth');
    }, [selectedIndex]);

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
                    ref={containerRef}
                    className="projects-scroll-container"
                    style={{
                        width: '50%',
                        minWidth: 320,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        padding: '0 2rem',
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        position: 'relative',
                        // preferred browser-native fallback
                        scrollSnapType: 'y mandatory',
                        overscrollBehavior: 'contain'
                    }}
                >
                    <div ref={wrapperRef} style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        width: '90%'
                    }}>
                        {projects.map((project, index) => (
                            <div key={index} ref={el => itemRefs.current[index] = el} style={{ scrollSnapAlign: 'center' }}>
                                <ProjectBox
                                    title={project.title}
                                    description={project.description}
                                    modalDescription={project.modalDescription}
                                    image={project.image}
                                    images={project.images}
                                    onHover={() => setHoverIndex(index)}
                                    onLeave={() => setHoverIndex(null)}
                                    onSelect={() => setSelectedIndex(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Image / preview panel */}
                <div className="projects-preview-column" style={{
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
