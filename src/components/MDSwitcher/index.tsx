import * as React from "react"

interface IProps {
    source: string,
}
interface IState {
    opened: boolean,
    content: React.ReactNode,
}
export default class MDSwitcher extends React.Component<IProps, IState> {
    public state = {
        opened: false,
        content: null,
    }

    public render() {
        return <React.Fragment>
            <a onClick={this.handleToogle}>{this.state.opened ? "Закрыть" : "Открыть"}</a>
            {this.state.opened && this.state.content}
        </React.Fragment>
    }
    private handleToogle = () => {
        if (this.state.opened) {
            return this.setState({
                opened: false,
                content: null,
            })
        }
        this.setState({
            opened: true,
        })
        import("react-markdown").then(Markdown => {
            this.setState({
                content: <Markdown source={this.props.source} />
            })
        })
    }
}