import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 0,
  },
  chip: {
    backgroundColor: 'transparent',
    fontSize: '0.625rem',
    margin: 0,
  },
});

class AlphaNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alphaData: []
    };

    for (var i = 1; i < 27; i = i+1) {
      this.state.alphaData.push(String.fromCharCode(i + 64));
    }
  }

  handleClick = ind => () => {
    this.setState({ currentChip: ind });
    this.props.push(String.fromCharCode(ind + 64))
    // window.location.assign(
    //   `${window.location.href.replace(window.location.hash, '')}/#/application/?keyname=${String.fromCharCode(ind + 64)}$bw`
    // );
  };

  render() {
    const { classes } = this.props;
    const { alphaData } = this.state;

    return (
      <Paper className={classes.root}>
        {alphaData.map((data, i) => {
          return (
            <Chip
              key={i}
              label={data}
              className={classes.chip}
              onClick={this.handleClick(i)}
            />
          );
        })}
      </Paper>
    );
  }
}

AlphaNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlphaNav);
