import React from 'react';
import { ReferenceInput, SelectInput, NumberInput, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, ImageInput, ImageField, FunctionField, TopToolbar, CreateButton, ExportButton } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {CustomList as List} from '../components/CustomList/index.jsx';
import { ExportButtons as EportExtendedButtons } from './export-ideas-with-arguments.jsx'
import { exporter, ExportButtons } from '../utils/export.jsx';

export const ArgumentIcon = ListAltIcon;

const EditTopToolbar = function({ basePath, total, data, resource }) {
  return (
  <TopToolbar>
    <ExportButtons total={total} data={data} filename='tags'/>
    <EportExtendedButtons data={data}/>
  </TopToolbar>);
}

export const ArgumentList = (props) => (
    <List {...props}  title="Argumenten" sort={{field: 'id', order: 'DESC'}} actions={<EditTopToolbar/>}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="description" />
            <FunctionField label="Author" render={record => `${record.user.firstName} ${record.user.lastName}`} />
            <DateField source="createdAt" />
            <EditButton basePath="/Argument" />
        </Datagrid>
    </List>
);

const ArgumentTitle = ({ record }) => {
    return <span>Argument {record ? `"${record.name}"` : ''}</span>;
};

export const ArgumentEdit = (props) => (
    <Edit mutationMode="pessimistic"  title={<ArgumentTitle />} {...props}>
        <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput multiline source="description" />
          <ReferenceInput label="User" source="userId" reference="user" variant="outlined">
            <SelectInput optionText="email"/>
          </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const ArgumentCreate = (props) => {
  return <Create title="Argument toevoegen" {...props}>
        <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput multiline source="description" />

        </SimpleForm>
    </Create>
};
