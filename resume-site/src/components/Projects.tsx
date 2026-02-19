import { useEffect, useRef, useState } from 'react';
import ProjectBox from './ProjectBox';


function Projects() {
    const projects = [
        {
            title: "JerichOS",
            description: "A x86 Operating System currently in development.",
            imageDescription: "Exploring low-level OS concepts, bootloaders, and memory.",
            techs: ["C", "Assembly", "Operating Systems"],
            image: "/cards/jerOS2.png",
            images: ["/assets/vr-gallery-1.jpg", "/assets/vr-gallery-2.jpg"]
        },
        
        {
            title: "BananaCam",
            description: "A machine learning powered webcam filter app for identifying bananas in real time.",
            imageDescription: "Real-time object detection using webcam and ML models.",
            techs: ["Python", "TensorFlow", "OpenCV"],
            image: "/assets/portfolio-thumb.jpg",
            images: ["/assets/portfolio-1.jpg", "/assets/portfolio-2.jpg"]
        },
        {
            title: "TokenGuard",
            description: "A middleware service for assessing risk and preventing stolen tokens from accessing APIs based on IPs.",
            imageDescription: "Risk-based token validation and IP-based controls.",
            techs: ["Node.js", "Express", "Security"],
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        },
        {
            title: "CornCob Compiler",
            description: "The CornCob Compiler is a program language compiler developed to compile my professors CornCob programming language into LLVM.",
            imageDescription: "Compiler front-end and LLVM IR code generation.",
            techs: ["LLVM", "Compilers", "C++"],
            image: "/assets/website-thumb.png",
            images: ["/assets/website-1.png", "/assets/website-2.png"]
        },
        {
            title: "BOM CAT",
            description: "A Bill of Materials machine learning categorization tool that I lead a team to build for our capstone for DMSI.",
            imageDescription: "Automated BOM categorization with ML models.",
            techs: ["Python", "PyTorch", "ML"],
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        },
        {
            title: "RateMyClass",
            description: "A MVC weba application that allows users to rate and review their classes and professors.",
            imageDescription: "Course & instructor ratings with user accounts.",
            techs: ["ASP.NET", "MVC", "SQL"],
            image: "/assets/website-thumb.png",
            images: ["/assets/website-1.png", "/assets/website-2.png"]
        },
        {
            title: "UML Diagram Generator",
            description: "A tool for generating UML diagrams from a structured text input.",
            imageDescription: "Text-to-UML rendering with SVG export.",
            techs: ["TypeScript", "D3", "SVG"],
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        },
        {
            title: "Field Vision",
            description: "A Virtual Reality application for recruitment events that was developed as part of my first capstone.",
            imageDescription: "Recruitment VR experience with interactive scenes.",
            techs: ["Unity", "C#", "VR"],
            image: "/assets/website-thumb.png",
            images: ["/assets/website-1.png", "/assets/website-2.png"]
        },
        {
            title: "Eye Tracking Experiment",
            description: "An experiment I ran as part of a class to analyze the effects of coding themes in IDEs on eye tracking metrics.",
            imageDescription: "Study of IDE themes and eye behavior during coding tasks.",
            techs: ["Python", "Eye Tracking", "Research"],
            image: "/assets/resume-thumb.png",
            images: ["/assets/resume-1.png", "/assets/resume-2.png"]
        }
    ];

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const ticking = useRef(false);

    // Shared wheel state refs so we can handle wheel gestures from anywhere on the page
    const wheelAcc = useRef(0);
    // Enable keyboard navigation after a click anywhere on the page
    const keyboardEnabled = useRef(false);
    const selectedIndexRef = useRef(selectedIndex);
    useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);

    // Mobile detection (matches CSS breakpoint: max-width: 768px)
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 768px)').matches : false);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else mq.addListener(onChange);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', onChange);
            else mq.removeListener(onChange);
        };
    }, []);

    // Timer to detect scroll end on mobile and snap to closest card
    const scrollEndTimer = useRef<number | null>(null);
    // Track whether the user currently has touch contact so we only snap after release
    const isTouching = useRef(false);

    // Right-side preview shows whichever project is centered in the scroll container
    const displayProject = projects[selectedIndex];
    // preview image crossfade state
    const fadeDuration = 320; // ms
    const [previewSrc, setPreviewSrc] = useState<string>(displayProject.image);
    const [imgOpacity, setImgOpacity] = useState<number>(1);
    const fadeTimer = useRef<number | null>(null);
    const crossTimer = useRef<number | null>(null);

    useEffect(() => {
        // If the preview already matches the requested project, ensure it's visible
        if (displayProject.image === previewSrc) {
            if (imgOpacity === 0) setImgOpacity(1);
            return;
        }
        // fade out then swap image and fade in
        setImgOpacity(0);
        if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
        fadeTimer.current = window.setTimeout(() => {
            setPreviewSrc(displayProject.image);
            // tiny delay then fade in
            if (crossTimer.current) window.clearTimeout(crossTimer.current);
            crossTimer.current = window.setTimeout(() => setImgOpacity(1), 60);
        }, fadeDuration);

        return () => {
            if (fadeTimer.current) { window.clearTimeout(fadeTimer.current); fadeTimer.current = null; }
            if (crossTimer.current) { window.clearTimeout(crossTimer.current); crossTimer.current = null; }
        };
    }, [displayProject.image, previewSrc, imgOpacity]);

    // preview text crossfade state (prior text fades out, then new fades in)
    const [previewTitle, setPreviewTitle] = useState<string>(displayProject.title);
    const [previewDesc, setPreviewDesc] = useState<string>(displayProject.imageDescription || '');
    const [textOpacity, setTextOpacity] = useState<number>(1);
    const textFadeTimer = useRef<number | null>(null);
    const textCrossTimer = useRef<number | null>(null);

    useEffect(() => {
        const desc = displayProject.imageDescription || '';
        if (displayProject.title === previewTitle && desc === previewDesc) {
            if (textOpacity === 0) setTextOpacity(1);
            return;
        }
        // fade out current text
        setTextOpacity(0);
        if (textFadeTimer.current) window.clearTimeout(textFadeTimer.current);
        textFadeTimer.current = window.setTimeout(() => {
            // swap to new text
            setPreviewTitle(displayProject.title);
            setPreviewDesc(desc);
            // then fade in
            if (textCrossTimer.current) window.clearTimeout(textCrossTimer.current);
            textCrossTimer.current = window.setTimeout(() => setTextOpacity(1), 60);
        }, fadeDuration);

        return () => {
            if (textFadeTimer.current) { window.clearTimeout(textFadeTimer.current); textFadeTimer.current = null; }
            if (textCrossTimer.current) { window.clearTimeout(textCrossTimer.current); textCrossTimer.current = null; }
        };
    }, [displayProject.title, displayProject.imageDescription, previewTitle, previewDesc, textOpacity]);

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

    const updateCenteredIndex = (commit = true) => {
        const container = containerRef.current;
        if (!container) return 0;
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

        if (commit) {
            if (closestIdx !== selectedIndex) {
                setSelectedIndex(closestIdx);
            }
        }
        return closestIdx;
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
                // do not commit while the user is actively touching/dragging
                const closest = updateCenteredIndex(!isTouching.current);
                ticking.current = false;

                if (isMobile) {
                    if (isTouching.current) {
                        // user is still touching — don't schedule snap yet
                        if (scrollEndTimer.current) { window.clearTimeout(scrollEndTimer.current); scrollEndTimer.current = null; }
                    } else {
                        // debounce scroll end: when scrolling stops, snap to nearest card
                        if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
                        scrollEndTimer.current = window.setTimeout(() => {
                            scrollToCenter(closest, 'smooth');
                            scrollEndTimer.current = null;
                        }, 150);
                    }
                }
            });
        };

        const WHEEL_THRESHOLD = 40; // px-ish threshold

        const handleWheelDelta = (deltaY: number) => {
            if (Math.abs(deltaY) < 0.5) return;
            wheelAcc.current += deltaY;

            // trigger when accumulated delta exceeds threshold
            if (Math.abs(wheelAcc.current) >= WHEEL_THRESHOLD) {
                const dir = wheelAcc.current > 0 ? 1 : -1;
                let next = selectedIndex + dir;
                next = Math.max(0, Math.min(projects.length - 1, next));
                if (next !== selectedIndex) {
                    setSelectedIndex(next);
                    scrollToCenter(next, 'smooth');
                }
                wheelAcc.current = 0;
            }
        };

        const onWheel = (e: WheelEvent) => {
            // only handle vertical scrolling
            if (Math.abs(e.deltaY) < 0.5) return;
            // prevent native scroll for precise snapping behavior
            e.preventDefault();
            handleWheelDelta(e.deltaY);
        };

        // Global handler: allow scrolling the left projects column from anywhere on the page
        const onWheelGlobal = (e: WheelEvent) => {
            // if the event originated inside the container, let it handle the event
            if (container.contains(e.target as Node)) return;
            if (Math.abs(e.deltaY) < 0.5) return;
            e.preventDefault();
            handleWheelDelta(e.deltaY);
        };

        const onTouchStart = () => { isTouching.current = true; if (scrollEndTimer.current) { window.clearTimeout(scrollEndTimer.current); scrollEndTimer.current = null; } };
        const onTouchEnd = () => {
            isTouching.current = false;
            // snap to closest after a short delay so momentum settles
            const closest = updateCenteredIndex();
            if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
            scrollEndTimer.current = window.setTimeout(() => {
                scrollToCenter(closest, 'smooth');
                scrollEndTimer.current = null;
            }, 120);
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        container.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('wheel', onWheelGlobal, { passive: false });

        // touch/pointer events to detect contact and only snap after release
        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchend', onTouchEnd, { passive: true });
        container.addEventListener('pointerdown', onTouchStart, { passive: true });
        container.addEventListener('pointerup', onTouchEnd, { passive: true });

        updateCenteredIndex();

        return () => {
            container.removeEventListener('scroll', onScroll);
            container.removeEventListener('wheel', onWheel);
            window.removeEventListener('wheel', onWheelGlobal);
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchend', onTouchEnd);
            container.removeEventListener('pointerdown', onTouchStart);
            container.removeEventListener('pointerup', onTouchEnd);
            if (scrollEndTimer.current) { window.clearTimeout(scrollEndTimer.current); scrollEndTimer.current = null; }
        };
    }, [projects, selectedIndex, isMobile]);

    // Enable Arrow key navigation after the user clicks anywhere on the page
    useEffect(() => {
        const onDocumentClick = () => { keyboardEnabled.current = true; };
        const onKeyDown = (e: KeyboardEvent) => {
            if (!keyboardEnabled.current) return;

            const active = document.activeElement as HTMLElement | null;
            const tag = (active?.tagName || '').toLowerCase();
            const isInput = tag === 'input' || tag === 'textarea' || tag === 'select' || (active?.isContentEditable);
            if (isInput) return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const next = Math.min(projects.length - 1, selectedIndexRef.current + 1);
                if (next !== selectedIndexRef.current) { setSelectedIndex(next); scrollToCenter(next, 'smooth'); }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = Math.max(0, selectedIndexRef.current - 1);
                if (prev !== selectedIndexRef.current) { setSelectedIndex(prev); scrollToCenter(prev, 'smooth'); }
            } else if (e.key === 'Home') {
                e.preventDefault();
                setSelectedIndex(0); scrollToCenter(0, 'smooth');
            } else if (e.key === 'End') {
                e.preventDefault();
                setSelectedIndex(projects.length - 1); scrollToCenter(projects.length - 1, 'smooth');
            }
        };

        document.addEventListener('click', onDocumentClick);
        window.addEventListener('keydown', onKeyDown);
        return () => { document.removeEventListener('click', onDocumentClick); window.removeEventListener('keydown', onKeyDown); };
    }, [projects.length]);

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
                            <div key={index} ref={el => { itemRefs.current[index] = el; }} style={{
                                scrollSnapAlign: 'center',
                                transition: 'transform 380ms cubic-bezier(0.2,0.8,0.2,1), opacity 300ms',
                                transform: index === selectedIndex ? 'scale(1.03)' : 'scale(1)',
                                opacity: index === selectedIndex ? 1 : 0.96
                            }}>
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
                        <div className="preview-frame" style={{
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: 'none',           // removed shadow
    background: 'transparent',   // make frame transparent
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}}>
    <img
        className="preview-image"
        src={previewSrc}
        alt={displayProject.title}
        style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            background: 'transparent',               // ensure no background shows
            objectFit: 'contain',
            opacity: imgOpacity,
            transition: `opacity ${fadeDuration}ms ease-in-out`
        }}
    />
</div>
                        <h3 style={{
                            marginTop: '1rem',
                            opacity: textOpacity,
                            transform: `translateY(${textOpacity === 1 ? 0 : 6}px)`,
                            transition: `opacity ${fadeDuration}ms ease-in-out, transform ${fadeDuration}ms ease-in-out`
                        }}>{previewTitle}</h3>
                        <p style={{
                            color: '#666',
                            opacity: textOpacity,
                            transform: `translateY(${textOpacity === 1 ? 0 : 6}px)`,
                            transition: `opacity ${fadeDuration}ms ease-in-out, transform ${fadeDuration}ms ease-in-out`
                        }}>{previewDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
