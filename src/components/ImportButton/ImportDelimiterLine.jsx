import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => {
  const { delimiter, handleImportDelimiterChange } = props;

  return (
    <div style={{ margin: '20px 0' }}>
      <span>Delimiter: </span>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={delimiter}
        onChange={handleImportDelimiterChange}
      >
        <MenuItem value={','}>,</MenuItem>
        <MenuItem value={';'}>;</MenuItem>
        <MenuItem value={' '}>Space</MenuItem>
      </Select>
    </div>);
}
