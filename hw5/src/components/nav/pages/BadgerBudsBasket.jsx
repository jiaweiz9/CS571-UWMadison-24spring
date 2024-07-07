import { useContext, useEffect, useState, useMemo } from "react"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import { Card, Button } from "react-bootstrap";
import { CardGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function BadgerBudsBasket(props) {
    let data = useContext(BadgerBudsDataContext);
    const [filteredData, setFilteredData] = useState([]);
    const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds"));

    useEffect(() => {
        // const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds"));
        const filtered = data.filter(cat => savedCatIds.includes(cat.id));
        setFilteredData(filtered);
        console.log("saved", savedCatIds);
        console.log("basket", filtered);
    }, [JSON.stringify(savedCatIds), JSON.stringify(data)]);

    return <CardGroup>
                <Row xs={12} md={6}>
                {   
                    filteredData.map(bud => {
                    return <Col key={bud.id}>
                        <BadgerBudsCardBucket {...bud} />
                        </Col>
                    })
                }
                </Row>
    </CardGroup>
}


function BadgerBudsCardBucket(props) {
    const [showMore, setShowMore] = useState(false)
    // const [showAlert, setShowAlert] = useState(false)
    let data = useContext(BadgerBudsDataContext);

    const unselectHandler = (id) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));
        alert(`${props.name} has been removed from your basket!`);
    }

    const adoptHandler = (id) => {
        console.log("adopting", id);
        console.log("data", data);
        const updatedData = data.filter(cat => cat.id !== id);
        // updateData(updatedData);
        sessionStorage.setItem("adoptedCatIds", JSON.stringify([...JSON.parse(sessionStorage.getItem("adoptedCatIds") || "[]"), id]));
        alert(`${props.name} has been adopted!`);
    }

    return <Card style={{width: "18rem"}}>
    <Card.Img variant="top" src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${props.imgIds[0]}`} alt='A Cat Image' style={{width: "290px", height: "310px", objectFit: "cover", objectPosition: "center"}}/>
    <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
            {showMore? props.description : ""}
        </Card.Text>
        <Button variant="primary" onClick={()=>adoptHandler(props.id)}>Adopt</Button>
        <Button variant="secondary" onClick={()=>unselectHandler(props.id)}>Unselect</Button>
    </Card.Body>
    </Card>
}