import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput, NumberInput
  , ReferenceInput, SelectInput
  , ArrayInput, SimpleFormIterator
  , required, maxLength, minValue, maxValue } from 'react-admin';
import ReactDOM from 'react-dom';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import { ConfirmChoices, RegionChoices, AppOrWebChoices, UserCountBreakdown, TierChoices } from './valuelists';
import ApplicationEditForm from "./ApplicationEditForm";
import Select from "@material-ui/core/Select/Select";
import Button from "@material-ui/core/Button/Button";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import ApplicationCreateForm from "./containers/Application/ApplicationCreateForm/ApplicationCreateForm";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
});

const ListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, push }) => (
    <CardActions>
	{/*         {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
	}) } */}
        <CreateButton basePath={basePath} />
        <RefreshButton />
    </CardActions>
);

const PostPagination = ({ page, perPage, total, setPage }) => {
    total = 432;
    const nbPages = Math.ceil(total / perPage) || 1;
    console.log("Inside Pagination ", total);
    return (
        nbPages > 1 &&
        <Toolbar>
            {page > 1 &&
            <Button primary key="prev" icon={<ChevronLeft />} onClick={() => setPage(page - 1)}>
                Prev
            </Button>
            }
            {page !== nbPages &&
            <Button primary key="next" icon={<ChevronRight />} onClick={() => setPage(page + 1)} labelPosition="before">
                Next
            </Button>
            }
        </Toolbar>
    );
};

const KeynameFilter = props => (
    <Filter {...props}>
      <TextInput label="Search" source="kn"  alwaysOn />
    </Filter>
);

export const ApplicationList = (props) => (
    <List {...props}  actions={<ListActions />} title="Applications" filters={<KeynameFilter />}  pagination={<PostPagination/>} bulkActionButtons={false} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="Application Name" />
            <TextField source="description" />
            <EditButton/>
        </Datagrid>
    </List>
);

const ApplicationTitle = ({ record }) => {
    return <span>Application {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationEditOld = (props) => (
    <Edit keyname={<ApplicationTitle />} {...props}>
        <SimpleForm>
          <DisabledInput source="id" />
          <TextInput source="keyname" label="Application Name" validate={[required(), maxLength(80)]} />
          <TextInput source="applicationAlias" />
          <TextInput source="displayName" label="Short name will appear in graphic" validate={[required(), maxLength(20)]} />
		  <LongTextInput source="description" validate={[required()]} />          

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
          optionText="name" optionValue="id"
          choices={ TierChoices }
        />
		
        <NumberInput source="productionYear" label="Production Year" validate={[minValue(1950, "must be after 1950"), maxValue(2050, "must be before 2050")]} />
        <NumberInput source="retiredYear" label="Retired Year" validate={[minValue(1950, "must be after 1950"), maxValue(2050, "must be before 2050")]}/>
        <TextInput source="url" />
       
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
          perPage={ 100 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Parent System" source="objParentSystemId"
          reference="parent_systems"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Investment" source="objInvestmentId"
          reference="investments"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 2000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="Portfolio" source="objPortfolioId"
          reference="portfolios"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="FISMA System" source="objFismaId"
          reference="fismas"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 3000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        <ReferenceInput label="User Location" source="objAppUserlocId"
          reference="user_locations"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 100 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
		
        <ReferenceInput label="Application Status" source="objApplicationStatusId"
          reference="application_statuses"
          validate={required()}
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 25 }
        >
          <SelectInput optionText="keyname" />
        </ReferenceInput>
        
		 <ArrayInput source="capabilities"
          label="Capabilities">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="capabilities"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 500 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>

           {/* <div id="technologies">
                {this.state.application.technologies.map(data => {
                    return (
                        <Chip
                            key={data.id}
                            label={data.keyname}
                            onDelete={() => this.handleDeleteChip(data.keyname)}
                            onClick={this.handleClick}
                            className={styles.chip}
                        />
                    );
                })}
            </div><br/>
            <Select native
                    onChange={this.saveTech}
                    value={this.state.tech}>
                {this.props.application.technologies.map(data => {
                    return (
                        <option key={data.id} value={data.keyname}>{data.keyname}</option>
                    )
                })}
            </Select>&nbsp;&nbsp;
            <Button variant="outlined" onClick={this.addTechnology} className={styles.button}>
                Add
            </Button>
            <FormHelperText>Add a new technology</FormHelperText>*/}


        {/*<ArrayInput source="technologyreplacedbys"
          label="Technologies">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="technologyreplacedbys"
              sort={{ field: 'keyname', order: 'ASC' }}
			  
              perPage={ 2000 }              
			  allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>*/}
        <ArrayInput source="users"
          label="Users">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="organizations"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 100 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="business_pocs" validate={required()}
          label="Business POCs">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="pocs" 
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 2000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="technical_pocs" validate={required()}
          label="Technical POCs">
          <SimpleFormIterator>
            <ReferenceInput label="" source="id"
              reference="pocs" 
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 2000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput> 
		<LongTextInput source="applicationNotes" />
        
		</SimpleForm>
    </Edit>
);

export const ApplicationEdit = (props) => (
    <Edit keyname={<ApplicationTitle />} {...props}>
        <ApplicationEditForm id={props.id}/>
    </Edit>
);

export const ApplicationCreate = ( props ) => (
    <Create keyname={<ApplicationTitle />} {...props}>
        <ApplicationCreateForm id={props.id} {...props.application} />
    </Create>
);

export const ApplicationCreateOld = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="keyname" label="Application Name" validate={[required(), maxLength(80)]} />
		  <TextInput source="applicationAlias" label="Alias" />
          <LongTextInput source="description" validate={[required()]} />
          <TextInput source="displayName" label="Short name will appear in graphic" validate={[required(), maxLength(20)]} />
          
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
		  <ReferenceInput source="objAppHostingproviderId" label="Application Hosting Provider"
          reference="app_hostingproviders"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>
		
          <SelectInput source="numberOfUsers" allowEmpty
            optionText="name"
            choices={ UserCountBreakdown }
          />
          <SelectInput source="generateRevenueIndicator" label="Generates Revenue" allowEmpty
            optionText="name" optionValue="name"
            choices={ ConfirmChoices }
          />
          
          <SelectInput source="tier" allowEmpty
            optionText="name" optionValue="id"
            choices={ TierChoices }/>
          <NumberInput source="productionYear" label="Production Year" validate={[minValue(1950, "must be after 1950"), maxValue(2050, "must be before 2050")]} />
		  <NumberInput source="retiredYear" label="Retired Year" validate={[minValue(1950, "must be after 1950"), maxValue(2050, "must be before 2050")]}/>
          <TextInput source="url" />
        

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
            reference="user_locations" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>

          <ReferenceInput label="Application Status" source="objApplicationStatusId"
            reference="application_statuses" validate={required()} >
            <SelectInput optionText="keyname" />
          </ReferenceInput>
		  <LongTextInput source="applicationNotes" />
		  
        </SimpleForm>
    </Create>
);