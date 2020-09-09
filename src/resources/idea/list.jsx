import { Datagrid, DateField, EditButton, ImageField, List, TextField, TopToolbar, downloadCSV } from 'react-admin';
import { ImportButton } from '../../components/ImportButton/index.jsx';
import React from 'react';
import { CreateButton, ExportButton } from 'ra-ui-materialui';
// in PostList.js
import jsonExport from 'jsonexport/dist';

const exporter = posts => {
    const postsForExport = posts.map(post => {
        const { backlinks, author, ...postForExport } = post; // omit backlinks and author
        if (postForExport.can) {
          delete postForExport.can;
        }
        postForExport.location = postForExport.location ? JSON.stringify(postForExport.location) : ''; // add a field
        return postForExport;
    });

    jsonExport(postsForExport, { headers: ['id', 'title', 'description']  }, (err, csv) => {
        downloadCSV(csv, 'ideas'); // download as 'posts.csv` file
    });
};

export const ListActions = props => {
  const { className, basePath, total, currentSort, filterValues, permanentFilter, resource } = props;

  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath}  />
      <ExportButton
         exporter={exporter}
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
  <List {...props} actions={<ListActions/>} exporter={exporter}>
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
