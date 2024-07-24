import React, { useState } from 'react';
import './Login.css';
import image1 from '../../images/SignUpAndLoginImage1.svg';
import image2 from '../../images/SignUpAndLoginImage2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock, faEnvelope, faAddressCard  } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div id="login">
        <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                <form action="#" className="sign-in-form">
                    <h2 className="title">Kullanıcı Olarak Giriş Yap</h2>
                    <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password" />
                    </div>
                    <input type="submit" value="Login" className="btn solid" />
                    <p className="social-text">Or Sign in with social platforms</p>
                    <div className="social-media">
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGoogle}/>
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookF}/>
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                    </a>
                    </div>
                </form>
                <form action="#" className="sign-up-form">
                    <h2 className="title">Admin Olarak Giriş Yap</h2>
                    <div className="input-field">
                    <i className="fas fa-user">
                        <FontAwesomeIcon icon={faUser}/>
                    </i>
                    <input type="text" placeholder="Ad" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-user">
                        <FontAwesomeIcon icon={faAddressCard}/>
                    </i>
                    <input type="text" placeholder="Soyad" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-envelope">
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </i>
                    <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock">
                    <FontAwesomeIcon icon={faLock}/>
                    </i>
                    <input type="password" placeholder="Şifre" />
                    </div>
                    <input type="submit" className="btn-submit" value="Sign up" />
                    <p className="social-text">Or Sign up with social platforms</p>
                    <div className="social-media">
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGoogle}/>
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookF}/>
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                    </a>
                    </div>
                </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                <div className="content">
                    <h3>Admin Girişi</h3>
                    <p>
                    Admin olarak giriş yapabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
                    </p>
                    <button className="btn transparent" onClick={handleSignUpClick}>
                    Giriş Yap
                    </button>
                </div>
                <img src={image2} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                <div className="content">
                    <h3>Kullanıcı Girişi</h3>
                    <p>
                    Kullanıcı olarak giriş yapabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
                    </p>
                    <button className="btn transparent" onClick={handleSignInClick}>
                    Giriş Yap
                    </button>
                </div>
                <img src={image1} className="image" alt="" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
