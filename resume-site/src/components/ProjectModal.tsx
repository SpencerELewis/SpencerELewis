import React, { useEffect, useState } from 'react';

interface ProjectModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[];
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.6)',
  zIndex: 2000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle: React.CSSProperties = {
  background: 'var(--bs-body-bg, #fff)',
  color: 'var(--bs-body-color, #222)',
  borderRadius: 18,
  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
  padding: '2rem',
  minWidth: 340,
  maxWidth: 540,
  width: '90vw',
  position: 'relative',
  animation: 'fadeIn 0.2s',
};

const closeStyle: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 18,
  fontSize: 28,
  color: 'var(--bs-body-color, #222)',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  zIndex: 10,
};

const imagesStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1rem',
  flexWrap: 'wrap',
};

const imgStyle: React.CSSProperties = {
  width: 100,
  height: 100,
  borderRadius: 10,
  objectFit: 'cover',
  background: '#eee',
};

const ProjectModal: React.FC<ProjectModalProps> = ({ show, onClose, title, description, images }) => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const html = document.documentElement;
    const attr = html.getAttribute('data-bs-theme');
    setTheme(attr === 'dark' ? 'dark' : 'light');
    const observer = new MutationObserver(() => {
      const newAttr = html.getAttribute('data-bs-theme');
      setTheme(newAttr === 'dark' ? 'dark' : 'light');
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-bs-theme'] });
    return () => observer.disconnect();
  }, []);
  if (!show) return null;
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={modalStyle}
        className={theme === 'dark' ? 'modal-dark' : 'modal-light'}
        onClick={e => e.stopPropagation()}
      >
        <button style={closeStyle} onClick={onClose} aria-label="Close">×</button>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <div style={imagesStyle}>
          {images.slice(0, 4).map((img, i) => (
            <img key={i} src={img} alt={title + ' screenshot ' + (i + 1)} style={imgStyle} />
          ))}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProjectModal;
