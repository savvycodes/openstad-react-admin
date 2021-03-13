import {
    Create,
    Edit,
    SimpleForm,
    TextInput,
    TopToolbar,
    minLength,
    maxLength,
    required, useNotify, useRefresh, useRedirect
} from 'react-admin';
import React from 'react';
import BackButton from '../../components/BackButton/index.jsx';
import JsonInput from '../../form-fields/JsonInput.jsx';

const AreaTitle = ({record}) => {
    return <span>Area {record ? `"${record.title}"` : ''}</span>;
};

export const CreateEditActions = props => {
    const {className} = props;

    return (
        <TopToolbar className={className}>
            <BackButton/>
        </TopToolbar>
    );
};

const Form = (props) => (
    <SimpleForm {...props}>
        <TextInput disabled source="id"/>
        <TextInput source="name"/>
        {/*<TextInput label="Publication date" source="published_at"/>*/}
        {/*<TextInput source="average_note"/>*/}

        <h3> Polygons </h3>
        <p>
            Creating a polygon here can be used to overlay an area of your maps.
        </p>
        <p>
            This field expect a list of coordinates that make a closing polygons in geoJSON data format,
            an error will be thrown if the polygon is incorrect, for instance if it doesn't fully close.
            Most cities offer this data available for free. For instance the Amsterdam
            has many options at the <a href="https://maps.amsterdam.nl/open_geodata/?LANG=nl" target="_blank">Amsterdam
            map site.</a>
            It's also possible to visually create our own polygon in the right format here: <a
            href="https://geojson.io/" target="_blank"> geojson.io</a>
        </p>
        <p>
            You can copy paste the created geoJSON into here. See example at the bottom of the page.
            Be aware, currently only one polygon is supported, in geoJSON you can add more then one polygon.
            In that case an attempt is made to find the first polygon in the geoJSON data.
            Currently properties and any other field then geometry and it's coordinates are ignored.
        </p>
        <JsonInput multiline source="geoJSON" variant="outlined" fullWidth validate={[required()]}/>

        <h4> Example: </h4>
        <textarea disabled style={{width: '100%', minHeight: '400px'}}>
    {`{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4.864196777343749,
              52.42084796422748
            ],
            [
              4.822998046875,
              52.38901106223458
            ],
            [
              4.833984374999999,
              52.363860434566206
            ],
            [
              4.85870361328125,
              52.3336607715546
            ],
            [
              4.9493408203125,
              52.3336607715546
            ],
            [
              4.9822998046875,
              52.37224556866933
            ],
            [
              4.94659423828125,
              52.40577019043
            ],
            [
              4.864196777343749,
              52.42084796422748
            ]
          ]
        ]
      }
    }
  ]
}`}
    </textarea>

    </SimpleForm>
);

export const AreaEdit = (props) => (
    <Edit title={<AreaTitle/>} {...props} actions={<CreateEditActions/>} redirect="/area">
        <Form {...props}/>
    </Edit>
);


export const AreaCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    return <Create title="Create a Area" {...props} actions={<CreateEditActions/>} onSuccess={() => {
        notify('ra.notification.created', 'info', {smart_count: 1});
        redirect('/area');
        refresh()
    }}>
        <Form {...props}/>
    </Create>
};
