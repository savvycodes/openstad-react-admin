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
  DateInput,
  ArrayField,
  TabbedForm,
  FunctionField,
  FormTab,
  ReferenceManyField,
  BooleanInput,
  NumberInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import JsonInput from '../form-fields/JsonInput.jsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

//              <JsonInput source="config" />

/*
<ExpansionPanel>
  <ExpansionPanelSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Typography className={classes.heading}>Expansion Panel 1</Typography>
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
      sit amet blandit leo lobortis eget.
    </Typography>
  </ExpansionPanelDetails>
</ExpansionPanel>
 */

export default function SimpleExpansionPanel() {
}


export const SiteEdit = (props) => {
  const classes = useStyles();


    return (<Edit title="Edit site" {...props}>
        <TabbedForm>
            <FormTab label="Info">
              <TextInput disabled source="id" fullWidth />
              <TextInput source="title" fullWidth />
              <TextInput source="domain" fullWidth />
            </FormTab>
            <FormTab label="Ideas">
              <BooleanInput source="config.idea.canAddNewIdeas" label="Possible to send in ideas?" fullWidth initialValue={true}  />
              <NumberInput source="config.idea.minimumYesVotes" label="Minimum votes needed for idea?" fullWidth initialValue="100" />
              <NumberInput source="config.idea.titleMinLength" label="Minimum length of title" fullWidth initialValue="10" />
              <NumberInput source="config.idea.titleMaxLength" label="Maximum length of title" fullWidth initialValue="55" />
              <NumberInput source="config.idea.summaryMinLength" label="Minimum length of summary" fullWidth initialValue="20" />
              <NumberInput source="config.idea.summaryMaxLength" label="Maximum length of summary" fullWidth initialValue="140" />
              <NumberInput source="config.idea.descriptionMinLength" label="Minimum length of description" fullWidth initialValue="140" />
              <NumberInput source="config.idea.descriptionMaxLength" label="Maximum length of description" fullWidth initialValue="5000" />
            </FormTab>
            <FormTab label="Voting">
              <BooleanInput source="config.vote.isViewable" label="Is the vote count publicly available?" fullWidth />
              <BooleanInput source="config.vote.isActive" label="Is voting active?" fullWidth  />
              <SelectInput
                source="config.vote.withExisting"
                label="Should voting again replace previous vote? Or give an error?"
                fullWidth
                choices={[
                   { id: 'error', name: 'Error' },
                   { id: 'replace', name: 'Replace the vote' },
                ]}
              />
              <SelectInput
                source="config.vote.voteType"
                label="What type of voting is available?"
                fullWidth
                choices={[
                  {
                    id: 'likes',
                    name: 'Likes'
                  },
                  {
                    id: 'count',
                    name: 'Count'
                  },
                  {
                    id: 'budgeting',
                    name: 'Budgeting'
                  }
                ]}
              />
              <NumberInput source="config.vote.maxIdeas" label='What is max amount of ideas users can vote for?' fullWidth />
              <NumberInput source="config.vote.minIdeas" label='What is min amount of ideas users can vote for?' fullWidth />
              <NumberInput source="config.vote.minBudget" label='What is min budget users can vote for?' fullWidth />
              <NumberInput source="config.vote.maxBudget" label='What is max budget users can vote for?' fullWidth />
            </FormTab>
            <FormTab label="Password Protection">
              <h4>Where to send adminstrator notifications?</h4>
              <TextInput label="Email To" source="notifications.to" type="email" />
              <TextInput label="Email Address" source="notifications.from" type="email" />
            </FormTab>
            <FormTab label="Notifications">
              <h4>Where to send adminstrator notifications?</h4>
              <TextInput label="Email To" source="email" type="email" />
              <TextInput label="Email Address" source="email" type="email" />
            </FormTab>
            <FormTab label="Advanced">
              <TextInput disabled source="id" />
              <JsonInput source="config" />
            </FormTab>
        </TabbedForm>
    </Edit>
  )
};
