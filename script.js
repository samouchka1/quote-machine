
let quotesData;

// const colors = [
//   '#16a085',
//   '#27ae60',
//   '#2c3e50',
//   '#f39c12',
//   '#e74c3c',
//   '#9b59b6',
//   '#FB6964',
//   '#342224',
//   '#472E32',
//   '#BDBB99',
//   '#77B1A9',
//   '#73A857'
// ];

let currentQuote = '',
  currentAuthor = '';

function getQuotes() {

  return $.ajax({ //all the magic of this app happens with $.ajax()
    headers: {
      Accept: 'application/json'
    },

    url:
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    
      success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes); // JSON.parse() converts string to JS object.
        console.log('quotesData');
        console.log(quotesData);
      }
    }

  });
}

function getRandomQuote() { //this is where the random selection process happens
  return quotesData.quotes[ //jsonQuotes = parsed data from json string; "quotes" key from object(parsed data); [index]
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr( //Tweet intent
    'href',
    'https://twitter.com/intent/tweet'
    //  + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').text(randomQuote.author);
  });



  // const color = Math.floor(Math.random() * colors.length);

  // $('#quote-box').animate({
  //     backgroundColor: colors[color],
  //     color: colors[color]
  //   },
  //   1000
  // );

  // $('.button').animate({
  //     backgroundColor: colors[color]
  //   },
  //   1000
  // );
}

$(document).ready(function () {  //"On first load" requirement from challenge - use $(document).ready()
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
