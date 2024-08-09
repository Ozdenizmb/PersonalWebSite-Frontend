import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createComment } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";

const ProjectCommentsCreate = ({ projectId }) => {

    const [text, setText] = useState();

    const { id, firstName, lastName } = useSelector((store) => ({
        id: store.id,
        firstName: store.firstName,
        lastName: store.lastName
    }));

    const [error, setError] = useState(null);
    const pendingApiCall = useApiProgress('post','/api/v1/comments/create');

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "comment-text") {
            setText(value);
        }

        setError(null);
    }

    const onClick = async (event) => {
        event.preventDefault();

        const body = {
            userId: id,
            projectId,
            text
        }

        try {
            await createComment(body);
            window.location.reload();
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    return(
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="mb-3">Yorum Yap</h5>
                    <form action="">
                        <div className="mb-3">
                            <input type="text" className="form-control" value={firstName+" "+lastName} readOnly />
                        </div>
                        <div className="mb-3">
                            <textarea name="comment-text" id="" className="form-control" placeholder="Yorumunuz" onChange={onChange}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <select name="" id="" className="form-select">
                                    <option value="">Derecelendirme</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <button className="btn btn-primary ms-3" onClick={onClick} disabled={pendingApiCall}>
                                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                    Gönder
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {error != null && <label className="alert alert-danger mt-2">{error}</label> }
        </div>
    );
}

export default ProjectCommentsCreate;