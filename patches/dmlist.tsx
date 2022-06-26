import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
const { React } = webpack
import { Channels, CurrentChannels } from "ittai/stores"
import { findInReactTree, searchClassNameModules } from "ittai/utilities"

import classes from "../utils/classes"
import pinnedDMS, {useListUpdate} from "../handlers/pinnedDMS"

const ListSectionItem = webpack.findByDisplayName("ListSectionItem")
const { DirectMessage } = webpack.findByProps("DirectMessage")

export default function() {
    let PinDMSRender = () => <CurrentLists />
    //@ts-ignore
    PinDMSRender.displayName = "PinnedDMS"

    function PatchedPrivateChannelsList() {
        //@ts-ignore
        // console.log("meep", this)
        //@ts-ignore
        const ret = this.props.original.call(this, this.props)
        fistPatch = true
        // console.log("r", ret)
        return ret
    }

    let fistPatch = false
    
    patcher.after("DMListPatch", webpack.find(m => m?.default?.displayName === "ConnectedPrivateChannelsList"), "default", ([props], res, _this) => {
        // console.log({props, res, _this})
        useListUpdate() //temporary, will remove later
        
        let PrivateChannelsList: {props: {children: React.ReactNode[], privateChannelIds: string[]}, type: any} = findInReactTree(res, (m: { type: { displayName: string } }) => m?.type?.displayName === "PrivateChannelsList") as any
        if (PrivateChannelsList == null) return

        Object.values(pinnedDMS.getAll()).forEach(({users}) => {
            const dmChannels = users.map(id => Channels.getDMFromUserId(id))
            PrivateChannelsList.props.privateChannelIds =
                PrivateChannelsList.props.privateChannelIds.filter(
                    (id) => !dmChannels.includes(id)
                )
        })

        const ogFunc = PrivateChannelsList.type.prototype.render
        if (ogFunc == null) return
        Object.assign(PrivateChannelsList.props, {
            original: ogFunc,
        })
        // if(!fistPatch) PrivateChannelsList.type.prototype.render = PatchedPrivateChannelsList
        


        if (PrivateChannelsList.props.children.find(
            (m: any) => m?.type?.displayName === "PinnedDMS"
        )) return

        PrivateChannelsList.props.children.push(<PinDMSRender />)
        
        // console.log(PrivateChannelsList)
    })
}

const CurrentLists = () => {
    useListUpdate()

    return (
        <div>
            {pinnedDMS.getCategories().map((category) => (
                <>
                    <ListSectionItem
                        className={classes.PrivateChannelsHeaderContainer.privateChannelsHeaderContainer}
                    >
                        <span
                            style={{ color: pinnedDMS.getColor(category) }}
                        >
                            {category}
                        </span>
                    </ListSectionItem>

                    {pinnedDMS.getUsers(category).map((userId) => {
                        const dmId = Channels.getDMFromUserId(userId)
                        if (dmId == null) return null

                        return (
                            <DirectMessage
                                channel={Channels.getChannel(dmId)}
                                selected={
                                    CurrentChannels.getChannelId() === dmId
                                }
                            />
                        )
                    })}
                </>
            ))}
        </div>
    )
}