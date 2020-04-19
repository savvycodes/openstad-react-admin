// in posts.js
import React from 'react';
import { List, NumberField, NumberInput, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, ImageInput, ImageField } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FileUpload from '../fileUpload.jsx';

export const ArgumentIcon = ListAltIcon;

export const ArgumentList = (props) => (
    <List {...props}  title="Argumenten">
        <Datagrid>
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="regular_price" />
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
        <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
          <TextInput source="sku" />
          <TextInput source="name" />
          <TextInput multiline source="description" />
          <NumberInput source="regular_price" />
        </SimpleForm>
    </Edit>
);

export const ArgumentCreate = (props) => {
  console.log('props.options.imageApiUrl', props.options.imageApiUrl);


  return <Create title="Argument toevoegen" {...props}>
        <SimpleForm>
            <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
            <TextInput source="sku" />
            <TextInput source="name" />
            <TextInput multiline source="description" />
            <NumberInput source="regular_price" />
        </SimpleForm>
    </Create>
};
