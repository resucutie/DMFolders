import * as webpack from "ittai/webpack"
import { React, ColorUtils, ModalActions, Constants } from "ittai/webpack"
import {
    Button,
    TextInput,
    Flex,
    DiscordIcon,
    ColorPicker,
    Popout,
    Modal,
    Text,
    Heading
} from "ittai/components"
const { useState } = React
import pinnedDMS, { useListUpdate } from "../../handlers/pinnedDMS"
import { moveObjectKey, moveArray } from "../../utils/move"
import { ColorHex, PinnedDMS } from "../../types"
import User from "./User"
import classes from "../../utils/classes"
import ChangeCategoryNameModal from "./ChangeCategoryNameModal"

const { CustomColorButton } = webpack.findByProps("DefaultColorButton")
// const ColorPicker = webpack.findByDisplayName("ColorPicker")

export default function () {
    const [newCategory, setNewCategory] = useState<string>("")
    useListUpdate()
    console.log(ColorPicker)

    return (
        <>
            {Object.entries(pinnedDMS.getAll()).map(
                ([category, { users }], index) => (
                    <UserCategory name={category} users={users} index={index} />
                )
            )}

            <div style={{ height: "10px" }} />

            <TextInput
                value={newCategory}
                onChange={(e) => setNewCategory(e)}
            />
            <Button onClick={() => pinnedDMS.addCategory(newCategory)}>
                Add
            </Button>
        </>
    )
}

interface CategoryProps {
    name: string
    users: string[]
    index: number
}
export const UserCategory = ({ name, users, index }: CategoryProps) => {
    const [newUser, setNewUser] = useState<string>("")

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

    return (
        <div key={name}>
            <Flex align={Flex.Align.CENTER}>
                <h1
                    style={{ marginRight: "auto" }}
                    onClick={() => ModalActions.openModal((props) => <ChangeCategoryNameModal {...props} name={name}/>)}
                >
                    {name}
                </h1>
                <Popout position={Popout.Positions.BOTTOM} renderPopout={(props) => <div {...props}>
                    <Modal.ModalRoot size={Modal.ModalSize.DYNAMIC} transitionState={1}>
                        <Modal.ModalHeader separator={false}>
                            <Heading variant="heading-lg/medium">Change color</Heading>
                        </Modal.ModalHeader>
                        <Modal.ModalContent>
                            <ColorPicker
                                colors={Constants.ROLE_COLORS}
                                defaultColor={Constants.DEFAULT_ROLE_COLOR}
                                value={pinnedDMS.getColor(name) === "default" ? Constants.DEFAULT_ROLE_COLOR : ColorUtils.hex2int(pinnedDMS.getColor(name) as ColorHex)}
                                onChange={(e: number) => pinnedDMS.setColor(name, ColorUtils.int2hex(e))}
                            />
                        </Modal.ModalContent>
                        <Modal.ModalFooter>
                            <Button
                                color={Button.Colors.WHITE}
                                look={Button.Looks.LINK}
                                /*@ts-ignore*/
                                onClick={() => DiscordNative.clipboard.copy(pinnedDMS.getColor(name))}
                            >Copy color</Button>
                        </Modal.ModalFooter>
                    </Modal.ModalRoot>
                </div>}>
                    {(props) => <div {...props} className={classes.ColorPicker.customContainer}>
                        <CustomColorButton customColor={pinnedDMS.getColor(name) === "default" ? Constants.DEFAULT_ROLE_COLOR : ColorUtils.hex2int(pinnedDMS.getColor(name) as ColorHex)} />
                    </div>}
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
                        className={[
                            classes.AccountControlButtons.button,
                            index === 0
                                ? classes.AccountControlButtons.disabled
                                : classes.AccountControlButtons.enabled,
                        ].join(" ")}
                    >
                        <DiscordIcon name="ArrowDropUp" />
                    </Button>
                    <Button
                        size={Button.Sizes.ICON}
                        onClick={() => handleCategoryPos(-1)}
                        disabled={index === users.length - 1}
                        look={Button.Looks.BLANK}
                        className={[
                            classes.AccountControlButtons.button,
                            index === users.length - 1
                                ? classes.AccountControlButtons.disabled
                                : classes.AccountControlButtons.enabled,
                        ].join(" ")}
                    >
                        <DiscordIcon name="ArrowDropDown" />
                    </Button>
                </Flex>
                <Button
                    size={Button.Sizes.ICON}
                    color={Button.Colors.RED}
                    onClick={() => pinnedDMS.removeCategory(name)}
                    look={Button.Looks.LINK}
                >
                    <DiscordIcon name="Trash" />
                </Button>
            </Flex>
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
            <Flex>
                <TextInput
                    value={newUser}
                    onChange={(e) => setNewUser(e)}
                    placeholder="User ID"
                />
                <Button onClick={() => pinnedDMS.addUser(name, newUser)}>
                    Add
                </Button>
            </Flex>
        </div>
    )
}
