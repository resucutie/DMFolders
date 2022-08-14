import * as webpack from "ittai/webpack"
import { React, ColorUtils, ModalActions, Constants } from "ittai/webpack"
import {
    Button,
    TextInput,
    Flex,
    DiscordIcon,
    ColorPicker,
    Popout,
    TooltipContainer,
    Heading,
    Text
} from "ittai/components"
import { UserSettings } from "ittai/stores"
import pinnedDMS, { useListUpdate } from "../../handlers/pinnedDMS"
import { moveObjectKey, moveArray } from "../../utils/move"
import { ColorHex, PinnedDMS } from "../../types"
import User from "./User"
import classes from "../../utils/classes"
import ChangeCategoryNameModal from "./Modals/CategorySettingsModal"
//@ts-ignore
import styles from "./index.mod.scss"
import joinClasses from "../../utils/joinClasses"
import AddUserModal from "./Modals/AddUserModal"

const ListSectionItem = webpack.findByDisplayName("ListSectionItem")
const { EmptyStateImage, default: EmptyState, EmptyStateText } = webpack.findByProps("EmptyStateImage")
const noCategoriesAddedClasses = webpack.findByProps("emptyCard", "itemCard")

interface Props {
    openedCategory?: string
}
export default function ({ openedCategory }: Props) {
    useListUpdate()
    // console.log(ColorPicker)

    return (
        <>
            {Object.keys(pinnedDMS.getAll()).length !== 0
                ? Object.entries(pinnedDMS.getAll()).map(
                    ([category, { users }], index) => (
                        <UserCategory name={category} users={users} index={index} hidden={category !== openedCategory} />
                    )
                )
                : <div className={noCategoriesAddedClasses.emptyCard}>
                    <Heading variant="heading-md/medium" className={noCategoriesAddedClasses.emptyHeader}>Hello? Anybody here?</Heading>
                    <Text className={noCategoriesAddedClasses.emptyText}>You can add categories by typing in the textbox above and hitting "Add"</Text>
                </div>
            }
        </>
    )
}

export const CreateCategory = () => {
    const [newCategory, setNewCategory] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")

    return <Flex className={styles.createCategory} align={Flex.Align.CENTER}>
        <TextInput className={styles.textbox}
            value={newCategory}
            placeholder="Name a new category"
            onChange={(e) => setNewCategory(e)}
            error={error}
        />
        <Button onClick={() => {
            if (newCategory == "") setError("Please give a name")
            else {
                setError("")
                pinnedDMS.addCategory(newCategory)
            }
        }}>
            Add
        </Button>
    </Flex>
}

interface CategoryProps {
    name: string
    users: string[]
    index: number,
    hidden?: boolean
}
export const UserCategory = ({ name, users, index, hidden = true }: CategoryProps) => {
    const [hide, setHide] = React.useState<boolean>(hidden)

    return (
        <div key={name} className={styles.category}>
            <CategoryHeader {...{ name, index }} onHide={() => setHide(!hide)} hidden={hide} />

            {!hide && <div className={joinClasses(styles.userList, classes.Scrolling.scrollerBase, classes.Scrolling.thin, classes.Scrolling.fade)}>
                {users.length !== 0 ? users.map((id, index) => (
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
                )) : <>
                    {
                        Math.floor(Math.random() * 20) === 3 //easter egg woooooo
                            ? <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tjs2xR2RZp0?controls=0" allow="clipboard-write; encrypted-media" />
                            : <div className={styles.empty}>
                                    <EmptyState theme={UserSettings.theme}>
                                        <EmptyStateImage {...{
                                            "width": 376,
                                            "height": 162,
                                            "lightSrc": "/assets/02625ee29f851ec588c2020a88d82665.svg",
                                            "darkSrc": "/assets/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg"
                                        }} />
                                        <EmptyStateText note={<>
                                            This category is empty. Oh nevermind, there is Wumpus, but he is alone.
                                        </>} />
                                    </EmptyState>
                            </div>
                    }
                </>}
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
            <ChangeCategoryNameModal transitionState={1} onClose={props.closePopout} category={name} />
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
