export default async (csvRows, schema) => {
  let validationErrors = [];

  if (!csvRows.length > 0) {
    return {
      errorType: 'schemaError',
      message: `There are no rows in the file`,
    };
  }

  Object.keys(schema).forEach((key) => {
    if (!csvRows[0].hasOwnProperty(key))
      validationErrors.push({
        errorType: 'schemaError',
        message: `Import is missing the following column: ${key}`,
      });
  });

  return validationErrors;

  // const values = Object.keys(csvRows).map((row) => {
  //   let cvsValidationErrors = [];
  //
  //   Object.keys(schema).forEach((key) => {
  //     if (row.hasOwnProperty(key))
  //       cvsValidationErrors.push({
  //         key,
  //         errorType: 'schemaError',
  //         message: 'There was a validation error',
  //       });
  //   });
  //
  //   return {
  //     cvsValidationErrors,
  //     ...row,
  //   }
  // })
  //
  // setValues(values);
};
