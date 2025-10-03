import { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image'
import profilePic from '../../assets/SL-Professional-2.jpeg'


function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
        className={`sticky-top ${isScrolled ? 'compact' : 'large'}`}
        style={{ transition: 'all 0.3s ease-in-out'}}>
            <Image 
                src={profilePic} 
                alt="Spencer Lewis Picture" 
                roundedCircle 
                className={`${isScrolled ? 'w-25' : 'w-50'}`}
                style={{ maxWidth: isScrolled ? '60px' : '200px' }}
            />
        </header>
    );
}

export default Header;