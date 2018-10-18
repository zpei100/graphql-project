import React, { Component } from 'react';
import { Students } from './students';
import { Classes } from './classes';
import { Nav } from './nav'

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Students />
        <Classes />
      </div>
    );
  }
}

export default App;

/*
Features:

1. welcome: introduction to application: manages classes, students, and instructors roster
2. Nav bar: shows semester (implement last) => classes => teachers and student rosters
3. Can add courses, change teacher, add and drop student roster
4. Add student into database




ULTIMATE VERSION: 
Allows users to create their own custom database, with tables and everything






*/