import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { downloadCSV } from "react-admin";

// TODO: make dynamic (add fields and filename as arguments to method)
export default (rows) => {
  if (rows.length > 0) {
    const [firstRow] = rows;

    const csv = convertToCSV({
      data: rows,
      fields: Object.keys(firstRow),
    });

    downloadCSV(csv, "???"); // download as '*.csv` file
  }
};
