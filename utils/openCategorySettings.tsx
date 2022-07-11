import { React, ModalActions } from "ittai/webpack"
import { Modal, Heading } from "ittai/components"
import UserListSettings from "../components/UserListSettings"

export default () => {
    ModalActions.openModal((props) => <Modal.ModalRoot {...props} size={Modal.ModalSize.MEDIUM}>
        <Modal.ModalHeader separator={false}>
            <Heading variant="heading-lg/medium">Categories</Heading>
        </Modal.ModalHeader>
        <Modal.ModalContent>
            <UserListSettings />
            <div style={{ paddingBottom: "16px" }} />
        </Modal.ModalContent>
    </Modal.ModalRoot>)
}