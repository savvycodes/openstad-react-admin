import React from 'react';

import {
    Filter,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    TextField,
    EditButton,
    TextInput,
    Pagination, useNotify, useRefresh, useRedirect
} from 'react-admin';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import {CustomList as List} from '../components/CustomList/index.jsx';

export const GrantIcon = MonetizationOn;

const GrantFilters = (props) => (
  <Filter {...props}>
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

const GrantPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const GrantList = (props) => (
    <List {...props} filters={<GrantFilters />} title="Grants" pagination={<GrantPagination />} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/grant" />
        </Datagrid>
    </List>
);

const GrantTitle = ({ record }) => {
    return <span>Subsidie {record ? `"${record.name}"` : ''}</span>;
};

export const GrantEdit = (props) => (
    <Edit mutationMode="pessimistic" title={<GrantTitle />} {...props}>
        <SimpleForm>
          <TextInput source="name" label="Grant name" variant="outlined" />
          <TextInput source="url" label="URL" variant="outlined" type="url" />
        </SimpleForm>
    </Edit>
);

export const GrantCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

  return <Create title="Subsidie toevoegen" {...props} onSuccess={() => {
      notify('ra.notification.created', 'info', {smart_count: 1});
      redirect('/grant');
      refresh()
  }}>
        <SimpleForm>
            <TextInput source="name" label="Grant name" variant="outlined" />
            <TextInput source="url" label="URL" variant="outlined" type="url" />
        </SimpleForm>
    </Create>
};
