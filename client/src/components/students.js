import React, { Component } from 'react';
import { GET_STUDENTS } from '../query/query';
import { ApolloConsumer, Query } from 'react-apollo';

export class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  render() {
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <button
              onClick={async () => {
                var {
                  data: { students }
                } = await client.query({ query: GET_STUDENTS });
                this.setState({ students });
              }}
            >
              CLICK ME TO REFETCH INFO
            </button>
          )}
        </ApolloConsumer>

        <ul>
          {this.state.students.map(student => (
            <li>{JSON.stringify(student)}</li>
          ))}
        </ul>

        <Query query={GET_STUDENTS}>
          {({ loading, error, data: { students } }) => {
            if (error) return <h1>There was an error in your query</h1>;
            if (loading) return <h1>Loading ...</h1>;

            return (
              <ul>
                {students.map(student => (
                  <li key={student.id}>
                    <li>Student ID: {student.id}</li>
                    <li>Student Name: {student.name}</li>
                    <li>Student Age: {student.age}</li>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}
