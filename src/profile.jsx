import React from 'react';
import { ImageInput, ImageField, List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import { FormGroup } from '@material-ui/core';



const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.title}"` : ''}</span>;
};

const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
          <FormGroup>
            <TextInput disabled source="id" />
            <TextInput label="Naam van account" source="name" />
            <TextInput multiline label="Beschrijving van account" source="description" />

            <ImageInput source="images" label="Related pictures" accept="image/*">
              <ImageField source="src" title="title" />
            </ImageInput>
            
          </FormGroup>
          <FormGroup>

          </FormGroup>
            <TextInput multiline label="Beschrijving van account" source="description" />

            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);



export const SettingsForm = UserEdit;
