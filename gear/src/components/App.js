import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
//import ApplicationEditForm from "./application/ApplicationEditForm";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        {/*<ApplicationEditForm {...props}/>*/}
      </div>
    )
  }
}


App.propTypes = {
  children: PropTypes.object
};

export default App;