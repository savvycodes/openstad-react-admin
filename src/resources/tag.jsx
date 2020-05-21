// in posts.js
import React from 'react';
import { List, NumberField, NumberInput, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, ImageInput, ImageField } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FileUpload from '../form-fields/FileUpload.jsx';

export const TagIcon = ListAltIcon;

export const TagList = (props) => (
    <List {...props} title="Tags">
        <Datagrid>
            <TextField source="name" />
            <EditButton basePath="/tag" />
        </Datagrid>
    </List>
);

const TagTitle = ({ record }) => {
    return <span>Tag {record ? `"${record.name}"` : ''}</span>;
};

export const TagEdit = (props) => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm>
          <TextInput source="name" label="Tag name" variant="outlined" />
        </SimpleForm>
    </Edit>
);

export const TagCreate = (props) => {

  return <Create title="Tag toevoegen" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Tag name" variant="outlined" />
        </SimpleForm>
    </Create>
};
