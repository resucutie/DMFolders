import { React } from "ittai/webpack"

interface Props {
    renderError?: string | React.ReactElement
    children: any
}

export default class ErrorBoundary extends React.Component<Props> {
    state = { hasError: false };

    componentDidCatch() { }

    static getDerivedStateFromError() { return { hasError: true }; }

    render() {
        if (this.state.hasError) return (Boolean(this.props.renderError) ? this.props.renderError : null);
        //@ts-ignore
        return this.props.children;
    }
}