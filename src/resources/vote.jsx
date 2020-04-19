// in posts.js
import React from 'react';
import { List, NumberField, NumberInput, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, ImageInput, ImageField } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FileUpload from '../fileUpload.jsx';

export const VoteIcon = ListAltIcon;

export const VoteList = (props) => (
    <List {...props}  title="Voteen">
        <Datagrid>
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="regular_price" />
            <EditButton basePath="/Vote" />
        </Datagrid>
    </List>
);

const VoteTitle = ({ record }) => {
    return <span>Vote {record ? `"${record.name}"` : ''}</span>;
};

export const VoteEdit = (props) => (
    <Edit title={<VoteTitle />} {...props}>
        <SimpleForm>
        <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
          <TextInput source="sku" />
          <TextInput source="name" />
          <TextInput multiline source="description" />
          <NumberInput source="regular_price" />
        </SimpleForm>
    </Edit>
);

export const VoteCreate = (props) => {
  console.log('props.options.imageApiUrl', props.options.imageApiUrl);


  return <Create title="Vote toevoegen" {...props}>
        <SimpleForm>
            <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
            <TextInput source="sku" />
            <TextInput source="name" />
            <TextInput multiline source="description" />
            <NumberInput source="regular_price" />
        </SimpleForm>
    </Create>
};
