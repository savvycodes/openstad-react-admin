import React from 'react';
import { ImportButton } from "react-admin-import-csv";

export default ImportButton;

// deze functie wordt gebruikt in de simpleRestProvider
export const importChoicesGuide = async function(apiUrl, httpClient, params) {

  let data = params.data || [];
  let file = params.data.csvFile;

  // parse incoming data to source
  let source = {}
  data.forEach(line => {

    if (line.choicesGuide_title ||  line.choicesGuide_description ||  line.choicesGuide_images ||  line.choicesGuide_config) {
      try {
        line.choicesGuide_config = JSON.parse(line.choicesGuide_config);
      } catch(err) {}
      source = {
        title: line.choicesGuide_title,
        description: line.choicesGuide_description,
        images: line.choicesGuide_images,
        config: line.choicesGuide_config,
        questionGroups: []
      }
    }

    if (line.questionGroup_answerDimensions || line.questionGroup_title || line.questionGroup_description || line.questionGroup_images || line.questionGroup_seqnr ) {
      try {
        line.questionGroup_images = JSON.parse(line.questionGroup_images);
      } catch(err) {}
      source.questionGroups.push({
        answerDimensions: line.questionGroup_answerDimensions,
        title: line.questionGroup_title,
        description: line.questionGroup_description,
        images: line.questionGroup_images,
        seqnr: line.questionGroup_seqnr,
        questions: [],
        choices: [],
      });
    }
    
    if (line.question_title || line.question_description || line.question_images || line.question_type || line.question_dimensions || line.question_values || line.question_seqnr ) {
      try {
        line.question_images = JSON.parse(line.question_images);
      } catch(err) {}
      try {
        line.question_values = JSON.parse(line.question_values);
      } catch(err) {}
      let group = source.questionGroups[0];
      if (group && group.questions) {
        group.questions.push({
          old_id: line.question_id,
          title: line.question_title,
          description: line.question_description,
          images: line.question_images,
          type: line.question_type,
          dimensions: line.question_dimensions,
          values: line.question_values,
          seqnr: line.question_seqnr,
        })
      }
    }
    
    if (line.choice_title || line.choice_description || line.choice_images || line.choice_type || line.choice_dimensions || line.choice_answers || line.choice_seqnr ) {
      try {
        line.choice_images = JSON.parse(line.choice_images);
      } catch(err) {}
      try {
        line.choice_answers = JSON.parse(line.choice_answers);
      } catch(err) {}
      let group = source.questionGroups[0];
      if (group && group.choices) {
        group.choices.push({
          title: line.choice_title,
          description: line.choice_description,
          images: line.choice_images,
          type: line.choice_type,
          dimensions: line.choice_dimensions,
          answers: line.choice_answers,
          seqnr: line.choice_seqnr,
        });
      }
      
    }

  });

  // and store that json
  let result = await httpClient(`${apiUrl}/choicesguide`, {
    method: 'POST',
    body: JSON.stringify({
      title: source.title,
      description: source.description,
      images: source.images,
      config: source.config,
    }),
  })
  let CHOICESGUIDE_ID = result.json.id;

  for ( let questiongroup of source.questionGroups ) {

    let result = await httpClient(`${apiUrl}/choicesguide/${CHOICESGUIDE_ID}/questiongroup`, {
      method: 'POST',
      body: JSON.stringify({
        choicesGuideId: CHOICESGUIDE_ID,
        answerDimensions: questiongroup.answerDimensions,
        title: questiongroup.title,
        description: questiongroup.description,
        images: questiongroup.images,
        seqnr: questiongroup.seqnr,
      }),
    })
    let QUESTIONGROUP_ID = result.json.id;

    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    for ( let question of questiongroup.questions ) {

      let result = await httpClient(`${apiUrl}/choicesguide/${CHOICESGUIDE_ID}/questiongroup/${QUESTIONGROUP_ID}/question`, {
        method: 'POST',
        body: JSON.stringify({
          questionGroupId: QUESTIONGROUP_ID,
          title: question.title,
          description: question.description,
          images: question.images,
          type: question.type,
          dimensions: question.dimensions,
          values: question.values,
          minLabel: question.minLabel,
          maxLabel: question.maxLabel,
          seqnr: question.seqnr,
        }),
      })

      console.log(result.json.id);
      question.new_id = result.json.id;

    }
    for ( let choice of questiongroup.choices ) {

      // update question_ids in choices_answers

      console.log('STRING?', typeof choice.answers == 'string');
      if ( typeof choice.answers == 'string' ) {
        choice.answers = JSON.parse(choice.answers);
      }

      for ( let question of questiongroup.questions ) {
        console.log('QUESTION', question.old_id, question.new_id);
        if (choice.answers[question.old_id]) {
          choice.answers[question.new_id] = choice.answers[question.old_id];
          delete choice.answers[question.old_id];
        }
      }

      console.log('---');
      console.log(choice.answers);
      
      let result = await httpClient(`${apiUrl}/choicesguide/${CHOICESGUIDE_ID}/questiongroup/${QUESTIONGROUP_ID}/choice`, {
        method: 'POST',
        body: JSON.stringify({
          choicesGuideId: null,
          questionGroupId: QUESTIONGROUP_ID,
          title: choice.title,
          description: choice.description,
          images: choice.images,
          answers: choice.answers,
          seqnr: choice.seqnr,
        }),
      })
      
    }

  }
  
  return {
    data: Object.assign(Object.assign({}, params.data), { id: CHOICESGUIDE_ID }),
  }

}



