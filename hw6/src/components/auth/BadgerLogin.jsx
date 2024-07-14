import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    // TODO Create the login component.
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    return <>
        <h1>Login</h1>
        <Form id="loginForm">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" style={{width: "400px"}} required/>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type='password' id="password" style={{width: "400px"}} required/>
            <br />
            <Button type="submit" onClick={
                () => {
                    const username = document.getElementById("username").value;
                    const password = document.getElementById("password").value;
                    fetch("https://cs571.org/api/s24/hw6/login", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "username": username,
                            "password": password
                        })
                    }).then(res => res.json()).then(json => {
                        if (json.status === "ok") {
                            alert("Login successful!");
                            sessionStorage.setItem("username", username);
                            sessionStorage.setItem("isLoggedIn", true);
                            setLoginStatus(true);
                            

                        } else {
                            alert("Login failed!");
                            sessionStorage.removeItem("isLoggedIn");
                            sessionStorage.removeItem("username");
                        }
                    });
                }
            }>Login</Button>
        </Form>

    </>
}
