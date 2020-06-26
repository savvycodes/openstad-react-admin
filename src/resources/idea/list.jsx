import { Datagrid, DateField, EditButton, ImageField, List, TextField, TopToolbar } from 'react-admin';
import { ImportButton } from '../../components/ImportButton'
import React from 'react';
import { CreateButton, ExportButton } from 'ra-ui-materialui';

export const ListActions = props => {
  const { className, basePath, total, currentSort, filterValues, permanentFilter, resource } = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath}  />
      <ExportButton
         disabled={total === 0}
         resource={resource}
         sort={currentSort}
         filter={{ ...filterValues, ...permanentFilter }}
       />
      <ImportButton {...props} />
    </TopToolbar>
  );
};

export const IdeaList = (props) => (
  <List {...props} actions={<ListActions/>} >
    <Datagrid>
      <TextField source="id"/>
      <ImageField source="extraData.images[0]" label="Image"/>
      <TextField source="title"/>
      <TextField source="status"/>
      <TextField source="yes"/>
      <TextField source="no"/>
      <DateField source="createdAt"/>
      <EditButton basePath="/idea"/>
    </Datagrid>
  </List>
);
