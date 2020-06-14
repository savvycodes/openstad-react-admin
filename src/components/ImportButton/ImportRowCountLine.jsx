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
              values.map((row, rIndex) => {
                return (<span key={rIndex} style={{ color: 'black', display: 'block'}}>
                  {Object.keys(row).map((key, cIndex) => {
                    return (<span key={cIndex} >{`${row[key]}`}</span>);
                  })}
                  <hr/>
                </span>)
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
