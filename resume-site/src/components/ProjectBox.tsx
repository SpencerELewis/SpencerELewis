import React from 'react';

interface ProjectBoxProps {
    title: string;
    description: string;
    techs?: string[];
    isSelected?: boolean;
}

// Local map for tech icon filenames and shadow color (kept in sync with Home.tsx)
const TECH_ICONS: Record<string, { icon: string; color: string }> = {
    'C#': { icon: 'csharp.png', color: '#239120' },
    'TypeScript': { icon: 'typescript.png', color: '#3178C6' },
    'JavaScript': { icon: 'javascript_im.png', color: '#F7DF1E' },
    'Java': { icon: 'java_im.png', color: '#007396' },
    'React': { icon: 'react.png', color: '#61DAFB' },
    '.NET': { icon: '.net.png', color: '#512BD4' },
    'SQL Server': { icon: 'sqlserver.png', color: '#CC2927' },
    'ElasticSearch': { icon: 'elasticsearch.png', color: '#005571' },
    'Python': { icon: 'python_im.png', color: '#3776AB' },
    'Unity': { icon: 'unity.png', color: '#000000' },
    'C': { icon: 'c_im.png', color: '#A8B9CC' },
    'Postman': { icon: 'postman-logo.png', color: '#FF6C37' },
    'Visual Basic': { icon: 'vb.png', color: '#945DB7' },
    'HTML': { icon: 'html_im.png', color: '#E34F26' },
    'CSS': { icon: 'css.png', color: '#1572B6' },
    'Scikit Learn': { icon: 'scikit.png', color: '#F7931E' },
    'Git': { icon: 'git.png', color: '#F05032' },
    'Plastic SCM': { icon: 'plasticscm.png', color: '#4CAF50' },
    'TensorFlow': { icon: 'tensor.png', color: '#FF6F00' } as any // fallback if you add TF icon
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ title, description, techs = [], isSelected }) => {
    // hover effect removed — only the centered (selected) card receives emphasis
    return (
        <div className="project-card"
            style={{
                borderRadius: '20px',
                boxShadow: isSelected ? '0 14px 88px rgba(0,0,0,0.22)' : '0 6px 36px rgba(0,0,0,0.12)',
                background: 'var(--bs-navbar-bg, var(--bs-body-bg, #fff))',
                padding: '2.5rem',
                margin: '2rem 0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '2.5rem',
                transition: 'box-shadow 340ms cubic-bezier(0.2,0.8,0.2,1), transform 300ms',
                minHeight: '260px',
                width: '100%',
                cursor: 'default',
                userSelect: 'none',
                transform: 'scale(1)'
            }}
        >
            <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', lineHeight: 1.15 }}>{title}</h3>
                <p style={{ margin: '1rem 0 0 0', fontSize: '1.05rem', color: 'var(--bs-body-color)' }}>{description}</p>
                <div className="project-tech-list" style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {techs.slice(0,6).map((t, i) => {
                        const meta = TECH_ICONS[t];
                        return meta ? (
                            <span key={i} className="project-tech-bg" title={t}>
                                <img
                                    className="project-tech-img"
                                    alt={t}
                                    src={`/coding icons/${meta.icon}`}
                                    style={{ filter: `drop-shadow(0 0 4px ${meta.color})`, width: 70, height: 70, objectFit: 'contain' }}
                                />
                            </span>
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectBox;
