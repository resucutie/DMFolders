import { React, ContextMenu as ContextMenuHandler } from "ittai/webpack"
import { ContextMenu } from "ittai/components"
import openCategorySettings from "../../utils/openCategorySettings"

export default function (props: { category: string }) {
    return <ContextMenu navId={"pin-user"} onClose={ContextMenuHandler.closeContextMenu}>
        <ContextMenu.MenuItem id="edit"
            label="Edit category"
            action={() => openCategorySettings(props.category)}
        />
    </ContextMenu>
}