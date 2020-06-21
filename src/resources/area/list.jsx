import { Datagrid, DateField, downloadCSV, EditButton, ImageField, List, TextField, TopToolbar } from 'react-admin';
import React from 'react';
import { CreateButton, ExportButton } from 'ra-ui-materialui';

export const ListActions = props => {
  const { className, basePath} = props;

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
      <ImageField source="extraData.images[0]" label="Image"/>
      <TextField source="title"/>
      <TextField source="summary"/>
      <TextField source="description"/>
      <DateField source="createdAt"/>
      <EditButton basePath="/area"/>
    </Datagrid>
  </List>
);
