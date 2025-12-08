import { Container } from 'react-bootstrap'

function Resume() {

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
