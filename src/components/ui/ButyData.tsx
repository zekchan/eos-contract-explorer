import * as React from 'react'
interface IProps {
    data: any,
}
const ButyData: React.StatelessComponent<IProps> = ({ data }: IProps)=> {
    if (typeof data === 'string') {
        return <React.Fragment>{data}</React.Fragment>
    }
    return <React.Fragment>{JSON.stringify(data)}</React.Fragment>
}
export default ButyData