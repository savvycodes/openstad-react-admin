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
  BooleanField,
  TextField,
  EditButton,
  TextInput,
} from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ApproveField from '../../components/ApproveField';

export const VoteIcon = ListAltIcon;

export const VoteList = (props) => (
  <List {...props} title="Vote">
    <Datagrid>
      {console.log('props')}
      {console.log(props)}
      <TextField source="id"/>
      <ReferenceField label="User ID" source="userId" reference="user">
        <TextField source="userId"/>
      </ReferenceField>
      <ReferenceField label="Opinion" source="opinion" reference="opinion">
        <BooleanField source="opinion"/>
      </ReferenceField>
      <ReferenceField label="Zip Code" source="zipCode" reference="zipCode">
        <TextField source="zipCode"/>
      </ReferenceField>
      <ReferenceField label="IP" source="ip" reference="ip">
        <TextField source="ip"/>
      </ReferenceField>
      <DateField source="createdAt"/>
      <ApproveField label="OK" source="confirmed"/>
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
