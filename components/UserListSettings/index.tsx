import * as webpack from "ittai/webpack"
import { React, ColorUtils, ModalActions, Constants } from "ittai/webpack"
import {
    Button,
    TextInput,
    Flex,
    DiscordIcon,
    ColorPicker,
    Popout,
    TooltipContainer
} from "ittai/components"
import pinnedDMS, { useListUpdate } from "../../handlers/pinnedDMS"
import { moveObjectKey, moveArray } from "../../utils/move"
import { ColorHex, PinnedDMS } from "../../types"
import User from "./User"
import classes from "../../utils/classes"
import ChangeCategoryNameModal from "./Modals/CategorySettingsModal"
//@ts-ignore
import styles from "./index.scss"
import joinClasses from "../../utils/joinClasses"
import AddUserModal from "./Modals/AddUserModal"

const ListSectionItem = webpack.findByDisplayName("ListSectionItem")

export default function () {
    const [newCategory, setNewCategory] = React.useState<string>("")
    useListUpdate()
    // console.log(ColorPicker)

    return (
        <>
            <Flex className={styles.createCategory}>
                <TextInput className={styles.textbox}
                    value={newCategory}
                    placeholder="Name a new category"
                    onChange={(e) => setNewCategory(e)}
                />
                <Button onClick={() => pinnedDMS.addCategory(newCategory)}>
                    Add
                </Button>
            </Flex>

            {Object.entries(pinnedDMS.getAll()).map(
                ([category, { users }], index) => (
                    <UserCategory name={category} users={users} index={index} />
                )
            )}
        </>
    )
}

interface CategoryProps {
    name: string
    users: string[]
    index: number
}
export const UserCategory = ({ name, users, index }: CategoryProps) => {
    const [hide, setHide] = React.useState<boolean>(true)

    return (
        <div key={name} className={styles.category}>
            <CategoryHeader {...{ name, index }} onHide={() => setHide(!hide)} hidden={hide} />

            {!(users.length === 0 || hide) && <div className={joinClasses(styles.userList, classes.Scrolling.scrollerBase, classes.Scrolling.thin, classes.Scrolling.fade)}>
                {users.map((id, index) => (
                    <User
                        id={id}
                        onMove={(updn) =>
                            pinnedDMS.setUserList(
                                name,
                                moveArray(
                                    users,
                                    index,
                                    index - (updn === "up" ? +1 : -1)
                                )
                            )
                        }
                        onRemove={() => pinnedDMS.removeUser(name, id)}
                        disableUp={index === 0}
                        disableDown={index === users.length - 1}
                    />
                ))}
            </div>}
        </div>
    )
}

interface HeaderProps {
    name: string
    index: number
    hidden?: boolean
    onHide: Function
}
const CategoryHeader = ({ name, index, hidden = false, onHide }: HeaderProps) => {
    const handleCategoryPos = (updn: number) => {
        // -1 = move down by one
        // +1 = move up by one

        const index = Object.keys(pinnedDMS.getAll()).findIndex(
            (k) => k === name
        )
        pinnedDMS.setRaw(
            moveObjectKey(pinnedDMS.getAll(), index, index - updn) as PinnedDMS
        )
    }

    return <Flex align={Flex.Align.CENTER}>
        <ListSectionItem
            className={joinClasses(classes.PrivateChannelsHeaderContainer.privateChannelsHeaderContainer, styles.exampleListSectionItem)}
        >
            <Flex style={{ color: pinnedDMS.getColor(name), fontWeight: "bold" }} align={Flex.Align.CENTER} onClick={onHide}>
                <DiscordIcon name="DropdownArrow" className={joinClasses(styles.dropdownArrow, hidden ? styles.hidden : undefined)} />
                {name}
            </Flex>
        </ListSectionItem>

        <Popout position={Popout.Positions.BOTTOM} renderPopout={(props) => <div {...props}>
            <ChangeCategoryNameModal transitionState={1} onClose={props.closePopout} name={name} />
        </div>}>
            {(popout) => <TooltipContainer text="Edit category">
                <Button {...popout}
                    size={Button.Sizes.ICON}
                    look={Button.Looks.BLANK}
                    className={joinClasses(classes.AccountControlButtons.button, classes.AccountControlButtons.enabled)}
                >
                    <DiscordIcon name="Pencil" style={{ width: "20px", height: "20px" }} />
                </Button>
            </TooltipContainer>}
        </Popout>

        <div style={{ marginRight: "auto" }} />

        <Popout position={Popout.Positions.LEFT} renderPopout={(props) => <div {...props}>
            <AddUserModal transitionState={1} onClose={props.closePopout} onSelect={(user) => {
                if (user.id != null) pinnedDMS.addUser(name, user.id)
            }} />
        </div>}>
            {(popout) => <TooltipContainer text="Add a new person">
                <Button {...popout}
                    size={Button.Sizes.ICON}
                    look={Button.Looks.BLANK}
                    className={joinClasses(classes.AccountControlButtons.button, classes.AccountControlButtons.enabled)}
                >
                    <DiscordIcon name="PersonAdd" style={{ width: "20px", height: "20px" }} />
                </Button>
            </TooltipContainer>}
        </Popout>

        <Flex
            direction={Flex.Direction.VERTICAL}
            grow={0}
            shrink={0}
        >
            <Button
                size={Button.Sizes.ICON}
                onClick={() => handleCategoryPos(+1)}
                disabled={index === 0}
                look={Button.Looks.BLANK}
                className={joinClasses(classes.AccountControlButtons.button, index === 0 ? classes.AccountControlButtons.disabled : classes.AccountControlButtons.enabled)}
            >
                <DiscordIcon name="ArrowDropUp" />
            </Button>
            <Button
                size={Button.Sizes.ICON}
                onClick={() => handleCategoryPos(-1)}
                disabled={index === pinnedDMS.getCategories().length - 1}
                look={Button.Looks.BLANK}
                className={joinClasses(classes.AccountControlButtons.button, index === pinnedDMS.getCategories().length - 1 ? classes.AccountControlButtons.disabled : classes.AccountControlButtons.enabled)}
            >
                <DiscordIcon name="ArrowDropDown" />
            </Button>
        </Flex>
        <TooltipContainer text="Delete">
            <Button
                size={Button.Sizes.ICON}
                color={Button.Colors.RED}
                onClick={() => pinnedDMS.removeCategory(name)}
                look={Button.Looks.LINK}
            >
                <DiscordIcon name="Trash" />
            </Button>
        </TooltipContainer>
    </Flex>
}
