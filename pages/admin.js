import { useContext, useState } from "react";
import Layout from "../components/layout";
import { Col, Tab, Nav, Form, Button } from "react-bootstrap";
import styles from '../styles/admin.module.css'
import { auth, database } from "../lib/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set, update, push, child } from 'firebase/database'
import AlertModal from "../components/modal";
import AuthRoute from "../components/authRoute";
import { AuthContext } from "../context/AuthContext";
import AccessDenied from "../components/accessDenied";

export default function AdminPanel() {
    const { currentUser, userData } = useContext(AuthContext)
    const [modal, setModal] = useState({
        show: false,
        type: null,
    })

    console.log(userData)

    const handleAddTeam = async (event) => {
        event.preventDefault()

        const dbref = ref(database)
        const chatKey = push(child(dbref, "chats/")).key
        const updates = {}
        updates[`chats/${chatKey}`] = {
            name: "Supporto della Consulta",
            lastMessage: "Benvenuto"
        }
        updates[`members/${chatKey}`] = {
            support: userData.userId,
            team: "idTeam"
        }
        update(dbref, updates)
        const messageKey = push(child(dbref, `messages/${chatKey}/`)).key
        updates = {}
        updates[`messages/${chatKey}/${messageKey}`] = {
            sender: userData.userId,
            dest: "idTeam",
            text: "Benvenuto",
            timestamp: Date.now()
        }
        update(dbref, updates)






        // const { name, username, password } = event.target.elements
        // try {
        //     await createUserWithEmailAndPassword(auth, username.value, password.value)
        //         .then((user) => {
        //             const data = {
        //                 name: name.value,
        //                 type: "user"
        //             }
        //             const dbRef = ref(database, "users/" + user.user.uid)
        //             set(dbRef, data).then(() => {
        //                 setModal({ show: true, type: "success" })
        //                 name.value = ''
        //                 username.value = ''
        //                 password.value = ''
        //             }).catch(error => {
        //                 setModal({ ...modal, show: true, type: "error" })
        //             })
        //         })
        //         .catch(error => {
        //             setModal({ ...modal, show: true, type: "error" })
        //         })
        // } catch (error) {
        //     setModal({ ...modal, show: true, type: "error" })
        // }
    }

    if (userData.userType === "user") {
        return <AccessDenied />
    } else {
        return (
            <AuthRoute>
                <Layout navbar>
                    <AlertModal type={modal.type} show={modal.show} onHide={() => setModal({ show: false })} />
                    <Tab.Container id="left-tabs-example" defaultActiveKey="addTeam">
                        <Col xs={{ span: 3 }}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item className={styles.navItem}>
                                    <Nav.Link eventKey="addTeam">Aggiungi team</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className={styles.navItem}>
                                    <Nav.Link eventKey="second">Gestione caccia al tesoro</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <Tab.Content>
                                <Tab.Pane eventKey="addTeam">
                                    <Form onSubmit={handleAddTeam}>
                                        <Form.Group className="mb-4" controlId="name">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control type="text" placeholder="Nome" name="name" />
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="username">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email" name="username" />
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name="password" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Aggiungi
                                        </Button>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Test 2
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Tab.Container>
                </Layout>
            </AuthRoute>
        );
    }

}