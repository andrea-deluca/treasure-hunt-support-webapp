import { useState, useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { Container, Navbar, Offcanvas } from 'react-bootstrap'
import { RiMenu3Fill, RiHome3Fill, RiMap2Fill, RiLoginCircleLine, RiCustomerService2Fill, RiTerminalBoxFill} from 'react-icons/ri'
import styles from '../styles/navbar.module.css'
import logo from '../public/images/logo.png'
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthContext } from '../context/AuthContext';
import NotificationCenter from './notificationCenter';

function NavMenu() {
    const [show, setShow] = useState(false);
    const { userData } = useContext(AuthContext)

    const singOutHandler = async () => {
        await signOut(auth)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <RiMenu3Fill onClick={handleShow} className={styles.menuIcon} />
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={"d-flex flex-column justify-content-between align-start"}>
                    <ul className={styles.menuList}>
                        <Link href={"/"}>
                            <li className={"d-flex align-items-center"}>
                                <RiHome3Fill className={"me-3"} />
                                Home
                            </li>
                        </Link>
                        <Link href={"/"}>
                            <li className={"d-flex align-items-center"}>
                                <RiMap2Fill className={"me-3"} />
                                Caccia al tesoro
                            </li>
                        </Link>
                        {userData.userType === "admin" && <Link href={"/admin"}>
                            <li className={"d-flex align-items-center"}>
                                <RiTerminalBoxFill className={"me-3"} />
                                Funzionalità admin
                            </li>
                        </Link>}
                    </ul>
                    <ul className={styles.menuList}>
                        <Link href={"/support"}>
                            <li className={"d-flex align-items-center"}>
                                <RiCustomerService2Fill className={"me-3"} />
                                Supporto
                            </li>
                        </Link>
                        <li className={"d-flex align-items-center"} onClick={singOutHandler}>
                            <RiLoginCircleLine className={"me-3"} />
                            Esci
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default function Nav() {
    const { userData } = useContext(AuthContext)

    return (
        <nav className={styles.navbar}>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <Link href={"/"}>
                            <Image
                                src={logo}
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt="Logo Consulta Giovanile Lascari"
                            />
                        </Link>
                    </Navbar.Brand>
                    <span>Team: <strong>{userData.userName}</strong></span>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className={"me-5"}>
                            <NotificationCenter/>
                        </Navbar.Text>
                        <Navbar.Text>
                            <NavMenu />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    );
}