const kuromoji = require('kuromoji');

kuromoji
  .builder({ dicPath: 'node_modules/kuromoji/dict' })
  .build((err, tokenizer) => {
    if (err) { throw err; }
    const path = tokenizer.tokenize('今日はいい天気ですね');
    console.log(path);
  });
