import Image from "next/image";
import Layout from "../components/layout";
import { Col, Form, Button, Tab, Nav } from 'react-bootstrap'
import logo from '../public/images/logo.png'
import styles from '../styles/support.module.css'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useContext, useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, onValue, child, set, push } from 'firebase/database'
import { AuthContext } from "../context/AuthContext";
import AuthRoute from "../components/authRoute";

export default function Support() {
    const { userData } = useContext(AuthContext)
    const [newMessage, setNewMessage] = useState("")
    const [userChats, setUserChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)

    useEffect(() => {
        const dbRef = ref(database, 'chats/')
        onValue(dbRef, (snapshot) => {
            const chats = []
            snapshot.forEach(snap => {
                if (userData.userId === snap.val().memberId || userData.userId === snap.val().supportId) {
                    chats.push({
                        key: snap.key,
                        ...snap.val()
                    })
                }
            })
            setUserChats(chats)
        })
    }, [])

    const sendHandle = (e) => {
        e.preventDefault()
        const message = {
            sender: userData.userId,
            dest: "0SZxA5aEhvf3YR23awtaGZxD4rg2",
            text: newMessage,
            timestamp: Date.now()
        }
        const dbRef = ref(database, `chats/${currentChat.key}/messages`)
        set(child(dbRef, `${currentChat.messages.length}`), message)
        setNewMessage("")
    }

    return (
        <AuthRoute>
            <Layout navbar>
                <Tab.Container defaultActiveKey="">
                    <Col xs={{ span: 3 }} className={"align-self-start"}>
                        <Nav variant="pills" className="flex-column">
                            {userChats.map(chat => {
                                return (
                                    <Nav.Item className={styles.navItem} onClick={() => setCurrentChat(chat)}>
                                        <Nav.Link className={styles.chatsBox} eventKey={chat.key}>
                                            <Image src={logo} alt={"Logo consulta giovanile di Lascari"} width={48} height={48} className={styles.chatPicture} />
                                            <div className={"ms-3"}>
                                                <h6 className={styles.chatTitle}>{chat.name}</h6>
                                                <p className={"text-muted m-0"}>{(new Date(chat.messages[chat.messages.length - 1].timestamp)).toLocaleString()}</p>
                                            </div>
                                        </Nav.Link>
                                    </Nav.Item>
                                )
                            })}
                        </Nav>
                    </Col>
                    <Col xs={{ span: 6, offset: 1 }} className={styles.chatBox}>
                        <Tab.Content className={"align-self-end w-100 p-3 overflow-scroll"}>
                            {userChats.map(chat => {
                                return (
                                    <Tab.Pane eventKey={chat.key}>
                                        {chat.messages.map(message => {
                                            return (
                                                <div className={message.sender === userData.userId ? styles.messageSentContainer : styles.messageReceivedContainer}>
                                                    <div className={message.sender === userData.userId ? styles.chatMessageSent : styles.chatMessageReceived}>
                                                        <p className={styles.chatMessageText}>
                                                            {message.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Tab.Pane>
                                )
                            })}
                        </Tab.Content>
                        <Form className={"d-flex mt-5 aling-items-center"} onSubmit={sendHandle}>
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
                    </Col>
                </Tab.Container>
            </Layout>
        </AuthRoute>
    );
}