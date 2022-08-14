import { React, ContextMenuManager } from "ittai/webpack"
import * as webpack from "ittai/webpack"
import { ContextMenu, Flex, DiscordIcon } from "ittai/components"
import { Users } from "ittai/stores"
import pinnedDMS from "../../handlers/pinnedDMS"
import { UserID } from "ittai"
import openCategorySettings from "../../utils/openCategorySettings"
//@ts-ignore
import styles from "./AddUser.mod.scss"

const UserSummaryItem = webpack.findByDisplayName("UserSummaryItem")

const USER_ICON_SIZE = 16
const MAX_USERS_DISPLAY = 4

export default function (props: {userId: UserID}) {
    return <ContextMenu navId={"pin-user"} onClose={ContextMenuManager.closeContextMenu}>
        <ContextMenu.MenuGroup label="Add to category">
            {pinnedDMS.getCategories().map(category => <ContextMenu.MenuItem id={`category-${category}`}
                label={<Flex>
                    <span className={styles.text} style={{ color: pinnedDMS.getColor(category)}}>{category}</span>
                    <UserSummaryItem
                        size={USER_ICON_SIZE}
                        max={MAX_USERS_DISPLAY}
                        users={pinnedDMS.getUsers(category).sort(() => Math.random() - 0.5).map(userId => Users.getUser(userId))}
                    />
                </Flex>}

                action={() => pinnedDMS.addUser(category, props.userId)}
            />)}
        </ContextMenu.MenuGroup>
        <ContextMenu.MenuSeparator />
        <ContextMenu.MenuItem id="configure"
            label="Configure categories"
            icon={() => <DiscordIcon name="Gear" type="contextmenu"/>}
            action={openCategorySettings}
        />
    </ContextMenu>
}