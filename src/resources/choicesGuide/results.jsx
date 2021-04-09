import React from 'react';
import { Button, downloadCSV } from 'react-admin';
import jsonExport from 'jsonexport/dist';
import Icon from "@material-ui/icons/ImportExport";
import { useDataProvider } from 'react-admin';

export const ResultButton = function(props) {

  const dataProvider = useDataProvider();

  let exporter = async function(data, id) {

    let json = await dataProvider.getCompleteChoicesgGuide({ id: props.data && props.data.id })
    let choicesGuide = json.data || {};

    json = await dataProvider.getChoicesgGuideResults({ id: props.data && props.data.id })

    let results = {};
    json.data.forEach((record) => {
      
      results[record.id] = {
        extraData: record.extraData || {},
        userId: record.userId,
        answers: record.result && record.result.answers || {},
        scores: record.result && record.result.scores || {},
      }
    });

    let answers = {};
    let scores = {};
    let users = {};

    Object.keys(results).forEach((recordId) => {

      let result = results[recordId];

      Object.keys(result.answers).forEach((answerId) => {
        if (!answers[answerId]) answers[answerId] = [];
        answers[answerId].push({ x: parseInt(result.answers[answerId].x), y: parseInt(result.answers[answerId].y) });
      });

      Object.keys(result.scores).forEach((scoreId) => {
        if (!scores[scoreId]) scores[scoreId] = [];
        scores[scoreId].push({ x: parseInt(result.scores[scoreId].x), y: parseInt(result.scores[scoreId].y) });
      });

    });

    let questions = choicesGuide.questiongroups[0].questions;
    let dimensions = choicesGuide.questiongroups[0].answerDimensions;
    let choices = choicesGuide.questiongroups[0].choices;

    let answersCSV = 'question id, question title, question description, average answer\n';
    Object.keys(answers).forEach((answerId) => {
      let question = questions.find( q => q.id == answerId );
      if (!question) return;
      let totalx = answers[answerId].reduce( (accumulator, currentValue) => accumulator + currentValue.x, 0 );
      let totaly = answers[answerId].reduce( (accumulator, currentValue) => accumulator + currentValue.y, 0 );
      let length = answers[answerId].length;
      let avg = (parseInt(totalx / length) || '-' ) + ( dimensions == 2 ? '/'+(parseInt(totaly / length) || '-' ) : '' )
      answersCSV += `"${answerId}","${question.title}","${question.description && question.description.substring(0, 50).replace(/\r|\n/, '')}","${avg}"\n`
    });

    let scoresCSV = 'choice id, choice title, average score\n';
    Object.keys(scores).forEach((scoreId) => {
      let match = scoreId.match(/(\d+)$/);
      let choice = choices.find( c => c.id == ( match && match[1] ) );
      if (!choice) return;
      let totalx = scores[scoreId].reduce( (accumulator, currentValue) => accumulator + currentValue.x, 0 );
      let totaly = scores[scoreId].reduce( (accumulator, currentValue) => accumulator + currentValue.y, 0 );
      let length = scores[scoreId].length;
      let avg = (parseInt(totalx / length) || '-' ) + ( dimensions == 2 ? '/'+(parseInt(totaly / length) || '-' ) : '' )
      scoresCSV += `"${scoreId}","${choice.title}","${avg}"\n`
    });

    let questionIds = questions.sort( (a,b) => a.seqnr - b.seqnr ).map( q => q.id );
    let choiceIds = choices.sort( (a,b) => a.seqnr - b.seqnr ).map( c => c.id );

    let extraDataFields = {};
    Object.keys(results).forEach((recordId) => {
      let result = results[recordId];
      Object.keys(result.extraData).forEach(fieldName => {
        extraDataFields[fieldName] = true;
      });
    });
    extraDataFields = Object.keys(extraDataFields);
    
    let userCSV = `user id,${questionIds.map( id => 'question ' + id ).join(',')},${choiceIds.map( id => 'choice ' + id ).join(',')},${extraDataFields.join(',')}\n`  
    Object.keys(results).forEach((recordId) => {
      let result = results[recordId];
      let userAnswers = questionIds.map ( id => {
        let x = parseInt(result.answers && result.answers[id] && result.answers[id].x) || ''
        if (dimensions == 1) return x;
        let y = parseInt(result.answers && result.answers[id] && result.answers[id].y) || ''
        return `${x}/${y}`;
      });
      let userScores = choiceIds.map ( id => {
        let x = parseInt(result.scores && result.scores['choice-'+id] && result.scores['choice-'+id].x) || '-'
        if (dimensions == 1) return x;
        let y = parseInt(result.scores && result.scores['choice-'+id] && result.scores['choice-'+id].y) || '-'
        return `${x}/${y}`;
      });
      let userExtraData = extraDataFields.map ( fieldName => result.extraData && result.extraData[fieldName] );
      userCSV += `${recordId},${userAnswers.join(',')},${userScores.join(',')},${userExtraData.join(',')}\n`  
    });

    await downloadCSV(answersCSV, `keuzewijzerresultaten-${props.data.id}-antwoorden`);
    await downloadCSV(scoresCSV, `keuzewijzerresultaten-${props.data.id}-scores`);
    await downloadCSV(userCSV, `keuzewijzerresultaten-${props.data.id}-gebruikers`);

  }

  return (
    <Button label="Export resultaten (3x csv)" onClick={data => exporter(data, props.id)}>
      <Icon/>
    </Button>);
}

function stringify(value) {
  if (typeof value == 'object') {
    try {
      value = JSON.stringify(value);
    } catch (err) {}
  }
  return value;
}
