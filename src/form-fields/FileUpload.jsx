/**
 * Proof of concept working with image server and filepond, needs to be cleaned up
 */

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

// Our app
class FileUpload extends Component {
  constructor(props) {
    super(props);

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

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {

    return (
      <span>
        {/* Pass FilePond properties as attributes */}
        <Field name="image">
          {(fieldProps) => {
          //  console.log('fieldProps.input.value', fieldProps.input.value)
          const imageValue = fieldProps.input.value && fieldProps.input.value.url ? fieldProps.input.value.url : false;
          const defaultImage = imageValue ? [{
                source: imageValue,
                options: {
                  type: "local",
                  metadata: {
                    poster: imageValue,
                  }
                },

          }] :  undefined;

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
