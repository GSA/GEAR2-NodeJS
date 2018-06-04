import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const content = {
  tstamp: `04 JUN 2018 10:00 AM`,
  pageTitle: `GEAR 2.0 Pre-Release Admin Portal`,
}

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
  },
  list: {
    fontSize: 16,
    listStyle: 'disc',
  },
  listsub: {
    color:'#333',
    fontSize: 18,
    fontWeight: 700,
    // margin: 0,
    // lineHeight: 1,
    padding: 0,
  }
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {content.tstamp}
          </Typography>
          <Typography variant="headline" component="h2">
            {content.pageTitle}
          </Typography>
          <List
            className={classes.list}
            subheader={
              <ListSubheader className={classes.listsub} color="textPrimary" disableSticky={true}>
                What's new?
              </ListSubheader>
            }
          >
            <ListItem disableGutters={true}>
              {bull} Dasboard lists for what's new and what's on deck
            </ListItem>
            <ListItem disableGutters={true}>
              {bull} Readonly site (Work In Progress) at&#160;&#160;<a href="/gear">/gear</a>
            </ListItem>
            <ListItem disableGutters={true}>
              {bull} Missing value lists for existing fields, missing fields in progress
            </ListItem>
          </List>
          <List
            className={classes.list}
            subheader={
              <ListSubheader className={classes.listsub} color="textPrimary" disableSticky={true}>
                What's on deck?
              </ListSubheader>
            }
          >
            <ListItem disableGutters={true}>
              {bull} Missing fields and their value lists if needed
            </ListItem>
            <ListItem disableGutters={true}>
              {bull} Update readonly API endpoints
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
