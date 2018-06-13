import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput, NumberInput
  , ReferenceInput, SelectInput, ArrayInput, ReferenceArrayInput
  , SelectArrayInput, SimpleFormIterator
  , required, maxLength } from 'react-admin';

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
          <TextInput source="keyname" validate={[required(), maxLength(80)]} />
          <LongTextInput source="description" />
          <TextInput source="displayName" validate={[required(), maxLength(20)]} />
          <TextInput source="applicationAlias" />

          <SelectInput source="cloudIndicator" label="Cloud" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: "TBD"},
              {id: 2, name: "Yes"},
              {id: 3, name: "No"},
            ]}
          />
          <SelectInput source="mobileAppIndicator" label="Mobile" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
          <SelectInput source="desktopIndicator" label="Desktop" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
          <SelectInput source="regionalClassification" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              { id: 1, name: 'Regional' },
              { id: 2, name: 'National' },
            ]}
          />
        <SelectInput source="applicationOrWebsite"
            optionText="name" optionValue="name"
            validate={required()}
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
        <SelectInput source="generateRevenueIndicator" label="Generates Revenue" allowEmpty
          optionText="name" optionValue="name"
          choices={[
            {id: 1, name: "TBD"},
            {id: 2, name: "Yes"},
            {id: 3, name: "No"},
          ]}
        />
        <LongTextInput source="applicationNotes" />
        <ReferenceInput source="objAppPlatformId" label="Application Platform"
          reference="appPlatform"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={1000000}
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput source="objAppHostingproviderId" label="Application Hosting Provider"
          reference="appHostingProvider"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={1000000}
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
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
        <SelectInput source="cuiIndicator" label="CUI" allowEmpty
          optionText="name" optionValue="name"
          choices={[
            {id: 1, name: "TBD"},
            {id: 2, name: "Yes"},
            {id: 3, name: "No"},
          ]}
        />
          <TextInput source="uniqueIdentifierCode"
            defaultValue="0233-0000-0000000-xxxx"
            validate={[required(), maxLength(80)]}
          />
          <TextInput source="referenceDocument" />

          <ReferenceInput label="SSO" source="objOrgSsoId" reference="organization"
            sort={{ field: 'keyname', order: 'ASC' }}
            filter={{ Parent_Id: null }}
            perPage={1000000}
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
            reference="applicationStatus" validate={required()} >
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceArrayInput source="capability" label="Capabilities"
            reference="capability"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={1000000}
          >
            <SelectArrayInput optionText="keyname" />
          </ReferenceArrayInput>

          <ReferenceArrayInput source="technology" label="Technologies"
            reference="technology"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={1000000}
          >
            <SelectArrayInput optionText="keyname" />
          </ReferenceArrayInput>

          <ReferenceArrayInput source="organization" label="Users"
            reference="organization"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={1000000}
          >
            <SelectArrayInput optionText="keyname" />
          </ReferenceArrayInput>

        </SimpleForm>
    </Edit>
);

export const ApplicationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="keyname" validate={[required(), maxLength(80)]} />
          <LongTextInput source="description" />
          <TextInput source="displayName" validate={[required(), maxLength(0)]} />
          <TextInput source="applicationAlias" label="Alias" />
          <SelectInput source="cloudIndicator" label="Cloud" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: "TBD"},
              {id: 2, name: "Yes"},
              {id: 3, name: "No"},
            ]}
          />
          <SelectInput source="mobileAppIndicator" label="Mobile" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
          <SelectInput source="desktopIndicator" label="Desktop" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
          <SelectInput source="regionalClassification" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              { id: 1, name: 'Regional' },
              { id: 2, name: 'National' },
            ]}
          />
          <SelectInput source="applicationOrWebsite"
            optionText="name" optionValue="name"
            validate={required()}
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
          <SelectInput source="generateRevenueIndicator" label="Generates Revenue" allowEmpty
            optionText="name" optionValue="name"
            choices={[
              {id: 1, name: "TBD"},
              {id: 2, name: "Yes"},
              {id: 3, name: "No"},
            ]}
          />
          <LongTextInput source="applicationNotes" />
          <ReferenceInput source="objAppPlatformId" label="Application Platform"
            reference="appPlatform"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={1000000}
            allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>
          <ReferenceInput source="objAppHostingproviderId" label="Application Hosting Provider"
            reference="appHostingProvider"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={1000000}
            allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>
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

        <SelectInput source="cuiIndicator" label="CUI" allowEmpty
          optionText="name" optionValue="name"
          choices={[
            {id: 1, name: "TBD"},
            {id: 2, name: "Yes"},
            {id: 3, name: "No"},
          ]}
        />
          <TextInput source="uniqueIdentifierCode"
            defaultValue="0233-0000-0000000-xxxx"
            validate={[required(), maxLength(80)]}
          />
          <TextInput source="referenceDocument" />

          <ReferenceInput label="SSO" source="objOrgSsoId" reference="organization"
            sort={{ field: 'keyname', order: 'ASC' }}
            filter={{ Parent_Id: null }}
            perPage={1000000}
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
            reference="applicationStatus" validate={required()} >
            <SelectInput optionText="keyname" />
          </ReferenceInput>

        </SimpleForm>
    </Create>
);
