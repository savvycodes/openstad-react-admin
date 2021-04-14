import React from 'react';
import { Filter, NumberInput, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput } from 'react-admin';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FileUpload from '../form-fields/FileUpload.jsx';
import {CustomList as List} from '../components/CustomList';

export const ProductIcon = ListAltIcon;

const ProductFilters = (props) => (
  <Filter {...props}>
    {/*<TextInput label="Search" source="q" alwaysOn />*/}
    <TextInput label="Id" source="id" defaultValue="" />
  </Filter>
);

export const ProductList = (props) => (
    <List {...props} filters={<ProductFilters />}  title="Producten" sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="regular_price" />
            <EditButton basePath="/product" />
        </Datagrid>
    </List>
);

const ProductTitle = ({ record }) => {
    return <span>Product {record ? `"${record.name}"` : ''}</span>;
};

export const ProductEdit = (props) => (
    <Edit title={<ProductTitle />} {...props}>
        <SimpleForm>
        <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
          <TextInput source="sku" />
          <TextInput source="name" />
          <TextInput multiline source="description" />
          <NumberInput source="regular_price" />
        </SimpleForm>
    </Edit>
);

export const ProductCreate = (props) => {
  return <Create title="Product toevoegen" {...props}>
        <SimpleForm>
            <FileUpload resourceProps={props} imageApiUrl={props.options.imageApiUrl} />
            <TextInput source="sku" />
            <TextInput source="name" />
            <TextInput multiline source="description" />
            <NumberInput source="regular_price" />
        </SimpleForm>
    </Create>
};
