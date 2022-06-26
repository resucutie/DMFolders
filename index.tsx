/// <reference path="./types.d.ts" />

import { Plugin } from "ittai/entities"
import * as patcher from "ittai/patcher"
import { findInReactTree, searchClassNameModules } from "ittai/utilities"
import * as webpack from "ittai/webpack"
const { React } = webpack

import Settings from "./components/Settings"
import patchDmList from "./patches/dmlist"
import patchDmButton from "./patches/dmbutton"

const Uh = () => {
    return <div>boo</div>
}

export default class DMFolders extends Plugin {
    start() {
        this.setSettingsPanel(() => <Settings />)
        
        //@ts-ignore internal usage only
        globalThis.searchClassNameModules = searchClassNameModules
        
        patchDmList()
        patchDmButton()

        // patcher.after(
        //     "DMPatch",
        //     webpack.find(
        //         (m) =>
        //             m?.default?.displayName === "ConnectedPrivateChannelsList"
        //     ),
        //     "default",
        //     ([props], res, _this) => {
        //         console.log({ props, res, _this })

        //         let PrivateChannelsList: {
        //             props: {
        //                 children: React.ReactNode[]
        //                 privateChannelIds: string[]
        //             }
        //         } = findInReactTree(
        //             res,
        //             (m: { type: { displayName: string } }) =>
        //                 m?.type?.displayName === "PrivateChannelsList"
        //         ) as any
        //         if (PrivateChannelsList == null) return

        //         PrivateChannelsList.props.children.push(
        //             ["", "", "","","","","","","","","","",].map(() => <Uh />)
        //         )

        //         console.log(PrivateChannelsList)
        //     }
        // )
    }

    stop() {
        patcher.unpatchAll()
    }
}
