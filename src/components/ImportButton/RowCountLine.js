import React from 'react';

export default (props) => {
  const { values } = props;

  return (<>
    {!!values && (
      <p style={{ marginBottom: '0px' }}>
        {'Row count'}: <strong>{values.length}</strong>
      </p>
    )}
  </>);
}
