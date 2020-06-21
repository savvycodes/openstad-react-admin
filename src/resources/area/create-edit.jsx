import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  TopToolbar,
} from 'react-admin';
import React from 'react';
import BackButton from '../../components/BackButton';

const AreaTitle = ({ record }) => {
  return <span>Area {record ? `"${record.title}"` : ''}</span>;
};

export const CreateEditActions = props => {
  const { className } = props;

  return (
    <TopToolbar className={className}>
      <BackButton />
    </TopToolbar>
  );
};

const Form = (props) => (
  <SimpleForm {...props}>
    <TextInput source="name"/>
    {/*<TextInput label="Publication date" source="published_at"/>*/}
    {/*<TextInput source="average_note"/>*/}
  </SimpleForm>
);

export const AreaEdit = (props) => (
  <Edit title={<AreaTitle/>} {...props} actions={<CreateEditActions/>}>
    <Form {...props}/>
  </Edit>
);

export const AreaCreate = (props) => (
  <Create title="Create a Area" {...props} actions={<CreateEditActions/>}>
    <Form {...props}/>
  </Create>
);
