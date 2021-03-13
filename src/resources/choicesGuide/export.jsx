import { Button, downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";
import Icon from "@material-ui/icons/ImportExport";
import { useDataProvider } from "react-admin";

export const ExportButton = function (props) {
  const dataProvider = useDataProvider();

  let exporter = async function (data, id) {
    let json = await dataProvider.getCompleteChoicesgGuide({
      id: props.data && props.data.id,
    });

    let choicesGuide = {
      choicesGuideId: json.data.id,
      images: json.data.images,
      config: json.data.config,
      title: json.data.title,
      description: json.data.description,
      choices: json.data.choices || [],
      questionGroups: json.data.questiongroups || [],
    };

    // backwards compatibility
    if (choicesGuide.questionGroups && choicesGuide.questionGroups.map) {
      choicesGuide.questionGroups.map((questiongroup) => {
        if (questiongroup.questions && questiongroup.questions.map) {
          questiongroup.questions.map((question) => {
            if (question.type == "continuous") question.type = "a-to-b";
            if (question.type == "enum-buttons") question.type = "enum-radio";
            if (question.type == "a-to-b") {
              if (question.values && question.values.A)
                question.values.A.labelBelow =
                  question.values.A.labelBelow || question.minLabel;
              if (question.values && question.values.B)
                question.values.B.labelBelow =
                  question.values.B.labelBelow || question.maxLabel;
            }
          });
        }
      });
    }

    let body = [];

    // choicesGuide
    body.push({
      choicesGuide_title: stringify(choicesGuide.title),
      choicesGuide_description: stringify(choicesGuide.description),
      choicesGuide_images: stringify(choicesGuide.images),
      choicesGuide_config: stringify(choicesGuide.config),
    });

    if (choicesGuide.questionGroups && choicesGuide.questionGroups.forEach) {
      choicesGuide.questionGroups.forEach((questiongroup) => {
        body.push({
          questionGroup_answerDimensions: stringify(
            questiongroup.answerDimensions
          ),
          questionGroup_title: stringify(questiongroup.title),
          questionGroup_description: stringify(questiongroup.description),
          questionGroup_images: stringify(questiongroup.images),
          questionGroup_seqnr: stringify(questiongroup.seqnr),
        });

        if (questiongroup.questions && questiongroup.questions.forEach) {
          questiongroup.questions.forEach((question) => {
            body.push({
              question_title: stringify(question.title),
              question_description: stringify(question.description),
              question_images: stringify(question.images),
              question_type: stringify(question.type),
              question_dimensions: stringify(question.dimensions),
              question_values: stringify(question.values),
              question_seqnr: stringify(question.seqnr),
            });
          });
        }

        if (questiongroup.choices && questiongroup.choices.forEach) {
          questiongroup.choices.forEach((choice) => {
            body.push({
              choice_title: stringify(choice.title),
              choice_description: stringify(choice.description),
              choice_images: stringify(choice.images),
              choice_type: stringify(choice.type),
              choice_dimensions: stringify(choice.dimensions),
              choice_answers: stringify(choice.answers),
              choice_seqnr: stringify(choice.seqnr),
            });
          });
        }
      });
    }

    jsonExport(
      body,
      {
        headers: [
          "choicesGuide_title",
          "choicesGuide_description",
          "choicesGuide_images",
          "choicesGuide_config",
          "questionGroup_answerDimensions",
          "questionGroup_title",
          "questionGroup_description",
          "questionGroup_images",
          "questionGroup_seqnr",
          "question_title",
          "question_description",
          "question_images",
          "question_type",
          "question_dimensions",
          "question_values",
          "question_seqnr",
        ],
      },
      (err, csv) => {
        downloadCSV(
          csv,
          `keuzewijzer-${choicesGuide.choicesGuideId}-${choicesGuide.title}`
        );
      }
    );
  };

  return (
    <Button
      label="Export keuzewijzer"
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
