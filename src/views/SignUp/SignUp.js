import React, { useState } from 'react';
import './SignUp.css';
import image1 from '../../images/SignUpAndLoginImage1.svg';
import image2 from '../../images/SignUpAndLoginImage2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock, faEnvelope, faAddressCard, faKey   } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div id="signup">
      <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Kullanıcı Olarak Kayıt Ol</h2>
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
              <input type="submit" value="Kayıt Ol" className="btn-submit solid" />
              <p className="social-text">Veya sosyal medya hesaplarınız ile kaydolun</p>
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
              <h2 className="title">Admin Olarak Kayıt Ol</h2>
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
              <div className="input-field">
                <i className="fas fa-lock">
                <FontAwesomeIcon icon={faKey}/>
                </i>
                <input type="password" placeholder="Admin Anahtarı" />
              </div>
              <input type="submit" className="btn-submit" value="Kayıt Ol" />
              <label className="alert alert-info mt-2">Admin Olarak Kayıt Olmak İçin Anahtar Bilgisi Gerekmektedir!</label>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Admin Kaydı</h3>
              <p>
                Admin olarak kayıt olabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
              </p>
              <button className="btn transparent" onClick={handleSignUpClick}>
                Kayıt Ol
              </button>
            </div>
            <img src={image2} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Kullanıcı Kaydı</h3>
              <p>
                Kullanıcı olarak kayıt olabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
              </p>
              <button className="btn transparent" onClick={handleSignInClick}>
                Kayıt Ol
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
