import { React, ModalActions } from "ittai/webpack"
import { Modal } from "ittai/components"
import UserListSettings, { CreateCategory } from "../components/UserListSettings"

export default (openedCategory?: string) => {
    ModalActions.openModal((props) => <Modal.ModalRoot {...props} size={Modal.ModalSize.MEDIUM}>
        <Modal.ModalHeader separator={false}>
            <CreateCategory />
        </Modal.ModalHeader>
        <Modal.ModalContent>
            <UserListSettings {...{ openedCategory }} showAddCategoryButton={false} />
            <div style={{ paddingBottom: "16px" }} />
        </Modal.ModalContent>
    </Modal.ModalRoot>)
}