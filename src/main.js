import { Doctor } from './doctor-lookup';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

//Functions
function searchResults(response){
  if(response.data.length === 0){
    $("#doctor-list").append(`No results found`);
  } else {
    for(let i = 0; i < response.data.length; i++){
      $("#doctor-list").append(
        `<li>
          <h3>${response.data[i].profile.first_name} ${response.data[i].profile.last_name}, ${response.data[i].profile.title}</h3>
          <img src="${response.data[i].profile.image_url}">
          <h5>Specialties:</h5>
            <ul id="specialties-${i}"></ul>
          <h5>Location(s):</h5>
            <ul id="locations-${i}"></ul>
        </li>`
      );
      for(let j = 0; j < response.data[i].practices.length; j++){
        $("#locations-" + i).append(
        `<li>
          <h6>${response.data[i].practices[j].name} - ${response.data[i].practices[j].visit_address.city}</h6>
          <em><p class="accept-${response.data[i].practices[j].accepts_new_patients}"></p></em>
          <h7>Phone Number:</h7>
          <ul id="phone-${i}-${j}"></ul>
          <h7>Address:</h7>
          <ul>
            <li>
            <h8>${response.data[i].practices[j].visit_address.street}</h8><br>
            <h8>${response.data[i].practices[j].visit_address.city}, ${response.data[i].practices[j].visit_address.state} ${response.data[i].practices[j].visit_address.zip}</h8>
            </li>
          </ul>
          <p id="website-${i}-${j}"></p>
        </li>`
        );

        if(response.data[i].practices[j].website != undefined){
          $("#website-" + i + "-" + j).text("Website: " + response.data[i].practices[j].website);
        }

        for(let k = 0; k < response.data[i].practices[j].phones.length; k++){
          $("#phone-" + i + "-" + j).append(
            `<li>
              ${response.data[i].practices[j].phones[k].type}: ${response.data[i].practices[j].phones[k].number}
            </li>`
          );
        }
      }
      for(let l = 0; l < response.data[i].specialties.length; l++){
        $("#specialties-" + i).append(
          `<li>
            ${response.data[i].specialties[l].name}
          </li>`
        );
      }

    }
    $(".accept-true").text("This location is accepting new patients.");
    $(".accept-false").text("This location is currently not accepting new patients.");
  }
}
function error(){
  $('#errors').text("There was an error processing your request. Please try again.");
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
