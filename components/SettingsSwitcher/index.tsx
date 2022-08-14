import * as webpack from "ittai/webpack"
import { React } from "ittai/webpack"
import { Modal, Text, Heading, Button } from "ittai/components";
import { Margins } from "ittai/classes";
import * as Importer from "../../handlers/importFromPlugin"
import pinnedDMS from "../../handlers/pinnedDMS";

const { Slides, springConfig } = webpack.findByProps("Slide")

const Pages = {
    SWITCH: "switch",
    SWITCH_DONE: "switchDone"
}

const WIDTH = 400;

interface Props { transitionState: 1 | 2 | 3, onClose: () => void }
export default class MenuModal extends React.Component<Props, {page: string}> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.state = {
            page: Pages.SWITCH,
        };
    }

    setPage(page: string) {
        this.setState({page})
    }

    render() {
        return <Modal.ModalRoot size={Modal.ModalSize.DYNAMIC} {...this.props}>
            <Slides
                activeSlide={this.state.page}
                springConfig={springConfig}
                width={WIDTH}
                children={[
                    <div id={Pages.SWITCH}>
                        <Modal.ModalHeader separator={false}>
                            <Heading variant="heading-md/normal">Switch?</Heading>
                        </Modal.ModalHeader>
                        <Modal.ModalContent>
                            <Text className={Margins.marginBottom20}>It seems that you have used PinDMs before. Do you want to switch the user list to this plugin?</Text>
                        </Modal.ModalContent>
                        <Modal.ModalFooter>
                            <Button onClick={async () => {
                                await this.switch()
                                this.setPage(Pages.SWITCH_DONE)
                            }}>Switch</Button>
                            <Button color={Button.Colors.WHITE} look={Button.Looks.LINK} onClick={this.props.onClose}>No</Button>
                        </Modal.ModalFooter>
                    </div>,
                    <div id={Pages.SWITCH_DONE}>
                        <Modal.ModalHeader separator={false}>
                            <Heading variant="heading-md/normal">Done</Heading>
                        </Modal.ModalHeader>
                        <Modal.ModalContent>
                            <Text className={Margins.marginBottom20}>The switching was done sucessfully. We can disable them if you want</Text>
                        </Modal.ModalContent>
                        <Modal.ModalFooter>
                            <Button onClick={async () => {
                                await this.disableAll()
                                this.props.onClose()
                            }}>Disable</Button>
                            <Button color={Button.Colors.WHITE} look={Button.Looks.LINK} onClick={this.props.onClose}>I am fine</Button>
                        </Modal.ModalFooter>
                    </div>
                ]}
            />
        </Modal.ModalRoot>
    }

    async switch() {
        if (Importer.hasThemEnabled().pinDMs){
            const newSettings = Importer.fromDevilbroPinDMs()
            pinnedDMS.setRaw(newSettings)
        }
    }

    async disableAll() {
        //@ts-ignore
        if (Importer.hasThemEnabled().pinDMs) BdApi?.Plugins?.disable?.("PinDMs")
    }
}