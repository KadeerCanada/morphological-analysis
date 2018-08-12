const kuromoji = require('kuromoji');
const fs = require('fs');

class Markov {
  constructor() {
    this.data = {};
  }

  add(words) {
    for (let i = 0; i <= words.length; i++) {
      let now = words[i];
      if (now === undefined) { now = null; }
      let prev = words[i - 1];
      if (prev === undefined) { prev = null; }

      if (this.data[prev] === undefined) {
        this.data[prev] = [];
      }
      this.data[prev].push(now);
    }
  }

  sample(word) {
    let words = this.data[word];
    if (words === undefined) { words = []; }

    return words[Math.floor(Math.random() * words.length)];
  }

  make() {
    const sentence = [];
    let word = this.sample(null);
    while (word) {
      sentence.push(word);
      word = this.sample(word);
    }

    return sentence.join('');
  }
}

const markov = new Markov();

kuromoji
  .builder({ dicPath: 'node_modules/kuromoji/dict' })
  .build((err, tokenizer) => {
    if (err) { throw err; }

    fs.readFile('ashitaka.txt', 'utf8', (_err, data) => {
      const lines = data.split('\n');
      lines.forEach((line) => {
        const tokens = tokenizer.tokenize(line);
        const words = tokens.map(token => token.surface_form);
        markov.add(words);
      });

      for (let i = 0; i < 10; i++) {
        console.log(markov.make());
      }
    });
  });
