import { useEffect, useRef, useState } from 'react';
import ProjectBox from './ProjectBox';
import '../styles/projects.css';

const PROJECTS = [
    { title: "JerichOS", description: "A x86 Operating System currently in development.", imageDescription: "Exploring low-level OS concepts, bootloaders, and memory.", techs: ["C", "Assembly", "Operating Systems"], image: "/cards/jerOS2.png" },
    { title: "BananaCam", description: "A machine learning powered webcam filter app for identifying bananas in real time.", imageDescription: "Real-time object detection using webcam and ML models.", techs: ["Python", "TensorFlow", "OpenCV"], image: "/cards/bancam.png" },
    { title: "TokenGuard", description: "A middleware service for assessing risk and preventing stolen tokens from accessing APIs based on IPs.", imageDescription: "Risk-based token validation and IP-based controls.", techs: ["Node.js", "Express", "Security"], image: "/cards/tokenguard.png" },
    { title: "CornCob Compiler", description: "The CornCob Compiler is a program language compiler developed to compile my professors CornCob programming language into LLVM.", imageDescription: "Compiler front-end and LLVM IR code generation.", techs: ["LLVM", "Compilers", "C++"], image: "/cards/corncob.png" },
    { title: "BOM CAT", description: "A Bill of Materials machine learning categorization tool that I lead a team to build for our capstone for DMSI.", imageDescription: "Automated BOM categorization with ML models.", techs: ["Python", "PyTorch", "ML"], image: "/cards/dmsi.png" },
    { title: "RateMyClass", description: "A MVC weba application that allows users to rate and review their classes and professors.", imageDescription: "Course & instructor ratings with user accounts.", techs: ["ASP.NET", "MVC", "SQL"], image: "/cards/ratemyclass.png" },
    { title: "UML Diagram Generator", description: "A tool for generating UML diagrams from a structured text input.", imageDescription: "Text-to-UML rendering with SVG export.", techs: ["TypeScript", "D3", "SVG"], image: "/cards/uml-gen.png" },
    { title: "Field Vision", description: "A Virtual Reality application for recruitment events that was developed as part of my first capstone.", imageDescription: "Recruitment VR experience with interactive scenes.", techs: ["Unity", "C#", "VR"], image: "/cards/kiewit.png" },
    { title: "Eye Tracking Experiment", description: "An experiment I ran as part of a class to analyze the effects of coding themes in IDEs on eye tracking metrics.", imageDescription: "Study of IDE themes and eye behavior during coding tasks.", techs: ["Python", "Eye Tracking", "Research"], image: "/cards/eye-track.jpg" },
];

const FADE = 320; // preview crossfade duration ms
const MOBILE_BP = 768; // mobile breakpoint in px
const isMobile = () => window.innerWidth <= MOBILE_BP;

function Projects() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const selectedIndexRef = useRef(selectedIndex);
    useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);
    // Shared flag: true while any programmatic scrollToCenter is animating.
    // Prevents the onScroll live-updater from clobbering the target index.
    const isAnimating = useRef(false);
    let animatingClearTimer: number | null = null;

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

    // ── core navigation ───────────────────────────────────────────────────────
    // All input sources funnel here. Never touch native scroll — everything is
    // programmatic so there's nothing to debounce or snap back from.
    const navigateTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
        // Mark animating so the scroll listener doesn't update selectedIndex mid-animation
        isAnimating.current = true;
        if (animatingClearTimer) window.clearTimeout(animatingClearTimer);
        animatingClearTimer = window.setTimeout(() => { isAnimating.current = false; }, 700);
        setSelectedIndex(index);
        scrollToCenter(index, behavior);
    };

    const navigate = (delta: number) => {
        const cur = selectedIndexRef.current;
        const nxt = Math.max(0, Math.min(PROJECTS.length - 1, cur + delta));
        if (nxt !== cur) navigateTo(nxt);
    };

    useEffect(() => {
        recalcPadding();
        scrollToCenter(selectedIndex, 'auto');
        const onResize = () => { recalcPadding(); scrollToCenter(selectedIndexRef.current, 'auto'); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // ── wheel / touchpad (covers whole component via rootRef) ─────────────────
    useEffect(() => {
        const root = rootRef.current;
        const container = containerRef.current;
        if (!root || !container || isMobile()) return;

        // LINE deltaMode, or ≥100px round-number (Windows mouse sends 120px/notch).
        // Touchpads send fractional or small pixel values.
        const isMouseWheel = (e: WheelEvent) =>
            e.deltaMode === 1 || (Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 100);

        // ── isSnapping: true while WE are animating so the scroll listener
        //    doesn't try to snap on top of our own programmatic scrollTo. ──────
        const isSnapping = { current: false };
        let snapClearTimer: number | null = null;
        const markSnapping = () => {
            isSnapping.current = true;
            if (snapClearTimer) window.clearTimeout(snapClearTimer);
            snapClearTimer = window.setTimeout(() => { isSnapping.current = false; }, 700);
        };

        // Nearest card to the container's visible centre
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

        const snapToNearest = () => {
            const closest = findClosest();
            markSnapping();
            navigateTo(closest);
        };

        // ── touchpad: drive the container natively; snap 120ms after last event ─
        let snapDebounce: number | null = null;
        const scheduleSnap = () => {
            if (snapDebounce) window.clearTimeout(snapDebounce);
            snapDebounce = window.setTimeout(() => {
                if (!isSnapping.current) snapToNearest();
            }, 120);
        };

        // Keep selected-card highlight in sync while finger is still moving
        let scrollRaf: number | null = null;
        const onScroll = () => {
            if (isSnapping.current || isAnimating.current) return;
            if (scrollRaf) return;
            scrollRaf = requestAnimationFrame(() => {
                scrollRaf = null;
                setSelectedIndex(findClosest());
            });
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isMouseWheel(e)) {
                // Mouse wheel: one notch = one card, focus is always on a card.
                markSnapping();
                navigate(Math.sign(e.deltaY));
                return;
            }
            // Touchpad: drive the container natively; snap on release.
            container.scrollBy({ top: e.deltaY, behavior: 'instant' });
            scheduleSnap();
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        root.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            container.removeEventListener('scroll', onScroll);
            root.removeEventListener('wheel', onWheel);
            if (snapClearTimer) window.clearTimeout(snapClearTimer);
            if (snapDebounce) window.clearTimeout(snapDebounce);
            if (scrollRaf) cancelAnimationFrame(scrollRaf);
        };
    }, []);

    // ── keyboard navigation ───────────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const tag = ((document.activeElement as HTMLElement)?.tagName ?? '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); navigate(1); }
            else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1); }
            else if (e.key === 'Home') { e.preventDefault(); navigateTo(0); }
            else if (e.key === 'End') { e.preventDefault(); navigateTo(PROJECTS.length - 1); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // ── render ───────────────────────────────────────────────────────────────
    return (
        <div ref={rootRef} style={{ width: '100%', height: 'calc(100vh - 80px)', overflow: 'hidden', display: 'flex' }}>
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
                                onClick={() => navigateTo(index)}
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
