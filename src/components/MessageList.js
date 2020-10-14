import React, { useState } from "react";

import './MessageList.css'

const backendEndpoint = "http://localhost:8000";

export default function MessageList(props) {

    const [messageList, setMessageList] = useState([]);

    const messageListFields = messageList ? messageList.map(m => (
        <li key={m.id} className="messageItemPanel">
            <div>
                <span className="messageItem">{m.from}</span>
                <div className="messageContent">{m.msg}</div>
            </div>
        </li>
      )):[];
    const userToken = props.userToken;

    const getMessages = () => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userToken}`
          });
        fetch(`${backendEndpoint}/message`, {
            method: "GET",
            headers: myHeaders,
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((body) => {
            console.log(JSON.stringify(body));
            setMessageList(body)
        }).catch((error) => {
            console.log(error);
        });
    }

    if (userToken === "") {
        return (
            <div className="messageListPanel">
            </div>
        )
    }
    return (
        <div className="messageListPanel">
            <p>
                <button onClick={getMessages}>
                    refresh
                </button>
            </p>
            <ul>
                {messageListFields}
            </ul>
        </div>
    )
}
