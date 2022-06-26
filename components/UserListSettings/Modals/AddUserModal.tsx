import * as webpack from "ittai/webpack"
import { React } from "ittai/webpack"
import { Modal, TextInput, Avatar, Flex, Text } from "ittai/components";
import { Channels, Users } from "ittai/stores";
import pinnedDMS from "../../../handlers/pinnedDMS";
import classes from "../../../utils/classes"
//@ts-ignore
import styles from "./AddUserModal.scss"
//@ts-ignore
import categoryStyles from "./CategorySettingsModal.scss"
import limit from "../../../utils/limit";
import { UserID, UserObject } from "ittai";
import joinClasses from "../../../utils/joinClasses";

const dmUsers: UserObject[] = Channels.getSortedPrivateChannels().filter(channel => channel.recipients.length === 1 && channel.recipients[0] != null).map(channel => Users.getUser(channel.recipients[0]))

const MAX_USER_DISPLAY = 60

export default function (props: { transitionState: 1 | 2 | 3, onClose: () => void, onSelect: (id: UserObject) => void}) {
    const [users, setUsers] = React.useState<UserObject[]>([])
    const [search, setSearch] = React.useState("")
    
    React.useEffect(() => {
        const searchResult = dmUsers.filter(user => !user.bot && ~user.username.toLowerCase().indexOf(search.toLowerCase()))
        const limitedResult = limit(searchResult, MAX_USER_DISPLAY)
        setUsers(limitedResult)
    }, [search])

    return <Modal.ModalRoot size={Modal.ModalSize.DYNAMIC} {...props}>
        <Modal.ModalHeader separator={false}>
            <TextInput
                value={search}
                onChange={setSearch}
                placeholder="Search for user"
                className={categoryStyles.textbox}
            />
        </Modal.ModalHeader>
        <Modal.ModalContent>
            <div className={styles.userGrid}>
                {users.map(user => <User user={user} onClick={() => {
                    props.onSelect(user)
                    props.onClose()
                }} />)}
            </div>
        </Modal.ModalContent>
    </Modal.ModalRoot>
}

export const User = ({ user, onClick }: { user: UserObject, onClick?: () => void }) => {
    const isAdded = pinnedDMS.isUserAdded(user.id)
    return <Flex align={Flex.Align.CENTER}
        className={joinClasses(styles.user, isAdded ? styles.disabled : "")}
        onClick={() => { if (!isAdded) onClick?.()}}
    >
        <Avatar
            src={(user.getAvatarURL(false, false) as string)}
            size={Avatar.Sizes.SIZE_16}
        />
        <Text color={Text.Colors.STANDARD} className={styles.name}>
            {user.username}
        </Text>
    </Flex>
}