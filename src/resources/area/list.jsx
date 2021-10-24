import {Datagrid, Filter, TextInput, EditButton, TextField, TopToolbar} from 'react-admin';
import React, {Fragment} from 'react';
import {CreateButton} from 'ra-ui-materialui';
import {CustomList as List} from '../../components/CustomList/index.jsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export const ListActions = props => {
  const {className, basePath} = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath}/>
    </TopToolbar>
  );
};

const AreaFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue=""/>
    <TextInput label="Name" source="name" defaultValue=""/>
  </Filter>
);

export const AreaList = (props) => (
  <Fragment>
    <Card>
      <CardContent>
        <b>Let op: </b>
        Polygonen die je uit deze lijst verwijdert, verdwijnen ook van andere sites. Verwijder enkel polygonen die nergens anders gebruikt (gaan) worden.
        </CardContent>
    </Card>
    <List {...props} filters={<AreaFilters/>} actions={<ListActions/>} sort={{field: 'id', order: 'DESC'}}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="name"/>
        <EditButton basePath="/area"/>
      </Datagrid>
    </List>
  </Fragment>
);
