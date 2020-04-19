// in LatLongInput.js
import { Field } from 'react-final-form';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFilePoster);

/*


var filePondSettings = {
    // set allowed file types with mime types
    acceptedFileTypes:              ['image/*'],
    allowFileSizeValidation:        true,
    maxFileSize:                    '8mb',
    name:                           'image',
    maxFiles:                       5,
    allowBrowse:                    true,
    files:                          [],
    server:                         {
        process: '/image',
        fetch:   '/fetch-image?img=',
        revert:  null
    },
    labelIdle:                      "Sleep afbeelding(en) naar deze plek of <span class='filepond--label-action'>klik hier</span>",
    labelInvalidField:              "Field contains invalid files",
    labelFileWaitingForSize:        "Wachtend op grootte",
    labelFileSizeNotAvailable:      "Grootte niet beschikbaar",
    labelFileCountSingular:         "Bestand in lijst",
    labelFileCountPlural:           "Bestanden in lijst",
    labelFileLoading:               "Laden",
    labelFileAdded:                 "Toegevoegd", // assistive only
    labelFileLoadError:             "Fout bij het uploaden",
    labelFileRemoved:               "Verwijderd", // assistive only
    labelFileRemoveError:           "Fout bij het verwijderen",
    labelFileProcessing:            "Laden",
    labelFileProcessingComplete:    "Afbeelding geladen",
    labelFileProcessingAborted:     "Upload cancelled",
    labelFileProcessingError:       "Error during upload",
    labelFileProcessingRevertError: "Error during revert",
    labelTapToCancel:               "tap to cancel",
    labelTapToRetry:                "tap to retry",
    labelTapToUndo:                 "tap to undo",
    labelButtonRemoveItem:          "Verwijderen",
    labelButtonAbortItemLoad:       "Abort",
    labelButtonRetryItemLoad:       "Retry",
    labelButtonAbortItemProcessing: "Verwijder",
    labelButtonUndoItemProcessing:  "Undo",
    labelButtonRetryItemProcessing: "Retry",
    labelButtonProcessItem:         "Upload",
    labelMaxFileSizeExceeded:       "Afbeelding is te groot, max grootte is 8MB"
};
 */

// Our app
class FileUpload extends Component {
  constructor(props) {
    super(props);

    console.log('propsprops', props)

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [{
          source: "index.html",
          options: {
            type: "local"
          }
        }]

    };
  }

/*
  componentDidMount() {
    this.pond.addEventListener('FilePond:addfile', function(e) {
        if (sortableInstance) {
          $("ul.filepond--list").sortable('refresh');
        } else {
          sortableInstance = true;
          $("ul.filepond--list").sortable();
        }

      //  validator.element($('input[name=validateImages]'))
    });
  }
*/
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {

    //

    return (
      <span>
        {/* Pass FilePond properties as attributes */}
        <Field name="image">
          {(fieldProps) => {
          //  console.log('fieldProps.input.value', fieldProps.input.value)
          const imageValue = fieldProps.input.value && fieldProps.input.value.url ? fieldProps.input.value.url : false;
          console.log('imageValue', fieldProps.input);

          console.log('imageValue', imageValue);

          const defaultImage = imageValue ? [{
                source: imageValue,
                options: {
                  type: "local",
                  metadata: {
                    poster: imageValue,
                  }
                },

          }] :  undefined;

          console.log('defaultImage', defaultImage)
          console.log('this.state.files', this.state.files)

          return <FilePond
            ref={ref => (this.pond = ref)}
            files={defaultImage}
            filesss={this.state.files}
            allowMultiple={false}
            maxFiles={1}
            name='image'
            maxTotalFileSize="10MB"
            //server={this.props.imageApiUrl}
            oninit={() => this.handleInit()}
            server={{
              process: {
                url: this.props.imageApiUrl,
                onload: (response) => { // Once response is received, pushed new value to Final Form value variable, and populate through the onChange handler.
                  console.log('response', response)

                  const file = JSON.parse(response);
                  //fieldProps.input.value = JSON.parse(response);
                  fieldProps.input.onChange( JSON.parse(response) );
                  return JSON.parse(response).url;
                },
                onerror: (response) => { // If error transpires, add error to value with error message.
                  //fieldProps.input.value = '';
                  fieldProps.input.onChange('');
                  return false;
                }
              }
            }}
            onupdatefiles={fileItems => {
              //fieldProps.input.onChange('test:image');
              console.log('fileItems', fileItems);

              if (fileItems[0]) {
                console.log('fileItems[0].file', fileItems[0].file);

              //  this.setState({
                //  files: [fileItems[0].file]
                  //files: [fileItems.map(fileItem => fileItem.file)]
              //  });
              }

            }}
          />
          }}
        </Field>
      </span>
    );
  }
}


export default FileUpload;
