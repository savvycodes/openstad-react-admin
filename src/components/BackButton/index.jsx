import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { goBack } from 'react-router-redux';

class BackButton extends Component {

  render() {
    return <Button
      variant="contained"
      color="primary"
      onClick={this.props.goBack}
    >
      Go Back
    </Button>;
  }
}

export default connect(null, {
  goBack,
})(BackButton);
