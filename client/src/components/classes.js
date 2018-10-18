import React, { Component } from 'react';
import { GET_CLASSES } from '../query/query';
import { ApolloConsumer, Query } from 'react-apollo';


export class Classes extends Component {
  render() {
    return (
      <div>
        <Query query={GET_CLASSES}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading list of classes</h1>;
            if (error)
              return (
                <h1>There seems to be something wrong with your request</h1>
              );

            return (
              <ul>
                {data.classes.map(cls => {
                  return (
                    <li key={cls.id}>
                      <li>class ID: {cls.id}</li>
                      <li>class Name: {cls.name}</li>
                      Student Roster: <ul>
                        {cls.students.map(student => {
                          return (
                            <li key={student.id}>
                              Name: {student.name}
                            </li>
                          )
                        }
                      )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}
