import { ref, set } from "firebase/database";
import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { database } from '../../lib/firebase'

export default function ChangeNameModal(props) {
    const [response, setResponse] = useState({
        show: false,
        type: '',
    })

    const handleChangeName = (e) => {
        e.preventDefault()
        const { name } = e.target.elements
        const dbRef = ref(database, `users/${props.user}/name`)
        set(dbRef, name.value).then(() => {
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
                <Modal.Title>Modifica nome della squadra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {response.show ?
                    <Alert variant={response.type}>
                        {response.type === 'success' ? "Operazione avvenuta con successo!" : "Mi dispiace... non è stato possibile completare l'operazione."}
                    </Alert>
                    :
                    <>
                        <p>{`Inserisci il nuovo nome della squadra.`}</p>
                        <Form onSubmit={handleChangeName}>
                            <Form.Group className="my-4" controlId="name">
                                <Form.Label>Nome della squadra</Form.Label>
                                <Form.Control type="text" placeholder="Nome della squadra" name="name" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Modifica
                            </Button>
                        </Form>
                    </>
                }
            </Modal.Body>
        </Modal>
    )
}