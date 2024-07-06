import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Student from "./Student";
import { Pagination } from "react-bootstrap";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [shownStudents, setShownStudents] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                // eslint-disable-next-line no-undef
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
            setShownStudents(data);
        })
    }, []);

    const search = () => {
        const searchName = document.getElementById("searchName").value;
        const searchMajor = document.getElementById("searchMajor").value;
        const searchInterest = document.getElementById("searchInterest").value;
        setShownStudents(students.filter(student => {
            if (searchName && !student.name.first.toLowerCase().includes(searchName.toLowerCase()) && !student.name.last.toLowerCase().includes(searchName.toLowerCase())) {
                return false;
            }
            if (searchMajor && !student.major.toLowerCase().includes(searchMajor.toLowerCase())) {
                return false;
            }
            if (searchInterest && !student.interests.some(interest => interest.toLowerCase().includes(searchInterest.toLowerCase()))) {
                return false;
            }
            return true;
        }));
    }

    const reset = () => {
        document.getElementById("searchName").value = "";
        document.getElementById("searchMajor").value = "";
        document.getElementById("searchInterest").value = "";
        setShownStudents(students);
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" onChange={search}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" onChange={search}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" onChange={search}/>
            <br />
            <Button variant="neutral" onClick={reset}>Reset Search</Button>
        </Form>
        <p>There are {shownStudents.length} student(s) matching your results.</p>
        <Container fluid>
            <Row>
                { 
                    shownStudents.slice((page - 1) * 24, page*24).map(student => {
                        return <Col key={student.id} xs={12} md={6} lg={4} xl={3}>
                        <Student key={student.id} {...student} />
                        </Col>
                })
            }
            </Row>
        </Container>

        <Pagination>
            <Pagination.First onClick={() => setPage(1)} />
            <Pagination.Prev onClick={() => {setPage(Math.max(page - 1, 1))}} />
            {Array.from({length: Math.ceil(shownStudents.length / 24)}, (_, i) => i + 1).map(num => {
                return <Pagination.Item key={num} active={num === page} onClick={() => setPage(num)}>{num}</Pagination.Item>
            })}
            <Pagination.Next onClick={() => setPage(Math.min(page + 1, Math.ceil(shownStudents.length / 24)))} />
            <Pagination.Last onClick={() => setPage(Math.ceil(shownStudents.length / 24))} />
        </Pagination>
    </div>

}

export default Classroom;