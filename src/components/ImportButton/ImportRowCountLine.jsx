import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import LightTooltip from '../LightTooltip';

export default (props) => {
  const { values } = props;

  return (<>
    {!!values && (
      <LightTooltip title={
        <React.Fragment>
          <Typography color="inherit">
            {
              values.map((value) => {
                return (<p>{`${value}`}</p>);
              })
            }
          </Typography>
        </React.Fragment>
      } TransitionComponent={Zoom} interactive arrow placement="top">
        <p style={{ marginBottom: '0px' }}>
          {'Import row count'}: <strong>{values.length}</strong>
        </p>
      </LightTooltip>
    )}
  </>);
}
