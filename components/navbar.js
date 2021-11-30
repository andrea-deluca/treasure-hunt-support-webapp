import { Container, Navbar } from 'react-bootstrap'
import styles from '../styles/navbar.module.css'

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
                            Menu
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    );
}