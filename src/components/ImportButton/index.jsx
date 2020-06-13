import React from 'react';
import { Button as RAButton, useRefresh } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useNotify, useDataProvider } from 'react-admin';
import { processCsvFile } from './csvExtractor';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';
import { ideaSchema } from '../../resources/idea/schema';
import validateCsv from './validateCsv';
import Tooltip from './Tooltip';

export const ImportButton = (props) => {
  const { resource, preCommitCallback } = props;

  if (!resource) {
    throw new Error('emptyResource');
  }

  const [open, setOpen] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [values, setValues] = React.useState([]);
  const [delimiter, setDelimiter] = React.useState(',');
  const [csvValidationNotifications, setCsvValidationNotifications] = React.useState([]);
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
    setCsvValidationNotifications([]);
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
        values.map((value) => dataProvider.update(resource, { id: value.id, data: value })),
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
      const values = await processCsvFile(file, { delimiter });

      setValues(values);
      setCsvValidationNotifications(await validateCsv(values, ideaSchema));

      setErrorTxt(null);
    } catch (error) {
      console.error(error);

      setValues(null);
      setErrorTxt(error.toString());
    }
  };
  console.log('csvValidationNotifications')
  console.log(csvValidationNotifications)

  return (
    <>
      <RAButton
        color='primary'
        component='span'
        variant={'text'}
        label={'import'}
        onClick={openImportDialog}
      >
        <GetAppIcon style={{ transform: 'rotate(180deg)', fontSize: '20' }}/>
      </RAButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Import to'} "{resource}"
        </DialogTitle>
        <DialogContent>
          <div id='alert-dialog-description' style={{ fontFamily: 'sans-serif' }}>
            <p style={{ margin: '0px' }}>{'Data file requirements'}</p>
            <ol>
              <li>{'Must be a \'.csv\' or \'.tsv\' file'}</li>
              <li>{'Must not contain an \'id\' column for new'}</li>
              <li>{'Must contain an \'id\' column for overwrite'}</li>
            </ol>
            <div style={{ margin: '20px 0' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
              >
                <MenuItem value={','}>,</MenuItem>
                <MenuItem value={';'}>;</MenuItem>
                <MenuItem value={' '}>Space</MenuItem>
              </Select>
            </div>
            <Button variant='contained' component='label'>
              <span>{'chooseFile'}</span>
              <GetAppIcon style={{ transform: 'rotate(180deg)', fontSize: '20' }}/>
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
              <p style={{ marginBottom: '0px' }}>
                {'Row count'}: <strong>{values.length}</strong>
              </p>
            )}
            {!!csvValidationNotifications && csvValidationNotifications.length > 0 && (
              <Tooltip csvValidationNotifications={csvValidationNotifications}/>
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
        </DialogActions>
      </Dialog>
    </>
  );
};
