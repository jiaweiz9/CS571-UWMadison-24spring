import React, { useEffect, useState } from "react"
import BadgerMessage from "./BadgerMessage"
import { Col, Row } from "react-bootstrap"
import { Pagination } from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [actPage, setActPage] = useState(1);

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            console.log(json.messages)
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        <Row xs={12} md={6} sm={3}>
                        {
                            messages.map((message) => {
                            return <Col key={message.id} style={{width: "290px", height: "250px"}}> 
                                <BadgerMessage key={message.id} {...message} />
                                </Col>
                            })
                        }
                        </Row>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
        {
            Array.from({length: 4}, (_, i) => i + 1).map((page) => {
                return <Pagination.Item key={page} active={page == actPage} onClick={() => {
                    fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${page}`, {
                        headers: {
                            "X-CS571-ID": CS571.getBadgerId()
                        }
                    }).then(res => res.json()).then(json => {
                        console.log(json.messages)
                        setMessages(json.messages)
                    })
                    setActPage(page)
                }
                }>{page}</Pagination.Item>
            })
        }
        </Pagination>
        
    </>
}
