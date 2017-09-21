const _ = require('lodash');

let count = 0;
module.exports = { add: add, list: list, find: find};

function add (name, content) {
	count++;
	data.push({ name: name, content: content, id: count.toString() });
}



function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}





