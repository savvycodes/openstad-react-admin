import React from 'react';
import {
    useRecordContext,
    BooleanField,
    Datagrid,
    Filter,
    Edit,
    Create,
    SimpleForm,
    DateTimeInput,
    BooleanInput,
    SelectInput,
    TextField,
    EditButton,
    TextInput,
    DateInput,
    ReferenceInput
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import {CustomList as List} from '../components/CustomList/index.jsx';
import { useFormState } from 'react-final-form';

export const ActionIcon = BookIcon;

const ActionFilters = (props) => (
    <Filter {...props}>
        {/*<TextInput label="Search" source="q" alwaysOn />*/}
        <TextInput label="Id" source="id" defaultValue="" />
    </Filter>
);

export const ActionList = (props) => (
    <List {...props} filters={<ActionFilters />} sort={{field: 'id', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="type" />
            <TextField source="status" />
            <BooleanField source="finished" />

            <EditButton basePath="/action" />
        </Datagrid>
    </List>
);

const ActionTitle = ({ record }) => {
    return <span>Action {record ? `"${record.name}"` : ''}</span>;
};



const FormFields = (props) => {
    const { values } = useFormState();


    return (
        <>
            <TextInput source="name" />

            <br />

            <SelectInput source="type" choices={[
                { id: 'once', name: 'Once' },
                { id: 'continuously', name: 'Continuously' },
                ]}
            />

            {values.type === 'once' && <DateTimeInput label="Run update at" source="runDate" />}

            <br />

            <SelectInput source="action" choices={[
                { id: 'updateModel', name: 'Update Resource' },
                { id: 'mail', name: 'Email' },
            ]}
            />

            <br />

             <SelectInput
                source="conditions.model"
                label="Resource to select"
                choices={[
                    { id: 'Site', name: 'Site  (update active site)' },
                    //     { id: 'Idea', name: 'Idea' },
                    //    { id: 'Article', name: 'Article' },
                ]}
            />

            {values.action === 'mail' && <MailActionFields />}

            {values.action === 'updateModel' && <UpdateModelActionFields />}

            <BooleanInput source="finished" />
        </>
    )
}

/**
 *
 *
 Settings:
     keyToUpdate,
     newValue
 * @returns {JSX.Element}
 * @constructor
 */
const UpdateModelActionFields = () => {
    return (
        <div>
            Set: <SelectInput label="Key" source="settings.keyToUpdate" choices={[
                { id: 'config.ideas.canAddNewIdeas', name: 'Can add new ideas' },
                { id: 'config.votes.isViewable', name: 'Voting count publicly available' },
                { id: 'config.votes.isActive', name: 'Voting is open' },
                { id: 'mail', name: 'Email' },
            ]}
            />
            to:  <TextInput label="Value" source="settings.valueToUpdate" />
        </div>
    )
}

/***
 *
 *                     usePredefinedTemplate,
 templateString,
 templateName,
 data,
 subject,
 fromAddress,
 conditions,
 recipients
 * @returns {JSX.Element}
 * @constructor
 */
const MailActionFields = () => {

    return (
        <>
            <TextInput source="settings.templateString" label="Email Template" multiline variant="outlined" fullWidth/>

        </>
    )
}

export const ActionEdit = (props) => (
    <Edit mutationMode="pessimistic" title={<ActionTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <FormFields {...props} />
        </SimpleForm>
    </Edit>
);

export const ActionCreate = (props) => (
    <Create title="Create an action" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <FormFields />

        </SimpleForm>
    </Create>
);


