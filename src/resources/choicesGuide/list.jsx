import { Datagrid, Filter, TextInput, EditButton, TextField, TopToolbar } from 'react-admin';
import React from 'react';
import { CreateButton } from 'ra-ui-materialui';
import {CustomList as List} from '../../components/CustomList';

export const ListActions = props => {
  const { className, basePath } = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath}  />
    </TopToolbar>
  );
};

const ChoicesGuideFilters = (props) => (
  <Filter {...props}>
    <TextInput label="Id" source="id" defaultValue="" />
    <TextInput label="Title" source="title" defaultValue="" />
  </Filter>
);

export const ChoicesGuideList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <EditButton basePath="/choicesGuide" />
    </Datagrid>
  </List>
);
