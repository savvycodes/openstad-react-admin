import React from 'react';
import { List, Filter, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, required } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const ChoicesGuideIcon = ListAltIcon;

const ChoicesGuideFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

export const ChoicesGuideList = (props) => (
    <List {...props} filters={<ChoicesGuideFilters />} title="ChoicesGuides">
        <Datagrid>
            <TextField source="name" />
            <EditButton basePath="/tag" />
        </Datagrid>
    </List>
);

const ChoicesGuideTitle = ({ record }) => {
    return <span>ChoicesGuide {record ? `"${record.name}"` : ''}</span>;
};

export const ChoicesGuideEdit = (props) => (
    <Edit title={<ChoicesGuideTitle />} {...props}>
        <SimpleForm>

          <TextInput source="title" label="Titel" validate={[required()]} variant="outlined" fullWidth/>
          <TextInput source="description" label="Beschrijving" multiline variant="outlined" fullWidth/>
        </SimpleForm>
    </Edit>
);

export const ChoicesGuideCreate = (props) => {

  return <Create title="ChoicesGuide toevoegen" {...props}>
        <SimpleForm>
            <TextInput source="title" label="ChoicesGuide name" variant="outlined" />
        </SimpleForm>
    </Create>
};
