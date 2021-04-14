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
import ListAltIcon from '@material-ui/icons/ListAlt';
import {CustomList as List} from '../components/CustomList/index.jsx';

export const TagIcon = ListAltIcon;

const TagFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

const TagPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const TagList = (props) => (
    <List {...props} filters={<TagFilters />} title="Tags" pagination={<TagPagination />} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/tag" />
        </Datagrid>
    </List>
);

const TagTitle = ({ record }) => {
    return <span>Tag {record ? `"${record.name}"` : ''}</span>;
};

export const TagEdit = (props) => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm>
          <TextInput source="name" label="Tag name" variant="outlined" />
        </SimpleForm>
    </Edit>
);

export const TagCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

  return <Create title="Tag toevoegen" {...props} onSuccess={() => {
      notify('ra.notification.created', 'info', {smart_count: 1});
      redirect('/tag');
      refresh()
  }}>
        <SimpleForm>
            <TextInput source="name" label="Tag name" variant="outlined" />
        </SimpleForm>
    </Create>
};
