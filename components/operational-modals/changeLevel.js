import { ref, set } from "firebase/database";
import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { database } from '../../lib/firebase'

export default function ChangeLevelModal(props) {
    const [response, setResponse] = useState({
        show: false,
        type: '',
    })

    const handleChangeLevel = (e) => {
        e.preventDefault()
        const { level } = e.target.elements
        const dbRef = ref(database, `users/${props.user}/level`)
        set(dbRef, level.value).then(() => {
            setResponse({
                show: true,
                type: 'success'
            })
        }).catch(err => {
            setResponse({
                show: true,
                type: 'danger'
            })
        })
    }

    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Assegna un livello</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {response.show ?
                    <Alert variant={response.type}>
                        {response.type === 'success' ? "Operazione avvenuta con successo!" : "Mi dispiace... non è stato possibile completare l'operazione."}
                    </Alert>
                    :
                    <>
                        <p>{`Seleziona il livello corrente desiderato.`}</p>
                        <Form onSubmit={handleChangeLevel}>
                            <Form.Group className="my-4" controlId="level">
                                <Form.Label>Livello</Form.Label>
                                <Form.Select name="level">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Assegna
                            </Button>
                        </Form>
                    </>
                }
            </Modal.Body>
        </Modal>
    )
}