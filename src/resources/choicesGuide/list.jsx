import React from 'react';
import { Datagrid, Filter, TextInput, EditButton, TextField, TopToolbar, useListContext } from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Inbox from '@material-ui/icons/Inbox';
import Typography from '@material-ui/core/Typography';
import { CreateButton } from 'ra-ui-materialui';
import {CustomList as List} from '../../components/CustomList.jsx';
import ImportButton from './import.jsx';

const useStyles = makeStyles(
    theme => ({
        message: {
            textAlign: 'center',
            opacity: theme.palette.type === 'light' ? 0.5 : 0.8,
            margin: '0 1em',
            color:
                theme.palette.type === 'light'
                    ? 'inherit'
                    : theme.palette.text.primary,
        },
        icon: {
            width: '9em',
            height: '9em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    }),
    {name: 'RaEmpty'}
);

const Empty = (props) => {

  const {basePath, resource} = useListContext();
  const classes = useStyles(props);

  return (
    <div>
      <Box textAlign="center" m={1}>
        <div className={classes.message}>
          <Inbox className={classes.icon}/>

          <Typography variant="h4" paragraph>
            No choices guides yet
          </Typography>
          <Typography variant="body1">
            Create one or import from a file
          </Typography>
        </div>
        <div className={classes.toolbar}>
          <CreateButton basePath={basePath}/>
          <ImportButton {...props}/>
        </div>
      </Box>
    </div>
  );
};

export const ListActions = props => {
  const { className, basePath, total, resource, currentSort, filterValues, permanentFilter } = props;
  
  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath}  />
      <ImportButton {...props}/>
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
  <List {...props} actions={<ListActions/>} empty={<Empty/>}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <EditButton basePath="/choicesGuide" />
    </Datagrid>
  </List>
);
