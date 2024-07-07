import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useContext } from 'react';
import BadgerBudsDataContext from '../contexts/BadgerBudsDataContext';
import { useState } from 'react';
import { Alert, Carousel } from 'react-bootstrap';


export function BadgerBudsCard(props) {
    const [showMore, setShowMore] = useState(false)
    // const [showAlert, setShowAlert] = useState(false)

    const saveHandler = (name, id) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds"))
        if (!savedCatIds) {
            sessionStorage.setItem("savedCatIds", JSON.stringify([id]))
            alert(`${name} saved into your basket!`)
            return
        }
        if (savedCatIds.includes(id)) {
            alert(`${name} is already in your basket!`)
            return
        }
        savedCatIds.push(id)
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds))
        alert(`${name} saved into your basket!`)
    }

    return <Card style={{width: "18rem"}}>
    {/* <Card.Img variant="top" src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${props.imgIds[0]}`} alt='A Cat Image' style={{width: "290px", height: "310px", objectFit: "cover", objectPosition: "center"}}/> */}
    <Carousel>
        {props.imgIds.map((imgId, index) => {
            return <Carousel.Item key={index}>
                <img
                className="d-block w-100"
                src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${imgId}`}
                alt="First slide"
                style={{width: "290px", height: "310px", objectFit: "cover", objectPosition: "center"}}
                />
            </Carousel.Item>
        })}
    </Carousel>
    <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
            {showMore? props.description : ""}
        </Card.Text>
        <Button variant="primary" onClick={()=>saveHandler(props.name, props.id)}>Save</Button>
        <Button variant="secondary" onClick={()=>setShowMore(!showMore)}>{showMore ? "Show Less" : "Show More"}</Button>
    </Card.Body>
    </Card>
}

export default function BadgerBudsSummary(props) {
    let data = useContext(BadgerBudsDataContext)
    console.log("summary", data)

    return <CardGroup>
        <Row xs={12} md={6}>
        {   
            data.map(bud => {
            return <Col key={bud.id}>
                <BadgerBudsCard {...bud} />
                </Col>
            })
        }
        </Row>
    </CardGroup>
}
