// in Ideas.js
import React from 'react';
import { List, Datagrid, Edit, Create, ReferenceInput, SelectInput,SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const IdeaIcon = BookIcon;

export const IdeaList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
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
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
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
