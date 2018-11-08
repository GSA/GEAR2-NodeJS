import React, {Component, PropTypes} from 'react';
import Header from './common/Header';
import ApplicationEditForm from "./ApplicationEditForm";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <ApplicationEditForm {...props}/>
      </div>
    )
  }
}


App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;