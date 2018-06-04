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
          <BooleanInput source="cloudIndicator" label="Cloud" />
          <BooleanInput source="mobileAppIndicator" label="Mobile" />
          <BooleanInput source="desktopIndicator" label="Desktop" />
          <SelectInput source="regionalClassification" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              { id: 1, name: 'Regional' },
              { id: 2, name: 'National' },
            ]}
          />
          <SelectInput source="applicationOrWebsite" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              { id: 1, name: 'Application' },
              { id: 2, name: 'Website' }
            ]}
          />
          <SelectInput source="numberOfUsers" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: 'TBD'},
              {id: 2, name: '0-9'},
              {id: 3, name: '10-49'},
              {id: 4, name: '50-99'},
              {id: 5, name: '100-499'},
              {id: 6, name: '500-999'},
              {id: 7, name: '1000-5000'},
              {id: 8, name: '5000+'},
            ]}
          />
          <BooleanInput source="generateRevenueIndicator" />
          <LongTextInput source="applicationNotes" />
          <SelectInput source="tier" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: '1A'},
              {id: 2, name: '1B'},
              {id: 3, name: '2'},
          ]}/>
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
          <TextInput source="applicationAlias" label="Alias" />
          <BooleanInput source="cloudIndicator" label="Cloud" />
          <BooleanInput source="mobileAppIndicator" label="Mobile" />
          <BooleanInput source="desktopIndicator" label="Desktop" />
          <SelectInput source="regionalClassification" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              { id: 1, name: 'Regional' },
              { id: 2, name: 'National' },
            ]}
          />
          <SelectInput source="applicationOrWebsite" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              { id: 1, name: 'Application' },
              { id: 2, name: 'Website' }
            ]}
          />
          <SelectInput source="numberOfUsers" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: 'TBD'},
              {id: 2, name: '0-9'},
              {id: 3, name: '10-49'},
              {id: 4, name: '50-99'},
              {id: 5, name: '100-499'},
              {id: 6, name: '500-999'},
              {id: 7, name: '1000-5000'},
              {id: 8, name: '5000+'},
            ]}
          />
          <BooleanInput source="generateRevenueIndicator" label="Generates Revenue" />
          <LongTextInput source="applicationNotes" />
          <SelectInput source="tier" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: '1A'},
              {id: 2, name: '1B'},
              {id: 3, name: '2'},
          ]}/>
          <NumberInput source="productionYear" />
          <NumberInput source="retiredYear" />
          <TextInput source="url" />
          <LongTextInput source="timeNotes" />
          <BooleanInput source="cuiIndicator"  label="CUI" />
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
