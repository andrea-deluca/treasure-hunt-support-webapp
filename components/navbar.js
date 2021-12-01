import { useState } from 'react';
import Link from 'next/link'
import { Container, Navbar, Offcanvas } from 'react-bootstrap'
import { RiMenu3Fill, RiHome3Fill, RiMap2Fill, RiLoginCircleLine } from 'react-icons/ri'
import styles from '../styles/navbar.module.css'

function NavMenu() {
    const [show, setShow] = useState(false);

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
                        <Link href={"/home"}>
                            <li className={"d-flex align-items-center"}>
                                <RiLoginCircleLine className={"me-3"} />
                                Esci
                            </li>
                        </Link>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default function Nav() {
    return (
        <nav className={styles.navbar}>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="/images/logo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
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