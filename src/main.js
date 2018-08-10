import { Doctor } from './doctor-lookup';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

//Functions
function searchResults(response){

  // $("#doctor-list").append(
  //   `<h1>${response.}</h1>
  //   <p>does this work?</p>`
  //   );
  }
function error(){

}
//Form Submit
$(document).ready(function(){
  $("#search-form").submit(function(event){
    event.preventDefault();
    let inputtedName = $("#doctor-name").val();
    let inputtedCondition = $("#condition").val();
    Doctor.getData(inputtedName, inputtedCondition, searchResults, error);
  });
});
