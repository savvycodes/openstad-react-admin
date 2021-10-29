// in Users.js
import React from 'react';
import { Datagrid, DateField, downloadCSV, TextField, TopToolbar} from 'react-admin';
import {CustomList as List} from '../components/CustomList/index.jsx';
import PersonIcon from '@material-ui/icons/Person';
//import EditableDatagrid from './react-data-grid/index.jsx';
import jsonExport from 'jsonexport/dist';
import {ExportButton} from 'ra-ui-materialui';


export const NewsletterSignupIcon = PersonIcon;

const EditTopToolbar = function({ basePath, data, resource }) {
  return (
    <TopToolbar>
      <ExportButton exporter={exporter} basePath={basePath} record={data} maxResults={100000} />
    </TopToolbar>);
}

const exporter = posts => {

  let headerKeys = ['id', 'email', 'firstName', 'lastName', 'createdAt'];

  const postsForExport = posts.map(post => {
    const formattedData = {};

    headerKeys.forEach((headerKey) => {
      formattedData[headerKey] = post[headerKey] ? post[headerKey] : '';
    });

    return formattedData;
  });

  jsonExport(postsForExport, {headers: headerKeys, rowDelimiter: ';'}, (err, csv) => {
    downloadCSV(csv, 'submissions');
  });
};
export const NewsletterSignupList = (props) => (
    <List {...props} sort={{field: 'id', order: 'DESC'}} actions={<EditTopToolbar />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
