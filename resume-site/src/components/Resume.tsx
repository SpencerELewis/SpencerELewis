import { Container, Button } from 'react-bootstrap'

function Resume() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/assets/resume.pdf';
        link.download = 'Spencer_Lewis_Resume.pdf';
        link.click();
    };

    return (
        <Container className="py-5">
            <div style={{ 
                width: '100%', 
                height: '85vh', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <iframe
                    src="/assets/resume.pdf"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    }}
                    title="Resume"
                />
            </div>
        </Container>
    );
}

export default Resume;
