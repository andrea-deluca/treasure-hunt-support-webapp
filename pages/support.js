import Image from "next/image";
import Layout from "../components/layout";
import { Row, Col, Form, Button, Tab, Nav } from 'react-bootstrap'
import logo from '../public/images/logo.png'
import styles from '../styles/support.module.css'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useContext, useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, get, onValue, query, equalTo } from 'firebase/database'
import { AuthContext } from "../context/AuthContext";

export default function Support() {
    const { userData } = useContext(AuthContext)
    const [newMessage, setNewMessage] = useState("")
    const [chats, setChats] = useState([])

    useEffect(() => {
        const chats = ref(database, 'chats/')
        get(chats).then((snapshot) => {
            const test = snapshot.exportVal()
            const chatsList = []
            snapshot.forEach(element => {
                chatsList.push(element.key)
            })
            console.log(chatsList)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const message = {
            text: newMessage,
            timestamp: Date.now()
        }



    }

    return (
        <Layout navbar>
            <Tab.Container defaultActiveKey="">
                <Col xs={{ span: 3 }} className={"align-self-start"}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item className={styles.navItem}>
                            <Nav.Link className={styles.chatsBox} eventKey={"chatkey"}>
                                <Image src={logo} alt={"Logo consulta giovanile di Lascari"} width={48} height={48} className={styles.chatPicture} />
                                <div className={"ms-3"}>
                                    <h6 className={styles.chatTitle}>Supporto della Consulta</h6>
                                    <p className={"text-muted m-0"}>Ultimo messaggio: </p>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={{ span: 6, offset: 1 }} className={styles.chatBox}>
                    <Tab.Content className={"align-self-end"}>
                        <Tab.Pane eventKey="chatkey">
                            <div className={styles.messageReceivedContainer}>
                                <div className={styles.chatMessageReceived}>
                                    <p className={styles.chatMessageText}>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Sint cumque recusandae accusantium minima iure, distinctio error,
                                        eaque nihil totam perferendis eum! Alias dolore quia aspernatur
                                        eveniet molestias vero, obcaecati nesciunt.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.messageSentContainer}>
                                <div className={styles.chatMessageSent}>
                                    <p className={styles.chatMessageText}>Testo del messaggio 1</p>
                                </div>
                            </div>
                            <Form className={"d-flex mt-5 aling-items-center"} onSubmit={handleSubmit}>
                                <Form.Control
                                    as="textarea"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    rows={1}
                                    placeholder={"Scrivi qui..."}
                                    className={"me-2 p-3"} />
                                <div>
                                    <Button variant={"dark"} type={"submit"} className={"p-3"} disabled={!newMessage}>
                                        <RiSendPlaneFill />
                                    </Button>
                                </div>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Tab.Container>
        </Layout>
    );
}