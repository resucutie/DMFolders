import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
import { React } from "ittai/webpack"
import * as settings from "ittai/settings"
import { Users, Activities, Status, UserSettings } from "ittai/stores"
import type { UserObject } from "ittai"
import { Button, DiscordIcon, Flex, SearchBar, TextInput, TooltipContainer } from "ittai/components"
import pinnedDMS from "../handlers/pinnedDMS"
import openCategorySettings from "../utils/openCategorySettings"
import joinClasses from "../utils/joinClasses"
import CategoryContextMenu from "../components/ContextMenus/Category"

// shulker box monster - fWhip
const { Item } = webpack.findByProps("Item")
const { Divider } = webpack.find(m => m?.default?.displayName === "HeaderBar")
const PeopleListSectionedNonLazy = webpack.findByDisplayName('PeopleListSectionedNonLazy')
const FriendRow = webpack.findByDisplayName('FriendRow')
const SectionTitle = webpack.findByDisplayName("SectionTitle")
const { EmptyStateImage, default: EmptyState, EmptyStateText } = webpack.findByProps("EmptyStateImage")
const { iconWrapper, clickable, icon } = webpack.findByProps("caret", "clickable")
const { button } = webpack.findByProps("friendsEmpty")
const { searchBar } = webpack.findByProps("emptyStateContainer")

const IDENTIFIER = "DMCATEGORIES"

export interface MysteriousObject {
    activities: Array<any>,
    isMobile: boolean,
    key: string,
    nickname: string,
    status: "online" | "dnd" | "idle" | "streaming",
    type: 1, //whats dis tbh
    user: UserObject,
}

/*
    METHOD:
    The Friends list (called as "PeopleList") takes track of the tabs by a ID and renders the UI based on that ID. The HeaderBar does the
    job of rendering the tab pills and making the functionality of changing these IDs. The pills are manually added by the developer, and
    the click event handling is done by the "Item" component, while, again, the HeaderBar changes the IDs. Neither the PeopleList and the
    HeaderBar specifies which tabs should exist and who is the impostor, meaning that a pill with a custom ID can be pushed and everything
    will go fine like magic.
    By default, if an invalid ID is inserted, PeopleList will render the "All friends" tab, but it will still identify as that fake ID. 
    That means we can delete that render and replace by our own rendering, without much of a issue.
*/
export default function () {
    patcher.after("FriendsHeaderPatch", webpack.find(m => m?.default?.displayName === "HeaderBarContainer"), "default", ([props], res, _this) => {
        // console.log(props)
        if(
            Boolean(props.channelId) || // channel
            (!~props.className.indexOf("theme-")) //not friends list tab
        ) return
        if (Object.keys(pinnedDMS.getAll()).length === 0) return


        const OgTabBarChildrens = props.children[3].props.children
        const AddFriendButton = OgTabBarChildrens[OgTabBarChildrens.length - 1]
        delete OgTabBarChildrens[OgTabBarChildrens.length - 1]
        const NewTabBarChildrens = []
        for (const categoryName of pinnedDMS.getCategories()) {
            NewTabBarChildrens.push(<Item
                id={`${IDENTIFIER}-${categoryName}`}
                color={pinnedDMS.getColor(categoryName)}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => webpack.ContextMenu.openContextMenu(e, () => <CategoryContextMenu category={categoryName} />)}
            >
                {categoryName}
            </Item>)
        }
        props.children[3].props.children = [...OgTabBarChildrens, <Divider />, ...NewTabBarChildrens, <Divider />, AddFriendButton]
    })

    patcher.after("FriendsListPatch", webpack.find(m => m?.default?.displayName === "PeopleList"), "default", ([props]: [{ sectionFilter: string}], res, _this) => {
        // console.log(props, res, _this)
        // console.log(res.props.children[2].props.statusSections)
        if (~props.sectionFilter.indexOf(IDENTIFIER)) {
            const category = props.sectionFilter.substring(IDENTIFIER.length + 1)

            res.props.children = <DMFriendsRender {...{ category }} key={category}/>
        }
    })

    // failed attempt to use the og search
    // patcher.after("GetStatePatch", webpack.findByProps("Row", "Rows", "default").default, "getState", ([props], res, _this) => {
    //     if (res.section === "MEEP") res.rows._rows = [{
    //         activities: Activities.getActivities(Users.getCurrentUser().id),
    //         applicationStream: null,
    //         isMobile: Users.getCurrentUser().mobile,
    //         key: Users.getCurrentUser().id,
    //         nickname: undefined,
    //         status: Status.getStatus(Users.getCurrentUser().id),
    //         type: 1,
    //         user: Users.getCurrentUser(),
    //     }]
    //     console.log({ props, res })
    // })
}

interface FriendsRenderProps {
    category: string
}
const DMFriendsRender = ({ category }: FriendsRenderProps) => {
    const [search, setSearch] = React.useState("")
    const userIDs = React.useMemo(() => pinnedDMS.getUsers(category), [category])
    const searchedUserIDs = React.useMemo(() => userIDs.filter(id => ~Users.getUser(id).username.toLowerCase().indexOf(search.toLowerCase())), [search])

    if (userIDs.length !== 0) {
        return <>
            <SearchBar
                query={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
                className={searchBar}
                size={SearchBar.Sizes.MEDIUM}
            />
            <div>
                <SectionTitle title={<Flex>
                    <b style={{ color: pinnedDMS.getColor(category), flexGrow: 1 }}>{category} – {searchedUserIDs.length}</b>

                    <TooltipContainer text="Add a new person" position="bottom">
                        <div className={joinClasses(iconWrapper, clickable)} onClick={() => openCategorySettings(category)} style={{ width: "16px", height: "16px" }}>
                            <DiscordIcon name="PersonAdd" type="none" />
                        </div>
                    </TooltipContainer>
                </Flex>} />
            </div>

            {searchedUserIDs.length !== 0 ? <PeopleListSectionedNonLazy
                renderRow={(mysteriousObject: MysteriousObject) => <FriendRow {...Object.assign({}, mysteriousObject, {isFocused: true})} />}
                // searchQuery={"k"} //for some reason this does not work
                statusSections={[
                    searchedUserIDs.map(userId => {
                        const user = Users.getUser(userId) as UserObject
                        // mocked identifier. according to devilbro (yes, ive actually listened to him) the friends list fetches
                        return {
                            activities: Activities.getActivities(user.id),
                            isMobile: user.mobile,
                            key: user.id,
                            nickname: user.username,
                            status: Status.getStatus(user.id),
                            type: 1, //whats dis tbh
                            user: user,
                        } as MysteriousObject
                    })
                ]}
            /> : <EmptyState theme={UserSettings.theme}>
                    <EmptyStateImage {...{
                        "width": 421,
                        "height": 218,
                        "lightSrc": "/assets/fd879a28807b66b38d54e7db6ea18a69.svg",
                        "darkSrc": "/assets/b36de980b174d7b798c89f35c116e5c6.svg"
                    }} />
                    <EmptyStateText note={<>
                        Wumpus looked but couldn't find anyone with that name in this category.
                    </>} />
                    <Button onClick={() => openCategorySettings(category)} className={button}>Add a person with that name</Button>
            </EmptyState>}
        </>
    } else {
        return <>
            <EmptyState theme={UserSettings.theme}>
                <EmptyStateImage {...{
                    "width": 415,
                    "height": 200,
                    "lightSrc": "/assets/36c9a2fb7d0593a581a92373121c2848.svg",
                    "darkSrc": "/assets/b36c705f790dad253981f1893085015a.svg"
                }} />
                <EmptyStateText note={<>
                    Apparently this category does only have Wumpus.
                </>} />
                <Button onClick={() => openCategorySettings(category)} className={button}>Add person</Button>
            </EmptyState>
        </>
    }
}