import { Datagrid, DateField, downloadCSV, EditButton, ImageField, List, TextField, TopToolbar } from 'react-admin';
import { ImportButton } from '../../components/ImportButton'
import React from 'react';
import { CreateButton, ExportButton } from 'ra-ui-materialui';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';

const exporter = ideas => {
  if (ideas.length > 0) {
    const [firstRow] = ideas;

    const csv = convertToCSV({
      data: ideas,
      fields: Object.keys(firstRow),
    });

    downloadCSV(csv, 'ideas'); // download as 'ideas.csv` file
  }
};

export const ListActions = props => {
  const { className, basePath, total, currentSort, filterValues, permanentFilter, maxResults } = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath}  />
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
  <List {...props} actions={<ListActions/>} exporter={exporter}>
    <Datagrid>
      <TextField source="id"/>
      <ImageField source="extraData.images[0]" label="Image"/>
      <TextField source="title"/>
      <TextField source="summary"/>
      <TextField source="description"/>
      <DateField source="createdAt"/>
      <EditButton basePath="/idea"/>
    </Datagrid>
  </List>
);
