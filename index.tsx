/// <reference path="./types.d.ts" />

import { Plugin } from "ittai/entities"
import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"
const { React } = webpack

import Settings from "./components/Settings"
import patchDms from "./patches/dms"

export default class DMFolders extends Plugin {
    start() {
        this.setSettingsPanel(() => <Settings />)
        patchDms()
    }

    stop() {
        patcher.unpatchAll()
    }
}
