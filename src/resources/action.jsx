import React from 'react';
import {
    useRecordContext,
    BooleanField,
    Datagrid,
    Filter,
    Edit,
    Create,
    SimpleForm,
    BooleanInput,
    SelectInput,
    TextField,
    EditButton,
    TextInput,
    DateTimeInput
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import {CustomList as List} from '../components/CustomList/index.jsx';
import { useFormState } from 'react-final-form';

export const ActionIcon = BookIcon;

/**
 * Convert date to dutch timezone.
 * Need to find a more global solution for this
 */
const dateFormatter = v => {
    // v is a `Date` object
    if (!(v instanceof Date) || isNaN(v)) return;
    const pad = '00';
    const yy = v.getFullYear().toString();
    const mm = (v.getMonth() + 1).toString();
    const dd = v.getDate().toString();
    return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateParser = v => {
    // v is a string of "YYYY-MM-DD" format
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
    if (match === null) return;
    const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
    if (isNaN(d)) return;
    return d;
};

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
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes(); // + ":" + today.getSeconds();

    return (
        <>
            <TextInput source="name" />

            <br />

            <SelectInput source="type" choices={[
                { id: 'once', name: 'Once' },
           //     { id: 'continuously', name: 'Continuously' },
                ]}
            />

            {values.type === 'once' &&
                <div>
                    <DateTimeInput label="Run action at" source="runDate" />
                    <br />
                    <em> Timezone is taken from your browser settings. (Time according to your browser: {time}.) </em>
                </div>
            }

            <br />

            <SelectInput source="action" choices={[
                { id: 'updateModel', name: 'Update Resource' },
           //     { id: 'mail', name: 'Email' },
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

            {values.type === 'once' && <div>
                <BooleanInput source="finished"  />
                <em>If finished is true, the action has run, turn it back off to run again.</em>
            </div>
            }


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
    const { values } = useFormState();

    const booleanKeys = ['config.ideas.canAddNewIdeas','config.votes.isViewable', 'config.votes.isActive'];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            verticalAlign: 'middle'
        }}>
            <div style={{
                padding: '20px 20px 20px 0'
            }}> Set:</div>

            <SelectInput label="Key" source="settings.keyToUpdate" choices={[
                { id: 'config.ideas.canAddNewIdeas', name: 'Can add new ideas' },
                { id: 'config.votes.isViewable', name: 'Voting count publicly available' },
                { id: 'config.votes.isActive', name: 'Voting is open' },
            ]}
            />
            <div style={{
                padding: '20px'
            }}> to:</div>
            {values.settings && values.settings.keyToUpdate && booleanKeys.includes(values.settings.keyToUpdate) ?
                <BooleanInput label="On" source="settings.newValue" style={{marginTop: '14px'}} defaultValue={true}/>
                :
                <TextInput label="Value" source="settings.newValue"/>
            }
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


