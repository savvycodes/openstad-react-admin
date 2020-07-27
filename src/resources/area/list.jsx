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

const AreaFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
    <TextInput label="Name" source="name" defaultValue="" />
  </Filter>
);

export const AreaList = (props) => (
  <List {...props} filters={<AreaFilters />} actions={<ListActions/>}>
    <Datagrid>
      <TextField source="id"/>
      <TextField source="name"/>
      <EditButton basePath="/area"/>
    </Datagrid>
  </List>
);
