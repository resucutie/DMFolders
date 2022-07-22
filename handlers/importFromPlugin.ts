import { ChannelID } from "ittai"
import { ColorUtils } from "ittai/webpack"
import { Channels, Users } from "ittai/stores"
import { PinnedDMS } from "../types"

interface DBCategory {
    collapsed: boolean
    color: [number, number, number, number]
    dms: ChannelID[]
    id: string
    name: string
    pos: number
}

export const fromDevilbroPinDMs = () => {
    //@ts-ignore
    const DevilbroPinDMsData = globalThis.BdApi.getData("PinDMs", "all")
    const channelList = DevilbroPinDMsData.pinned[Users.getCurrentUser().id].channelList
    console.log(Object.values(channelList))
    let category: PinnedDMS = {}
    for (const dbCategory of Object.values(channelList) as DBCategory[]) {
        const userIDs = dbCategory.dms
            .filter(cId => Channels.getChannel(cId)?.type === 1) //the ? is to ignore invalid IDs
            .map(cId => Channels.getChannel(cId).recipients[0])
        if(userIDs.length !== 0) {
            category[dbCategory.name] = {
                color: ColorUtils.int2hex(ColorUtils.rgb2int(`rgba(${dbCategory.color[0]}, ${dbCategory.color[1]}, ${dbCategory.color[2]}, 1)`)),
                users: userIDs,
                show: !dbCategory.collapsed
            }
        }
    }
    return category
}

export const hasThemEnabled = () => {
    return {
        pinDMs: Boolean((globalThis as any).BdApi) && Boolean((globalThis as any).BdApi.Plugins.isEnabled("PinDMs"))
    }
}

export const hasAnyOfThePlugins = () => {
    const results = hasThemEnabled()
    return results.pinDMs
}