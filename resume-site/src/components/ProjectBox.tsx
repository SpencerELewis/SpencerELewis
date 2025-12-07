import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

interface ProjectBoxProps {
  title: string;
  description: string;
  image: string;
  images?: string[]; // for modal, optional
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ title, description, image, images }) => {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        style={{
          borderRadius: '16px',
          boxShadow: hovered ? '0 4px 32px rgba(0,0,0,0.16)' : '0 2px 16px rgba(0,0,0,0.08)',
          background: 'var(--bs-navbar-bg, var(--bs-body-bg, #fff))',
          padding: '1.5rem',
          margin: '1.5rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          transition: 'box-shadow 0.2s, transform 0.18s',
          minHeight: '160px',
          width: '100%',
          cursor: 'pointer',
          transform: hovered ? 'scale(1.025)' : 'scale(1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowModal(true)}
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
        description={description}
        images={images ? [image, ...images] : [image]}
      />
    </>
  );
};

export default ProjectBox;
