import { Datagrid, EditButton, List, TextField, TopToolbar } from 'react-admin';
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

export const AreaList = (props) => (
  <List {...props} actions={<ListActions/>}>
    <Datagrid>
      <TextField source="id"/>
      <TextField source="name"/>
      <EditButton basePath="/area"/>
    </Datagrid>
  </List>
);
