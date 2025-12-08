import ProjectBox from './ProjectBox';


function Projects() {
    return (
        <div style={{ width: '100%', padding: '40px 0' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Projects</h1>
            <div style={{ maxWidth: '1300px', margin: '0 auto', width: '90%' }}>
                <ProjectBox
                    title="JerichOS"
                    description="A x86 Operating System currently in development."
                    modalDescription="JerichOS is a custom x86 operating system project, built from scratch to explore low-level systems programming, memory management, and hardware interfacing. Features include a custom bootloader, basic multitasking, a simple shell, and FAT file system support. Developed in C and Assembly, JerichOS is a learning platform for OS concepts and hardware-software integration."
                    image="/assets/vr-gallery-thumb.jpg"
                    images={["/assets/vr-gallery-1.jpg", "/assets/vr-gallery-2.jpg"]}
                />
                <ProjectBox
                    title="BananaCam"
                    description="A machine learning powered webcam filter app for identifying bananas in real time."
                    image="/assets/portfolio-thumb.jpg"
                    images={["/assets/portfolio-1.jpg", "/assets/portfolio-2.jpg"]}
                />
                <ProjectBox
                    title="TokenGuard"
                    description="A middleware service for assessing risk and preventing stolen tokens from accessing APIs based on IPs."
                    image="/assets/resume-thumb.png"
                    images={["/assets/resume-1.png", "/assets/resume-2.png"]}
                />
                <ProjectBox
                    title="CornCob Compiler"
                    description="The CornCob Compiler is a program language compiler developed to compile my professors CornCob programming language into LLVM."
                    image="/assets/website-thumb.png"
                    images={["/assets/website-1.png", "/assets/website-2.png"]}
                />
                <ProjectBox
                    title="BOM CAT"
                    description="A Bill of Materials machine learning categorization tool that I lead a team to build for our capstone for DMSI."
                    image="/assets/resume-thumb.png"
                    images={["/assets/resume-1.png", "/assets/resume-2.png"]}
                />
                <ProjectBox
                    title="RateMyClass"
                    description="A MVC weba application that allows users to rate and review their classes and professors."
                    image="/assets/website-thumb.png"
                    images={["/assets/website-1.png", "/assets/website-2.png"]}
                />
                <ProjectBox
                    title="UML Diagram Generator"
                    description="A tool for generating UML diagrams from a structured text input."
                    image="/assets/resume-thumb.png"
                    images={["/assets/resume-1.png", "/assets/resume-2.png"]}
                />
                <ProjectBox
                    title="Field Vision"
                    description="A Virtual Reality application for recruitment events that was developed as part of my first capstone."
                    image="/assets/website-thumb.png"
                    images={["/assets/website-1.png", "/assets/website-2.png"]}
                />
                <ProjectBox
                    title="Eye Tracking Experiment"
                    description="An experiment I ran as part of a class to analyze the effects of coding themes in IDEs on eye tracking metrics."
                    image="/assets/resume-thumb.png"
                    images={["/assets/resume-1.png", "/assets/resume-2.png"]}
                />
            </div>
        </div>
    );
}

export default Projects;
