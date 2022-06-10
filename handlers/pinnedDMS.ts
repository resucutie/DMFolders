import * as settings from "ittai/settings"
import { Dispatcher, React } from "ittai/webpack"
import type { PinnedDMS } from "../types"

export const getAll = (): PinnedDMS => {
    return settings.get("pinnedCategories", {})
}

export const getCategories = (): string[] => {
    const pinnedCategories = Object.keys(getAll())
    return pinnedCategories
}

export const getUsers = (category: string) => {
    const pinnedCategories = getAll()
    if (pinnedCategories[category] == null) throw new Error(`Category ${category} does not exist`)

    return pinnedCategories[category].users
}

export const getColor = (category: string) => {
    let pinnedCategories = getAll()

    if (pinnedCategories[category] == null) throw new Error(`Category ${category} does not exist`)
    return pinnedCategories[category].color as string
}

export const setRaw = (setting: PinnedDMS) => {
    settings.set("pinnedCategories", setting)

    Dispatcher.dirtyDispatch({ type: "PINDMS_CHANGE_LIST" })
}

export const addCategory = (category: string, userIDs?: Array<import("ittai").UserID>) => {
    let pinnedCategories = getAll()
    pinnedCategories[category] = {
        color: "default",
        users: userIDs ?? []
    }
    
    setRaw(pinnedCategories)
}


export const removeCategory = (category: string) => {
    let pinnedCategories = getAll()
    if (pinnedCategories[category] == null) throw new Error(`Category ${category} does not exist`)
    delete pinnedCategories[category]
    
    setRaw(pinnedCategories)
}

export const setColor = (
    category: string,
    color: string
    ) => {
        let pinnedCategories = getAll()
        
    if (pinnedCategories[category] == null) throw new Error(`Category ${category} does not exist`)
    pinnedCategories[category].color = color

    setRaw(pinnedCategories)
}

export const setUserList = (category: string, userList: string[]) => {
    let pinnedCategories = getAll()

    pinnedCategories[category].users = userList

    setRaw(pinnedCategories)
}

export const addUser = (category: string, userID: import("ittai").UserID) => {
    let pinnedCategories = getAll()
    if (pinnedCategories[category] == null) throw new Error(`Category ${category} does not exist`)

    let userList = pinnedCategories[category].users
    userList.push(userID)
    
    setUserList(category, userList)
}

export const removeUser = (category: string, userID: import("ittai").UserID) => {
    let pinnedCategories = getAll()
    if (pinnedCategories[category] == null) throw new Error(`Category ${category} does not exist`)

    let userList = pinnedCategories[category].users
    userList = userList.filter((user) => user !== userID)
    
    setUserList(category, userList)
}

export const useListUpdate = () => {
    const [, forceUpdate] = React.useReducer(n => !n, true);

    React.useEffect(() => {
        const listener = () => void forceUpdate();

        Dispatcher.subscribe("PINDMS_CHANGE_LIST", listener);

        return () => Dispatcher.unsubscribe("PINDMS_CHANGE_LIST", listener);
    }, []);
}

export default {
    getAll,
    getCategories,
    getUsers,
    getColor,
    setRaw,
    addCategory,
    removeCategory,
    setColor,
    setUserList,
    addUser,
    removeUser,
    useListUpdate
}