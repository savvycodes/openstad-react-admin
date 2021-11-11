// import { parse as convertFromCSV } from "papaparse";
// import lensPath from "ramda/src/lensPath";
// import over from "ramda/src/over";

import XLSX from 'xlsx';


const setObjectValue = (object, path, value) => {
  const lensPathFunction = lensPath(path.split("."));
  return over(lensPathFunction, () => value, object || {});
};

export async function processXlsFile( file, parseConfig = {} ) {

  if (!file) {
    return;
  }

  const xlsData = await getXlsData(file, parseConfig);
  return processXlsData(xlsData);

}

export async function getXlsData( file, inputConfig = {} ) {

  let config = {};

  const isObject = !!inputConfig && typeof inputConfig === "object";

  if (isObject) {
    config = inputConfig;
  }

  return new Promise(async (resolve, reject) => {

    try {
      let data = await file.arrayBuffer();
      let workbook = XLSX.read(data);
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      let result = XLSX.utils.sheet_to_json(worksheet);
      resolve(result)
    } catch (error) {
      reject(error)
    }

  });
}

export function processXlsData(data) {

  data.forEach(row => {
    try {
      row.extraData = JSON.parse(row.extraData);
    } catch (err) {}
  });
  
  return data;

}
