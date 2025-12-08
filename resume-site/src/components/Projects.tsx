import ProjectBox from './ProjectBox';


function Projects() {
    return (
        <div style={{ width: '100%', padding: '40px 0' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Projects</h1>
            <div style={{ maxWidth: '1300px', margin: '0 auto', width: '90%' }}>
                <ProjectBox
                    title="VR Art Gallery"
                    description="A virtual reality art gallery built with Unity and C#. Features interactive 3D navigation and dynamic artwork loading."
                    image="/assets/vr-gallery-thumb.jpg"
                    images={["/assets/vr-gallery-1.jpg", "/assets/vr-gallery-2.jpg"]}
                />
                <ProjectBox
                    title="Personal Portfolio"
                    description="This website! Built with React, TypeScript, and Vite. Responsive, modern, and themed for light/dark mode."
                    image="/assets/portfolio-thumb.jpg"
                    images={["/assets/portfolio-1.jpg", "/assets/portfolio-2.jpg"]}
                />
            </div>
        </div>
    );
}

export default Projects;
