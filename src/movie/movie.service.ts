import { Injectable, Inject, BadRequestException } from '@nestjs/common';

@Injectable()
export class MovieService {

  constructor(
    @Inject('Neo4jDriver') private readonly neo4jDriver,
  ) { }

  public async findAll(): Promise<any> {
    const session = this.neo4jDriver.session();
    return session
      .run('MATCH (m:Movie) RETURN m.title as title, m.released as released, m.tagline as tagline')
      .then((result) => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

}