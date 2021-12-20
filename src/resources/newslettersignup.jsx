// in Users.js
import React from 'react';
import { Datagrid, DateField, downloadCSV, TextField, TopToolbar} from 'react-admin';
import {CustomList as List} from '../components/CustomList/index.jsx';
import PersonIcon from '@material-ui/icons/Person';
//import EditableDatagrid from './react-data-grid/index.jsx';
import jsonExport from 'jsonexport/dist';
import { exporter, ExportButtons } from '../utils/export-buttons.jsx';

import XLSX from 'xlsx';

export const NewsletterSignupIcon = PersonIcon;

const ListTopToolbar = props => {
  const { data, basePath, resource, total } = props;
  return (
    <TopToolbar>
      <ExportButtons total={total} data={data} filename='newsletersignups' fields={['id', 'email', 'firstName', 'lastName', 'extraData', 'createdAt']}/>
    </TopToolbar>);
}

export const NewsletterSignupList = (props) => (
    <List {...props} sort={{field: 'id', order: 'DESC'}} actions={<ListTopToolbar />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
