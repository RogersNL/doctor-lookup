export class Doctor{
  constructor(){}
  static getData(name, query, showResults, error){
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${query}&location=wa-seattle&user_location=37.773%2C-122.413&sort=best-match-desc&skip=0&limit=10&user_key=${process.env.exports.apiKey}`)
      .then(function(response){
        showResults(response);
      }).fail(function(){
        error();
      });
    };
}
