import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import * as React from 'react'
import * as ReactMarkdown from "react-markdown"

export default class RicardianText extends React.Component<{ name: string, body: string }, { opened: boolean }> {
    public state = {
        opened: false,
    }
    public render() {
        const { name, body } = this.props
        if (body.trim().length) {
            return <ExpansionPanel expanded={this.state.opened} onChange={this.handleChange}>
                <ExpansionPanelSummary>
                    <Typography>{name}</Typography>
                </ExpansionPanelSummary>
                {
                    this.state.opened && <ExpansionPanelDetails>
                        <Typography>
                            <ReactMarkdown source={body} />
                        </Typography>
                    </ExpansionPanelDetails>
                }
            </ExpansionPanel>
        }
        return <ExpansionPanelSummary>
            <Typography>{name}</Typography>
        </ExpansionPanelSummary>

    }
    private handleChange = () => {
        this.setState(({ opened }) => ({
            opened: !opened
        }))
    }
}