import React from 'react';
import {
  List,
  NumberInput,
  ReferenceField,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
} from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const VoteIcon = ListAltIcon;

export const VoteList = (props) => (
  <List {...props} title="Vote">
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label="User ID" source="userId" reference="user">
        <TextField source="userId"/>
      </ReferenceField>
      <ReferenceField label="Idea" source="ideaId" reference="idea">
        <TextField source="title"/>
      </ReferenceField>
      <DateField source="createdAt"/>
      <EditButton basePath="/Vote"/>
    </Datagrid>
  </List>
);

const VoteTitle = ({ record }) => {
  return <span>Vote {record ? `"${record.name}"` : ''}</span>;
};

export const VoteEdit = (props) => (
  <Edit title={<VoteTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="sku"/>
      <TextInput source="name"/>
      <TextInput multiline source="description"/>
      <NumberInput source="regular_price"/>
    </SimpleForm>
  </Edit>
);

export const VoteCreate = (props) => {
  return <Create title="Vote toevoegen" {...props}>
    <SimpleForm>
      <TextInput source="sku"/>
      <TextInput source="name"/>
      <TextInput multiline source="description"/>
      <NumberInput source="regular_price"/>
    </SimpleForm>
  </Create>;
};
