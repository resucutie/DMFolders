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
    patcher.after("DMPatch", webpack.find(m => m?.default?.displayName === "ConnectedPrivateChannelsList"), "default", ([props], res, _this) => {
        console.log({props, res, _this})
        useListUpdate()
        
        let PrivateChannelsList: {
            props: {
                children: React.ReactNode[]
                privateChannelIds: string[]
            }
        } = findInReactTree(
            res,
            (m: { type: { displayName: string } }) =>
                m?.type?.displayName === "PrivateChannelsList"
        ) as any
        if (PrivateChannelsList == null) return

        Object.values(pinnedDMS.getAll())
            .forEach(({users}) => {
                PrivateChannelsList.props.privateChannelIds =
                    PrivateChannelsList.props.privateChannelIds.filter(
                        (id) => !users.map(id => Channels.getDMFromUserId(id)).includes(id)
                    )
            })


        if (PrivateChannelsList.props.children.find(
            (m: any) => m?.type?.displayName === "PinnedDMS"
        )) return
        
        let PinDMSRender = () => <CurrentLists />
        //@ts-ignore
        PinDMSRender.displayName = "PinnedDMS"
        PrivateChannelsList.props.children.push(<PinDMSRender />)
        
        console.log(PrivateChannelsList)
    })
}

const CurrentLists = () => {
    return (
        <div>
            {pinnedDMS.getCategories().map((category) => (
                <>
                    <ListSectionItem
                        className={classes.privateChannelsHeaderContainer}
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