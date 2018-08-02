import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput, NumberInput
  , ReferenceInput, SelectInput
  , ArrayInput, SimpleFormIterator
  , required, maxLength } from 'react-admin';

import { ConfirmChoices, RegionChoices, AppOrWebChoices, UserCountBreakdown, TierChoices } from './valuelists';

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
      <TextInput label="keyname" source="kn" />
    </Filter>
);

export const ApplicationList = (props) => (
    <List {...props}  actions={<ListActions />} title="Applications" filters={<KeynameFilter />} >
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
            choices={ ConfirmChoices }
          />
          <SelectInput source="mobileAppIndicator" label="Mobile" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
          <SelectInput source="desktopIndicator" label="Desktop" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
          <SelectInput source="regionalClassification" allowEmpty
            optionText="name" optionValue="name"
            choices={ RegionChoices }
          />
        <SelectInput source="applicationOrWebsite"
            optionText="name" optionValue="name"
            validate={required()}
            choices={ AppOrWebChoices }
          />
          <SelectInput source="numberOfUsers" allowEmpty
            optionText="name"
            choices={ UserCountBreakdown }
          />
        <SelectInput source="generateRevenueIndicator" label="Generates Revenue" allowEmpty
          optionText="name" optionValue="name"
          choices={ ConfirmChoices }
        />
        <LongTextInput source="applicationNotes" />
        <ReferenceInput source="objAppPlatformId" label="Application Platform"
          reference="app_platforms"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>

        <ReferenceInput source="objAppHostingproviderId" label="Application Hosting Provider"
          reference="app_hostingproviders"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>

        <SelectInput source="tier" allowEmpty
          optionText="name" optionValue="name"
          choices={ TierChoices }
        />
        <NumberInput source="productionYear" />
        <NumberInput source="retiredYear" />
        <TextInput source="url" />
        <LongTextInput source="timeNotes" />
        <SelectInput source="cuiIndicator" label="CUI" allowEmpty
          optionText="name" optionValue="name"
          choices={ ConfirmChoices }
        />
        <TextInput source="uniqueIdentifierCode"
          defaultValue="0233-0000-0000000-xxxx"
          validate={[required(), maxLength(80)]}
        />
        <TextInput source="referenceDocument" />
        <ReferenceInput label="SSO" source="objOrgSsoId" reference="organizations"
          sort={{ field: 'keyname', order: 'ASC' }}
          filter={{ Parent_Id: null }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Parent System" source="objParentSystemId"
          reference="parent_systems"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Investment" source="objInvestmentId"
          reference="investments"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Portfolio" source="objPortfolioId"
          reference="portfolios"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="FISMA System" source="objFismaId"
          reference="fismas"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="User Location" source="objAppUserlocId"
          reference="user_locations"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Application Status" source="objApplicationStatusId"
          reference="application_statuses"
          validate={required()}
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
        >
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ArrayInput source="applicationRationalization"
          label="Application Rationalization">
          <SimpleFormIterator>
            <TextInput source="FY" />
            <TextInput source="TIME_Val" />
            <TextInput source="Comment" />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="capabilities"
          label="Capabilities">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="capabilities"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="technologies"
          label="Technologies">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="technologies"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="users"
          label="Users">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="organizations"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="business_pocs"
          label="Business POCs">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="pocs"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="technical_pocs"
          label="Technical POCs">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="pocs"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>

        </SimpleForm>
    </Edit>
);

export const ApplicationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="keyname" validate={[required(), maxLength(80)]} />
          <LongTextInput source="description" />
          <TextInput source="displayName" validate={[required(), maxLength(20)]} />
          <TextInput source="applicationAlias" label="Alias" />
          <SelectInput source="cloudIndicator" label="Cloud" allowEmpty
            optionText="name" optionValue="name"
            choices={ ConfirmChoices }
          />
          <SelectInput source="mobileAppIndicator" label="Mobile" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
          <SelectInput source="desktopIndicator" label="Desktop" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
          <SelectInput source="regionalClassification" allowEmpty
            optionText="name" optionValue="name"
            choices={ RegionChoices }
          />
          <SelectInput source="applicationOrWebsite"
            optionText="name" optionValue="name"
            validate={required()}
            choices={ AppOrWebChoices }
          />
          <SelectInput source="numberOfUsers" allowEmpty
            optionText="name"
            choices={ UserCountBreakdown }
          />
          <SelectInput source="generateRevenueIndicator" label="Generates Revenue" allowEmpty
            optionText="name" optionValue="name"
            choices={ ConfirmChoices }
          />
          <LongTextInput source="applicationNotes" />
          <SelectInput source="tier" allowEmpty
            optionText="name" optionValue="name"
            choices={ TierChoices }/>
          <NumberInput source="productionYear" />
          <NumberInput source="retiredYear" />
          <TextInput source="url" />
          <LongTextInput source="timeNotes" />

        <SelectInput source="cuiIndicator" label="CUI" allowEmpty
          optionText="name" optionValue="name"
          choices={ ConfirmChoices }
        />
          <TextInput source="uniqueIdentifierCode"
            defaultValue="0233-0000-0000000-xxxx"
            validate={[required(), maxLength(80)]}
          />
          <TextInput source="referenceDocument" />

          <ReferenceInput label="SSO" source="objOrgSsoId" reference="organizations"
            sort={{ field: 'keyname', order: 'ASC' }}
            filter={{ Parent_Id: null }}
            perPage={ 1000000 }
            allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Parent System" source="objParentSystemId"
            reference="parent_systems" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Investment" source="objInvestmentId"
            reference="investments" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Portfolio" source="objPortfolioId"
            reference="portfolios" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="FISMA System" source="objFismaId"
            reference="fismas" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="User Location" source="objAppUserlocId"
            reference="user_locations" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Application Status" source="objApplicationStatusId"
            reference="application_statuses" validate={required()} >
            <SelectInput optionText="keyname" />
          </ReferenceInput>

        </SimpleForm>
    </Create>
);
