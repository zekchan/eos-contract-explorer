import * as React from 'react'
import ReactJson from 'react-json-view'
interface IProps {
    data: any,
}
interface IState {
    opened: boolean
}

export default class ButyData extends React.Component<IProps, IState> {
    public state = {
        opened: false,
    }
    public render() {
        const { data } = this.props

        if (typeof data === 'object') {
            return <ReactJson src={data} collapsed={true} />
        }

        return <React.Fragment>{data}</React.Fragment>
    }
}