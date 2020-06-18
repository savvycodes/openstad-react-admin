import {
  Create,
  Datagrid, DateField,
  Edit, EditButton,
  FormTab, FunctionField, Pagination,
  ReferenceArrayInput,
  ReferenceInput, ReferenceManyField,
  SelectArrayInput,
  SelectInput, SimpleForm,
  TabbedForm, TextField,
  TextInput,
} from 'react-admin';
import FileUpload from '../../form-fields/FileUpload';
import JsonInput from '../../form-fields/JsonInput';
import React from 'react';

const IdeaTitle = ({ record }) => {
  return <span>Idea {record ? `"${record.title}"` : ''}</span>;
};

const Form = (props) => (
  <TabbedForm {...props}>
    <FormTab label="Info">
      <TextInput disabled source="id"/>
      <ReferenceInput label="User" source="userId" reference="user" variant="outlined">
        <SelectInput optionText="email"/>
      </ReferenceInput>
      <TextInput source="title" variant="outlined" fullWidth/>
      <TextInput source="summary" options={{ multiLine: true }} variant="outlined" fullWidth/>
      <TextInput multiline source="description" variant="outlined" fullWidth/>
      <ReferenceArrayInput label="tags" source="tags" reference="tag" variant="outlined">
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>

      <h3>Image (TODO)</h3>
      <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl}/>
    </FormTab>
    <FormTab label=" Extradata">
      <TextInput disabled source="id"/>
      <JsonInput source="extraData"/>
    </FormTab>
    <FormTab label="Comments">
      <ReferenceManyField
        reference="argument"
        target="ideaId"
        addLabel={false}
        pagination={<Pagination/>}
        fullWidth
      >
        <Datagrid>
          <TextField source="id"/>
          <TextField source="description"/>
          <FunctionField label="Author" render={record => `${record.user.firstName} ${record.user.lastName}`}/>
          <DateField source="createdAt"/>
          <EditButton basePath="/Argument"/>
        </Datagrid>
      </ReferenceManyField>
    </FormTab>
    {/*<FormTab label="Votes">*/}
    {/*  <ReferenceManyField*/}
    {/*    reference="vote"*/}
    {/*    target="ideaId"*/}
    {/*    addLabel={false}*/}
    {/*    pagination={<Pagination/>}*/}
    {/*    fullWidth*/}
    {/*  >*/}
    {/*    <Datagrid>*/}
    {/*      <TextField source="id"/>*/}
    {/*      <TextField source="userId"/>*/}
    {/*      <DateField source="createdAt"/>*/}
    {/*      <EditButton basePath="/Vote"/>*/}
    {/*    </Datagrid>*/}
    {/*  </ReferenceManyField>*/}
    {/*</FormTab>*/}
  </TabbedForm>
);

export const IdeaEdit = (props) => (
  <Edit title={<IdeaTitle/>} {...props}>
    <Form {...props}/>
  </Edit>
);

export const IdeaCreate = (props) => (
  <Create title="Create a Idea" {...props}>
    <Form {...props}/>
  </Create>
);
