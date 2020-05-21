// in Users.js
import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import PersonIcon from '@material-ui/icons/Person';
//import EditableDatagrid from './react-data-grid/index.jsx';

export const UserIcon = PersonIcon;

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="role" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="createdAt" />
            <EditButton basePath="/user" />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.firstName} ${record.lastName} "` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserTitle />}  {...props}>
        <SimpleForm redirect="edit" >
            <TextInput disabled source="id" variant="outlined" fullWidth />
            <TextInput disabled source="role" variant="outlined" fullWidth  />
            <TextInput source="firstName" variant="outlined" fullWidth  />
            <TextInput source="lastName" variant="outlined" fullWidth  />
            <TextInput source="email" variant="outlined" fullWidth  />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput source="title" variant="outlined" fullWidth  />
            <TextInput source="teaser" options={{ multiLine: true }}  variant="outlined" fullWidth />
            <TextInput source="teaser" options={{ multiLine: true }}  variant="outlined" fullWidth />

        </SimpleForm>
    </Create>
);
