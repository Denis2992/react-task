import React, {useEffect, useState} from "react";

const apiUrl = 'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(1);
    max = Math.floor(100);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [quotes, setQuotes] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [prevQuote, setPrevQuote] = useState(null);
  const [showPrevQuote, setShowPrevQuote] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error('Error');
          }
        })
        .then(data => {
            setQuotes(data.map(el => el.quote));
            setCurrentQuote(data.map(el => el.quote)[getRandomIntInclusive(1, 100)])
        })
        .catch(err => console.log('Error', err))
  }, [])

  const handleNewQuote = () => {
      setPrevQuote(currentQuote);
      setShowPrevQuote(false);
      setCurrentQuote(quotes[getRandomIntInclusive(1, 100)]);
  };

  const handlePrevQuote = () => {
      setShowPrevQuote(true);
  };

  if (quotes) {
      return (
          <div style={{margin: 32}}>
              {showPrevQuote ? (
                  <p>{prevQuote}</p>
              ) : (
                  <p>{currentQuote}</p>
              )}
              <button
                  type="button"
                  className="btn btn-primary"
                  style={{marginRight: 32}}
                  onClick={handleNewQuote}
              >
                  New quote
              </button>
              <button
                  type="button"
                  className="btn btn-success"
                  onClick={handlePrevQuote}
              >
                  Previous quote
              </button>
          </div>
      )
  } else {
      return (
          <p>Loading...</p>
      )
  }
}

export default App;
