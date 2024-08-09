import React, { useEffect, useState } from "react";
import { useApiProgress } from "../shared/ApiProgress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Spinner from "./Spinner";
import ProjectCommentsCard from "./ProjectCommentsCard";
import { getAllProjectComments } from "../api/apiCalls";
import ProjectCommentsCreate from "./ProjectCommentsCreate";
import '../style/Components.css';

const ProjectCommentsFeed = ({ id }) => {

    const [comments, setComments] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isThereData, setIsThereData] = useState();

    const pendingApiCall = useApiProgress('get','/api/v1/comments/get/project/');

    const [error, setError] = useState(null);

    const pageSize = 3;
    const sort = "createdDate,DESC";

    const fetchProjects = async (pageNumber, pageSize, pageSort) => {
        const previousComments = [...comments];

        try {
            const response = await getAllProjectComments(id, pageNumber, pageSize, pageSort);
            const data = response.data.content;
            setIsLastPage(response.data.last);
            setPageNumber(response.data.pageable.pageNumber);
            setIsThereData(response.data.totalElements);
            const convertedComments = data.map(comment => ({
                id: comment.id,
                userId: comment.userId,
                firstName: comment.firstName,
                lastName: comment.lastName,
                email: comment.email,
                imageUrl: comment.imageUrl,
                role: comment.role,
                projectId: comment.projectId,
                text: comment.text,
                createdDate: comment.createdDate,
                updatedDate: comment.updatedDate,
            }));

            const combinedComments = [...previousComments, ...convertedComments];
            setComments(combinedComments);

        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    useEffect(() => {
        fetchProjects(pageNumber, pageSize, sort);
    }, []);

    const onClickLoadMoreCardButton = () => {
        fetchProjects(pageNumber + 1, pageSize, sort);
    }

    if((isThereData === 0 && !pendingApiCall) || error != null) {
        return (
            <div>
                <div className="row">
                    <div id="comments" className="bg-light mb-5 mt-5">
                        <div className="container mb-5">
                            <div className="row py-4">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Yorumlar</h5>
                                        <hr />
                                        <div className="card border rounded-3 shadow d-flex align-items-center justify-content-center p-4 mb-5">
                                            <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
                                            <p className="m-0">Herhangi Bir Yorum Bulunmamaktadır...</p>
                                        </div>
                                        <ProjectCommentsCreate projectId={id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if(comments.length == 0) {
        return (
          <Spinner />
        );
    }

    return(
        <div id="card-feed">
            <div className="row">
                <div id="comments" className="bg-light mb-5 mt-5">
                    <div className="container mb-5">
                        <div className="row py-4">

                            <div className="card mb-4">
                                <div className="card-body">

                                    <h5 className="card-title">Yorumlar</h5>
                                    <hr />

                                        {comments.map((comments, index) => (
                                        <ProjectCommentsCard key={index} comment={comments} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={isLastPage}>
                                {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                    Daha Fazla Göster
                            </button>
                        </div>
                    </div>
                    <ProjectCommentsCreate projectId={id} />
                </div>
            </div>
        </div>
    );
}

export default ProjectCommentsFeed;