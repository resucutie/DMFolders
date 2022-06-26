import { React, ContextMenu as ContextMenuHandler } from "ittai/webpack"
import * as webpack from "ittai/webpack"
import { ContextMenu, Flex } from "ittai/components"
import { Users } from "ittai/stores"
import pinnedDMS from "../../handlers/pinnedDMS"
//@ts-ignore
import styles from "./AddUser.scss"
import { UserID } from "ittai"

const UserSummaryItem = webpack.findByDisplayName("UserSummaryItem")

const USER_ICON_SIZE = 16
const MAX_USERS_DISPLAY = 5

export default function (props: {userId: UserID}) {
    return <ContextMenu navId={"pin-user"} onClose={ContextMenuHandler.closeContextMenu}>
        <ContextMenu.MenuGroup label="Add to category">
            {pinnedDMS.getCategories().map(category => <ContextMenu.MenuItem id={category}
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
    </ContextMenu>
}