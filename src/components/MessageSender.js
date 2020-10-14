import React from "react";

const backendEndpoint = "http://localhost:8000";

export default function MessageSender(props) {

    const userToken = props.userToken;

    const sendMessage = (e) => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userToken}`
          });
        e.preventDefault();
        let to = document.getElementById('destination').value;
        let msg = document.getElementById('content').value;
        document.getElementById('destination').value = "";
        document.getElementById('content').value = "";
        fetch(`${backendEndpoint}/message`, {
            method: "POST",
            headers: myHeaders,
            mode: "cors",
            body: JSON.stringify({
                "to": to,
                "msg": msg
            })
        }).then((response) => {
            console.log(response.status);
        }).catch((error) => {
            console.log(error);
        });

    }

    if (userToken === "") {
        return (
            <div className="messageSenderPanel">
            </div>
        )
    }
    return (
        <div className="messageSenderPanel">
            <p>
                <input className="messageDestination" id="destination" />
                <button
                    onClick={sendMessage}
                >
                    Send
                </button>
            </p>
            <p>
                <textarea className="messageContent" id="content" />
            </p>
        </div>
    )
}
