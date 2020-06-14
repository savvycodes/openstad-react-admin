import React from 'react';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';

export default (props) => {
  const { handleClose, handleSubmitCreate, handleSubmitOverwrite, values, importing, idPresent } = props;

  return (
    <>
      <Button onClick={handleClose}>
        <span>{'cancel'}</span>
      </Button>
      <Button
        disabled={!values || values.length < 1 || importing || idPresent}
        onClick={handleSubmitCreate}
        color='secondary'
        variant='contained'
      >
        {importing && <CircularProgress size={18} thickness={2}/>}
        <span>{'Import New'}</span>
      </Button>
      <Button
        disabled={!values || values.length < 1 || importing || !idPresent}
        onClick={handleSubmitOverwrite}
        color='primary'
        variant='contained'
      >
        {importing && <CircularProgress size={18} thickness={2}/>}
        <span>{'importOverride'}</span>
      </Button>
    </>
  );
}
