import LinearProgress from '@material-ui/core/LinearProgress';
import Mtable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react'
import ButyData from './ButyData'

interface IProps {
    indexField?: string,
    fields: string[],
    loading: boolean,
    rows: Array<{
        [field: string]: string
    }>
}
const Table: React.StatelessComponent<IProps> = ({ indexField, fields, rows, loading }: IProps) => {
    return <Mtable>
        <TableHead>
            <TableRow>
                {fields.map(field => (
                    <TableCell key={field}>
                        {field}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {
                loading ?
                    <TableRow>
                        <TableCell colSpan={fields.length}>
                            <LinearProgress />
                        </TableCell>
                    </TableRow> :
                    rows.map((row, idx) => (
                        <TableRow key={indexField ? row[indexField] : idx}>
                            {fields.map(field => (
                                <TableCell key={field}>
                                    <ButyData data={row[field]}/>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
            }
        </TableBody>
    </Mtable>
}
Table.defaultProps = {
    rows: [],
}
export default Table