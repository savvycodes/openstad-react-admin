import React from 'react';
import { Button as RAButton, resolveBrowserLocale, useRefresh } from 'react-admin';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useNotify, useDataProvider } from 'react-admin';
import { processCsvFile } from './csv-extractor';
import Typography from '@material-ui/core/Typography';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import { ideaSchema } from '../../resources/idea/schema';
import Zoom from '@material-ui/core/Zoom';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(232,61,61,0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: '200px 280px',
  },
}))(Tooltip);

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
  const [csvValidationErrors, setCsvValidationErrors] = React.useState([]);
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
    setCsvValidationErrors([]);
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

  const validateCsv = async (csvRows, schema) => {
    let validationErrors = [];

    if (!csvRows.length > 0) {
      return {
        errorType: 'schemaError',
        message: `There are no rows in the file`,
      };
    }

    Object.keys(schema).forEach((key) => {
      if (csvRows[0].hasOwnProperty(key))
        validationErrors.push({
          errorType: 'schemaError',
          message: `There was a validation error for the key: ${key}`,
        });
    });

    return validationErrors;

    // const values = Object.keys(csvRows).map((row) => {
    //   let cvsValidationErrors = [];
    //
    //   Object.keys(schema).forEach((key) => {
    //     if (row.hasOwnProperty(key))
    //       cvsValidationErrors.push({
    //         key,
    //         errorType: 'schemaError',
    //         message: 'There was a validation error',
    //       });
    //   });
    //
    //   return {
    //     cvsValidationErrors,
    //     ...row,
    //   }
    // })
    //
    // setValues(values);
  };

  const onFileAdded = async (e) => {
    const file = e.target.files && e.target.files[0];
    setFileName(file.name);
    try {
      const values = await processCsvFile(file, parseConfig);
      const validationErrors = await validateCsv(values, ideaSchema);

      console.log(values);
      if (logging) {
        console.log({ values, validationErrors });
      }
      setValues(values);
      setCsvValidationErrors(validationErrors);

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
        <GetAppIcon style={{ transform: 'rotate(180deg)', fontSize: '20' }}/>
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
              <li>{'Must be a \'.csv\' or \'.tsv\' file'}</li>
              <li>{'Must not contain an \'id\' column for new'}</li>
              <li>{'Must contain an \'id\' column for overwrite'}</li>
            </ol>
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
            {!!csvValidationErrors && (
              <LightTooltip title={
                <React.Fragment>
                  <Typography color="inherit">Tooltip with HTML</Typography>
                  <em>{'And here\'s'}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                  {'It\'s very engaging. Right?'}
                </React.Fragment>
              } TransitionComponent={Zoom} interactive arrow placement="top">
                <p style={{ marginBottom: '0px' }}>
                  {'Import validation errors'}: <strong>{csvValidationErrors.length}</strong>
                </p>
              </LightTooltip>
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
