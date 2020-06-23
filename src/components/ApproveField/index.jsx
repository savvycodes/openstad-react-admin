import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const RowCheckbox = withStyles({
  root: {
    padding: 0,
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ApproveField = ({ source, record, handleCheckBoxChange = {} }) => {
  return (
    <RowCheckbox
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
