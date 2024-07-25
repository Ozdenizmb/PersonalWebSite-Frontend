import React, { useState } from 'react';
import '../style/Components.css';
import { Link } from 'react-router-dom'
import skyForTopbar from '../images/sky.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faProjectDiagram, faPhone, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div id="topbar">
            <nav>
                <div className="container">
                    <Link to="/" className="brand-name">
                        <h3 className="logo">baran<span>ozdeniz</span></h3>
                    </Link>
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className="bar"></div>
                    </div>
                </div>
            </nav>
            <header>
                <img src={skyForTopbar} className="sky translate" data-speed="0.5" alt="" />
            </header>
            <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to="/"><FontAwesomeIcon icon={faHome} className="me-2" />Anasayfa</Link>
                    </li>
                    <li>
                        <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} className="me-2" />Hakkımda</Link>
                    </li>
                    <li>
                        <Link to="#services"><FontAwesomeIcon icon={faProjectDiagram} className="me-2" />Projeler</Link>
                    </li>
                    <li>
                        <Link to="/contact"><FontAwesomeIcon icon={faPhone} className="me-2" />İletişim</Link>
                    </li>
                    <li>
                        <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} className="me-2" />Giriş Yap</Link>
                    </li>
                    <li>
                        <Link to="/signup"><FontAwesomeIcon icon={faUserPlus} className="me-2" />Kaydol</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TopBar;
