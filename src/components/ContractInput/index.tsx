import * as React from 'react'
interface IProps {
    onChange(contractName: string): void
}
export default class ContractInput extends React.Component<IProps> {
    private inputRef = React.createRef<HTMLInputElement>()
    public render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" ref={this.inputRef} />
            </form>
        )
    }
    public componentDidMount() {
        if (this.inputRef.current) {
            this.inputRef.current.focus()
        }
    }
    private handleFormSubmit = (e: React.FormEvent): void => {
        e.stopPropagation()
        e.preventDefault()
        if (this.inputRef.current) {
            this.props.onChange(this.inputRef.current.value)
        }
    }
}