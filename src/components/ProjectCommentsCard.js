import React from "react";
import defaultImage from '../images/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../style/Components.css';
import { useSelector } from "react-redux";
import { deleteComment } from "../api/apiCalls";

const ProjectCommentsCard = ({ comment }) => {

    const { id } = useSelector((store) => ({
        id: store.id
    }));

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const onClickDelete = async () => {
        try {
            await deleteComment(comment.id);
            window.location.reload();
        } catch(error) {

        }
    }

    let cardType = (

        <blockquote className="border-bottom">
            <div className="float-end">
                <div className="btn-group d-flex align-items-center">
                    {formatDate(comment.updatedDate)}
                    {id === comment.userId && 
                        <button className="btn btn-fix-css" onClick={onClickDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} className="rounded-circle bg-danger p-2 text-white ms-3" />
                        </button>
                        
                    }
                </div>
            </div>
            <div className="content">
                <img src={comment.imageUrl || defaultImage} alt="profil" className="rounded-circle" />
                <div className="text">
                    <h6 className="mb-0">{comment.firstName} {comment.lastName}</h6>
                    <div className="rating-wrap">
                        {comment.email} - {comment.role}
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <p>
                    {comment.text}
                </p>
            </div>
        </blockquote>
    )

    return(
        <div>
            {cardType}
        </div>
    );
}

export default ProjectCommentsCard;