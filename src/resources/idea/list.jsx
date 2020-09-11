
import { Datagrid, Filter, DateField, EditButton, ImageField, TextInput, List, TextField, TopToolbar, downloadCSV } from 'react-admin';
import { ImportButton } from '../../components/ImportButton/index.jsx';
import React from 'react';
import {cloneElement} from 'react';

import { CreateButton, ExportButton } from 'ra-ui-materialui';
// in PostList.js
import jsonExport from 'jsonexport/dist';

const exporter = posts => {
    const postsForExport = posts.map(post => {
        const { backlinks, author, ...postForExport } = post; // omit backlinks and author
        if (postForExport.can) {
          delete postForExport.can;
        }

        if (postForExport.user) {
          delete postForExport.user;
        }


        postForExport.location = postForExport.location ? JSON.stringify(postForExport.location) : ''; // add a field
        return postForExport;
    });

    jsonExport(postsForExport, { headers: ['id', 'title', 'description']  }, (err, csv) => {
        downloadCSV(csv, 'ideas'); // download as 'posts.csv` file
    });
};


export const ListActions = props => {
  const {
    className,
    filters,
    permanentFilter,
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = props;

  return (
    <TopToolbar className={className}>
    {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
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


const IdeaFilters = (props) => (
  <Filter {...props}>
    <TextInput label="Id" source="id"  defaultValue="" />
    <TextInput label="Status" source="status"  defaultValue="" />
  </Filter>
);

export const IdeaList = (props) => (

  <List {...props} filters={<IdeaFilters/>} actions={<ListActions/>} exporter={exporter}>
    <Datagrid>
      <TextField source="id"/>
      <ImageField source="extraData.images[0]" label="Image"/>
      <TextField source="title"/>
      <TextField source="status"/>
      <TextField source="yes" sortable={false} />
      <TextField source="no" sortable={false} />
      <DateField source="createdAt"/>
      <EditButton basePath="/idea"/>
    </Datagrid>
  </List>
);
