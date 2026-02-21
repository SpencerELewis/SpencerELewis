import { useEffect, useRef, useState } from 'react';
import ProjectBox from './ProjectBox';
import '../styles/projects.css';

const PROJECTS = [
    { title: "JerichOS",            description: "A x86 Operating System currently in development.",                                                                imageDescription: "Exploring low-level OS concepts, bootloaders, and memory.",           techs: ["C", "Assembly", "Operating Systems"],  image: "/cards/jerOS2.png" },
    { title: "BananaCam",           description: "A machine learning powered webcam filter app for identifying bananas in real time.",                             imageDescription: "Real-time object detection using webcam and ML models.",             techs: ["Python", "TensorFlow", "OpenCV"],       image: "/cards/bancam.png" },
    { title: "TokenGuard",          description: "A middleware service for assessing risk and preventing stolen tokens from accessing APIs based on IPs.",          imageDescription: "Risk-based token validation and IP-based controls.",                 techs: ["Node.js", "Express", "Security"],       image: "/cards/tokenguard.png" },
    { title: "CornCob Compiler",    description: "The CornCob Compiler is a program language compiler developed to compile my professors CornCob programming language into LLVM.", imageDescription: "Compiler front-end and LLVM IR code generation.",  techs: ["LLVM", "Compilers", "C++"],             image: "/cards/corncob.png" },
    { title: "BOM CAT",             description: "A Bill of Materials machine learning categorization tool that I lead a team to build for our capstone for DMSI.", imageDescription: "Automated BOM categorization with ML models.",                       techs: ["Python", "PyTorch", "ML"],              image: "/cards/dmsi.png" },
    { title: "RateMyClass",         description: "A MVC weba application that allows users to rate and review their classes and professors.",                      imageDescription: "Course & instructor ratings with user accounts.",                    techs: ["ASP.NET", "MVC", "SQL"],                image: "/cards/ratemyclass.png" },
    { title: "UML Diagram Generator", description: "A tool for generating UML diagrams from a structured text input.",                                             imageDescription: "Text-to-UML rendering with SVG export.",                             techs: ["TypeScript", "D3", "SVG"],              image: "/cards/uml-gen.png" },
    { title: "Field Vision",        description: "A Virtual Reality application for recruitment events that was developed as part of my first capstone.",           imageDescription: "Recruitment VR experience with interactive scenes.",                 techs: ["Unity", "C#", "VR"],                    image: "/cards/kiewit.png" },
    { title: "Eye Tracking Experiment", description: "An experiment I ran as part of a class to analyze the effects of coding themes in IDEs on eye tracking metrics.", imageDescription: "Study of IDE themes and eye behavior during coding tasks.",    techs: ["Python", "Eye Tracking", "Research"],   image: "/cards/eye-track.jpg" },
];

const FADE = 320; // preview crossfade duration ms
const MOBILE_BP = 768; // mobile breakpoint in px
const isMobile = () => window.innerWidth <= MOBILE_BP;

function Projects() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const keyboardEnabled = useRef(false);
    const selectedIndexRef = useRef(selectedIndex);
    useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);

    // ── preview crossfade ────────────────────────────────────────────────────
    const displayProject = PROJECTS[selectedIndex];
    const [previewSrc, setPreviewSrc] = useState(displayProject.image);
    const [imgOpacity, setImgOpacity] = useState(1);
    const [previewTitle, setPreviewTitle] = useState(displayProject.title);
    const [previewDesc, setPreviewDesc] = useState(displayProject.imageDescription);
    const [textOpacity, setTextOpacity] = useState(1);
    const fadeTimer = useRef<number | null>(null);
    const crossTimer = useRef<number | null>(null);
    const textFadeTimer = useRef<number | null>(null);
    const textCrossTimer = useRef<number | null>(null);

    useEffect(() => {
        if (displayProject.image === previewSrc) { if (imgOpacity === 0) setImgOpacity(1); return; }
        setImgOpacity(0);
        if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
        fadeTimer.current = window.setTimeout(() => {
            setPreviewSrc(displayProject.image);
            if (crossTimer.current) window.clearTimeout(crossTimer.current);
            crossTimer.current = window.setTimeout(() => setImgOpacity(1), 60);
        }, FADE);
        return () => { window.clearTimeout(fadeTimer.current!); window.clearTimeout(crossTimer.current!); };
    }, [displayProject.image]);

    useEffect(() => {
        const desc = displayProject.imageDescription;
        if (displayProject.title === previewTitle && desc === previewDesc) { if (textOpacity === 0) setTextOpacity(1); return; }
        setTextOpacity(0);
        if (textFadeTimer.current) window.clearTimeout(textFadeTimer.current);
        textFadeTimer.current = window.setTimeout(() => {
            setPreviewTitle(displayProject.title);
            setPreviewDesc(desc);
            if (textCrossTimer.current) window.clearTimeout(textCrossTimer.current);
            textCrossTimer.current = window.setTimeout(() => setTextOpacity(1), 60);
        }, FADE);
        return () => { window.clearTimeout(textFadeTimer.current!); window.clearTimeout(textCrossTimer.current!); };
    }, [displayProject.title, displayProject.imageDescription]);

    // ── padding so first/last cards can reach the centre ──────────────────────
    const recalcPadding = () => {
        const container = containerRef.current;
        const firstItem = itemRefs.current[0];
        if (!container || !firstItem || !wrapperRef.current) return;
        if (isMobile()) { wrapperRef.current.style.paddingTop = '0'; wrapperRef.current.style.paddingBottom = '0'; return; }
        const pad = Math.max(0, Math.round(container.clientHeight / 2 - firstItem.clientHeight / 2));
        wrapperRef.current.style.paddingTop = pad + 'px';
        wrapperRef.current.style.paddingBottom = pad + 'px';
    };

    const scrollToCenter = (index: number, behavior: ScrollBehavior = 'smooth') => {
        if (isMobile()) return;
        const container = containerRef.current;
        const el = itemRefs.current[index];
        if (!container || !el) return;
        container.scrollTo({ top: el.offsetTop - (container.clientHeight / 2 - el.clientHeight / 2), behavior });
    };

    useEffect(() => {
        recalcPadding();
        scrollToCenter(selectedIndex, 'auto');
        const onResize = () => { recalcPadding(); scrollToCenter(selectedIndexRef.current, 'auto'); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // ── scroll snapping on desktop ───────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container || isMobile()) return;

        const scrollEndTimer = { current: null as number | null };
        // Prevent our own scrollToCenter calls from re-triggering the snap debounce.
        const isProgrammatic = { current: false };
        let programmaticTimer: number | null = null;

        const findClosest = () => {
            const mid = container.getBoundingClientRect().top + container.clientHeight / 2;
            let idx = 0, best = Infinity;
            itemRefs.current.forEach((el, i) => {
                if (!el) return;
                const d = Math.abs(el.getBoundingClientRect().top + el.clientHeight / 2 - mid);
                if (d < best) { best = d; idx = i; }
            });
            return idx;
        };

        const doSnap = () => {
            const closest = findClosest();
            // Mark programmatic so the scroll events from scrollToCenter don't re-trigger us.
            isProgrammatic.current = true;
            if (programmaticTimer) window.clearTimeout(programmaticTimer);
            programmaticTimer = window.setTimeout(() => { isProgrammatic.current = false; }, 600);
            // Always update index AND scroll to center — without the scrollTo the container
            // stays wherever momentum left it even though the highlight moved.
            setSelectedIndex(closest);
            scrollToCenter(closest, 'smooth');
        };

        // `scrollend` fires only when momentum has fully settled (no mid-fling false triggers).
        // Fall back to a short debounce on browsers that don't support it yet.
        const supportsScrollEnd = 'onscrollend' in window;

        const scheduleSnap = (delay = 150) => {
            if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
            scrollEndTimer.current = window.setTimeout(() => {
                doSnap();
                scrollEndTimer.current = null;
            }, delay);
        };

        const onScrollEnd = () => {
            if (isProgrammatic.current) return;
            if (scrollEndTimer.current) { window.clearTimeout(scrollEndTimer.current); scrollEndTimer.current = null; }
            doSnap();
        };

        // Only used as fallback on browsers without scrollend.
        let ticking = false;
        const onScroll = () => {
            if (isProgrammatic.current) return;
            if (supportsScrollEnd) return; // scrollend handles it
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                ticking = false;
                scheduleSnap(150);
            });
        };

        // Mouse wheel: LINE deltaMode, or pixel-mode with an integer delta ≥ 100px (Windows default
        // sends 120px/notch as a whole number). Touchpads report fractional deltas and smaller values,
        // so requiring both Number.isInteger and ≥ 100 keeps smooth touchpad scrolling unaffected.
        const isMouseWheel = (e: WheelEvent) => e.deltaMode === 1 || (Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 100);
        const wheelCooldown = { current: false };
        const stepByWheel = (direction: number) => {
            if (wheelCooldown.current) return;
            wheelCooldown.current = true;
            window.setTimeout(() => { wheelCooldown.current = false; }, 100);
            const cur = selectedIndexRef.current;
            const last = PROJECTS.length - 1;
            const nxt = direction > 0 ? Math.min(last, cur + 1) : Math.max(0, cur - 1);
            if (nxt === cur) return;
            isProgrammatic.current = true;
            if (programmaticTimer) window.clearTimeout(programmaticTimer);
            programmaticTimer = window.setTimeout(() => { isProgrammatic.current = false; }, 600);
            setSelectedIndex(nxt);
            scrollToCenter(nxt);
        };

        // Intercept mouse wheel events on the container so each notch = exactly one card
        const onWheelContainer = (e: WheelEvent) => {
            if (!isMouseWheel(e)) return; // touchpad: let native scroll + CSS snap handle it
            e.preventDefault();
            stepByWheel(e.deltaY);
        };

        // Forward external wheel events (right panel, etc.) into the container
        const onWheelGlobal = (e: WheelEvent) => {
            if (!container || container.contains(e.target as Node) || Math.abs(e.deltaY) < 0.5) return;
            if (isMouseWheel(e)) { stepByWheel(e.deltaY); return; }
            // Touchpad from outside: suppress the immediate synchronous scrollend that
            // behavior:'auto' fires, then let the 200ms debounce handle the final snap.
            isProgrammatic.current = true;
            container.scrollBy({ top: e.deltaY, behavior: 'auto' });
            window.setTimeout(() => { isProgrammatic.current = false; }, 0);
            scheduleSnap(200);
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        if (supportsScrollEnd) container.addEventListener('scrollend', onScrollEnd, { passive: true });
        container.addEventListener('wheel', onWheelContainer, { passive: false });
        window.addEventListener('wheel', onWheelGlobal, { passive: true });

        return () => {
            container.removeEventListener('scroll', onScroll);
            if (supportsScrollEnd) container.removeEventListener('scrollend', onScrollEnd);
            container.removeEventListener('wheel', onWheelContainer);
            window.removeEventListener('wheel', onWheelGlobal);
            if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
            if (programmaticTimer) window.clearTimeout(programmaticTimer);
        };
    }, []);

    // ── keyboard navigation ──────────────────────────────────────────────────
    useEffect(() => {
        const onDocClick = () => { keyboardEnabled.current = true; };
        const onKey = (e: KeyboardEvent) => {
            if (!keyboardEnabled.current) return;
            const tag = ((document.activeElement as HTMLElement)?.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

            const cur = selectedIndexRef.current;
            const last = PROJECTS.length - 1;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nxt = Math.min(last, cur + 1);
                if (nxt !== cur) { setSelectedIndex(nxt); scrollToCenter(nxt); }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prv = Math.max(0, cur - 1);
                if (prv !== cur) { setSelectedIndex(prv); scrollToCenter(prv); }
            } else if (e.key === 'Home') {
                e.preventDefault(); setSelectedIndex(0); scrollToCenter(0);
            } else if (e.key === 'End') {
                e.preventDefault(); setSelectedIndex(last); scrollToCenter(last);
            }
        };
        document.addEventListener('click', onDocClick);
        window.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('click', onDocClick); window.removeEventListener('keydown', onKey); };
    }, []);

    // ── render ───────────────────────────────────────────────────────────────
    return (
        <div style={{ width: '100%', height: 'calc(100vh - 80px)', overflow: 'hidden', display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                {/* Left: scrollable card list */}
                <div
                    ref={containerRef}
                    className="projects-scroll-container"
                    style={{
                        width: '50%', minWidth: 320,
                        overflowX: 'hidden', overflowY: 'auto',
                        padding: '0 2rem',
                        WebkitOverflowScrolling: 'touch',
                        scrollSnapType: 'none',
                        overscrollBehavior: 'contain',
                        scrollBehavior: isMobile() ? 'auto' : 'smooth',
                    }}
                >
                    <div ref={wrapperRef} style={{ maxWidth: 900, margin: '0 auto', width: '90%' }}>
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.title}
                                ref={el => { itemRefs.current[index] = el; }}
                                onClick={() => { setSelectedIndex(index); scrollToCenter(index); }}
                                style={{
                                    scrollSnapAlign: 'center',
                                    transition: 'transform 380ms cubic-bezier(0.2,0.8,0.2,1), opacity 300ms',
                                    transform: (!isMobile() && index === selectedIndex) ? 'scale(1.03)' : 'scale(1)',
                                    opacity: (!isMobile() && index === selectedIndex) ? 1 : isMobile() ? 1 : 0.96,
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

                {/* Right: preview panel */}
                <div className="projects-preview-column" style={{ width: '50%', minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', boxSizing: 'border-box' }}>
                    <div className="projects-preview" style={{ textAlign: 'center', width: '100%', maxWidth: 900 }}>
                        <div className="preview-frame" style={{ borderRadius: 14, overflow: 'hidden', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                className="preview-image"
                                src={previewSrc}
                                alt={displayProject.title}
                                style={{ width: 'auto', maxWidth: '100%', height: '100%', maxHeight: 'calc(100vh - 200px)', display: 'block', objectFit: 'contain', objectPosition: 'center', opacity: imgOpacity, transition: `opacity ${FADE}ms ease-in-out` }}
                            />
                        </div>
                        <h3 style={{ marginTop: '1rem', opacity: textOpacity, transform: `translateY(${textOpacity === 1 ? 0 : 6}px)`, transition: `opacity ${FADE}ms ease-in-out, transform ${FADE}ms ease-in-out` }}>{previewTitle}</h3>
                        <p style={{ color: '#666', opacity: textOpacity, transform: `translateY(${textOpacity === 1 ? 0 : 6}px)`, transition: `opacity ${FADE}ms ease-in-out, transform ${FADE}ms ease-in-out` }}>{previewDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
