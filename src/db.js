import knexJs from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from './knexfile';

import { caseConversionPlugin } from '@utils/case-plugin';

const knex = knexJs(knexConfig);
const db = bookshelf(knex);

db.plugin(caseConversionPlugin);

export default db;
