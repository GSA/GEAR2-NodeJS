import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const content = {
  tstamp: `11 JUN 2018 4:00 PM`,
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
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
