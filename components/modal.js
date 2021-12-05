import { Modal, Button } from 'react-bootstrap'

function Error(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title className={"text-danger"}>Oops! Qualcosa è andato storto...</Modal.Title>
            </Modal.Header>
            <Modal.Body>Mi dispiace... non è stato possibile completare l'operazione.</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function Success(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title className={"text-success"}>Yuppy!</Modal.Title>
            </Modal.Header>
            <Modal.Body>L'operazione è stata eseguita con successo e tutto è andato a buon fine!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function AlertModal(props) {
    if (props.type === "error") {
        return <Error show={props.show} onHide={props.onHide} />
    } else {
        return <Success show={props.show} onHide={props.onHide} />
    }
}