import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import { useApiProgress } from "../shared/ApiProgress";
import { getAllUsers } from "../api/apiCalls";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {

    const [page, setPage] = useState({
        content : [],
        size : 3,
        number : 0
    });

    const [error, setError] = useState(null);
    const pendingApiCall = useApiProgress('get','/api/v1/users/get/user?page=');

    useEffect(() => {
        loadPage();
    }, []);

    const onClickNext = () => {
        const nextPage = page.number + 1;

        loadPage(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;

        loadPage(previousPage);
    }

    const loadPage = async (pageNumber) => {
        try {
            await getAllUsers(pageNumber).then(response => {
                setPage(response.data);
            });
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    const { content : users, last, first } = page;

    let actionDiv = (
        <div>
                {first === false &&
                    <button className="btn btn-sm btn-light" onClick={onClickPrevious}>
                        Geri
                    </button>
                }
                {last === false &&
                    <button className="btn btn-sm btn-light float-end" onClick={onClickNext}>
                        İleri
                    </button>
                }
        </div>
    );

    if(pendingApiCall) {
        actionDiv = (
            <Spinner />
        );
    }

    if(error != null) {
        return(
            <div className="card">
                <h3 className="card-header text-center">Web Site Sakinleri</h3>
                <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
                    <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
                    <p className="m-0">Kayıtlı Web Site Sakinleri Bulunamadı!</p>
                </div>
                {actionDiv}
            </div>
        );
    }

    return(
        <div className="card">
            <h3 className="card-header text-center">Web Site Sakinleri</h3>
            <div className="list-group list-group-flush">
                {
                    users.map(user => (
                        <UserListItem  key={user.email} user={user}/>
                    ))
                }
            </div>
            {actionDiv}
        </div>
    );
}

export default UserList;