import ChangeNameModal from "./operational-modals/changeName"
import ChangeEmailModal from './operational-modals/changeEmail'
import ChangeUserTypeModal from './operational-modals/changeUserType'
import ChangePathModal from './operational-modals/changePath'
import ChangeLevelModal from './operational-modals/changeLevel'
import DeleteAccountModal from './operational-modals/deleteAccount'

export default function ManageUsersModal(props) {
    switch (props.type) {
        case 'NAME':
            return <ChangeNameModal user={props.user} show={props.show} onHide={props.onHide} />
        case 'EMAIL':
            return <ChangeEmailModal user={props.user} show={props.show} onHide={props.onHide} />
        case 'USER_TYPE':
            return <ChangeUserTypeModal user={props.user} show={props.show} onHide={props.onHide} />
        case 'PATH':
            return <ChangePathModal user={props.user} show={props.show} onHide={props.onHide} />
        case 'LEVEL':
            return <ChangeLevelModal user={props.user} show={props.show} onHide={props.onHide} />
        case 'DELETE':
            return <DeleteAccountModal user={props.user} show={props.show} onHide={props.onHide} />
    }  return <></>
}