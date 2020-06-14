import React from 'react';
import {
  Button,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';

export default (props) => {
  const { handleClose, handleSubmitCreate, handleSubmitOverwrite, values, importing } = props;

  return (<DialogActions>
    <Button onClick={handleClose}>
      <span>{'cancel'}</span>
    </Button>
    <Button
      disabled={!values || importing}
      onClick={handleSubmitCreate}
      color='secondary'
      variant='contained'
    >
      {importing && <CircularProgress size={18} thickness={2}/>}
      <span>{'Import New'}</span>
    </Button>
    <Button
      disabled={!values || importing}
      onClick={handleSubmitOverwrite}
      color='primary'
      variant='contained'
    >
      {importing && <CircularProgress size={18} thickness={2}/>}
      <span>{'importOverride'}</span>
    </Button>
  </DialogActions>);
}
