import React, { useEffect, useState } from "react";
import { useApiProgress } from "../shared/ApiProgress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Spinner from "./Spinner";
import ProjectCommentsCard from "./ProjectCommentsCard";
import { getAllProjectComments } from "../api/apiCalls";
import { useParams } from "react-router-dom";

const ProjectCommentsFeed = () => {

    const [comments, setComments] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isThereData, setIsThereData] = useState();

    const pendingApiCall = useApiProgress('get','/api/v1/comments/get?page=');

    const [error, setError] = useState(null);
    const { id } = useParams();

    const pageSize = 12;
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
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Herhangi Bir Yorum Bulunmamaktadır...</p>
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
                {comments.map((comments, index) => (
                    <ProjectCommentsCard key={index} comment={comments} />
                ))}
                <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={isLastPage}>
                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                    Daha Fazla Göster
                </button>
            </div>
        </div>
    );
}

export default ProjectCommentsFeed;