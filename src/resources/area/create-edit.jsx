import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin';
import React from 'react';

const AreaTitle = ({ record }) => {
  return <span>Area {record ? `"${record.title}"` : ''}</span>;
};

const Form = (props) => (
  <SimpleForm>
    <TextInput source="title"/>
    <TextInput source="teaser" options={{ multiLine: true }}/>
    <TextInput multiline source="description"/>
    {/*<TextInput label="Publication date" source="published_at"/>*/}
    {/*<TextInput source="average_note"/>*/}
  </SimpleForm>
);

export const AreaEdit = (props) => (
  <Edit title={<AreaTitle/>} {...props}>
    <Form {...props}/>
  </Edit>
);

export const AreaCreate = (props) => (
  <Create title="Create a Area" {...props}>
    <Form {...props}/>
  </Create>
);
