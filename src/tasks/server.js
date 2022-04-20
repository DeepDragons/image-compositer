require('dotenv').config();
require('ts-node').register();
const path = require('path');
require(path.resolve(__dirname, '../server/index.ts'));
