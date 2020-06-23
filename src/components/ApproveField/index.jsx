import * as React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const ApproveField = ({ source, record = {} }) => {
  console.log(record)

  return (
    <span>{record[source]}</span>
  );
};

ApproveField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default ApproveField;
