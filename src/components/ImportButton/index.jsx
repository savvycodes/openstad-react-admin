import React from 'react';
import { Button as RAButton } from 'react-admin';
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
import countFailedImportRows from './countFailedImportRows';
import ImportUseIdCheckboxLine from './ImportUseIdCheckboxLine';

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
  const [useId, setUseId] = React.useState(true);
  const [dialogStatus, setDialogStatus] = React.useState('base');
  const [csvValidationNotifications, setCsvValidationNotifications] = React.useState([]);
  const dataProvider = useDataProvider();

  const openImportDialog = () => {
    setOpen(true);
  };

  const clear = () => {
    setImporting(false);
    setImporting(false);
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

  const handleSubmit = (callback) => {
    setImporting(true);

    let apiValidationErrors = [];

    Promise.all(
      values.map((value) => callback(value).catch((error) => {
        apiValidationErrors.push({
          messageType: 'apiValidationError',
          color: 'red',
          message: error.message,
        });
      })),
    ).then(() => {
      setCsvValidationNotifications(apiValidationErrors);

      setImporting(false);
      setDialogStatus('importFinished');
    });
  };

  const prepareData = (value) => {
    // certain columns should be send
    // They are currently also present in export
    // should probably not be send by api
    const removeKeys = ['deletedAt'];

    Object.keys(value).forEach((key) => {
      // in case value is empty ont send it, many values will fail on empty string
      // for instance int types
      // this might cause issue when wanting to empty a field
      if (!value[key] || removeKeys.includes(key)) {
        delete value[key];
      }
      //@todo split by point . extraData.phone should be
      // extraData: {"phone" : extraData.phone, "theme": extraData.phone}

    });

    return value;
  }

  const handleSubmitCreate = async () => {
    const callback = (value) => {
      value = prepareData(value);
      return dataProvider.create(resource, { data: value })
    };

    handleSubmit(callback);
  };

  const handleSubmitOverwrite = async () => {
    const callback = (value) => {
      value = prepareData(value);
      return dataProvider.update(resource, { id: value.id, data: value });
    }

    handleSubmit(callback);
  };

  const handleReload = async () => {
    clear();
    setDialogStatus('base');
  };

  const handleCheckBoxChange = async (e) => {
    setUseId(e.target.checked);
  };

  const onFileAdded = async (e) => {
    const { target } = e;

    const file = target.files && target.files[0];

    setFileName(file.name);

    const values = await processCsvFile(file, { delimiter });

    setValues(values);
    setCsvValidationNotifications(await validateCsv(values, ideaSchema));

    target.value = '';
  };

  const totalRows = values ? values.length : 0;

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
            {dialogStatus === 'importFinished' ?
              (<>
                <h3>Import complete!</h3>
                <p>
                  Imported <b>{totalRows - countFailedImportRows(csvValidationNotifications)}</b> from a total
                  of <b>{totalRows}</b> rows
                </p>
                <h5 style={{ color: 'red' }}>{countFailedImportRows(csvValidationNotifications)} failed rows:</h5>
                <ImportNotifications {...{ csvValidationNotifications, dialogStatus }} />
              </>)
              :
              <>
                <p>Here you can upload a csv or tsv file for bulk editing or creation.
                  For creating: use a file without 'id' column.
                  For editing: use a file with 'id' column.
                  If you would like to edit the records from the index as a csv file, use the 'export' button in the top
                  right corner to export as a csv including the id column. After editing the csv in your editor of
                  choice,
                  use this import function to upload the file.
                </p>
                <p style={{ margin: '0px' }}>{'Data file requirements'}</p>
                <ol>
                  <li>{'Must be a \'.csv\' or \'.tsv\' file'}</li>
                  <li>{'Must not contain an \'id\' column for new'}</li>
                  <li>{'Must contain an \'id\' column for overwrite'}</li>
                </ol>
                <ImportDelimiter {...{ delimiter, handleImportDelimiterChange }} />
                <ImportUseIdCheckboxLine {...{ checked: useId, handleCheckBoxChange }}/>
                <FileUpload  {...{ onFileAdded, clear }} />
                <ImportNotifications {...{ csvValidationNotifications }} />
                <ImportRowCount {...{ values }} />
              </>
            }
          </div>
        </DialogContent>
        <DialogActions>
          <ActionButtonsLine {...{
            handleClose,
            handleSubmitCreate,
            handleSubmitOverwrite,
            handleReload,
            values,
            importing,
            dialogStatus,
            useId,
            idPresent: csvValidationNotifications.some(notification => notification['messageType'] === 'idColumnPresent'),
          }} />
        </DialogActions>
      </Dialog>
    </>
  );
};
