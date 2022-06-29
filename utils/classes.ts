import { searchClassNameModules } from "ittai/utilities"
import { findByProps } from "ittai/webpack"

export const PrivateChannelsHeaderContainer = findByProps("privateChannelRecipientsInviteButtonIcon") as {
    empty: string
    headerText: string
    privateChannelRecipientsInviteButtonIcon: string
    privateChannelsHeaderContainer: string
    scroller: string
}

export const DMButtons = findByProps("channel", "linkButtonIcon") as {
    channel: string
    fullWidth: string
    interactive: string
    interactiveSelected: string
    avatarWithText: string
    link: string
    linkButton: string
    linkButtonIcon: string
    closeButton: string
    closeIcon: string
    subtext: string
    activity: string
    activityText: string
    activityEmoji: string
    decorator: string
}

export const Interactives = findByProps("interactive", "muted") as {
    responsiveWidthMobileFirst: string
    interactive: string
    muted: string
    selected: string
}

export const container: string = (searchClassNameModules("container-32HW5s") as any).container

export const DeleteAccountButtonRow = findByProps("buttonContainer", "description", "disableButton") as {
    description: string
    buttonContainer: string
    disableButton: string
}

export const Names = findByProps("nameAndDecorators") as {
    muted: string
    avatar: string
    highlighted: string
    layout: string
    content: string
    name: string
    wrappedLayout: string
    wrappedName: string
    nameAndDecorators: string
    subText: string
}

export const Scrolling = findByProps("scrolling", "scrollerBase") as {
    scrollerBase: string
    thin: string
    fade: string
    scrolling: string
    auto: string
    none: string
    content: string
    disableScrollAnchor: string
    managedReactiveScroller: string
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

export const Margins = findByProps("marginLarge", "marginTop20") as {
    marginXSmall: string
    marginSmall: string
    marginMedium: string
    marginLarge: string
    marginXLarge: string
    marginReset: string
    marginTop4: string
    marginBottom4: string
    marginTop8: string
    marginBottom8: string
    marginTop20: string
    marginBottom20: string
    marginTop40: string
    marginBottom40: string
    marginTop60: string
    marginBottom60: string
    marginCenterHorz: string
    marginLeft8: string
}

export default {
    PrivateChannelsHeaderContainer,
    DMButtons,
    ServerMembers,
    AccountControlButtons,
    ColorPicker,
    Margins,
    Scrolling,
    DeleteAccountButtonRow,
    Names,
    Interactives,
    container
}

/* copy types
console.log(Object.keys(searchClassNameModules("member-2cj2PI")).join(": string\n") + ": string")
*/