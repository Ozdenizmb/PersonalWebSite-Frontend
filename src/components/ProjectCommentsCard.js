import React from "react";
import { Link } from "react-router-dom";
import defaultImage from '../images/profile.png';

const ProjectCommentsCard = ({ comment }) => {

    const onClickDelete = async () => {
        try {
            window.location.reload();
        } catch(error) {

        }
    }

    let cardType = (
        <div id="comment-card">
            <div className="card h-100 border rounded-3 shadow my-card">
                <Link to={`/comment/detail/${comment.id}`} className="card-link nav-link d-flex flex-column flex-grow-1">
                    <div className="image-container">
                    <img src={comment.imageUrl || defaultImage} className="card-img-top rounded-2 img-fluid" alt={comment.email} />
                    </div>
                    <div className="card-body d-flex flex-column flex-grow-1">
                        <p className="card-text mb-2">{comment.firstName} {comment.lastName}</p>
                        <p className="card-text mb-3 text-muted fst-italic">{comment.email} - {comment.role}</p>
                        <hr className="my-2" />
                        <p className="card-text">{comment.text}</p>
                        <div className="d-flex justify-content-between mt-auto">
                            <button className="btn btn-primary flex-grow-1 me-2">Görüntüle</button>
                                    <Link to={`/comment/update/${comment.id}`} className="btn btn-success flex-grow-1 me-2">Güncelle</Link>
                                    <Link  className="btn btn-danger flex-grow-1" onClick={onClickDelete}>Sil</Link>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        
    )

    return(
        <div className={`mb-4 card_padding card-for-comment col-xl-3 col-lg-4 col-md-6 col-sm-12`}>
            {cardType}
        </div>
    );
}

export default ProjectCommentsCard;