import * as React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const ApproveField = ({ source, record, handleCheckBoxChange = {} }) => {
  return (
    <Checkbox
      checked={!!record[source]}
      onChange={handleCheckBoxChange}
      name={source}
      color="primary"
      padding={0}
    />
  );
};

ApproveField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default ApproveField;
