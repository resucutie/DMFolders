import { UserID, UserObject } from "ittai"

import * as webpack from "ittai/webpack"
import { Users } from "ittai/stores"
import { Avatar } from "ittai/components"
import { Button, TextInput, Flex } from "ittai/components"
import pinnedDMS from "../../handlers/pinnedDMS"
const { React, React: {
    useState,
    useEffect,
} } = webpack

interface Props {
    id: UserID,
    onMove: (updn: "up" | "down") => void,
    onRemove: () => void,
    disableUp?: boolean,
    disableDown?: boolean,
}

export default function({ id, onMove, onRemove, disableUp = false, disableDown = false }: Props) {
    const [user, setUser] = useState<UserObject>()

    useEffect(() => {
        const user = Users.getUser(id)
        if (!user) throw new Error("User not found")
        setUser(Users.getUser(id))
    })
    
    return (
        <Flex align={Flex.Align.CENTER}>
            <Avatar src={(user?.getAvatarURL(false, true) as string)?.replace("?size=16", "")} size={Avatar.Sizes.SIZE_24}/>
            <div>{user?.username}</div>
            <Button
                size={Button.Sizes.ICON}
                onClick={() => onMove("up")}
                disabled={disableUp}
            >
                UP
            </Button>
            <Button
                size={Button.Sizes.ICON}
                onClick={() => onMove("down")}
                disabled={disableDown}
            >
                DOWN
            </Button>
            <Button
                size={Button.Sizes.ICON}
                color={Button.Colors.RED}
                onClick={onRemove}
            >
                X
            </Button>
        </Flex>
    )
}