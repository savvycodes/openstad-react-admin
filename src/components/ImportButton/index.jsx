import React from 'react';
import { Button as RAButton, resolveBrowserLocale, useRefresh } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useNotify, useDataProvider } from 'react-admin';
import { processCsvFile } from './csv-extractor';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';

export const ImportButton = (props) => {
  const { resource, parseConfig, logging, preCommitCallback } = props;

  if (logging) {
    console.log({ props });
  }
  if (!resource) {
    throw new Error('emptyResource');
  }

  let { variant, label, resourceName } = props;
  if (!label) {
    label = 'import';
  }

  if (!variant) {
    variant = 'text';
  }

  if (!resourceName) {
    resourceName = resource;
  }

  const [open, setOpen] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [values, setValues] = React.useState([]);
  const [errorTxt, setErrorTxt] = React.useState('');
  const refresh = useRefresh();

  const openImportDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImporting(false);
    setFileName('');
    setValues([]);
  };

  const handleComplete = (error = false) => {
    handleClose();
    if (!error) {
      notify(`imported ${fileName}`);
      refresh();
    }
    if (error) {
      notify(`importing ${fileName}, ${error}`, 'error');
    }
  };

  const handleSubmitCreate = async () => {
    setImporting(true);
    try {
      if (values.some((v) => v.id)) {
        throw new Error('hasId');
      }
      if (preCommitCallback) setValues(preCommitCallback('create', values));
      await Promise.all(values.map((value) => dataProvider.create(resource, { data: value })));
      handleComplete();
    } catch (error) {
      handleComplete(error);
    }
  };

  const handleSubmitOverwrite = async () => {
    setImporting(true);
    try {
      if (values.some((v) => !v.id)) {
        throw new Error('noId');
      }
      if (preCommitCallback) setValues(preCommitCallback('overwrite', values));
      Promise.all(
        values.map((value) => dataProvider.update(resource, { id: value.id, data: value }))
      ).then(() => {
        handleComplete();
      });
    } catch (error) {
      handleComplete(error);
    }
  };

  const notify = useNotify();
  const dataProvider = useDataProvider();

  const onFileAdded = async (e) => {
    const file = e.target.files && e.target.files[0];
    setFileName(file.name);
    try {
      const values = await processCsvFile(file, parseConfig);
      if (logging) {
        console.log({ values });
      }
      setValues(values);
      setErrorTxt(null);
    } catch (error) {
      console.error(error);
      setValues(null);
      setErrorTxt(error.toString());
    }
  };

  return (
    <>
      <RAButton
        color='primary'
        component='span'
        variant={variant}
        label={label}
        onClick={openImportDialog}
      >
        <GetAppIcon style={{ transform: 'rotate(180deg)', fontSize: '20' }} />
      </RAButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Import to'} "{resourceName}"
        </DialogTitle>
        <DialogContent>
          <div id='alert-dialog-description' style={{ fontFamily: 'sans-serif' }}>
            <p style={{ margin: '0px' }}>{'Data file requirements'}</p>
            <ol>
              <li>{'extension'}</li>
              <li>{'idColumnCreate'}</li>
              <li>{'idColumnUpdate'}</li>
            </ol>
            <Button variant='contained' component='label'>
              <span>{'chooseFile'}</span>
              <GetAppIcon style={{ transform: 'rotate(180deg)', fontSize: '20' }} />
              <input
                type='file'
                style={{ display: 'none' }}
                onChange={onFileAdded}
                accept='.csv,.tsv,.txt'
              />
            </Button>
            {!!fileName && (
              <p style={{ marginBottom: '0px' }}>
                {'processed'}: <strong>{fileName}</strong>
              </p>
            )}
            {!!values && (
              <p style={{ margin: '0px' }}>
                {'rowCount'}: <strong>{values.length}</strong>
              </p>
            )}
            {!!errorTxt && <p style={{ margin: '0px', color: 'red' }}>{errorTxt}</p>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span>{'cancel'}</span>
          </Button>
          <Button
            disabled={!values || importing}
            onClick={handleSubmitCreate}
            color='secondary'
            variant='contained'
          >
            {importing && <CircularProgress size={18} thickness={2} />}
            <span>{'importNew'}</span>
          </Button>
          <Button
            disabled={!values || importing}
            onClick={handleSubmitOverwrite}
            color='primary'
            variant='contained'
          >
            {importing && <CircularProgress size={18} thickness={2} />}
            <span>{'importOverride'}</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
