// in Users.js
import React from 'react';
import { Datagrid, DateField, TextField } from 'react-admin';
import {CustomList as List} from '../components/CustomList';
import PersonIcon from '@material-ui/icons/Person';
//import EditableDatagrid from './react-data-grid/index.jsx';

export const NewsletterSignupIcon = PersonIcon;

export const NewsletterSignupList = (props) => (
    <List {...props} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
