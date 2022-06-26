import { UserID, UserObject } from "ittai"

import * as webpack from "ittai/webpack"
const { React, React: {
    useState,
    useEffect,
} } = webpack
import { Users } from "ittai/stores"
import { Avatar, DiscordIcon, TooltipContainer } from "ittai/components"
import { Button, Text, Flex } from "ittai/components"
import classes from "../../utils/classes"
//@ts-ignore
import styles from "./User.scss"
import joinClasses from "../../utils/joinClasses"

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
        <Flex
            align={Flex.Align.CENTER}
            className={joinClasses(classes.ServerMembers.member, styles.wrapper)}
        >
            <div className={classes.ServerMembers.avatar}>
                <Avatar
                    src={(user?.getAvatarURL(false, true) as string)?.replace(
                        "?size=16",
                        ""
                    )}
                    size={Avatar.Sizes.SIZE_40}
                />
            </div>
            <div className={classes.ServerMembers.nameTag} style={{ marginRight: "auto" }}>
                <div className={classes.ServerMembers.name}>
                    {user?.username}
                </div>
                <Text color={Text.Colors.MUTED} size={Text.Sizes.SIZE_14}>
                    @{user?.username}#{user?.discriminator}
                </Text>
            </div>
            <Flex
                direction={Flex.Direction.VERTICAL}
                grow={0}
                shrink={0}
            >
                <Button
                    size={Button.Sizes.ICON}
                    onClick={() => onMove("up")}
                    disabled={disableUp}
                    look={Button.Looks.BLANK}
                    className={[
                        classes.AccountControlButtons.button,
                        disableUp
                            ? classes.AccountControlButtons.disabled
                            : classes.AccountControlButtons.enabled,
                    ].join(" ")}
                >
                    <DiscordIcon name="ArrowDropUp" />
                </Button>
                <Button
                    size={Button.Sizes.ICON}
                    onClick={() => onMove("down")}
                    disabled={disableDown}
                    look={Button.Looks.BLANK}
                    className={[
                        classes.AccountControlButtons.button,
                        disableDown
                            ? classes.AccountControlButtons.disabled
                            : classes.AccountControlButtons.enabled,
                    ].join(" ")}
                >
                    <DiscordIcon name="ArrowDropDown" />
                </Button>
            </Flex>
            <TooltipContainer text="Delete">
                <Button
                    size={Button.Sizes.ICON}
                    color={Button.Colors.RED}
                    onClick={onRemove}
                    look={Button.Looks.LINK}
                >
                    <DiscordIcon name="Trash" />
                </Button>
            </TooltipContainer>
        </Flex>
    )
}