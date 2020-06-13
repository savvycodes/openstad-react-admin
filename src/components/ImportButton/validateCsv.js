export default async (csvRows, schema) => {
  let validationMessages = [];

  if (!csvRows.length > 0) {
    return {
      messageType: 'zeroRows',
      color: 'blue',
      message: `There are no rows in the file`,
    };
  }

  /**
   * Check if parsing went correctly
   */
  if(csvRows[0].hasOwnProperty('id')) {
    return {
      messageType: 'faultyImport',
      color: 'red',
      message: 'It seems the import provided garbled results. Are you sure you used the right delimiter for your csv?',
    };
  }

  /**
   * Check for id
   */
  if(csvRows[0].hasOwnProperty('id')) {
    validationMessages.push({
      messageType: 'idColumn',
      color: 'blue',
      message: 'Id column is present in file; saving will only work with overwrite',
    });
  }

  /**
   * Validate schema
   */
  Object.keys(schema).forEach((key) => {
    if (!csvRows[0].hasOwnProperty(key))
      validationMessages.push({
        messageType: 'schemaError',
        color: 'red',
        message: `Import is missing the following column: ${key}`,
      });
  });

  return validationMessages;
};
