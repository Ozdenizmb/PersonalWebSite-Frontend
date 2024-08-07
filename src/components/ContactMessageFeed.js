import React, { useEffect, useState } from "react";
import { getAllContacts } from "../api/apiCalls";
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ContactMessageCard from './ContactMessageCard';

const ContactMessageFeed = () => {

    const [messages, setMessages] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isThereData, setIsThereData] = useState();

    const pendingApiCall = useApiProgress('get','/api/v1/contacts/getpage?page=');

    const [error, setError] = useState(null);

    const pageSize = 8;
    const sort = "createdDate,DESC";

    const fetchMessages = async (pageNumber, pageSize, pageSort) => {
        const previousMessages = [...messages];

        try {
            const response = await getAllContacts(pageNumber, pageSize, pageSort);
            const data = response.data.content;
            setIsLastPage(response.data.last);
            setPageNumber(response.data.pageable.pageNumber);
            setIsThereData(response.data.totalElements);
            const convertedMessages = data.map(message => ({
                id: message.id,
                name: message.name,
                email: message.email,
                subject: message.subject,
                message: message.message,
                createdDate: message.createdDate,
                updatedDate: message.updatedDate
            }));

            const combinedMessages = [...previousMessages, ...convertedMessages];
            setMessages(combinedMessages);

        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    useEffect(() => {
        fetchMessages(pageNumber, pageSize, sort);
    }, []);

    const onClickLoadMoreCardButton = () => {
        fetchMessages(pageNumber + 1, pageSize, sort);
    }

    if((isThereData === 0 && !pendingApiCall) || error != null) {
        return (
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Herhangi Bir Mesaj Bulunmamaktadır...</p>
          </div>
        );
    }

    if(messages.length == 0) {
        return (
          <Spinner />
        );
    }

    return(
        <div id="card-feed" className="d-flex flex-wrap">
            <div className="row">
                {messages.map((messages, index) => (
                    <ContactMessageCard key={index} message={messages} />
                ))}
                <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={isLastPage}>
                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                    Daha Fazla Göster
                </button>
            </div>
        </div>
    );
}

export default ContactMessageFeed;