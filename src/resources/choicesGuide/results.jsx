import { Button, downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";
import Icon from "@material-ui/icons/ImportExport";
import { useDataProvider } from "react-admin";

export const ResultButton = function (props) {
  const dataProvider = useDataProvider();

  let exporter = async function (data, id) {
    let json = await dataProvider.getChoicesgGuideResults({
      id: props.data && props.data.id,
    });

    json.data = json.data || [];
    let body = [];

    // todo: dit moet no een uitgebreide resultaten export worden
    json.data.forEach((entry) => {
      body.push({
        userFingerprint: entry.userFingerprint,
        extraData: stringify(entry.result.extraData),
        answers: stringify(entry.result.answers),
        scores: stringify(entry.result.scores),
      });
    });

    jsonExport(
      body,
      { headers: ["userFingerprint", "extraData", "answers", "scores"] },
      (err, csv) => {
        downloadCSV(csv, `keuzewijzerresultaten-${props.data.id}`);
      }
    );
  };

  return (
    <Button
      label="Export resultaten"
      onClick={(data) => exporter(data, props.id)}
    >
      <Icon />
    </Button>
  );
};

function stringify(value) {
  if (typeof value == "object") {
    try {
      value = JSON.stringify(value);
    } catch (err) {}
  }
  return value;
}
