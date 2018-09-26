import { Module, Global } from '@nestjs/common';
import { Neo4jFactory } from './neoj4';

@Global()
@Module({
  providers: [Neo4jFactory],
  exports: [Neo4jFactory]
})
export class DatabaseModule {}

