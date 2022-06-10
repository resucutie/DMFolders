import * as webpack from "ittai/webpack"
import { Button, TextInput, Flex } from "ittai/components"
const {
    React,
    React: { useState },
} = webpack
import pinnedDMS, { useListUpdate } from "../../handlers/pinnedDMS"
import { moveObjectKey, moveArray } from "../../utils/move"
import { PinnedDMS } from "../../types"
import User from "./User"

export default function () {
    const [newCategory, setNewCategory] = useState<string>("")
    useListUpdate()

    return (
        <>
            {Object.entries(pinnedDMS.getAll()).map(([category, { users }]) => (
                <UserCategory name={category} users={users} />
            ))}

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
}
export const UserCategory = ({ name, users }: CategoryProps) => {
    const [newUser, setNewUser] = useState<string>("")
    const [color, setColor] = useState<string>(pinnedDMS.getColor(name))

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
                <h1>{name}</h1>
                <TextInput
                    value={color}
                    onChange={(e) => {
                        pinnedDMS.setColor(name, e)
                        setColor(e)
                    }}
                    placeholder="Color"
                />
                <Button
                    size={Button.Sizes.ICON}
                    onClick={() => handleCategoryPos(+1)}
                >
                    UP
                </Button>
                <Button
                    size={Button.Sizes.ICON}
                    onClick={() => handleCategoryPos(-1)}
                >
                    DOWN
                </Button>
                <Button
                    size={Button.Sizes.ICON}
                    color={Button.Colors.RED}
                    onClick={() => pinnedDMS.removeCategory(name)}
                >
                    X
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
