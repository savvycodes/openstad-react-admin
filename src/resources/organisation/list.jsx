import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  SelectField,
  EditButton,
  ShowButton,
} from "react-admin";

export function OrganisationList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <DateField source="createdAt" />
        <TextField source="status"/>
        <EditButton basePath="/organisation" />
        <ShowButton basePath="/organisation" />
      </Datagrid>
    </List>
  );
}
