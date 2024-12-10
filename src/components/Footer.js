import React from 'react';
import '../style/Components.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container text-center">
                <span className="text-muted">© 2024 baranozdeniz. All rights reserved.</span>
                <Link to="/privacy-policy" className="privacy">Privacy</Link>
            </div>
        </footer>
    );
};

export default Footer;
