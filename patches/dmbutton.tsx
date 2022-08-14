import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
const { React } = webpack
import { Channels, CurrentChannels } from "ittai/stores"
import { findInReactTree, searchClassNameModules } from "ittai/utilities"
import { DiscordIcon, ContextMenu, Popout } from "ittai/components"
import * as settings from "ittai/settings"
import pinnedDMS, { useListUpdate } from "../handlers/pinnedDMS"
import { UserObject } from "ittai";
import * as constants from "../constants"

//@ts-ignore
import styles from "./dmbutton.mod.scss"
import joinClasses from "../utils/joinClasses"
import AddUser from "../components/ContextMenus/AddUser"

export default function () {
    patcher.after("DMButtonPatch", webpack.findByDisplayName("PrivateChannel").prototype, "render", (_, res, _this) => {
        const user: UserObject = _this.props.user
        if(user == null) return //likely a guild channel

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

                if (settings.get("pinIcon", constants.Settings.DefaultSettings.PIN_ICON)) {    
                    Interactive.props.children.splice(1, 0, <div className={joinClasses(styles.pinButton, isAdded ? styles.lonely : "")}
                        onClick={(e) => {if (isAdded) pinnedDMS.removeUser(pinnedDMS.getUserCategory(user.id)!, user.id)}}
                    >
                        {!isAdded 
                            ? <Popout renderPopout={() => <AddUser userId={user.id} />} position={Popout.Positions.RIGHT}>
                                {props => <span {...props}>
                                    <DiscordIcon name="PinLayer" />
                                </span>}
                            </Popout>
                            : <DiscordIcon name="UnpinLayer" />}
                    </div>)
                }

            }


            return ret
        }
    })
}