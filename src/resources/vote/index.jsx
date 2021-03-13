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
  TextInput, Pagination,
} from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ApproveField from '../../components/ApproveField/index.jsx';
import { useDataProvider } from 'react-admin';
import { useDispatch } from 'react-redux';
import { CRUD_UPDATE_SUCCESS, FETCH_END, UPDATE } from 'react-admin';

export const VoteIcon = ListAltIcon;

const VotePagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;


export const VoteList = (props) => {
  const dataProvider = useDataProvider();
  const dispatch = useDispatch();
  const resource = 'vote';

  const handleCheckBoxChange = async (e) => {
    const payload = await dataProvider.toggle('vote', { value: e.target.value });

    dispatch({
      type: CRUD_UPDATE_SUCCESS,
      payload,
      meta: {
        resource,
        notification: {
          body: 'Vote updated!',
          level: 'info'
        },
        fetchResponse: UPDATE,
        fetchStatus: FETCH_END
      }
    });
  };

  return (
    <List {...props} title="Vote" pagination={<VotePagination />}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="opinion"/>
        <TextField source="zipCode" title="Postcode"/>
        <TextField source="ip"/>
        <DateField source="createdAt"/>
        <ApproveField label="Approved" source="checked" handleCheckBoxChange={handleCheckBoxChange}/>
      </Datagrid>
    </List>
  );
};

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
