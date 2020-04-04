import { gql } from 'apollo-server-express';
import userModel from './models';

export const typeDefs = gql`

  input CreateUserInput {
    id: Int
    name: String
    age: Int
    email: String
    friends: [Int]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    email: String
    friends: [User]
  }

  type Query {
    users: [User]
    # posts: [Post]
    # airplanes: [Airplane]
  }
`

export const resolvers = {
  Query: {
    users() {
      return userModel.list()
    }
  },

  // other resolvers...
  Mutation: {
    createUser(source, args) {
      return userModel.create(args.input)
    }
  },

  User: {
    friends(source) {
      if(!source.friends || !source.friends.length) {
        return;
      }

      return Promise.all(
        source.friends.map(({id}) => userModel.find(id))
      );
    }
  }
}