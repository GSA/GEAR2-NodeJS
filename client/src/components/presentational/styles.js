export const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    button: {
        margin: theme.spacing.unit,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 400,
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
        minWidth: 200,
        maxWidth: 500,
    },
    fieldLabel: {
        fontSize: '8',
        paddingBottom: '10px',
    }
});
