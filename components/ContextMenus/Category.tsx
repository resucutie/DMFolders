import { React, ContextMenuManager } from "ittai/webpack"
import { Button, ContextMenu } from "ittai/components"
import { messageBox } from "ittai/utilities"
import openCategorySettings from "../../utils/openCategorySettings"
import pinnedDMS from "../../handlers/pinnedDMS"

export default function (props: { category: string }) {
    return <ContextMenu navId={"pin-user"} onClose={ContextMenuManager.closeContextMenu}>
        <ContextMenu.MenuItem id="edit"
            label="Edit category"
            action={() => openCategorySettings(props.category)}
        />
        <ContextMenu.MenuItem id="delete"
            label="Delete category"
            color="colorDanger"
            action={() => {
                messageBox("Delete", `Are you sure that you want to delete "${props.category}"?`, [
                    {
                        text: "Delete",
                        action: () => {
                            pinnedDMS.removeCategory(props.category)
                        },
                        color: Button.Colors.RED
                    },
                    {
                        text: "Cancel",
                        action: () => {},
                        color: Button.Colors.WHITE,
                        look: Button.Looks.LINK
                    }
                ])
            }}
        />
    </ContextMenu>
}

