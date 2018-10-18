import { gql } from 'apollo-boost';

export const GET_STUDENTS = gql`
  query {
    students {
      name
      id
      age
    }
  }
`

export const GET_CLASSES = gql`
  query {
    classes {
      name
      id
      students {
        name
      }
    }
  }
`
