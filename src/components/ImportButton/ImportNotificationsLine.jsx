import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import LightTooltip from '../LightTooltip';

export default (props) => {
  const { csvValidationNotifications } = props;

  return (<>
    {!!csvValidationNotifications && csvValidationNotifications.length > 0 && (
      <LightTooltip title={
        <React.Fragment>
          <Typography color="inherit">
            {
              csvValidationNotifications.map((validationError, index) => {
                return (
                    <span
                      key={index}
                      style={{ color: validationError.color, display: 'block' }}
                    >
                      {`${validationError.message}`}
                    </span>
                );
              })
            }
          </Typography>
        </React.Fragment>
      } TransitionComponent={Zoom} interactive arrow placement="top">
        <p style={{ marginBottom: '0px', color: 'blue' }}>
          {'Import validation alerts'}: <strong>{csvValidationNotifications.length}</strong>
        </p>
      </LightTooltip>
    )}
  </>);
}
