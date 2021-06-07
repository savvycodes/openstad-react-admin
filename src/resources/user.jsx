// in Users.js
import React from 'react';
import {
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    TextInput,
    Filter,
    useNotify, useRefresh, useRedirect, CheckboxGroupInput, BooleanInput, BooleanField
} from 'react-admin';
import PersonIcon from '@material-ui/icons/Person';
import {CustomList as List} from '../components/CustomList/index.jsx';

export const UserIcon = PersonIcon;
const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const UserList = (props) => (
    <List {...props} filters={<UserFilter />} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="role" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="createdAt" />
            <BooleanField source="isEventProvider" />
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
            <IsEventProvider />
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
            <TextInput disabled source="role" variant="outlined" fullWidth />
            <TextInput source="firstName" variant="outlined" fullWidth/>
            <TextInput source="lastName" variant="outlined" fullWidth/>
            <TextInput source="email" variant="outlined" fullWidth/>
            <TextInput source="zipCode" variant="outlined" fullWidth/>
            <IsEventProvider />
        </SimpleForm>
    </Create>
};

/**
 * This fields adds an array of permissions to the local site user. This is done to allow
 * providers to sign up and manage there own events.
 * @returns 
 */
function IsEventProvider() {
    return <BooleanInput label="Is event provider (aanbieder)" source="isEventProvider" />
}