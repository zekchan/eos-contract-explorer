import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react'
const styles = (theme: Theme) => createStyles({
    logo: {
        fontFamily: "'Grand Hotel', cursive",
        textTransform: 'none'
    },
})
const ScatterLogo: React.StatelessComponent<WithStyles<typeof styles> & React.HTMLAttributes<HTMLSpanElement>> =
    ({ classes: { logo }, ...props }) => (
        <span {...props} className={logo}> Scatter </span>
    )

export default withStyles(styles)(ScatterLogo)