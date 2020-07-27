// in Articles.js
import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, Filter } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const ArticleIcon = BookIcon;

const ArticleFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

export const ArticleList = (props) => (
    <List {...props} filters={<ArticleFilters />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton basePath="/article" />
        </Datagrid>
    </List>
);

const ArticleTitle = ({ record }) => {
    return <span>Article {record ? `"${record.title}"` : ''}</span>;
};

export const ArticleEdit = (props) => (
    <Edit title={<ArticleTitle />} {...props}>
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

export const ArticleCreate = (props) => (
    <Create title="Create a Article" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
