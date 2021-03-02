import { Datagrid, Filter, TextInput, EditButton, List, TextField, TopToolbar } from 'react-admin';
import React from 'react';
import { CreateButton } from 'ra-ui-materialui';

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
  <List {...props} sort={{field: 'id', order: 'DESC'}}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <EditButton basePath="/choicesGuide" />
    </Datagrid>
  </List>
);
