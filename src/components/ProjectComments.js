import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import { useApiProgress } from "../shared/ApiProgress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProjectCommentsFeed from "./ProjectCommentsFeed";

const ProjectComments = () => {

    const [commentData, setCommentData] = useState("");
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(null);

    const { email, imageUrl } = useSelector((store) => ({
        email: store.email,
        imageUrl: store.imageUrl
    }));

    const pendingApiCall = useApiProgress('post', '/api/1.0/posts');

    const onFocusTextArea = () => {
        setFocused(true);
    }
    const onChangeTextArea = (event) => {
        setCommentData(event.target.value);
        setError(null);
    }
    const onClickClose = () => {
        setFocused(false);
        setCommentData("");
        setError(null);
    }

    const onClickPost = async () => {
    }

    let textAreaClassName = "form-control"
    if(error != null) {
        textAreaClassName += " is-invalid";
    }

    return(
        <div id="comments" className="mb-5">
            <div className="card p-1 flex-row container mt-5" style={{backgroundColor: '#eee' }}>
                <ProfileImage user={email} width="32" height="32" imageCss={"me-1"} tempImage={imageUrl} />
                <div className="flex-fill">
                    <textarea
                        className={textAreaClassName}
                        rows={focused ? "4" : "2"}
                        onFocus={onFocusTextArea}
                        onChange={onChangeTextArea}
                        value={commentData}
                    />
                    <div className="invalid-feedback">{error}</div>
                    {focused && <div className="text-end mt-3">
                        <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClickPost} disabled={pendingApiCall}>
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faShare} className="me-1" /> Paylaş
                        </button>
                        <button className="btn btn-danger d-inline-flex ms-1 align-items-center" onClick={onClickClose} disabled={pendingApiCall}>
                            <FontAwesomeIcon icon={faTimes} className="me-1" /> Geri Dön
                        </button>
                    </div>}
                </div>
            </div>
            <ProjectCommentsFeed />
        </div>
    );
}

export default ProjectComments;