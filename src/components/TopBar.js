import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutSuccess } from '../redux/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faProjectDiagram, faPhone, faSignInAlt, faUserPlus, faSignOutAlt, faBars, faChevronDown, faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import '../style/Components.css';
import ProfileImage from './ProfileImage';

const TopBar = () => {
    const { isLoggedIn, email, imageUrl } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        email : store.email,
        imageUrl: store.imageUrl
    }));

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id="topbar">
            <nav>
                <div className="container">
                    <Link to="/" className="brand-name">
                        <h3 className="logo">baran<span>ozdeniz</span></h3>
                    </Link>
                    {isMobile ? (
                        <div className="toggle-menu" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} className={`toggle-menu-icon fa-2x ${menuOpen ? "text-light" : "text-dark"}`} />
                        </div>
                    ): (
                        <div className="topbar-links">
                            <div className="topbar-links-item">
                                <Link to="/"><FontAwesomeIcon icon={faHome} className="me-2" />Anasayfa</Link>
                                <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} className="me-2" />Hakkımda</Link>
                                <Link to="/projects"><FontAwesomeIcon icon={faProjectDiagram} className="me-2" />Projeler</Link>
                                <Link to="/contact"><FontAwesomeIcon icon={faPhone} className="me-2" />İletişim</Link>
                                {!isLoggedIn && (
                                    <>
                                        <Link to="/signup"><FontAwesomeIcon icon={faUserPlus} className="me-2" />Kaydol</Link>
                                        <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} className="me-2" />Giriş Yap</Link>
                                    </>
                                )}
                            </div>
                            
                            {isLoggedIn && (
                                <div className="d-flex align-items-center">
                                    <div className="profile-dropdown" onClick={toggleProfileMenu}>
                                        <ProfileImage email={email} width={"32"} height={"32"} tempImage={imageUrl} imageCss="m-auto me-2" />
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                    {profileMenuOpen && (
                                        <div className="profile-menu">
                                            <Link to={`/profile/${email}`} onClick={() => setProfileMenuOpen(false)}>
                                                <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                                                Profil
                                            </Link>
                                            
                                            <Link to="/" onClick={onLogoutSuccess}>
                                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                                Çıkış Yap
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <ul className="text-center">
                    <li>
                        <Link to="/"><FontAwesomeIcon icon={faHome} className="me-2" />Anasayfa</Link>
                    </li>
                    <li>
                        <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} className="me-2" />Hakkımda</Link>
                    </li>
                    <li>
                        <Link to="/projects"><FontAwesomeIcon icon={faProjectDiagram} className="me-2" />Projeler</Link>
                    </li>
                    <li>
                        <Link to="/contact"><FontAwesomeIcon icon={faPhone} className="me-2" />İletişim</Link>
                    </li>
                    {!isLoggedIn &&
                        <div>
                            <li>
                                <Link to="/signup"><FontAwesomeIcon icon={faUserPlus} className="me-2" />Kaydol</Link>
                            </li>
                            <li>
                                <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} className="me-2" />Giriş Yap</Link>
                            </li>
                        </div>
                    }
                    {isLoggedIn &&
                        <div className="d-flex align-items-center">
                            <li>
                                <Link to={`/profile/${email}`}>
                                    <ProfileImage email={email} width={"32"} height={"32"} tempImage={imageUrl} imageCss="m-auto me-2" />
                                    Profil
                                </Link>
                            </li>
                            <li onClick={onLogoutSuccess}>
                                <Link to="/"><FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Çıkış Yap</Link>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
}

export default TopBar;
