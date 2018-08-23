import { setScatterAvailable } from './state/reducers/Account';
import store from './state/Store'

interface INetwork {
    blockchain: 'eos',
    chainId: string
}
interface IRequirableFields {
    accounts: INetwork[]
}
interface IEOSAccount {
    authority: 'active' | 'owner',
    blockchain: 'eos',
    name: string,
}
interface IIdentity {
    publicKey: string,
    name: string,
    kyc: boolean,
    hash: string,
    accounts: IEOSAccount[]
}
export interface IScatter {
    getIdentity(fields: IRequirableFields): Promise<IIdentity>
}
declare global {
    // tslint:disable-next-line:interface-name
    interface Window { scatter?: IScatter | null; }
}
let scatter: IScatter
function setScatter(newScatter: IScatter) {
    store.dispatch(setScatterAvailable(true))
    scatter = newScatter
}
export function detectScatter() {
    if (window.scatter) {
        setScatter(window.scatter)
    } else {
        document.addEventListener('scatterLoaded', scatterExtension => {
            if (window.scatter) {
                setScatter(window.scatter)
            }
        })
    }
}
export default () => scatter as IScatter