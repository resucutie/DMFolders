import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
const { React } = webpack
import { Channels, CurrentChannels } from "ittai/stores"
import { findInReactTree, searchClassNameModules } from "ittai/utilities"
import { DiscordIcon, ContextMenu } from "ittai/components"

import pinnedDMS, { useListUpdate } from "../handlers/pinnedDMS"
import { UserObject } from "ittai";

//@ts-ignore
import styles from "./dmbutton.scss"
import joinClasses from "../utils/joinClasses"
import AddUser from "../components/ContextMenus/AddUser"

export default function () {
    patcher.after("DMButtonPatch", webpack.findByDisplayName("PrivateChannel").prototype, "render", (_, res, _this) => {
        // console.log({ _this, res })
        const user: UserObject = _this.props.user

        const isAdded = pinnedDMS.isUserAdded(user.id)

        const ogChildren: Function = res.props.children
        if(ogChildren == null) return
        res.props.children = function(...args: any) {
            const ret = ogChildren.apply(this, args)
            // console.log(ret)

            ret.props.className += ` ${styles.pinHoverHandler}`

            const Interactive = ret.props.children as {props: {children: [any, any]}}
            
            if (user && !user.bot) {
                const closeIndex = Interactive.props.children.findIndex(e => e.type.displayName === "CloseButton")

                if (isAdded && closeIndex) {
                    delete Interactive.props.children[closeIndex]
                }

                Interactive.props.children.splice(1, 0, <div className={joinClasses(styles.pinButton, isAdded ? styles.lonely : "")}
                    onClick={(e) => {
                        // console.log(ContextMenu)
                        if (isAdded) {
                            pinnedDMS.removeUser(pinnedDMS.getUserCategory(user.id)!, user.id)
                        } else {
                            //@ts-ignore
                            webpack.ContextMenu.openContextMenu(e, () => <AddUser userId={user.id}/>)
                        }
                    }}
                >
                    {!isAdded ? <DiscordIcon name="PinLayer" /> : <DiscordIcon name="UnpinLayer" />}
                </div>)
            }


            return ret
        }
    })
}