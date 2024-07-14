import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function BadgerRegister() {

    // TODO Create the register component.

    return <>
        <h1>Register</h1>
        <Form id="registerForm">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" style={{width: "400px"}} required/>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type='password' id="password" style={{width: "400px"}} required/>
            <Form.Label htmlFor="repeatPassword">Repeat Password</Form.Label>
            <Form.Control type='password' id="repeatPassword" style={{width: "400px"}} required/>
            <br />
            <Button type="submit" onClick={
                () => {
                    const username = document.getElementById("username").value;
                    const password = document.getElementById("password").value;
                    const repeatPassword = document.getElementById("repeatPassword").value;
                    if (password !== repeatPassword) {
                        alert("Passwords do not match!");
                        return;
                    }
                    // console.log(username, password);
                    fetch("https://cs571.org/api/s24/hw6/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CS571-ID": CS571.getBadgerId()
                        },
                        body: JSON.stringify({
                            "username": username,
                            "password": password
                        })
                    }).then(res => res.json()).then(json => {
                        console.log(json.status);
                        if (json.status === "ok") {
                            alert("Registration successful!");
                        } else {
                            alert("Registration failed!");
                        }
                    });
                }
            }>Register</Button>
        </Form>
    </>
}
