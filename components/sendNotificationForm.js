import { ref, get, push, update } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { Form, Button } from 'react-bootstrap'
import AlertModal from "./modal";

export default function SendNotificationForm() {
    const [users, setUsers] = useState(null)
    const [modal, setModal] = useState({
        show: false,
        type: null,
        message: '',
        code: ''
    })

    useEffect(async () => {
        const dbRef = ref(database, 'users/')
        get(dbRef).then((snapshot) => {
            const snapUsers = []
            snapshot.forEach(snap => {
                snapUsers.push({
                    key: snap.key,
                    ...snap.val()
                })
            })
            setUsers(snapUsers);
        })
    }, [])

    const sendNotificationHandler = (e) => {
        e.preventDefault();
        const checkboxArray = document.getElementsByName("users")
        const selectedUsers = []
        checkboxArray.forEach(checkbox => {
            if (checkbox.checked) {
                selectedUsers.push(checkbox.value)
            }
        })
        const dbRef = ref(database, 'notifications/')
        const updates = {}
        selectedUsers.forEach(user => {
            const key = push(dbRef).key
            updates[`${user}/${key}`] = {
                title: title.value,
                message: message.value,
                timestamp: Date.now()
            }
        })
        update(dbRef, updates).then(() => {
            setModal({ show: true, type: "success" })
        }).catch(err => {
            setModal({ show: true, type: "error", message: err.errorInfo.message, code: err.errorInfo.code })
        })
        title.value = ''
        message.value = ''
    }

    return (
        <>
            <AlertModal type={modal.type} show={modal.show} message={modal.message} code={modal.code} onHide={() => setModal({ show: false })} />
            <Form onSubmit={sendNotificationHandler}>
                <Form.Group className="mb-4" controlId="title">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control required type="text" placeholder="Titolo della notifica" name="title" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="message">
                    <Form.Label>Messaggio</Form.Label>
                    <Form.Control required as={"textarea"} rows={3} placeholder="Messaggio della notifica" name="message" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="users">
                    <Form.Label className={"d-block"}>Seleziona utenti</Form.Label>
                    <Form.Text className={"d-block mb-4"}>Seleziona solo gli utenti a cui vuoi mandare una notifica</Form.Text>
                    {users && users.map(user => {
                        return (
                            <Form.Check inline type={"checkbox"} label={user.name} value={user.key} name={"users"} />
                        );
                    })}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Invia notifica
                </Button>
            </Form>
        </>
    );
}