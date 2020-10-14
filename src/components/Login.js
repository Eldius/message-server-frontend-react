import React, { useState } from "react";

const parseDisplayName = (u) => u.name ? u.name : u.user;
const backendEndpoint = "http://localhost:8000";

export default function Login(props) {
    const [userInfo, setUserInfo] = useState({});
    const login = (e) => {
            e.preventDefault();
            console.log("Lgging in...");
            fetch(`${backendEndpoint}/login`, {
                method: "POST",
                body: JSON.stringify({
                    "user": document.getElementById('userField').value,
                    "pass": document.getElementById('passField').value
                })
            }).then((response) => {
                return response.json();
            }).then((body) => {
                let tokenParts = body.token.split(".");
                let user = JSON.parse(atob(tokenParts[1]));
                setUserInfo(user);
                if (props.loginCallback) {
                    props.loginCallback(body.token);
                }
            }).catch((error) => {
                console.log(error);
            });
    }


    if (userInfo.user) {
        return (
            <div className="loginPanel">
                <span className="profilePanel">{parseDisplayName(userInfo)}</span>
            </div>
        )
    }
    return (
        <div className="loginPanel">
            <span>
                <label htmlFor="userField">User</label>
                <input id="userField" />
            </span>
            <span>
                <label htmlFor="passField">Pass</label>
                <input id="passField" />
            </span>
            <button
                className="loginButton"
                onClick={login}
            >Ok</button>
        </div>
    )
}
