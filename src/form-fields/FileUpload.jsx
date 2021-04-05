/**
 * Proof of concept working with image server and filepond, needs to be cleaned up
 */

// in LatLongInput.js
import {Field} from 'react-final-form';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField'

// Import React FilePond
import {FilePond, registerPlugin} from "react-filepond";

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
            images: undefined
        };
    }

    handleInit(images) {
        const currentImages = images ? images.map(function (image) {

            return {
                source: {url: image},
                options: {
                    type: "local",
                    file: {
                        name: image,
                        //		 size: 3001025,
                        //	 type: 'image/png'
                    },
                    metadata: {
                        poster: image,
                    }
                },
            }
        }) : false;

        if (currentImages) {
            this.setState({
                images: currentImages
            })
        }

    }

    render() {

        return (
            <span style={{
                width: this.props.width ? this.props.width : '256px',
                display: 'block',
            }}>
        {/* Pass FilePond properties as attributes */}
                <Field name={this.props.fieldKey ? this.props.fieldKey : 'extraData.images'}>
          {(fieldProps) => {
              //  console.log('fieldProps.input.value', fieldProps.input.value)
              const updateImages = (images, newImage) => {
                  if (images) {
                      images = images
                          .filter(function (fileItem) {
                              return fileItem.serverId;
                          })
                          .map(function (fileItem) {
                              const file = fileItem.file;
                              const url = fileItem.serverId && fileItem.serverId.url ? fileItem.serverId.url : fileItem.serverId;
                              return url;
                          });

                      if (newImage) {
                          images = [newImage.url].concat(images);
                      }

                      fieldProps.input.onChange(images);
                  }
              }

              return <FilePond

                  ref={ref => (this.pond = ref)}
                  files={this.state.images}
                  onupdatefiles={fileItems => {
                      // Set currently active file objects to this.state
                      this.setState({
                          images: fileItems.map(fileItem => fileItem.file)
                      });
                  }}
                  filesss={this.state.files}
                  allowMultiple={true}
                  maxFiles={10}
                  name={'image'}
                  allowReorder={true}
                  maxTotalFileSize="10MB"
                  //server={this.props.imageApiUrl}
                  oninit={() => this.handleInit(fieldProps.input.value)}
                  server={{
                      process: {
                          url: this.props.imageApiUrl,
                          onload: (response) => {// Once response is received, pushed new value to Final Form value variable, and populate through the onChange handler.
                              const file = JSON.parse(response);
                              updateImages(this.pond.getFiles(), file);

                              //fieldProps.input.onChange( JSON.parse(response) );
                              return JSON.parse(response).url;
                          },
                          onerror: (response) => { // If error transpires, add error to value with error message.
                              //fieldProps.input.value = '';
                              fieldProps.input.onChange('');
                              return false;
                          }
                      }
                  }}
                  onremovefile={(error, file) => {
                      updateImages(this.pond.getFiles());
                  }}
                  onreorderfiles={(files, origin, target) => {
                      updateImages(this.pond.getFiles());
                  }}
                  onupdatefilesssss={fileItems => {
                      //fieldProps.input.onChange('test:image');
                      console.log('fileItems', fileItems);

                      if (fileItems) {
                          const arrayOfUrls = fileItems.map(file => {
                              console.log('file', file);
                              console.log('file.id', file.id);
                              console.log('file.origin', file.origin);
                              console.log('file.source', file.source);
                              return file.source;
                          });

                          console.log('arrayOfUrls', arrayOfUrls)

                          fieldProps.input.onChange(arrayOfUrls);

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
