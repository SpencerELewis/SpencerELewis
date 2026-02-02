import React from 'react';

interface ProjectBoxProps {
    title: string;
    description: string;
    image: string;
    isSelected?: boolean;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ title, description, image, isSelected }) => {
    // hover effect removed — only the centered (selected) card receives emphasis
    const isActive = !!isSelected;
    return (
        <div className="project-card"
            style={{
                borderRadius: '16px',
                boxShadow: isSelected ? '0 8px 48px rgba(0,0,0,0.18)' : '0 2px 16px rgba(0,0,0,0.08)',
                background: 'var(--bs-navbar-bg, var(--bs-body-bg, #fff))',
                padding: '1.5rem',
                margin: '1.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'box-shadow 340ms cubic-bezier(0.2,0.8,0.2,1), transform 300ms',
                minHeight: '160px',
                width: '100%',
                cursor: 'default',
                userSelect: 'none',
                transform: 'scale(1)'
            }}
        >
            <img src={image} alt={title} style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover', background: '#eee' }} />
            <div>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <p style={{ margin: '0.5rem 0 0 0' }}>{description}</p>
            </div>
        </div>
    );
};

export default ProjectBox;
