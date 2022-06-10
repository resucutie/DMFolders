import * as webpack from "ittai/webpack"
import { Button, TextInput, Flex } from "ittai/components"
const { React } = webpack
import UserListSettings from "./UserListSettings"

export default function() {
    return (
        <>
            <UserListSettings />
        </>
    )
}