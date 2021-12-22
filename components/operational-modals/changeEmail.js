import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

export default function ChangeEmailModal(props) {
    const [response, setResponse] = useState({
        show: false,
        type: '',
    })

    const handleChangeEmail = (e) => {
        e.preventDefault()
        const { email } = e.target.elements
        const req = {
            method: "POST",
            body: {
                uid: props.user,
                email: email.value
            }
        }
        fetch("/api/updateUser", {
            method: req.method,
            body: JSON.stringify(req.body)
        }).then(res => {
            if (res.status === 200) {
                setResponse({
                    show: true,
                    type: 'success'
                })
            } else {
                setResponse({
                    show: true,
                    type: 'danger'
                })
            }
        })
    }

    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modifica email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {response.show ?
                    <Alert variant={response.type}>
                        {response.type === 'success' ? "Operazione avvenuta con successo!" : "Mi dispiace... non è stato possibile completare l'operazione."}
                    </Alert>
                    :
                    <>
                        <p>{`Inserisci la nuova email.`}</p>
                        <Form onSubmit={handleChangeEmail}>
                            <Form.Group className="my-4" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" name="email" />
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