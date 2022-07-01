import { React, ContextMenu as ContextMenuHandler, ModalActions } from "ittai/webpack"
import * as webpack from "ittai/webpack"
import { ContextMenu, Flex, DiscordIcon, Modal, Heading } from "ittai/components"
import { Users } from "ittai/stores"
import pinnedDMS from "../../handlers/pinnedDMS"
//@ts-ignore
import styles from "./AddUser.scss"
import { UserID } from "ittai"
import UserListSettings from "../UserListSettings"

const UserSummaryItem = webpack.findByDisplayName("UserSummaryItem")

const USER_ICON_SIZE = 16
const MAX_USERS_DISPLAY = 4

export default function (props: {userId: UserID}) {
    return <ContextMenu navId={"pin-user"} onClose={ContextMenuHandler.closeContextMenu}>
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
        <ContextMenu.MenuItem id="add"
            label="Configure categories"
            icon={() => <DiscordIcon name="Gear" type="contextmenu"/>}
            action={() => ModalActions.openModal((props) => <Modal.ModalRoot {...props} size={Modal.ModalSize.MEDIUM}>
                <Modal.ModalHeader separator={false}>
                    <Heading variant="heading-lg/medium">Categories</Heading>
                </Modal.ModalHeader>
                <Modal.ModalContent>
                    <UserListSettings />
                    <div style={{ paddingBottom: "16px" }} />
                </Modal.ModalContent>
            </Modal.ModalRoot>)}
        />
    </ContextMenu>
}