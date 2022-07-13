/// <reference path="./types.d.ts" />

import { Plugin } from "ittai/entities"
import * as patcher from "ittai/patcher"
//@ts-ignore internal usage only
import { searchClassNameModules } from "ittai/utilities"
import * as webpack from "ittai/webpack"
import { React, Dispatcher } from "ittai/webpack"
import { openChangelogModal } from "ittai/changelog"
//@ts-ignore internal usage only

import Settings from "./components/Settings"
import patchDmList from "./patches/dmlist"
import patchDmButton from "./patches/dmbutton"
import patchFriendsPage from "./patches/friendslist"
import pinnedDMS from "./handlers/pinnedDMS"
import * as constants from "./constants"

let visibilityStorage: {[category: string]: boolean} = {}

export default class DMFolders extends Plugin {
    start() {
        this.setSettingsPanel(() => <Settings />)

        // openChangelogModal()
        
        //@ts-ignore internal usage only
        globalThis.searchClassNameModules = searchClassNameModules
        
        patchDmList()
        patchDmButton()
        patchFriendsPage()

        Dispatcher.subscribe("STREAMER_MODE_UPDATE", this.onStreamerModeChange)
    }

    private onStreamerModeChange({value}: {value: boolean}) {
        if (this.settings.get("streamerMode", constants.Settings.DefaultSettings.STREAMER_MODE))
        pinnedDMS.getCategories().forEach(category => {
            if (value) {
                visibilityStorage[category] = pinnedDMS.getVisibility(category)
                pinnedDMS.setVisibility(category, false)
            } else {
                pinnedDMS.setVisibility(category, visibilityStorage[category] ?? false)
            }
        })
        Dispatcher.dirtyDispatch({ type: constants.DISPATCHER_PINDMS_CHANGE_LIST })
    }

    stop() {
        patcher.unpatchAll()
        Dispatcher.unsubscribe("STREAMER_MODE_UPDATE", this.onStreamerModeChange)
    }
}
