import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, SimpleForm,
  DisabledInput, LongTextInput, TextInput, BooleanInput, NumberInput,
  ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator  } from 'react-admin';

export const ApplicationList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationTitle = ({ record }) => {
    return <span>Application {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationEdit = (props) => (
    <Edit keyname={<ApplicationTitle />} {...props}>
        <SimpleForm>
          <DisabledInput source="id" />
          <TextInput source="keyname" />
          <LongTextInput source="description" />
          <TextInput source="displayName" />
          <TextInput source="applicationAlias" />
          <BooleanInput source="cloudIndicator" />
          <BooleanInput source="mobileAppIndicator" />
          <BooleanInput source="desktopIndicator" />
          <SelectInput source="regionalClassification"
            choices={[
              { id: 1, name: 'Regional' },
              { id: 2, name: 'National' },
            ]}
          />
          <SelectInput source="applicationOrWebsite"
            choices={[
              { id: 1, name: 'Application' },
              { id: 2, name: 'Website' }
            ]}
          />
          <NumberInput source="numberOfUsers" />
          <BooleanInput source="generateRevenueIndicator" />
          <LongTextInput source="applicationNotes" />
          <TextInput source="tier" />
          <NumberInput source="productionYear" />
          <NumberInput source="retiredYear" />
          <TextInput source="url" />
          <LongTextInput source="timeNotes" />
          <BooleanInput source="cuiIndicator" />
          <TextInput source="uniqueIdentifierCode" defaultValue="0233-0000-0000000-xxxx" />
          <TextInput source="referenceDocument" />

          <ReferenceInput label="SSO" source="objOrgSsoId" reference="organization"
            sort={{ field: 'keyname', order: 'ASC' }}
            filter={{ Parent_Id: null }}
            allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Parent System" source="objParentSystemId"
            reference="parentSystem" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Investment" source="objInvestmentId"
            reference="investment" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Portfolio" source="objPortfolioId"
            reference="portfolio" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="FISMA System" source="objFismaId"
            reference="fisma" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="User Location" source="objAppUserlocId"
            reference="appUserLoc" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Application Status" source="objApplicationStatusId"
            reference="applicationStatus">
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ArrayInput source="capability">
            <SimpleFormIterator>
              <TextInput source="keyname" />
            </SimpleFormIterator>
          </ArrayInput>

        </SimpleForm>
    </Edit>
);

export const ApplicationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="keyname" />
          <LongTextInput source="description" />
          <TextInput source="displayName" />
          <TextInput source="applicationAlias" />
          <BooleanInput source="cloudIndicator" />
          <BooleanInput source="mobileAppIndicator" />
          <BooleanInput source="desktopIndicator" />
          <SelectInput source="regionalClassification"
            choices={[
              { id: 1, name: 'Regional' },
              { id: 2, name: 'National' },
            ]}
          />
        <SelectInput source="applicationOrWebsite"
            choices={[
              { id: 1, name: 'Application' },
              { id: 2, name: 'Website' }
            ]}
          />
          <NumberInput source="numberOfUsers" />
          <BooleanInput source="generateRevenueIndicator" />
          <LongTextInput source="applicationNotes" />
          <TextInput source="tier" />
          <NumberInput source="productionYear" />
          <NumberInput source="retiredYear" />
          <TextInput source="url" />
          <LongTextInput source="timeNotes" />
          <BooleanInput source="cuiIndicator" />
          <TextInput source="uniqueIdentifierCode" defaultValue="0233-0000-0000000-xxxx" />
          <TextInput source="referenceDocument" />

          <ReferenceInput label="SSO" source="objOrgSsoId" reference="organization"
            sort={{ field: 'keyname', order: 'ASC' }}
            filter={{ Parent_Id: null }}
            allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Parent System" source="objParentSystemId"
            reference="parentSystem" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Investment" source="objInvestmentId"
            reference="investment" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Portfolio" source="objPortfolioId"
            reference="portfolio" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="FISMA System" source="objFismaId"
            reference="fisma" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="User Location" source="objAppUserlocId"
            reference="appUserLoc" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Application Status" source="objApplicationStatusId"
            reference="applicationStatus">
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ArrayInput source="capability">
            <SimpleFormIterator>
              <TextInput source="keyname" />
            </SimpleFormIterator>
          </ArrayInput>

        </SimpleForm>
    </Create>
);
