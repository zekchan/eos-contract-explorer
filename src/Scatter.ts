import { setIdentity, setScatterAvailable } from './state/reducers/Account';
import store from './state/Store'

interface INetwork {
    blockchain: 'eos',
    chainId: string
}
interface IRequirableFields {
    accounts: INetwork[]
}
export interface IEOSAccount {
    authority: 'active' | 'owner',
    blockchain: 'eos',
    name: string,
}
export interface IIdentity {
    publicKey: string,
    name: string,
    kyc: boolean,
    hash: string,
    accounts: IEOSAccount[]
}
export interface IScatter {
    identity?: IIdentity;
    getIdentity(fields: IRequirableFields): Promise<IIdentity>;
    forgetIdentity(): void;
}
declare global {
    // tslint:disable-next-line:interface-name
    interface Window { scatter?: IScatter | null; }
}
let scatter: IScatter
function setScatter(newScatter: IScatter) {
    store.dispatch(setScatterAvailable(true))
    scatter = newScatter
    if (scatter.identity) {
        store.dispatch(setIdentity(scatter.identity))
    }
    window.scatter = null
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