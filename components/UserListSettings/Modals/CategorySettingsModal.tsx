import * as webpack from "ittai/webpack"
import { ColorHex, ColorUtils, Constants, React } from "ittai/webpack"
import { Button, Modal, TextInput, Forms, ColorPicker, SwitchItem, Text, Anchor } from "ittai/components";
import pinnedDMS from "../../../handlers/pinnedDMS";
import classes from "../../../utils/classes"
import * as constants from "../../../constants"
import * as settings from "ittai/settings"
//@ts-ignore
import styles from "./CategorySettingsModal.scss"
import ErrorBoundary from "../../../utils/ErrorBoundary";
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
                    <ErrorBoundary
                        renderError={<Text color={Text.Colors.ERROR}>
                            An error happened while trying to load the ColorPicker. Check <Anchor href="https://git.catvibers.me/Ittai/ittai/issues/9">https://git.catvibers.me/Ittai/ittai/issues/9</Anchor> for more information about.<br/><br/>
                            As of now, you can do these steps:
                            <ul className={styles.properSpacing}>
                                <li>- Remove the plugin from the plugins folder</li>
                                <li>- Go to any server's settings</li>
                                <li>- Go to "Roles"</li>
                                <li>- Click on any role</li>
                                <li>- Put the plugin back</li>
                            </ul>
                            This will load the ColorPicker component and then fix this error
                        </Text>}
                    >
                        <ColorPicker
                            colors={Constants.ROLE_COLORS}
                            defaultColor={Constants.DEFAULT_ROLE_COLOR}
                            value={ColorUtils.hex2int(newColor)}
                            onChange={(c: number) => setNewColor(ColorUtils.int2hex(c))}
                        />
                    </ErrorBoundary>
                </div>
                <SwitchItem
                    value={!pinnedDMS.getVisibility(modalProps.category)}
                    onChange={(e) => pinnedDMS.setVisibility(modalProps.category, !e)}
                    disabled={settings.get('display', constants.Settings.DefaultSettings.DISPLAY_MODE) === constants.Settings.DefaultSettings.MinimalistView.settingsValue}
                    note={settings.get('display', constants.Settings.DefaultSettings.DISPLAY_MODE) && "Disabled because it is using the Minimalist view"}
                >Hide contents</SwitchItem>
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