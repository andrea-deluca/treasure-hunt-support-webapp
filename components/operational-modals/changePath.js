import { ref, set } from "firebase/database";
import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { database } from '../../lib/firebase'

export default function ChangePathModal(props) {
    const [response, setResponse] = useState({
        show: false,
        type: '',
    })

    const handleChangePath = (e) => {
        e.preventDefault()
        const { path } = e.target.elements
        const dbRef = ref(database, `users/${props.user}/path`)
        set(dbRef, path.value).then(() => {
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
                <Modal.Title>Assegna un percorso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {response.show ?
                    <Alert variant={response.type}>
                        {response.type === 'success' ? "Operazione avvenuta con successo!" : "Mi dispiace... non è stato possibile completare l'operazione."}
                    </Alert>
                    :
                    <>
                        <p>{`Seleziona il percorso desiderato.`}</p>
                        <Form onSubmit={handleChangePath}>
                            <Form.Group className="my-4" controlId="path">
                                <Form.Label>Percorso</Form.Label>
                                <Form.Select name="path">
                                    <option value="blu">Percorso Blu</option>
                                    <option value="rosso">Percorso Rosso</option>
                                    <option value="verde">Percorso Verde</option>
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