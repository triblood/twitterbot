var twit = require('twit');
var config = require('./config');

var Twitter = new twit(config);

var retweet = function() {
    var params = {
        q: '#TodosOsDiasEu', 
        result_type: 'recent',
        lang: 'pt-br'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            var retweetId = data.statuses[0].id_str;
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                if (err) {
                    console.log('Deu algo errado ao retweetar...');
                }
            });
        }
        else {
          console.log('Algo errado ao procurar');
        }
    });
}

retweet();
setInterval(retweet, 3000000);

var favoriteTweet = function(){
  var params = {
      q: '#nodejs, #Nodejs',
      result_type: 'recent',
      lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err,data){

    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);
    if(typeof randomTweet != 'undefined'){
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        if(err){
          console.log('Erro ao favoritar');
        }
        else{
          console.log('Sucesso ao favoritar');
        }
      });
    }
  });
}
favoriteTweet();
setInterval(favoriteTweet, 3600000);

function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};