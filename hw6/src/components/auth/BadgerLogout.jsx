
import React, { useEffect } from 'react';
import { useContext } from 'react';

export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");
            setLoginStatus(false);
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
