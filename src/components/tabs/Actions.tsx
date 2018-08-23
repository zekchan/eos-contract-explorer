import { connect } from "react-redux";
import { IState } from "../../state/reducers";
// TODO: тут надл будет написать отдельный рендерер экшенов в будующем
import { RicardianClauses } from "./RicardianClauses";

const mapStateToProps = ({ contract: { abi } }: IState) => ({
    actions: abi ? abi.actions
        .map(action => ({ name: action.name, body: action.ricardian_contract }))
        .sort(action => action.name.length ? -1 : 1) : []
})
export default connect(mapStateToProps)(RicardianClauses)