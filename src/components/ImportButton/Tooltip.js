import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { Tooltip, withStyles } from '@material-ui/core';

export default (props) => {
  const { csvValidationNotifications } = props;

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      boxShadow: theme.shadows[1],
      border: 'black',
      fontSize: 11,
      padding: '20px 20px',
    },
  }))(Tooltip);

  return (<LightTooltip title={
    <React.Fragment>
      <Typography color="inherit">
        {
          csvValidationNotifications.map((validationError) => {
            return (<p style={{ color: validationError.color }}>{`${validationError.message}`}</p>);
          })
        }
      </Typography>
    </React.Fragment>
  } TransitionComponent={Zoom} interactive arrow placement="top">
    <p style={{ marginBottom: '0px', color: 'blue' }}>
      {'Import validation notifications'}: <strong>{csvValidationNotifications.length}</strong>
    </p>
  </LightTooltip>);
}
