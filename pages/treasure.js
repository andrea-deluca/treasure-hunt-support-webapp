import Layout from "../components/layout";
import { Col, Form, Button } from "react-bootstrap";

export default function Treasure() {
    return (
        <Layout navbar>
            <Col xs={{ span: 10 }} lg={{ span: 5 }} className={"d-flex flex-column"}>
                <h6 className={"fw-light"}>LIVELLO 1</h6>
                <h3 className={"fw-bold"}>Indovinello</h3>
                <p>Rispondi correttamete all'indovinello per sbloccare il prossimo livello</p>
                <p className={"mt-4"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ipsum ipsam tenetur explicabo sed blanditiis voluptates vitae perspiciatis, optio adipisci pariatur asperiores illo, repudiandae ipsa nam qui ratione delectus repellat.</p>
                <Form>
                    <Form.Group className={"my-4"} controlId="answer">
                        <Form.Label>Risposta</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la tua risposta" name="answer" />
                    </Form.Group>
                    <Button variant={"primary"} type={"submit"}>
                        Continua
                    </Button>
                </Form>
            </Col>
        </Layout>
    )
}