import React, { useState } from 'react';
import './Contact.css';
import { useSelector } from 'react-redux';
import { createContact } from '../../api/apiCalls';
import { useApiProgress } from '../../shared/ApiProgress';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();

    const [error, setError] = useState(null);

    const pendingApiCall = useApiProgress('post','/api/v1/contacts/create');

    const { role } = useSelector((store) => ({
        role: store.role
    }));

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "name") {
            setName(value);
        }
        if(name === "email") {
            setEmail(value);
        }
        if(name === "subject") {
            setSubject(value);
        }
        if(name === "message") {
            setMessage(value);
        }

        setError(null)
    }

    const onClick = async (event) => {
        event.preventDefault();

        const body = {
            name,
            email,
            subject,
            message
        }

        try {
            await createContact(body);
            toast.success("Mesajınız Sisteme İletildi. Teşekkürler!");

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    return ( 
        <div id="contact">
            <div className="container pt-5 pb-5">
                <div className="card p-5 shadow bg-gray-color">
                    <h2>İletişim Formu</h2>
                    <form>
                        <div className="mb-3">
                        <label htmlFor="name" className="form-label">İsim</label>
                        <input type="text" name="name" className="form-control" id="name" placeholder="İsminizi girin" onChange={onChange} value={name} />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="Email adresinizi girin" onChange={onChange} value={email} />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Konu</label>
                        <input type="text" name="subject" className="form-control" id="subject" placeholder="Konu" onChange={onChange} value={subject} />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="message" className="form-label">Mesaj</label>
                        <textarea className="form-control" name="message" id="message" rows="3" placeholder="Mesajınızı girin" onChange={onChange} value={message} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={(role !== "ADMIN" && role !== "USER") || pendingApiCall} onClick={onClick} >
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            Gönder
                        </button>
                        {(role !== "ADMIN" && role !== "USER") &&
                            <label className="alert alert-info ms-5">Mesajınızı iletmek için sisteme Giriş Yapmalısınız!</label>
                        }
                        {error != null && <label className="alert alert-danger ms-5">{error}</label> }
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
 
export default Contact;