// in Ideas.js
import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  Pagination,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  ImageField,
  DateField,
  TextField,
  EditButton,
  TextInput,
  TopToolbar,
  ArrayField,
  TabbedForm,
  FunctionField,
  FormTab,
  ReferenceManyField,
  ReferenceArrayInput,
  SelectArrayInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import JsonInput from '../form-fields/JsonInput.jsx';
import FileUpload from '../form-fields/FileUpload.jsx';
import { ImportButton } from "react-admin-import-csv";
import { CreateButton, ExportButton } from "ra-ui-materialui";
import { downloadCSV } from 'react-admin';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';


export const IdeaIcon = BookIcon;

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
}));

const exporter = ideas => {
  // const ideasForExport = ideas.map(idea => {
  //   // add a field from an embedded resource
  //   idea.author_name = idea.author.name;
  //   return ideaForExport;
  // });
  console.log(ideas);
  const csv = convertToCSV({
    data: {},
    // select and order fields in the export
    fields: ['id', 'title', 'author_name', 'body']
  });
  downloadCSV(csv, 'ideas'); // download as 'ideas.csv` file
};

export const ListActions = props => {
  const { className, basePath, total, currentSort, filterValues, permanentFilter, maxResults } = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={'idea'}
        sort={currentSort}
        filter={{ ...filterValues, ...permanentFilter }}
        exporter={exporter}
        maxResults={maxResults}
      />
      <ImportButton {...props} />
    </TopToolbar>
  );
};

export const IdeaList = (props) => (
    <List {...props} actions={<ListActions />} exporter={exporter}>
        <Datagrid>
            <TextField source="id" />
            <ImageField source="extraData.images[0]" label="Image" />
            <TextField source="title" />
            <TextField source="summary" />
            <DateField source="createdAt" />
            <EditButton basePath="/idea" />
        </Datagrid>
    </List>
);

const IdeaTitle = ({ record }) => {
    return <span>Idea {record ? `"${record.title}"` : ''}</span>;
};

export const IdeaEdit = (props) => (
    <Edit title={<IdeaTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Info">
              <TextInput disabled source="id" />
              <ReferenceInput label="User" source="userId" reference="user" variant="outlined">
                <SelectInput optionText="email" />
              </ReferenceInput>
              <TextInput source="title"  variant="outlined" fullWidth />
              <TextInput source="summary" options={{ multiLine: true }}  variant="outlined" fullWidth />
              <TextInput multiline source="description"  variant="outlined" fullWidth />
              <ReferenceArrayInput label="tags" source="tags" reference="tag" variant="outlined">
                <SelectArrayInput optionText="name" />
              </ReferenceArrayInput>

              <h3>Image (TODO)</h3>
              <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
            </FormTab>
            <FormTab label="Extradata">
              <TextInput disabled source="id" />
              <JsonInput source="extraData" />
            </FormTab>
            <FormTab label="Comments">
              <ReferenceManyField
                 reference="argument"
                 target="ideaId"
                 addLabel={false}
                 pagination={<Pagination />}
                 fullWidth
                >
                  <Datagrid>
                     <TextField source="id" />
                     <TextField source="description" />
                     <FunctionField label="Author" render={record => `${record.user.firstName} ${record.user.lastName}`} />
                     <DateField source="createdAt" />
                     <EditButton basePath="/Argument" />
                  </Datagrid>
               </ReferenceManyField>
            </FormTab>
            <FormTab label="Votes">
              <ReferenceManyField
                 reference="vote"
                 target="ideaId"
                 addLabel={false}
                 pagination={<Pagination />}
                 fullWidth
              >
                 <Datagrid>
                   <TextField source="id" />
                   <TextField source="userId" />
                   <DateField source="createdAt" />
                   <EditButton basePath="/Vote" />
                 </Datagrid>
               </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const IdeaCreate = (props) => (
    <Create title="Create a Idea" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
