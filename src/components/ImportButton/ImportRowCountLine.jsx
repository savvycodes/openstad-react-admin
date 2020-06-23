import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import LightTooltip from '../LightTooltip';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

export default (props) => {
  const { values } = props;

  if (!values) {
    return <></>;
  }

  return (
    <>
      <p style={{ marginBottom: '0px', color: 'blue', display: 'inline-block' }}>
        {'Import row count'}: <strong>{values.length}</strong>
      </p>
      <LightTooltip title={
        <React.Fragment>
          <Typography color="inherit">
            {
              values.map((row, rIndex) => {
                return (<span key={rIndex} style={{ color: 'black', display: 'block' }}>
                  {Object.keys(row).map((key, cIndex) => {
                    return (<span key={cIndex}>{`${row[key]}`}</span>);
                  })}
                  <hr/>
                </span>);
              })
            }
          </Typography>
        </React.Fragment>
      } TransitionComponent={Zoom} interactive arrow placement="top">
          <span
            style={{
              verticalAlign: 'middle',
              padding: '8px',
              cursor: 'pointer',
              color: 'blue',
            }}
            onClick={() => console.log('sss')}
          >
          <InfoOutlined/>
          </span>
      </LightTooltip>
    </>
  );
}
