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
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {CustomList as List} from '../components/CustomList/index.jsx';

export const TargetAudienceIcon = PeopleAltIcon;

const TargetAudienceFilters = (props) => (
  <Filter {...props}>
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

const TargetAudiencePagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const TargetAudienceList = (props) => (
    <List {...props} filters={<TargetAudienceFilters />} title="Target audiences" pagination={<TargetAudiencePagination />} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/target-audience" />
        </Datagrid>
    </List>
);

const TargetAudienceTitle = ({ record }) => {
    return <span>Tag {record ? `"${record.name}"` : ''}</span>;
};

export const TargetAudienceEdit = (props) => (
    <Edit mutationMode="pessimistic" title={<TargetAudienceTitle />} {...props}>
        <SimpleForm>
          <TextInput source="name" label="Target audience name" variant="outlined" />
        </SimpleForm>
    </Edit>
);

export const TargetAudienceCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

  return <Create title="Tag toevoegen" {...props} onSuccess={() => {
      notify('ra.notification.created', 'info', {smart_count: 1});
      redirect('/target-audience');
      refresh()
  }}>
        <SimpleForm>
            <TextInput source="name" label="Target audience name" variant="outlined" />
        </SimpleForm>
    </Create>
};
