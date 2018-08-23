import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

interface IState {
    anchorEl: HTMLElement | null,
}
interface IProps {
    options: string[],
    value: string,
    onChange: (option: string) => void,
}

class ButtonSelect extends React.Component<IProps, IState> {
    public state = {
        anchorEl: null,
    };

    public render() {
        const { anchorEl } = this.state

        return <React.Fragment>
            <Button onClick={this.handleClick} color="inherit">
                {this.props.value}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {this.props.options.map(option => (
                    <MenuItem key={option} onClick={this.handleChoose(option)}>{option}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    }

    private handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    private handleClose = () => {
        this.setState({ anchorEl: null });
    };
    private handleChoose = (option: string) => () => {
        this.handleClose()
        this.props.onChange(option)
    };
}

export default ButtonSelect;