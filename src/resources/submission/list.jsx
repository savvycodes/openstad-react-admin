import React, {cloneElement, Fragment} from 'react';
import {BulkDeleteButton, Datagrid, DateField, downloadCSV, Filter, Pagination, ShowButton, TextField, TextInput, TopToolbar, useListContext} from 'react-admin';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Inbox from '@material-ui/icons/Inbox';
import {ExportButton} from 'ra-ui-materialui';
import jsonExport from 'jsonexport/dist';
import {CustomList as List} from '../../components/CustomList/index.jsx';

const SubmissionPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const useStyles = makeStyles(
    theme => ({
        message: {
            textAlign: 'center',
            opacity:   theme.palette.type === 'light' ? 0.5 : 0.8,
            margin:    '0 1em',
            color:
                       theme.palette.type === 'light'
                           ? 'inherit'
                           : theme.palette.text.primary,
        },
        icon:    {
            width:  '9em',
            height: '9em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    }),
    {name: 'RaEmpty'}
);

const exporter = posts => {
    
    let headerKeys = ['id', 'formId', 'status', 'createdAt'];
    
    const postsForExport = posts.map(post => {
        const {backlinks, author, ...postForExport} = post; // omit backlinks and author
        if (postForExport.can) {
            delete postForExport.can;
        }
        
        postForExport.location = postForExport.location ? JSON.stringify(postForExport.location) : ''; // add a field
        
        const submittedData = postForExport.submittedData;
        
        if (submittedData) {
            // Set every key in the submittedData as its' own column in the CSV data
            Object.keys(submittedData).forEach(key => {
                if (!headerKeys.includes(key)) {
                    headerKeys.push(key);
                }
                
                postForExport[key] = submittedData[key];
            })
        }
        
        delete postForExport.submittedData;
        
        return postForExport;
    });
    
    jsonExport(postsForExport, {headers: headerKeys, rowDelimiter: ';'}, (err, csv) => {
        downloadCSV(csv, 'submissions');
    });
};

const Empty = (props) => {
    const {basePath, resource} = useListContext();
    const classes              = useStyles(props);
    
    return (
        <div>
            <Box textAlign="center" m={1}>
                <div className={classes.message}>
                    <Inbox className={classes.icon}/>
                    
                    <Typography variant="h4" paragraph>
                        No submissions yet
                    </Typography>
                </div>
            </Box>
        </div>
    );
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
              basePath,
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
            <ExportButton
                exporter={exporter}
                disabled={total === 0}
                maxResults={100000}
                resource={resource}
                sort={currentSort}
                filter={{...filterValues, ...permanentFilter}}
            />
        </TopToolbar>
    );
};

const ListBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton undoable={false} {...props} />
    </Fragment>
);

const SubmissionFilters = (props) => (
    <Filter {...props}>
        <TextInput label="Id" source="id" defaultValue=""/>
        <TextInput label="Status" source="status" defaultValue=""/>
        <TextInput label="Form" source="formId" defaultValue=""/>
    </Filter>
);

export const SubmissionList = (props) => {
    return (
        <Fragment>
            <List {...props}
                  sort={{field: 'id', order: 'DESC'}}
                  filters={<SubmissionFilters/>}
                  actions={<ListActions/>}
                  bulkActionButtons={<ListBulkActionButtons/>}
                  exporter={exporter}
                  empty={<Empty/>}
                  pagination={<SubmissionPagination/>}
            >
                <Datagrid>
                    <TextField source="id"/>
                    <TextField source="formId"/>
                    <TextField source="status"/>
                    <DateField source="createdAt"/>
                    <ShowButton basePath="/submission"/>
                </Datagrid>
            </List>
        </Fragment>
    )
};
