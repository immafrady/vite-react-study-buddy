const fs = require('fs');

const str = fs.readFileSync('./中国近现代史纲要.txt', { encoding: 'utf8' });
const lines = str.split('\n');

const result = {
  judge: [],
  multiple: [],
  single: []
};

let cache = {};
let type = '';
const keys = ['A: ', 'B: ', 'C: ', 'D: '];

for (const line of lines) {
  if (line.length) {
    if (line.startsWith('正确答案: ')) {
      const answer = line.replace('正确答案: ', '');
      type = 'judge';
      if (answer === '对') {
        cache.answer = 'Y'
      } else if (answer === '错') {
        cache.answer = 'X'
      } else {
        cache.answer = answer
        type = answer.length > 1 ? 'multiple' : 'single'
      }
    } else {
      let flag = false;
      for (const key of keys) {
        if (line.startsWith(key)) {
          cache[key[0]] = line.replace(key, '');
          flag = true;
          break
        }
      }
      if (!flag) {
        // 否则只可能是问题了
        cache.problem = line
      }
    }
  } else {
    // 结束
    if (Array.isArray(result[type])) {
      result[type].push(cache);
      cache = {}
      type = ''
    } else {
      console.log('error: ',type, JSON.stringify(cache));
    }
  }
}
fs.writeFileSync('./judge.json', JSON.stringify(result.judge, null, 2));
fs.writeFileSync('./single.json', JSON.stringify(result.single, null, 2));
fs.writeFileSync('./multiple.json', JSON.stringify(result.multiple, null, 2));
