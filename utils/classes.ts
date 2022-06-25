import { searchClassNameModules } from "ittai/utilities"
import { findByProps } from "ittai/webpack"

export const PrivateChannelsHeaderContainer = findByProps(
    "privateChannelRecipientsInviteButtonIcon"
) as {
    empty: string
    headerText: string
    privateChannelRecipientsInviteButtonIcon: string
    privateChannelsHeaderContainer: string
    scroller: string
}

export const ServerMembers = findByProps("ui-scroller-wrap") as {
    searchBar: string
    membersHeader: string
    "ui-select": string
    search: string
    divider: string
    pruneLink: string
    membersCount: string
    membersFilterPopout: string
    "ui-scroller-wrap": string
    member: string
    active: string
    overflowIcon: string
    nameTag: string
    name: string
    tag: string
    username: string
    ownerHelpIcon: string
    roleWrapper: string
    overflowButton: string
    avatar: string
    overflowIconFg: string
}

export const AccountControlButtons = findByProps("button", "disabled", "enabled") as {
    button: string
    enabled: string
    disabled: string
}

export const ColorPicker = findByProps("custom", "customColorPickerInput", "colorPickerRow") as {
    container: string
    customContainer: string
    defaultContainer: string
    custom: string
    preset: string
    colorPickerCustom: string
    customColorPickerInput: string
    input: string
    colorPickerRow: string
    colorPickerSwatch: string
    default: string
    disabled: string
    colorPickerDropper: string
    noColor: string
    colorPickerDropperFg: string
}

export default {
    PrivateChannelsHeaderContainer,
    ServerMembers,
    AccountControlButtons,
    ColorPicker
}

/* copy types
console.log(Object.keys(searchClassNameModules("member-2cj2PI")).join(": string\n") + ": string")
*/