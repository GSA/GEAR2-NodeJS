import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , SimpleForm, TextInput, LongTextInput
  , CardActions, CreateButton, RefreshButton, Filter
  , ReferenceInput, SelectInput, ReferenceField
  , required, regex, choices } from 'react-admin';

import { timeValues } from './valuelists';

  const ListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, push }) => (
      <CardActions>
          {filters && React.cloneElement(filters, {
              resource,
              showFilter,
              displayedFilters,
              filterValues,
              context: 'button',
          }) }
          <CreateButton basePath={basePath} />
          <RefreshButton />
      </CardActions>
  );

  const KeynameFilter = props => (
      <Filter {...props}>
        <ReferenceInput source="objApplicationId" label="Application Name"
          reference="applications"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
      </Filter>
  );

  export const ApplicationRationalizationList = (props) => (
      <List {...props} actions={<ListActions />} title="Application Rationalization" filters={<KeynameFilter />} >
        <Datagrid>
		{/*             <ReferenceField label="Application Name" source="objApplicationId" reference="applications">
                <TextField source="keyname" />
		</ReferenceField> */}
            <TextField source="keyname" label= "Application Name" />
            <TextField source="fy" label= "FY" />
            <TextField source="timeVal"label="TIME Value"  />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationRationalizationTitle = ({ record }) => {
    return <span>Application Rationalization </span>;
};

export const ApplicationRationalizationEdit = (props) => (
    <Edit undoable={false} keyname={<ApplicationRationalizationTitle />} {...props}>
        <SimpleForm>
		{ /*   <ReferenceInput source="objApplicationId" validate={required()}
        label="Application Name"
        reference="applications"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
        allowEmpty>
        <SelectInput optionText="keyname" />
      </ReferenceInput>
 */}
      <TextField source="keyname" label="Application Name"  />
      <TextInput source="fy" label="FY"  validate={[required(), regex(/FY+?[0-9]{2}$/, 'Must be alphanumeric, e.g. FY18')]} />
      <TextInput source="timeVal" label="TIME Value" validate={[required(), choices(timeValues, "Must input a valid TIME value")]} />
      <LongTextInput source="comment" label="TIME Notes"  />

        </SimpleForm>
    </Edit>
);

export const ApplicationRationalizationCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm>
      <ReferenceInput source="objApplicationId" validate={required()}
        label="Application Name"
        reference="applications"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
        allowEmpty>
        <SelectInput optionText="keyname" />
      </ReferenceInput>

      <TextInput source="fy" label="FY"  validate={[required(), regex(/FY+?[0-9]{2}$/, 'Must be alphanumeric, e.g. FY18')]} />
      <TextInput source="timeVal" label="TIME Val" validate={[required(), choices(timeValues, "Must input a valid TIME value")]} />
      <LongTextInput source="comment" label="TIME Notes"  />

        </SimpleForm>
    </Create>
);
