import React from 'react';
import { Typography, Dialog, Divider, DialogActions, DialogContent, DialogTitle } from '@mui/material';


class SuccessDialog extends React.Component {
    state = { scroll: 'body' };
    render() {
        return (
            <Dialog
                onClose={this.props.dismiss}
                scroll={this.state.scroll}
                open={true}
                className={this.props.dialogueOverDialogue && "successDialogWrap"}
                disableBackdropClick
                aria-labelledby="customized-dialog-title"
                width="600px"
            >
                <DialogTitle style={{width:"600px"}}>
                    <Typography style={{ fontSize: "24px", textAlign: "left", fontWeight: 700, color: "#551A8B" }} onClose={this.props.dismiss}>
                        {this.props.HeaderText}
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent style={{ padding: "20px 15px", fontSize: "14px" }}>
                    <Typography  style={{ fontSize: "16px", textAlign: "justify", fontWeight: 500, color: "#551A8B" }}>{this.props.BodyText}</Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    {this.props.successButton.map((button, i) =>
                        <div key={i}><div>{button}</div></div>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}

export default SuccessDialog;