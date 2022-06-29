import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
import { React, Dispatcher } from "ittai/webpack"
import { Channels, CurrentChannels } from "ittai/stores"
import { findInReactTree, searchClassNameModules } from "ittai/utilities"
import { Flex, Modal, Popout } from "ittai/components"
import * as settings from "ittai/settings"

import classes from "../utils/classes"
import pinnedDMS, {useListUpdate} from "../handlers/pinnedDMS"
import joinClasses from "../utils/joinClasses"
//@ts-ignore
import styles from "./dmlist.scss"

const ListSectionItem = webpack.findByDisplayName("ListSectionItem")
const { DirectMessage } = webpack.findByProps("DirectMessage")
const { NumberBadge } = webpack.findByProps("NumberBadge")
const { getMentionCount } = webpack.findByProps("getMentionCount")

export default function() {
    let PinDMSRender = () => <CurrentLists />
    //@ts-ignore
    PinDMSRender.displayName = "PinnedDMS"

    // webpack.Dispatcher.subscribe("CHANNEL_UNREAD_UPDATE", console.log)
    
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

    switch (settings.get("display", "category")) {
        case "minimal": {
            return (
                <div className={styles.wrapper}>
                    {pinnedDMS.getCategories().map((category) => {
                        return <MinimalistList {...{ category }} />
                    })}
                </div>
            )
        }
        default: {
            return <div>
                {pinnedDMS.getCategories().map((category) => {
                    return <CategoryList {...{ category }} />
                })}
            </div>
        }
    }
}

export const CategoryList = ({category}: {category: string}) => {
    return <>
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
                <DirectMessage key={dmId}
                    channel={Channels.getChannel(dmId)}
                    selected={
                        CurrentChannels.getChannelId() === dmId
                    }
                />
            )
        })}
    </>
}

export const MinimalistList = ({ category }: { category: string }) => {
    const currentUsers = pinnedDMS.getUsers(category)
    const hasSomebody = currentUsers.some((userId) => CurrentChannels.getChannelId() === Channels.getDMFromUserId(userId))
    const [pingCount, setPingCount] = React.useState<number>(() => currentUsers.map(userId => Channels.getDMFromUserId(userId)).reduce((acc, channelId) => acc + getMentionCount(channelId), 0))

    React.useEffect(() => {
        const listener = ({channelId}: any) => {
            if (currentUsers.some((userId) => channelId === Channels.getDMFromUserId(userId))){
                setPingCount(currentUsers.map(userId => Channels.getDMFromUserId(userId)).reduce((acc, channelId) => acc + getMentionCount(channelId), 0))
            }
        };

        Dispatcher.subscribe("MESSAGE_CREATE", listener as any);

        return () => Dispatcher.unsubscribe("MESSAGE_CREATE", listener);
    }, []);

    return <>
        <Popout position={Popout.Positions.RIGHT} animation={Popout.Animation.NONE} renderPopout={(props) => <div {...props}>
            <Modal.ModalRoot transitionState={1} size={Modal.ModalSize.DYNAMIC}>
                <div className={styles.minimalisticPopout}>
                    {currentUsers.map((userId) => {
                        const dmId = Channels.getDMFromUserId(userId)
                        // console.log(Channels.getChannel(dmId), Channels.getChannel(dmId).recipients.includes("376493261755252736"))
                        if (dmId == null) return null

                        return (
                            <DirectMessage key={dmId}
                                channel={Channels.getChannel(dmId)}
                                selected={
                                    CurrentChannels.getChannelId() === dmId
                                }
                            />
                        )
                    })}
                </div>
            </Modal.ModalRoot>
        </div>}>
            {(props) => <div {...props}
                className={joinClasses(classes.DMButtons.channel, classes.container)}
            >
                <div className={joinClasses(
                        classes.DMButtons.interactive,
                        classes.Interactives.interactive,
                        hasSomebody ? joinClasses(classes.DMButtons.interactiveSelected, classes.Interactives.selected) : undefined,
                        classes.DMButtons.linkButton
                    )}>
                    <Flex className={classes.Names.layout}>
                        <span style={{ color: pinnedDMS.getColor(category), fontWeight: "bold", marginRight: "auto" }}>
                            {category}
                        </span>
                        {Boolean(pingCount) && <NumberBadge count={pingCount} />}
                    </Flex>
                </div>
            </div>}
        </Popout>
    </>
}