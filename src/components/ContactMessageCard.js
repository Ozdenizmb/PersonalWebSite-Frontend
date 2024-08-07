import React from "react";
import '../style/Components.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteContact } from "../api/apiCalls";

const ProjectCard = ({ message }) => {

    const { role } = useSelector((store) => ({
        role: store.role
    }));

    const onClickDelete = async () => {
        try {
            await deleteContact(message.id);
            window.location.reload();
        } catch(error) {

        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    let cardType = (
        <div id="message-card">
            <div className="card h-100 border rounded-3 shadow my-card">
                <Link className="card-link nav-link">
                    <div className="card-body">
                        <h5 className="card-title">{message.subject}</h5>
                        <hr className="my-2" />
                        <p className="card-text mb-2"><span className="fw-bold">İsim:</span> {message.name} {"("}{message.email}{")"} </p>
                        <p className="card-text"><span className="fw-bold">Mesaj:</span> {message.message}</p>
                        <p className="card-text"><span className="fw-bold">Tarih:</span> {formatDate(message.createdDate)}</p>
                        {role === "ADMIN" &&
                            <Link className="btn btn-danger" onClick={onClickDelete}>Sil</Link>
                        }
                    </div>
                </Link>
            </div>
        </div>
        
    )

    return(
        <div className={`mb-4 card-padding card-for-message col-xl-3 col-lg-4 col-md-6 col-sm-12`}>
            {cardType}
        </div>
    );
}

export default ProjectCard;