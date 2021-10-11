import React from 'react';

import { Button, downloadCSV } from 'react-admin';
import jsonExport from 'jsonexport/dist';
import Icon from "@material-ui/icons/ImportExport";
import { useDataProvider } from 'react-admin';

export const ExportButton = function(props) {

  const dataProvider = useDataProvider();

  let exporter = async function(data, id) {

    let json = await dataProvider.getIdeasWithArguments({})
    let ideas = json.data;

    const exportHeaders = [
      {key: 'id', label: 'ID'},
      {key: 'title', label: 'Title'},
      {key: 'summary', label: 'Summary'},
      {key: 'description', label: 'Description'},
      {key: 'location', label: 'Locatie'},
      {key: 'originalId', label: 'Original idea ID', 'extraData': true},
      {key: 'area', label: 'Area', 'extraData': true},
      {key: 'theme', label: 'Theme', 'extraData': true},
      {key: 'advice', label: 'Advice', 'extraData': true},
      {key: 'budget', label: 'Budget'},
      {key: 'ranking', label: 'Ranking', 'extraData': true},
      {key: 'images', label: 'Images', 'extraData': true},
      {key: 'modBreak', label: 'Modbreak'},
      {key: 'firstName', label: 'First name', userData: true},
      {key: 'lastName', label: 'Last name', userData: true},
      {key: 'email', label: 'email', userData: true},
      {key: 'yes', label: 'Votes for'},
    ];

    ideas.map((idea) => {
      idea.location = idea.location ? ( idea.location.coordinates[0] + ', ' + idea.location.coordinates[1] ) : '';
    });

    let body = [];

    ideas.map((idea) => {

      let ideaLines = [];

      let ideaLine = {};
      exportHeaders.forEach((header) => {
        if (header.userData) {
          ideaLine[header.key] = idea.user && idea.user[header.key] ? idea.user[header.key] : '';
        } else {
          ideaLine[header.key] = header.extraData &&  idea.extraData ? idea.extraData[header.key] : ( typeof idea[header.key] == 'string' ? idea[header.key].replace(/\r|\n/g, '\\n') : idea[header.key] );
        }
      });

      if (idea.argumentsFor && idea.argumentsFor.length) {
        let argLines = [];
        idea.argumentsFor.sort( (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ).forEach((arg) => {
          let argLine = ideaLine || {};
          ideaLine = undefined;
          argLine.argument_sentiment = arg.sentiment;
          argLine.argument_description = arg.description.replace(/\r|\n/g, '\\n');
          argLine.argument_username = arg.user.firstName + ' ' + arg.user.lastName;
          if (arg.reactions && arg.reactions.length) {
            arg.reactions.forEach((reaction) => {
              let reactionLine = argLine || {};
              argLine = undefined;
              reactionLine.reaction_description = reaction.description.replace(/\r|\n/g, '\\n');
              reactionLine.reaction_username = reaction.user.firstName + ' ' + reaction.user.lastName;
              argLines.push(reactionLine)
            });
          }
          if (argLine) argLines.push(argLine); // no reactions have been added
        });
        ideaLines = ideaLines.concat(argLines);
      }

      if (idea.argumentsAgainst && idea.argumentsAgainst.length) {
        let argLines = [];
        idea.argumentsAgainst.sort( (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ).forEach((arg) => {
          let argLine = ideaLine || {};
          ideaLine = undefined;
          argLine.argument_sentiment = arg.sentiment;
          argLine.argument_description = arg.description.replace(/\r|\n/g, '\\n');
          argLine.argument_username = arg.user.firstName + ' ' + arg.user.lastName;
          if (arg.reactions && arg.reactions.length) {
            arg.reactions.forEach((reaction) => {
              let reactionLine = argLine || {};
              argLine = undefined;
              reactionLine.reaction_description = reaction.description.replace(/\r|\n/g, '\\n');
              reactionLine.reaction_username = reaction.user.firstName + ' ' + reaction.user.lastName;
              argLines.push(reactionLine)
            });
          }
          if (argLine) argLines.push(argLine); // no reactions have been added
        });
        ideaLines = ideaLines.concat(argLines);
      }

      if (ideaLine) ideaLines.push(ideaLine); // no arguments have been added
      body = body.concat(ideaLines);
      
      
    });

    let idea_headers = exportHeaders.map( header => header.key );
    jsonExport(body, {headers: [
      ...idea_headers, 'argument_sentiment', 'argument_description', 'argument_username', 'reaction_description', 'reaction_username' 
    ]}, (err, csv) => {
      downloadCSV(csv, `ideas-with-arguments`);
    });

  }

  return (
    <Button label="Export ideas with arguments" onClick={data => exporter(data, props.id)}>
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
