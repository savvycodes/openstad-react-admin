import React from "react";
import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

export function EditOrganisation(props) {
    function removeNullValues(data) {
        const values = { ...data }
        Object.keys(values).map(key => {
            if (values[key] === null) {
                delete values[key]
            }
        })
        return values
    }

  return (
    <Edit mutationMode="pessimistic" {...props} transform={removeNullValues}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="street" />
        <TextInput source="zip" />
        {/* @todo: districts should be configurable via site config? */}
        <SelectInput source="district" choices={[
            { id: 1, name: 'Centrum'},
            { id: 2, name: 'Nieuw-West'},
            { id: 3, name: 'Noord'},
            { id: 4, name: 'Oost'},
            { id: 5, name: 'West'},
            { id: 6, name: 'Zuid'},
            { id: 7, name: 'Zuidoost'},
        ]} optionValue="name" />
        <TextInput source="phone" />
        <TextInput disabled source="email" />
        <TextInput source="website" />
        <TextInput source="facebook" />
        <TextInput source="instagram" />
        <SelectInput source="status" choices={[
            { id: 'PENDING', name: 'pending'},
            { id: 'VERIFIED', name: 'verified'},
            { id: 'DENIED', name: 'denied'},
        ]} />
        <TextInput source="createdAt" />
        <TextInput source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
}
