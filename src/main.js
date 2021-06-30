import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import StarWars from './js/star-wars.js';
// import { Project } from 'js/project';

let getElements = (response) => {
  let results = response.results;
  console.log('response', response);
  console.log('response results', results);
  let outputStr = '';
  for (let person of results) {
    console.log(person.name);
    outputStr += `<li>${person.name}</li>`;
  }
  console.log('outputStr', outputStr);
  $('.list').html(outputStr);
};

async function makeApiCall() {
  const response = await StarWars.get();
  console.log('starwars response', response);
  getElements(response);
}

$(document).ready(() => {
  $('.form-elements').submit((e) => {
    e.preventDefault();
    let selected = $('#dropdown').val();
    let response = makeApiCall();
    console.log('selected', selected);
    console.log('response after submitting', response);

  });
});