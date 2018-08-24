declare module 'eosjs-api' {
    type table_def = {
        readonly index_type: "i64",
        readonly key_names: string[],
        readonly key_types: string[],
        readonly name: string,
        readonly type: string
    }
    type Tstruct = {
        name: string,
        fields: {
            name: string,
            type: string,
        }[]
    }
    type abi_def = {
        version: string,
        tables: table_def[],
        ricardian_clauses: {
            body: string,
            id: string,
        }[],
        actions: {
            name: string,
            ricardian_contract: string,
        }[],
        structs: Tstruct[],
    }
    type getAbiResult = {
        account_name: string,
        abi: abi_def,
    }
    type getTableRowsResult = {
        more: boolean,
        rows: any[],
    }
    interface IEOS {
        getAbi(account_name: string): Promise<getAbiResult>
        getTableRows(
            json: boolean,
            code: string,
            scope: string,
            table: string,
            table_key: string,
            lower_bound: string,
            upper_bound: void,
            limit: number,
        ): Promise<getTableRowsResult>
    }
    export default function EosConstructor(config: any): IEOS
}