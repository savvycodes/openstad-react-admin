// in Ideas.js
import React from 'react';
import { List, Datagrid, Edit, Create, ReferenceInput, SelectInput,SimpleForm, ImageField, DateField, TextField, EditButton, TextInput, DateInput, ArrayField } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const IdeaIcon = BookIcon;

export const IdeaList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <ArrayField source="extraData.images" label="Image">
              <Datagrid>
                <ImageField source="url"  label="" sort="false" />
              </Datagrid>
            </ArrayField>
            <TextField source="title" />
            <TextField source="summary" />
            <DateField source="createdAt" />
            <EditButton basePath="/idea" />
        </Datagrid>
    </List>
);

const IdeaTitle = ({ record }) => {
    return <span>Idea {record ? `"${record.title}"` : ''}</span>;
};

export const IdeaEdit = (props) => (
    <Edit title={<IdeaTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput label="User" source="userId" reference="user">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput source="summary" options={{ multiLine: true }} />
            <TextInput multiline source="description" />
        </SimpleForm>
    </Edit>
);

export const IdeaCreate = (props) => (
    <Create title="Create a Idea" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
