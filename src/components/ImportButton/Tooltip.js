import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { Tooltip, withStyles } from '@material-ui/core';

export default (props) => {
  const { csvValidationErrors } = props;

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      color: 'rgba(232,61,61,0.87)',
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
          csvValidationErrors.map((validationError) => {
            return (<p>{`${validationError.message}`}</p>);
          })
        }
      </Typography>
    </React.Fragment>
  } TransitionComponent={Zoom} interactive arrow placement="top">
    <p style={{ marginBottom: '0px', color: 'red' }}>
      {'Import validation errors'}: <strong>{csvValidationErrors.length}</strong>
    </p>
  </LightTooltip>);
}
