import { useEffect, useState } from 'react';

const TextAnalyzer = () => {
  const [charCounter, setCharCounter] = useState(0);
  const [longestWord, setLongestWord] = useState('');
  const [input, setInput] = useState('');
  const [wordList, setWordList] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [searchCollection, setSearchCollection] = useState([]);

  // basic style objects
  const searchWordStyle = {
    margin: '1em',
    border: '1px solid white',
    borderRadius: '10px',
    padding: '10px',
  };

  // ending punctuation filter
  const checkForPunctuation = (word) => {
    const punctuationMarks = [',', '.', '!', '?', ';', ':', '-', '(', ')'];
    if (punctuationMarks.includes(word[word.length - 1])) {
      return word.slice(word[0], word.length - 1);
    } else {
      return word;
    }
  };
  // getting the list of words that are searched based on the starting letter
  useEffect(() => {
    let localCollection = [];
    if (searchWord !== '') {
      const words = [...wordList].map((word) => checkForPunctuation(word));
      for (let word of words) {
        if (word.startsWith(searchWord)) {
          localCollection.push(word);
        }
      }
    }
    setSearchCollection(localCollection);
  }, [searchWord]);

  //check for single char count ignoring spaces
  useEffect(() => {
    const charWordCount = input.trim().split(' ');
    let totalLength = 0;
    for (let word of charWordCount) {
      totalLength += word.length;
    }
    setCharCounter(totalLength);
  }, [input]);

  // storing words
  useEffect(() => {
    const words = input.trim().split(' ');
    setWordList(words);
  }, [input]);

  // getting the longest word
  useEffect(() => {
    const words = [...wordList].map((word) => checkForPunctuation(word));
    const longestWord = words.sort((a, b) => b.length - a.length)[0];
    setLongestWord(longestWord);
    setWordCount(words.length);
  }, [wordList]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Text Analyzer</h1>
      <input
        type="text"
        placeholder="Enter Search Term"
        value={searchWord}
        style={{ marginBottom: '16px' }}
        onChange={(e) => setSearchWord(e.target.value)}
      ></input>
      <div
        style={{
          marginTop: '8px',
          marginBottom: '8px',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {searchCollection.map((word, index) => {
          return (
            <div key={index} style={searchWordStyle}>
              {word}
            </div>
          );
        })}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter something"
        style={{ height: '100px', border: 'none', listStyle: 'none' }}
      ></textarea>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Characters:</h1>
          <h2>{charCounter}</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Longest Word:</h1>
          <h2>{longestWord}</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Word Count:</h1>
          <h2>{wordCount}</h2>
        </div>
      </div>
    </div>
  );
};
export default TextAnalyzer;
