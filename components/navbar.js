import { useState, useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { Container, Navbar, Offcanvas } from 'react-bootstrap'
import { RiMenu3Fill, RiHome3Fill, RiMap2Fill, RiLoginCircleLine } from 'react-icons/ri'
import styles from '../styles/navbar.module.css'
import logo from '../public/images/logo.png'
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthContext } from '../context/AuthContext';

function NavMenu() {
    const [show, setShow] = useState(false);

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
                <Offcanvas.Body className={"d-flex flex-column justify-content-between align--start"}>
                    <ul className={styles.menuList}>
                        <Link href={"/home"}>
                            <li className={"d-flex align-items-center"}>
                                <RiHome3Fill className={"me-3"} />
                                Home
                            </li>
                        </Link>
                        <Link href={"/home"}>
                            <li className={"d-flex align-items-center"}>
                                <RiMap2Fill className={"me-3"} />
                                Caccia al tesoro
                            </li>
                        </Link>
                    </ul>
                    <ul className={styles.menuList}>
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
                                alt="React Bootstrap logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <span>Team: <strong>{userData.userName}</strong></span>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <NavMenu />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    );
}