import React from 'react';
import { List, Filter, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const TagIcon = ListAltIcon;

const TagFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

export const TagList = (props) => (
    <List {...props} filters={<TagFilters />} title="Tags">
        <Datagrid>
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

  return <Create title="Tag toevoegen" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Tag name" variant="outlined" />
        </SimpleForm>
    </Create>
};
