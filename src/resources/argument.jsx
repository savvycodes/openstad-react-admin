// in posts.js
import React from 'react';
import { List, Filter, NumberInput, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, ImageInput, ImageField, FunctionField } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const ArgumentIcon = ListAltIcon;

const ArgumentFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
    <TextInput label="Description" source="description" defaultValue="" />
  </Filter>
);

export const ArgumentList = (props) => (
    <List {...props} filters={<ArgumentFilters />} title="Argumenten">
        <Datagrid>
            <TextField source="id" />
            <TextField source="description" />
            <FunctionField label="Author" render={record => `${record.user.firstName} ${record.user.lastName}`} />
            <DateField source="createdAt" />
            <EditButton basePath="/Argument" />
        </Datagrid>
    </List>
);

const ArgumentTitle = ({ record }) => {
    return <span>Argument {record ? `"${record.name}"` : ''}</span>;
};

export const ArgumentEdit = (props) => (
    <Edit title={<ArgumentTitle />} {...props}>
        <SimpleForm>
          <TextInput source="sku" />
          <TextInput source="name" />
          <TextInput multiline source="description" />
          <NumberInput source="regular_price" />
        </SimpleForm>
    </Edit>
);

export const ArgumentCreate = (props) => {
  return <Create title="Argument toevoegen" {...props}>
        <SimpleForm>
            <TextInput source="sku" />
            <TextInput source="name" />
            <TextInput multiline source="description" />
            <NumberInput source="regular_price" />
        </SimpleForm>
    </Create>
};
