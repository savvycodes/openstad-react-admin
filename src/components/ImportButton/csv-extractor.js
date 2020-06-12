import { parse as convertFromCSV, ParseConfig } from "papaparse";
import lensPath from "ramda/src/lensPath";
import over from "ramda/src/over";

const setObjectValue = (object, path, value) => {
  const lensPathFunction = lensPath(path.split("."));
  return over(lensPathFunction, () => value, object || {});
};

export async function processCsvFile(
  file,
  parseConfig= {}
) {
  if (!file) {
    return;
  }
  const csvData = await getCsvData(file, parseConfig);
  return processCsvData(csvData);
}

export async function getCsvData(
  file,
  inputConfig = {}
) {
  let config = {};
  const isObject = !!inputConfig && typeof inputConfig === "object";
  if (isObject) {
    config = inputConfig;
  }
  return new Promise((resolve, reject) =>
    convertFromCSV(file, {
      // Defaults
      delimiter: ",",
      skipEmptyLines: true,
      // Configs (overwrites)
      ...config,
      // Callbacks
      complete: (result) => resolve(result.data),
      error: (error) => reject(error),
    })
  );
}

export function processCsvData(data) {

  if (Array.isArray(data[0])) {
    const topRowKeys = data[0];

    const dataRows = data.slice(1).map((row) => {
      let value = {};

      topRowKeys.forEach((key, index) => {
        value = setObjectValue(value, key, row[index]);
      });

      return value;
    });
    return dataRows;
  }
  else {
    const dataRows = [];
    data.forEach( (obj) => {
        let value = {}
        for (let key in obj) value = setObjectValue(value, key, obj[key]);
        dataRows.push(value);
    });
    return dataRows;
  }
}
