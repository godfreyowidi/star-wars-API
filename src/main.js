import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import StarWars from './js/star-wars.js';
// import { Project } from 'js/project';

let getElements = (response) => {
  let results;
  if (response.data) {
    results = response.data.results;
  } else {
    results = response.results;
  }

  let outputStr = '';
  
  if (results[0].name) {
    for (let choice of results) {
      outputStr += `<li>${choice.name}</li>`;
    }
  
  } else {
    for (let choice of results) {
      outputStr += `<li>${choice.title}</li>`;
    }
  }
  $('.list').append(outputStr);

};
async function getMore(choiceData) {
  try {
    const results = await fetch(choiceData.next);
    if (!results.ok) {
      throw Error(results.statusText);
    }
    let parsed = await results.json();
    getElements(parsed);
    if (parsed.next) {
      getMore(parsed);
    }
  } catch(error) {
    return error.message;
  }
  
}

async function makeApiCall(choice) {
  const response = await StarWars.get(choice);
  getElements(response);
  getMore(response.data);
}

$(document).ready(() => {
  $('.form-elements').submit((e) => {
    e.preventDefault();
    $('.list').text('');
    let selected = $('#dropdown').val();
    makeApiCall(selected);

  });
});