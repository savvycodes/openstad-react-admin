import React from 'react';
import { Filter, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import {CustomList as List} from '../components/CustomList.jsx';
import LocalMallIcon from '@material-ui/icons/LocalMall';
export const OrderIcon = LocalMallIcon;

const OrderFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

export const OrderList = (props) => (
    <List filters={<OrderFilters />} {...props} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton basePath="/order" />
        </Datagrid>
    </List>
);

const OrderTitle = ({ record }) => {
    return <span>Order {record ? `"${record.title}"` : ''}</span>;
};

export const OrderEdit = (props) => (
    <Edit title={<OrderTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);

export const OrderCreate = (props) => (
    <Create title="Create a Order" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
