import React from 'react';
import { Datagrid, Filter, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import {CustomList as List} from '../components/CustomList/index.jsx';

export const ActionIcon = BookIcon;

const ActionFilters = (props) => (
    <Filter {...props}>
        {/*<TextInput label="Search" source="q" alwaysOn />*/}
        <TextInput label="Id" source="id" defaultValue="" />
    </Filter>
);

export const ActionList = (props) => (
    <List {...props} filters={<ActionFilters />} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="type" />
            <TextField source="status" />

            <EditButton basePath="/action" />
        </Datagrid>
    </List>
);

const ActionTitle = ({ record }) => {
    return <span>Action {record ? `"${record.name}"` : ''}</span>;
};

export const ActionEdit = (props) => (
    <Edit mutationMode="pessimistic" title={<ActionTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextField source="type" />
            <TextField source="finished" />
        </SimpleForm>
    </Edit>
);

export const ActionCreate = (props) => (
    <Create title="Create an action" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextField source="type" />
            <TextField source="finished" />
        </SimpleForm>
    </Create>
);


