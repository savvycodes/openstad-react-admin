import React, {Fragment, cloneElement, useState, useEffect} from 'react';
import {
    Datagrid, Filter, DateField, EditButton, ImageField, TextInput, TextField, TopToolbar,
    downloadCSV, useListContext, BulkDeleteButton, SimpleForm, SaveButton
} from 'react-admin';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {ImportButton} from '../../components/ImportButton/index.jsx';
import Inbox from '@material-ui/icons/Inbox';
import {Button} from 'react-admin';
import ContentCreate from '@material-ui/icons/Create';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
    SelectInput,
    useUpdateMany,
    useRefresh,
    useNotify,
    useUnselectAll,
    useMutation,
} from 'react-admin';
import {CreateButton, ExportButton} from 'ra-ui-materialui';
import jsonExport from 'jsonexport/dist';
import {CustomList as List} from '../../components/CustomList';

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

const exporter = posts => {
    const postsForExport = posts.map(post => {
        const {backlinks, author, ...postForExport} = post; // omit backlinks and author
        if (postForExport.can) {
            delete postForExport.can;
        }

        if (postForExport.user) {
            //  delete postForExport.user;
        }


        postForExport.location = postForExport.location ? JSON.stringify(postForExport.location) : ''; // add a field
        return postForExport;
    });

    jsonExport(postsForExport, {headers: ['id', 'title', 'description']}, (err, csv) => {
        downloadCSV(csv, 'ideas'); // download as 'posts.csv` file
    });
};

const Empty = (props) => {
    const {basePath, resource} = useListContext();
    const classes = useStyles(props);

    return (
        <div>
            <Box textAlign="center" m={1}>
                <div className={classes.message}>
                    <Inbox className={classes.icon}/>

                    <Typography variant="h4" paragraph>
                        No ideas yet
                    </Typography>
                    <Typography variant="body1">
                        Create one or import from a file
                    </Typography>
                </div>
                <div className={classes.toolbar}>
                    <CreateButton basePath={basePath}/>
                    <ImportButton resource={resource}/>
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
            <CreateButton basePath={basePath}/>
            <ExportButton
                exporter={exporter}
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={{...filterValues, ...permanentFilter}}
            />
            <ImportButton resource={resource}/>
        </TopToolbar>
    );
};

const BulkEditButton = ({selectedIds}) => {
    const [open, setOpen] = useState(false);
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const [mutate, {loading, data, error}] = useMutation();
    const confirm = data => mutate({
        type: 'updateMany',
        resource: 'idea',
        payload: {ids: selectedIds, data},
        options: {
            onSuccess: () => {
                refresh();
                notify('Ideas updated');
                unselectAll('idea');
            },
            onFailure: error => notify('Error: ideas not updated', 'warning'),
        }
    });

    if(data){
        refresh();
        notify('Ideas updated');
        unselectAll('idea');
    }

    if(error){
        notify('Error: ideas not updated', 'warning')
    }

    return (
        <Fragment>
            <Button label="Bulk edit" onClick={handleClick}><ContentCreate/></Button>
            <Dialog onClose={handleDialogClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Bulk edit</DialogTitle>
                <SimpleForm save={confirm}>
                    <SelectInput source="status" choices={[
                        {id: 'CLOSED', name: 'Closed'},
                        {id: 'OPEN', name: 'Open'},
                        {id: 'ACCEPTED', name: 'Accepted'},
                        {id: 'DENIED', name: 'Denied'},
                        {id: 'BUSY', name: 'Busy'},
                        {id: 'DONE', name: 'Done'},
                    ]}/>
                </SimpleForm>
            </Dialog>
        </Fragment>
    );
}

const ListBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton undoable={false} {...props} />
        <BulkEditButton {...props} />
    </Fragment>
);

const IdeaFilters = (props) => (
    <Filter {...props}>
        <TextInput label="Id" source="id" defaultValue=""/>
        <TextInput label="Status" source="status" defaultValue=""/>
    </Filter>
);

export const IdeaList = (props) => {
    return (
        <Fragment>
            <List {...props} filters={<IdeaFilters/>} actions={<ListActions/>}
                  bulkActionButtons={<ListBulkActionButtons/>}
                  exporter={exporter} empty={<Empty/>}>
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
        </Fragment>
    )
};
