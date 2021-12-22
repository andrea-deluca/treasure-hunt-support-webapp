import styles from '../styles/footer.module.css'
import { RiInstagramLine, RiFacebookCircleFill, RiLinkedinFill, RiGithubFill } from "react-icons/ri"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={"d-flex flex-column align-items-center"}>
                <p className={"mb-0 fw-light"}>
                    Powered by {''}
                    <span className={"fw-bold"}>Consulta Giovanile di Lascari</span>
                    <a href="http://instagram.it/consultagiovanilelascari" target="_blank" rel="noopener noreferrer" className={"ms-2 d-inline"} ><RiInstagramLine /></a>
                    <a href="http://facebook.it/consultagiovanilelascari" target="_blank" rel="noopener noreferrer" className={"ms-2 d-inline"} ><RiFacebookCircleFill /></a>
                </p>
                <p className={"mb-0 fw-light"}>Copyright &copy; 2021 Andrea Deluca
                    <a href="http://github.com/andrea-deluca" target="_blank" rel="noopener noreferrer" className={"ms-2 d-inline"} ><RiGithubFill /></a>
                    <a href="https://www.linkedin.com/in/andrea-deluca-022b1820b/" target="_blank" rel="noopener noreferrer" className={"ms-2 d-inline"} ><RiLinkedinFill /></a>
                </p>
            </div>
        </footer>
    );
}