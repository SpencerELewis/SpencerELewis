import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

interface ProjectBoxProps {
    title: string;
    description: string;
    modalDescription?: string;
    image: string;
    images?: string[]; // for modal, optional
    isSelected?: boolean;
    onHover?: (image: string) => void;
    onLeave?: () => void;
    onSelect?: () => void;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ title, description, modalDescription, image, images, isSelected, onHover, onLeave, onSelect }) => {
    const [showModal, setShowModal] = useState(false);
    const [hovered, setHovered] = useState(false);
    const isActive = hovered || !!isSelected;
    return (
        <>
            <div className="project-card"
                style={{
                    borderRadius: '16px',
                    boxShadow: isActive ? '0 8px 48px rgba(0,0,0,0.18)' : '0 2px 16px rgba(0,0,0,0.08)',
                    background: 'var(--bs-navbar-bg, var(--bs-body-bg, #fff))',
                    padding: '1.5rem',
                    margin: '1.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    transition: 'box-shadow 340ms cubic-bezier(0.2,0.8,0.2,1), transform 300ms',
                    minHeight: '160px',
                    width: '100%',
                    cursor: 'pointer',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                }}
                onMouseEnter={() => { setHovered(true); onHover && onHover(image); }}
                onMouseLeave={() => { setHovered(false); onLeave && onLeave(); }}
                onClick={() => { setShowModal(true); onSelect && onSelect(); }}
            >
                <img src={image} alt={title} style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover', background: '#eee' }} />
                <div>
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>{description}</p>
                </div>
            </div>
            <ProjectModal
                show={showModal}
                onClose={() => setShowModal(false)}
                title={title}
                description={modalDescription ?? description}
                images={images ? [image, ...images] : [image]}
            />
        </>
    );
};

export default ProjectBox;
