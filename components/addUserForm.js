import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AlertModal from "../components/modal";

export default function AddUserForm() {
    const [modal, setModal] = useState({
        show: false,
        type: null,
        code: '',
        message: ''
    })

    const createUserHandler = async (e) => {
        e.preventDefault()
        const { name, email, password } = e.target.elements
        const req = {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value
            }
        }
        fetch("/api/createUser", {
            method: req.method,
            body: JSON.stringify(req.body)
        }).then((res) => {
            if (res.status === 200) {
                setModal({ show: true, type: "success" })
            } else {
                res.json().then((err) => {
                    setModal({ show: true, type: "error", code: err.code, message: err.message })
                })
            }
        })
        name.value = ''
        email.value = ''
        password.value = ''
    }

    return (
        <>
            <AlertModal type={modal.type} show={modal.show} message={modal.message} code={modal.code} onHide={() => setModal({ show: false })} />
            <Form onSubmit={createUserHandler}>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control required type="text" placeholder="Nome" name="name" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Email" name="email" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Aggiungi
                </Button>
            </Form>
        </>
    );
}