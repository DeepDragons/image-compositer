export default {
  entities: [__dirname + '/src/models'],
  entitiesTs: [__dirname + '/src/models/**/*.ts'],
  type: 'sqlite',
  dbName: 'dev.sqlite',
  registerRequestContext: false
};
