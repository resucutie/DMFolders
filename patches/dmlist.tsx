import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
import { React, Dispatcher } from "ittai/webpack"
import { Channels, CurrentChannels, Users } from "ittai/stores"
import { findInReactTree, searchClassNameModules } from "ittai/utilities"
import { DiscordIcon, Flex, Modal, Popout, Text } from "ittai/components"
import * as settings from "ittai/settings"

import classes from "../utils/classes"
import pinnedDMS, {useListUpdate} from "../handlers/pinnedDMS"
import joinClasses from "../utils/joinClasses"
import * as constants from "../constants"
//@ts-ignore
import styles from "./dmlist.scss"
import openCategorySettings from "../utils/openCategorySettings"
import CategoryContextMenu from "../components/ContextMenus/Category"

const ListSectionItem = webpack.findByDisplayName("ListSectionItem")
const { DirectMessage } = webpack.findByProps("DirectMessage")
const { NumberBadge } = webpack.findByProps("NumberBadge")
const { getMentionCount } = webpack.findByProps("getMentionCount")
const UserSummaryItem = webpack.findByDisplayName("UserSummaryItem")

const USER_ICON_SIZE = 16

export default function() {
    // console.log("a", DirectMessage)
    let PinDMSRender = () => <CurrentLists />
    //@ts-ignore
    PinDMSRender.displayName = "PinnedDMS"

    // webpack.Dispatcher.subscribe("CHANNEL_UNREAD_UPDATE", console.log)
    
    patcher.after("DMListPatch", webpack.find(m => m?.default?.displayName === "ConnectedPrivateChannelsList"), "default", ([props], res, _this) => {
        // console.log({props, res, _this})
        useListUpdate() //temporary, will remove later
        if (Object.keys(pinnedDMS.getAll()).length === 0) return
        
        let PrivateChannelsList: {props: {children: React.ReactNode[], privateChannelIds: string[]}, type: any} = findInReactTree(res, (m: { type: { displayName: string } }) => m?.type?.displayName === "PrivateChannelsList") as any
        if (PrivateChannelsList == null) return

        Object.values(pinnedDMS.getAll())
            .filter(category => category.users.length !== 0)
            .forEach(({users}) => {
            const dmChannels = users.map(id => Channels.getDMFromUserId(id))
            PrivateChannelsList.props.privateChannelIds =
                PrivateChannelsList.props.privateChannelIds.filter((id) => {
                    // console.log({ dmChannels, doesInclude: dmChannels.includes(id)})
                    return !dmChannels.includes(id)
                })
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

    switch (settings.get("display", constants.Settings.DefaultSettings.DISPLAY_MODE)) {
        case constants.Settings.DefaultSettings.MinimalistView.settingsValue: {
            return (
                <div className={styles.wrapper}>
                    {pinnedDMS.getCategories().map((category) => {
                        return <MinimalistList {...{ category }} />
                    })}
                </div>
            )
        }
        default: {
            return <>
                {pinnedDMS.getCategories().map((category) => {
                    return <CategoryList {...{ category }} />
                })}
            </>
        }
    }
}

export const CategoryList = ({category}: {category: string}) => {
    const [show, setShow] = React.useState(pinnedDMS.getVisibility(category))

    return <>
        <div onClick={() => {
            pinnedDMS.setVisibility(category, !show)
            setShow(!show)
        }}>
            <ListSectionItem
                className={joinClasses(classes.Category.wrapper, styles.categoryViewWrapper, show ? styles.open : null)}
            >
                <span
                    style={{ color: pinnedDMS.getColor(category) }}
                >
                    <DiscordIcon name="DropdownArrow" type="none" className={joinClasses(classes.Category.icon, styles.icon)} />
                    <h2 className={joinClasses((searchClassNameModules("container-32HW5s") as any).container, classes.Category.name, styles.name)}>{category}</h2>
                </span>
            </ListSectionItem>
        </div>

        {show && pinnedDMS.getUsers(category).map((userId) => {
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

const getPingCount = (currentUsers: string[]) => currentUsers.map(userId => Channels.getDMFromUserId(userId)).reduce((acc, channelId) => acc + getMentionCount(channelId), 0)

export const MinimalistList = ({ category }: { category: string }) => {
    const currentUsers = React.useMemo(() => pinnedDMS.getUsers(category), [])
    const isCurrentChannel = React.useMemo(() => {
        return currentUsers.some((userId) => CurrentChannels.getChannelId() === Channels.getDMFromUserId(userId))
    }, [])

    const [pingCount, setPingCount] = React.useState<number>(getPingCount(currentUsers))
    const [isStreamerModeEnabled, setStreamerMode] = React.useState<boolean>(false)


    React.useEffect(() => {
        const messageCreateListener = ({channelId}: any) => {
            if (currentUsers.some((userId) => channelId === Channels.getDMFromUserId(userId))) setPingCount(getPingCount(currentUsers))
        };

        const streamerModeListener = ({ value }: { value: boolean }) => {
            setStreamerMode(value)
        };

        Dispatcher.subscribe("CHANNEL_UNREAD_UPDATE", messageCreateListener);
        Dispatcher.subscribe("STREAMER_MODE_UPDATE", streamerModeListener);
        return () => {
            Dispatcher.unsubscribe("CHANNEL_UNREAD_UPDATE", messageCreateListener)
            Dispatcher.unsubscribe("STREAMER_MODE_UPDATE", streamerModeListener)
        }
    }, []);

    return <>
        <Popout position={Popout.Positions.RIGHT} animation={Popout.Animation.NONE} renderPopout={(props) => <div {...props}>
            <Modal.ModalRoot transitionState={1} size={Modal.ModalSize.DYNAMIC}>
                <div className={styles.minimalisticPopout}>
                    {currentUsers.length !== 0
                        ? currentUsers.map((userId) => {
                            const dmId = Channels.getDMFromUserId(userId)
                            // console.log(Channels.getChannel(dmId), Channels.getChannel(dmId).recipients.includes("376493261755252736"))
                            console.log(dmId)
                            if (dmId == null) return null

                            return (
                                <DirectMessage key={dmId}
                                    channel={Channels.getChannel(dmId)}
                                    selected={
                                        CurrentChannels.getChannelId() === dmId
                                    }
                                />
                            )
                        })
                        : <Text style={{marginLeft: "8px"}}>
                            There is nobody here currently. <a onClick={() => openCategorySettings(category)}>Add a new person</a>.
                        </Text>
                    }
                </div>
            </Modal.ModalRoot>
        </div>}>
            {(props) => <div {...props}
                className={joinClasses(classes.DMButtons.channel, (searchClassNameModules("container-32HW5s") as any).container)}
                onContextMenu={e => webpack.ContextMenu.openContextMenu(e, () => <CategoryContextMenu category={category} />)}
            >
                <div className={joinClasses(
                        classes.DMButtons.interactive,
                        classes.Interactives.interactive,
                        isCurrentChannel ? joinClasses(classes.DMButtons.interactiveSelected, classes.Interactives.selected) : undefined,
                        classes.DMButtons.linkButton
                    )}>
                    <div className={joinClasses(classes.Names.layout, styles.minimalisticView)}>
                        <Flex direction={Flex.Direction.VERTICAL} className={styles.nameAndUsers}>
                            <span style={{ color: pinnedDMS.getColor(category), fontWeight: "bold" }}>
                                {category}
                            </span>
                            {!isStreamerModeEnabled && settings.get("minimal_userIcons", constants.Settings.DefaultSettings.MinimalistView.userIcons) && <UserSummaryItem
                                size={USER_ICON_SIZE}
                                users={pinnedDMS.getUsers(category).map(userId => Users.getUser(userId))}
                            />}
                        </Flex>
                        {Boolean(pingCount) && <NumberBadge count={pingCount} />}
                    </div>
                </div>
            </div>}
        </Popout>
    </>
}