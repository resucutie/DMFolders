import * as webpack from "ittai/webpack"
import { React } from "ittai/webpack"
import { Button, Modal, TextInput, Heading } from "ittai/components";
import pinnedDMS from "../../handlers/pinnedDMS";

export default function (props: { transitionState: 1 | 2 | 3, onClose: () => void, name: string}) {
    const [newName, setNewName] = React.useState(props.name)

    return <Modal.ModalRoot size={Modal.ModalSize.SMALL} {...props}>
        <Modal.ModalHeader separator={false}>
            <Heading variant="heading-lg/medium">Rename</Heading>
        </Modal.ModalHeader>
        <Modal.ModalContent>
            <TextInput
                value={newName}
                onChange={setNewName}
            />
        </Modal.ModalContent>
        <Modal.ModalFooter>
            <Button onClick={() => {
                pinnedDMS.renameCategory(props.name, newName)
                props.onClose()
            }}>
                Rename
            </Button>
            <Button look={Button.Looks.LINK} color={Button.Colors.WHITE} onClick={props.onClose}>
                Cancel
            </Button>
        </Modal.ModalFooter>
    </Modal.ModalRoot>
}