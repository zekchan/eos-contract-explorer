import * as React from 'react';

import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { loadContract } from '../state/reducers/Contract';

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
    }
})
class ContractInput extends React.Component<WithStyles<typeof styles> & IDispatchToProps> {
    private contractAccountRef = React.createRef<HTMLInputElement>()
    public render() {
        const { classes: { textField, form } } = this.props
        return (
            <form
                onSubmit={this.handleFormSubmit}
                autoComplete='off'
                noValidate={true}
                className={form}
            >
                <TextField
                    label="Контракт"
                    autoFocus={true}
                    className={textField}
                    placeholder="wizardstoken"
                    defaultValue="eosio"
                    margin="normal"
                    inputRef={this.contractAccountRef}
                />
                <Button variant="contained" color="primary" type='submit' size="large">
                    GO
                        </Button>
            </form>
        )
    }
    private handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const { current } = this.contractAccountRef
        if (current) {
            this.props.loadContract(current.value)
        }
    }

}

interface IDispatchToProps {
    loadContract(contractName: string): void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => bindActionCreators({ loadContract }, dispatch)

export default compose(
    withStyles(styles),
    connect(undefined, mapDispatchToProps),
)(ContractInput)
