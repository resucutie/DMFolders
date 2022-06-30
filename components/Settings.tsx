import { Dispatcher, React, ModalActions } from "ittai/webpack"
import { Category, SwitchItem, Forms, Button, Flex, RadioGroup, Modal, Heading, Text } from "ittai/components"
import UserListSettings from "./UserListSettings"
import * as settings from "ittai/settings"
import * as toast from "ittai/toast"
//@ts-ignore
import styles from "./Settings.scss"
import isValidJSON from "../utils/isValidJSON"

export default function() {
    const [, forceUpdate] = React.useReducer((v) => !v, false)

    return <>
        <Category title="Listed folders" description="Configure the folders and add or change the listed users">
            <UserListSettings />
        </Category>

        <Category title="Other settings" description="Other settings that you can tweak">
            <SwitchItem 
                value={settings.get("pinIcon", true)}
                onChange={(e) => settings.set("pinIcon", e)}
            >Show pin icon</SwitchItem>
            <Forms.FormItem>
                <Forms.FormTitle>Display mode</Forms.FormTitle>
                <RadioGroup
                    options={[
                        { name: "Category", value: "category" },
                        { name: "Minimalist", value: "minimal" }
                    ]}
                    value={settings.get("display", "category")}
                    onChange={(v) => {
                        settings.set("display", v.value)
                        Dispatcher.dirtyDispatch({ type: "PINDMS_CHANGE_LIST" })
                        forceUpdate()
                    }}
                />
            </Forms.FormItem>

            {settings.get("display", "category") === "minimal" && <Forms.FormItem>
                <Forms.FormTitle>Minimalist view settings</Forms.FormTitle>
                <SwitchItem
                    value={settings.get("minimal.userIcons", false)}
                    onChange={(e) => {
                        settings.set("minimal.userIcons", e)
                        Dispatcher.dirtyDispatch({ type: "PINDMS_CHANGE_LIST" })
                    }}
                >Show user icons</SwitchItem>
            </Forms.FormItem>}
            <Forms.FormItem>
                <Forms.FormTitle>Export and import settings</Forms.FormTitle>
                <Flex className={styles.buttonFlex}>
                    <Button onClick={handleExport}>Export</Button>
                    <Button color={Button.Colors.RED}
                        onClick={handleImport}
                    >Import</Button>
                </Flex>
            </Forms.FormItem>

        </Category>
    </>
}

const handleExport = async () => {
    //@ts-ignore
    return DiscordNative.fileManager.saveWithDialog(JSON.stringify(settings.getAll()), "settings.json")
}

const handleImport = async () => {
    //@ts-ignore
    const [selectedFile] = await DiscordNative.fileManager.openFiles("*.json")
    const newSettingsText = new TextDecoder().decode(new Uint8Array(selectedFile.data as ArrayBuffer))
    if (!isValidJSON(newSettingsText)) return void toast.show("Invalid settings file. It should end with \".json\".", {
        duration: 5000
    })
    const newSettings: JSON = JSON.parse(newSettingsText)
    
    const overrideSettings = () => {
        settings.reset()
        settings.setAll(newSettings)
    }

    ModalActions.openModal(props => <Modal.ModalRoot {...props} size={Modal.ModalSize.SMALL}>
        <Modal.ModalHeader separator={false}>
            <Heading variant="heading-lg/medium">Save a backup</Heading>
        </Modal.ModalHeader>
        <Modal.ModalContent>
            <Text>Do you want to save a backup?</Text>
        </Modal.ModalContent>
        <Modal.ModalFooter>
            <Flex style={{gap: "8px"}} justify={Flex.Justify.END}>
                <Button look={Button.Looks.LINK} color={Button.Colors.WHITE} onClick={props.onClose}>
                    Cancel
                </Button>
                <Button look={Button.Looks.LINK} color={Button.Colors.RED} onClick={() => { overrideSettings(); props.onClose() }}>
                    Override without saving
                </Button>
                <Button onClick={async () => { await handleExport(); overrideSettings(); props.onClose(); }}>
                    Save
                </Button>
            </Flex>
        </Modal.ModalFooter>
    </Modal.ModalRoot>)

    // const stuff: { data: ArrayBuffer, filename: string } = await DiscordNative.fileManager.openFiles("*.json")
    // console.log(stuff)
}