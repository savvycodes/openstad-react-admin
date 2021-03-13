import React from "react";
import { Button as RAButton, useRefresh } from "react-admin";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useDataProvider } from "react-admin";
import { processCsvFile } from "./csvExtractor";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { ideaSchema } from "../../resources/idea/schema";
import validateCsv from "./validateCsv";
import ActionButtonsLine from "./ActionButtonsLine.jsx";
import FileUpload from "./FileUpload.jsx";
import ImportNotifications from "./ImportNotificationsLine.jsx";
import ImportRowCount from "./ImportRowCountLine.jsx";
import ImportDelimiter from "./ImportDelimiterLine.jsx";
import countFailedImportRows from "./countFailedImportRows";
import ImportUseIdCheckboxLine from "./ImportUseIdCheckboxLine.jsx";

export const ImportButton = (props) => {
  const { resource } = props;

  if (!resource) {
    throw new Error("emptyResource");
  }

  const [open, setOpen] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [values, setValues] = React.useState([]);
  const [delimiter, setDelimiter] = React.useState("");
  const [useId, setUseId] = React.useState(true);
  const [dialogStatus, setDialogStatus] = React.useState("base");
  const [
    csvValidationNotifications,
    setCsvValidationNotifications,
  ] = React.useState([]);
  const dataProvider = useDataProvider();
  const refresh = useRefresh();

  const openImportDialog = () => {
    setOpen(true);
  };

  const clear = () => {
    setImporting(false);
    setImporting(false);
    setFileName("");
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

  const handleSubmit = (callback, afterSucces) => {
    setImporting(true);

    let apiValidationErrors = [];

    Promise.all(
      values.map((value) =>
        callback(value).catch((error, response) => {
          var valueKeys = Object.keys(value);
          // add first info rows for more information what row failed
          var formattedFirstValue =
            valueKeys[0] && value[valueKeys[0]]
              ? `${valueKeys[0]}: ${value[valueKeys[0]].slice(0, 25)}`
              : "";
          var formattedSecondValue =
            valueKeys[1] && value[valueKeys[1]]
              ? `${valueKeys[1]}: ${value[valueKeys[1]].slice(0, 25)}`
              : "";

          apiValidationErrors.push({
            messageType: "apiValidationError",
            color: "red",
            message:
              "Failed to import row: " +
              formattedFirstValue +
              "; " +
              formattedSecondValue +
              ", because of error: " +
              error.message,
          });
        })
      )
    ).then(() => {
      setCsvValidationNotifications(apiValidationErrors);
      setImporting(false);
      setDialogStatus("importFinished");
      refresh();
    });
  };

  const prepareData = (value, addRemoveKeys) => {
    // certain columns should not be send, for instance date values, like createdAt and updatedAt
    // They are currently also present in export
    // some should probably, like deletedAt, should not be send by api
    const standardRemoveKeys = ["deletedAt", "createdAt", "updatedAt"];
    // certains keys should be parsed as object but exported as a JSON
    const exceptionsObjectKeys = ["location"];

    const removeKeys = addRemoveKeys
      ? standardRemoveKeys.concat(addRemoveKeys)
      : standardRemoveKeys;
    const arrayKeys = ["images"];

    const cleanUp = function (value, key, parentValues) {
      if (typeof value === "object" && !exceptionsObjectKeys.includes(key)) {
        Object.keys(value).forEach((key) => {
          // in case value is empty ont send it, many values will fail on empty string
          // for instance int types
          // this might cause issue when wanting to empty a field
          cleanUp(value[key], key, value);
        });
      } else {
        if (!value || removeKeys.includes(key)) {
          delete parentValues[key];
        }
      }
    };

    cleanUp(value, null);

    return value;
  };

  const handleSubmitCreate = async () => {
    const callback = (value) => {
      // add Id key to remove
      value = prepareData(value, ["id"]);
      return dataProvider.create(resource, { data: value });
    };

    handleSubmit(callback);
  };

  const handleSubmitOverwrite = async () => {
    const callback = (value) => {
      value = prepareData(value);
      return dataProvider.update(resource, { id: value.id, data: value });
    };

    handleSubmit(callback);
  };

  const handleReload = async () => {
    clear();
    setDialogStatus("base");
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

    target.value = "";
  };

  const totalRows = values ? values.length : 0;

  return (
    <>
      <RAButton
        color="primary"
        component="span"
        variant={"text"}
        label={"import"}
        onClick={openImportDialog}
      >
        <GetAppIcon style={{ transform: "rotate(180deg)", fontSize: "20" }} />
      </RAButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Import "} {resource}s
        </DialogTitle>
        <DialogContent>
          <div
            id="alert-dialog-description"
            style={{ fontFamily: "sans-serif" }}
          >
            {dialogStatus === "importFinished" ? (
              <>
                <h3>Import complete!</h3>
                <p>
                  Imported{" "}
                  <b>
                    {totalRows -
                      countFailedImportRows(csvValidationNotifications)}
                  </b>{" "}
                  from a total of <b>{totalRows}</b> rows
                </p>
                <h5 style={{ color: "red" }}>
                  {countFailedImportRows(csvValidationNotifications)} failed
                  rows:
                </h5>
                <ImportNotifications
                  {...{ csvValidationNotifications, dialogStatus }}
                />
              </>
            ) : (
              <>
                <p>Upload a csv or tsv file for bulk editing or creation. </p>
                <ul>
                  <li>For creating: use a file without 'id' column.</li>
                  <li>
                    For editing: use a file with 'id' column. (for instance
                    export here, edit in excel and upload again)
                  </li>
                </ul>
                <p style={{ margin: "0px" }}>{"Data file requirements"}</p>
                <ol>
                  <li>{"Must be a '.csv' or '.tsv' file"}</li>
                  <li>
                    {
                      "Only columns corresponding to the data model will be imported, columns with user or aggregated data etc. will be ignored."
                    }
                  </li>
                  <li>
                    {
                      "For setting a specific user to a row use a header named userId in your csv."
                    }
                  </li>
                </ol>
                <ImportDelimiter
                  {...{ delimiter, handleImportDelimiterChange }}
                />
                <ImportUseIdCheckboxLine
                  {...{ checked: useId, handleCheckBoxChange }}
                />
                <FileUpload {...{ onFileAdded, clear, fileName }} />
                <ImportNotifications {...{ csvValidationNotifications }} />
                <ImportRowCount {...{ values }} />
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <ActionButtonsLine
            {...{
              handleClose,
              handleSubmitCreate,
              handleSubmitOverwrite,
              handleReload,
              values,
              importing,
              dialogStatus,
              useId,
              idPresent: csvValidationNotifications.some(
                (notification) =>
                  notification["messageType"] === "idColumnPresent"
              ),
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
