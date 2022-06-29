import * as webpack from "ittai/webpack"
import { ColorHex, ColorUtils, Constants, React } from "ittai/webpack"
import { Button, Modal, TextInput, Forms, ColorPicker } from "ittai/components";
import pinnedDMS from "../../../handlers/pinnedDMS";
import classes from "../../../utils/classes"
//@ts-ignore
import styles from "./CategorySettingsModal.scss"
const { CustomColorButton } = webpack.findByProps("DefaultColorButton")

export default function (modalProps: { transitionState: 1 | 2 | 3, onClose: () => void, name: string}) {
    const [newName, setNewName] = React.useState(modalProps.name)
    const [newColor, setNewColor] = React.useState<ColorHex>(pinnedDMS.getColor(modalProps.name))

    return <Modal.ModalRoot size={Modal.ModalSize.DYNAMIC} {...modalProps}>
        <Modal.ModalHeader separator={false}>
            <TextInput
                value={newName}
                onChange={setNewName}
                placeholder="Rename"
                className={styles.textbox}
            />
        </Modal.ModalHeader>
        <Modal.ModalContent>
            <Forms.FormItem className={classes.Margins.marginBottom20}>
                <Forms.FormTitle>Color</Forms.FormTitle>
                <ColorPicker
                    colors={Constants.ROLE_COLORS}
                    defaultColor={Constants.DEFAULT_ROLE_COLOR}
                    value={ColorUtils.hex2int(newColor)}
                    onChange={(c: number) => setNewColor(ColorUtils.int2hex(c))}
                />
            </Forms.FormItem>
        </Modal.ModalContent>
        <Modal.ModalFooter>
            <Button onClick={() => {
                if (modalProps.name !== newName) pinnedDMS.renameCategory(modalProps.name, newName)
                pinnedDMS.setColor(modalProps.name, newColor)
                modalProps.onClose()
            }}>
                Save
            </Button>
            <Button look={Button.Looks.LINK} color={Button.Colors.WHITE} onClick={modalProps.onClose}>
                Cancel
            </Button>
        </Modal.ModalFooter>
    </Modal.ModalRoot>
}