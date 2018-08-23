import * as React from "react"
import { connect } from "react-redux";
import { IState } from "../../state/reducers";
import RicardianText from '../RicardianText';

interface IProps {
    actions: Array<{ name: string, body: string }>,
}

export class RicardianClauses extends React.Component<IProps> {
    public render() {
        return this.props.actions
            .map(({ name, body }) =>
                <RicardianText name={name} body={body} key={name} />
            )
    }
}

const mapStateToProps = ({ contract: { abi } }: IState): IProps => ({
    actions: abi ? abi.ricardian_clauses
        .map(action => ({ name: action.id, body: action.body }))
        .sort(action => action.name.length ? -1 : 1) : []
})
export default connect(mapStateToProps)(RicardianClauses)