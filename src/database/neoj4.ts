import { v1 as neo4j } from 'neo4j-driver';

export const Neo4jFactory = {
  provide: 'Neo4jDriver',
  useFactory: (config) => {
    return neo4j.driver(config.neo4j_uri, neo4j.auth.basic(config.neo4j_user, config.neo4j_password));
  },
  inject: ['ConfigService']
};