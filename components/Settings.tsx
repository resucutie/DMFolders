import { Dispatcher, React } from "ittai/webpack"
import { Category, SwitchItem, Forms, Button, Flex, RadioGroup } from "ittai/components"
import UserListSettings from "./UserListSettings"
import * as settings from "ittai/settings"
//@ts-ignore
import styles from "./Settings.scss"

export default function() {
    console.log(settings.get("pinIcon", true))
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
                    }}
                />
            </Forms.FormItem>
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

const handleExport = () => {
    //@ts-ignore
    DiscordNative.fileManager.saveWithDialog(JSON.stringify(settings.getAll()), "settings.json")
}

const handleImport = async () => {
    //@ts-ignore
    DiscordNative.fileManager.openFiles("*.json").then(output => {
        console.log(output)
    })
    // const stuff: { data: ArrayBuffer, filename: string } = await DiscordNative.fileManager.openFiles("*.json")
    // console.log(stuff)
}