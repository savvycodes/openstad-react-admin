import React from 'react';
import { Edit, Create, SimpleForm, TextField, EditButton, TextInput, TopToolbar, required } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { ExportButton } from './export.jsx'
import { ResultButton } from './results.jsx'
import {CustomList as List} from '../../components/CustomList/index.jsx';

export const ChoicesGuideIcon = ListAltIcon;

const EditTopToolbar = function({ basePath, data, resource }) {
  return (
  <TopToolbar>
    <ExportButton
      data={data}
      maxResults={100000}
    />
    <ResultButton
      data={data}
    />
  </TopToolbar>);
}

const ChoicesGuideTitle = ({ record }) => {
  return <span>ChoicesGuide {record ? `"${record.title}"` : ''}</span>;
};

export const ChoicesGuideEdit = (props) => (
  <Edit mutationMode="pessimistic" title={<ChoicesGuideTitle />}  actions={<EditTopToolbar/>} {...props}>
    <SimpleForm>
      <TextInput source="title" label="Titel" validate={[required()]} variant="outlined" fullWidth/>
      <TextInput source="description" label="Beschrijving" multiline variant="outlined" fullWidth/>
    </SimpleForm>
  </Edit>
);

export const ChoicesGuideCreate = (props) => {
  return (
    <Create title="ChoicesGuide toevoegen" {...props}>
      <SimpleForm>
        <TextInput source="title" label="ChoicesGuide name" variant="outlined" />
        <TextInput source="description" label="Beschrijving" multiline variant="outlined" fullWidth/>
      </SimpleForm>
    </Create>);
};
