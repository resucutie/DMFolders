import * as webpack from "ittai/webpack"
import { ColorHex, ColorUtils, Constants, Dispatcher, React } from "ittai/webpack"
import { Button, Modal, TextInput, Forms, ColorPicker, SwitchItem } from "ittai/components";
import pinnedDMS from "../../../handlers/pinnedDMS";
import classes from "../../../utils/classes"
//@ts-ignore
import styles from "./CategorySettingsModal.scss"
const { CustomColorButton } = webpack.findByProps("DefaultColorButton")

export default function (modalProps: { transitionState: 1 | 2 | 3, onClose: () => void, category: string}) {
    const [newName, setNewName] = React.useState(modalProps.category)
    const [newColor, setNewColor] = React.useState<ColorHex>(pinnedDMS.getColor(modalProps.category))

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
            <Forms.FormItem>
                <Forms.FormTitle>Color</Forms.FormTitle>
                <div className={classes.Margins.marginBottom20}>
                    <ColorPicker
                        colors={Constants.ROLE_COLORS}
                        defaultColor={Constants.DEFAULT_ROLE_COLOR}
                        value={ColorUtils.hex2int(newColor)}
                        onChange={(c: number) => setNewColor(ColorUtils.int2hex(c))}
                    />
                </div>
                <SwitchItem
                    value={!pinnedDMS.getVisibility(modalProps.category)}
                    onChange={(e) => pinnedDMS.setVisibility(modalProps.category, !e)}
                >Hide its contents</SwitchItem>
            </Forms.FormItem>
        </Modal.ModalContent>
        <Modal.ModalFooter>
            <Button onClick={() => {
                if (modalProps.category !== newName) pinnedDMS.renameCategory(modalProps.category, newName)
                pinnedDMS.setColor(modalProps.category, newColor)
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