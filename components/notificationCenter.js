import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Offcanvas, Button, Badge } from "react-bootstrap";
import { RiNotification3Fill } from 'react-icons/ri'
import styles from '../styles/notification.module.css'
import { AuthContext } from '../context/AuthContext'
import { database } from "../lib/firebase";
import { ref, onValue, remove } from "firebase/database";
import useSound from "use-sound";

export default function NotificationCenter() {
    const { userData } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [notifications, setNotifications] = useState(null)
    const [notify] = useSound("/audio/notify.mp3")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const dbRef = ref(database, `notifications/${userData.userId}`)
        onValue(dbRef, (snapshot) => {
            const notificationsArray = []
            snapshot.forEach(snap => {
                notificationsArray.push({...snap.exportVal(), key: snap.key})
            })
            setNotifications(notificationsArray)
            if (notificationsArray.length) {
                notify()
            }
        })
    }, [notify])

    const deleteHandler = (e) => {
        e.preventDefault()
        const key = e.target.id
        const dbRef = ref(database, `notifications/${userData.userId}/${key}`)
        remove(dbRef)
    }

    return (
        <>
            <Badge pill bg={"primary"} className={styles.offCanvasIcon} onClick={handleShow}>
                <RiNotification3Fill />{' '}
                {notifications && notifications.length}
            </Badge>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notifiche</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={"d-flex flex-column justify-content-between"}>
                    <ul className={"p-0"}>
                        {(notifications && notifications.length !== 0) ? notifications.map(notification => {
                            return (
                                <li className={"d-flex mb-3"}>
                                    <div className={styles.notificationBox}>
                                        <h6 className={styles.notificationTitle}>{notification.title}</h6>
                                        <p className={styles.notificationText}>{notification.message}</p>
                                        <Link href={"/"}>
                                            <Button variant={"primary"}>
                                                Portami lì
                                            </Button>
                                        </Link>
                                        <Button id={notification.key} className={"ms-3"} variant={"light"} onClick={deleteHandler}>
                                            Elimina
                                        </Button>
                                    </div>
                                </li>
                            )
                        }) : <p className={"text-muted"}>Nessuna notifica</p>}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}