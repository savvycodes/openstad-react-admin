// in Users.js
import React from 'react';
import {
    Datagrid,
    Edit,
    Create,
    CreateButton,
    TopToolbar,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    TextInput,
    Filter,
    useNotify, useRefresh, useRedirect
} from 'react-admin';
import PersonIcon from '@material-ui/icons/Person';
import {CustomList as List} from '../components/CustomList/index.jsx';
import { exporter, ExportButtons } from '../utils/export.jsx';

const ListTopToolbar = props => {
  const { data, basePath, resource, total } = props;
  return (
    <TopToolbar>
      <CreateButton basePath={basePath}/>
      <ExportButtons total={total} data={data} filename='users'/>
    </TopToolbar>);
}

export const UserIcon = PersonIcon;
const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const UserList = (props) => (
  <List {...props} filters={<UserFilter />} sort={{field: 'id', order: 'DESC'}} actions={<ListTopToolbar/>}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="role" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="createdAt" />
            <EditButton basePath="/user" />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.firstName} ${record.lastName} "` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit mutationMode="pessimistic" title={<UserTitle />}  {...props}>
        <SimpleForm redirect="edit" >
            <TextInput disabled source="id" variant="outlined" fullWidth />
            <TextInput disabled source="role" variant="outlined" fullWidth  />
            <TextInput source="firstName" variant="outlined" fullWidth  />
            <TextInput source="lastName" variant="outlined" fullWidth  />
            <TextInput source="email" variant="outlined" fullWidth  />
            <TextInput source="zipCode" variant="outlined" fullWidth  />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    return <Create title="Create a User" {...props} onSuccess={() => {
        notify('ra.notification.created', 'info', {smart_count: 1});
        redirect('/user');
        refresh()
    }}>
        <SimpleForm>
            <TextInput disabled source="id" variant="outlined" fullWidth/>
            <TextInput disabled source="role" variant="outlined" fullWidth/>
            <TextInput source="firstName" variant="outlined" fullWidth/>
            <TextInput source="lastName" variant="outlined" fullWidth/>
            <TextInput source="email" variant="outlined" fullWidth/>
            <TextInput source="zipCode" variant="outlined" fullWidth/>
        </SimpleForm>
    </Create>
};
