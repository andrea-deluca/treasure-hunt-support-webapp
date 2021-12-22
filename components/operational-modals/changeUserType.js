import { ref, set } from "firebase/database";
import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { database } from '../../lib/firebase'

export default function ChangeUserTypeModal(props) {
    const [response, setResponse] = useState({
        show: false,
        type: '',
    })

    const handleChangeUserType = (e) => {
        e.preventDefault()
        const { userType } = e.target.elements
        const dbRef = ref(database, `users/${props.user}/type`)
        set(dbRef, userType.value).then(() => {
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
                <Modal.Title>Modifica tipologia utente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {response.show ?
                    <Alert variant={response.type}>
                        {response.type === 'success' ? "Operazione avvenuta con successo!" : "Mi dispiace... non è stato possibile completare l'operazione."}
                    </Alert>
                    :
                    <>
                        <p>{`Seleziona la tipologia di utente desiderata.`}</p>
                        <Form onSubmit={handleChangeUserType}>
                            <Form.Group className="my-4" controlId="userType">
                                <Form.Label>Tipologia utente</Form.Label>
                                <Form.Select name="userType">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
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