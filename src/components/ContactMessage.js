import React from "react";
import ContactMessageFeed from "./ContactMessageFeed";

const ContactMessage = () => {
    return(
        <div className="container mt-4">
            <h1 className="text-center mb-5">Mesajlar</h1>
            <ContactMessageFeed />
        </div>
    );
}

export default ContactMessage;