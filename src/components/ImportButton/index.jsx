import React from 'react';
import { Button as RAButton, useRefresh } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useNotify, useDataProvider } from 'react-admin';
import { processCsvFile } from './csvExtractor';
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
import ImportNotifications from './ImportNotificationsLine';
import ImportRowCount from './ImportRowCountLine';
import ImportDelimiter from './ImportDelimiterLine';

export const ImportButton = (props) => {
  const { resource } = props;

  if (!resource) {
    throw new Error('emptyResource');
  }

  const [open, setOpen] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [values, setValues] = React.useState([]);
  const [delimiter, setDelimiter] = React.useState(',');
  const [csvValidationNotifications, setCsvValidationNotifications] = React.useState([]);
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

  const handleImportDelimiterChange = (e) => {
    setDelimiter(e.target.value);

    clear();
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
      await Promise.all(values.map((value) => dataProvider.create(resource, { data: value })));

      handleComplete();
    } catch (error) {
      handleComplete(error);
    }
  };

  const handleSubmitOverwrite = async () => {
    setImporting(true);

    try {
      Promise.all(
        values.map((value) => dataProvider.update(resource, { id: value.id, data: value })),
      ).then(() => {
        handleComplete();
      });
    } catch (error) {
      console.log('error')
      console.log(error)
      handleComplete(error);
    }
  };

  const notify = useNotify();
  const dataProvider = useDataProvider();

  const onFileAdded = async (e) => {
    const { target } = e;

    const file = target.files && target.files[0];

    setFileName(file.name);

    const values = await processCsvFile(file, { delimiter });

    setValues(values);
    setCsvValidationNotifications(await validateCsv(values, ideaSchema));

    target.value = '';
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
            <p>Here you can upload a csv or tsv file for bulk editing or creation.
              For creating: use a file without 'id' column.
              For editing: use a file with 'id' column.
              If you would like to edit the records from the index as a csv file, use the 'export' button in the top
              right corner to export as a csv including the id column. After editing the csv in your editor of choice,
              use this import function to upload the file.
            </p>
            <p style={{ margin: '0px' }}>{'Data file requirements'}</p>
            <ol>
              <li>{'Must be a \'.csv\' or \'.tsv\' file'}</li>
              <li>{'Must not contain an \'id\' column for new'}</li>
              <li>{'Must contain an \'id\' column for overwrite'}</li>
            </ol>
            <ImportDelimiter {...{ delimiter, handleImportDelimiterChange }} />
            <FileUpload  {...{ onFileAdded, clear }} />
            <ImportNotifications {...{ csvValidationNotifications }} />
            <ImportRowCount {...{ values }} />
          </div>
        </DialogContent>
        <DialogActions>
          <ActionButtonsLine {...{
            handleClose,
            handleSubmitCreate,
            handleSubmitOverwrite,
            values,
            importing,
            idPresent: csvValidationNotifications.some( notification => notification['messageType'] === 'idColumn' ) }
          } />
        </DialogActions>
      </Dialog>
    </>
  );
};
