import React from 'react';
import { Button as RAButton, useRefresh } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useNotify, useDataProvider } from 'react-admin';
import { processCsvFile } from './csvExtractor';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { ideaSchema } from '../../resources/idea/schema';
import validateCsv from './validateCsv';
import ActionButtonsLine from './ActionButtonsLine';
import FileUpload from './FileUpload';
import ImportNotificationsLine from './ImportNotificationsLine';
import ImportRowCountLine from './ImportRowCountLine';

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

  const clear = () => {
    setImporting(false);
    setFileName('');
    setValues([]);
    setCsvValidationNotifications([]);
  };

  const handleClose = () => {
    clear();
    setOpen(false);
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
              <span>Delimiter: </span>
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
            <FileUpload  {...{ onFileAdded, clear }} />
            <ImportNotificationsLine {...{ csvValidationNotifications }} />
            <ImportRowCountLine {...{ values }} />
          </div>
        </DialogContent>
        <DialogActions>
          <ActionButtonsLine {...{ handleClose, handleSubmitCreate, handleSubmitOverwrite, values, importing }} />
        </DialogActions>
      </Dialog>
    </>
  );
};
