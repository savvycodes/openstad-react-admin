import {
  Datagrid,
  Filter,
  TextInput,
  EditButton,
  TextField,
  TopToolbar,
} from "react-admin";
import React from "react";
import { CreateButton } from "ra-ui-materialui";
import { CustomList as List } from "../../components/CustomList";

export const ListActions = (props) => {
  const { className, basePath } = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath} />
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
  <List
    {...props}
    filters={<AreaFilters />}
    actions={<ListActions />}
    sort={{ field: "id", order: "DESC" }}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton basePath="/area" />
    </Datagrid>
  </List>
);
