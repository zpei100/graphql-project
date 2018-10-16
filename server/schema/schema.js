const { Students, Classes } = require('../../db/schema');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

//id is temporary, until a client with post feature is implemented, we will rely on id to do queries

const fakeClassData = [
  { id: 1, name: 'math', roster: [1, 5, 8] },
  { id: 2, name: 'english', roster: [1, 2, 4, 5, 6] },
  { id: 3, name: 'science', roster: [1, 3, 6, 7, 9] }
];

const fakeStudentData = [
  { id: 1, age: 18, name: 'john' },
  { id: 2, age: 20, name: 'ken' },
  { id: 3, age: 21, name: 'mary' },
  { id: 4, age: 19, name: 'jake' },
  { id: 5, age: 17, name: 'guy' },
  { id: 6, age: 16, name: 'mary' },
  { id: 7, age: 21, name: 'tim' },
  { id: 8, age: 20, name: 'lucy' },
  { id: 9, age: 19, name: 'kyle' }
];

// fakeStudentData.forEach(student => {
//   new Students({ id: student.id, age: student.age, name: student.name }).save();
// });

// fakeClassData.forEach(cls => {
//   new Classes({ id: cls.id, name: cls.name, roster: cls.roster }).save();
// });

const student = new GraphQLObjectType({
  name: 'student',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: {type: GraphQLInt},
    classes: {
      type: new GraphQLList(cls),
      resolve: function(parent, args) {
        return new Promise(function(resolve, reject) {
          Classes.find({}, function(err, data) {
            resolve(data.filter((cls) => cls.roster.includes(parent.id)));
          })
        })
      }
    }
  })
});

const cls = new GraphQLObjectType({
  name: 'class',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    roster: {type: new GraphQLList(GraphQLInt)},
    students: {
      type: new GraphQLList(student),
      resolve: function(parent, args) {
        return new Promise(function(resolve, reject) {
          Students.find({}, function(err, students) {
            console.log('students found: ', students)
            resolve (students.filter(student => parent.roster.includes(student.id)));
          })
        })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    students: {
      type: new GraphQLList(student),
      resolve: () => {
        return Students.find({});
      }
    },
    classes: {
      type: new GraphQLList(cls),
      resolve: () => Classes.find({})
    },
    student: {
      type: student,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return new Promise(function (resolve, reject) {
          Students.find({id: args.id},function(err, data) {
            resolve(data[0])
          })
        }) 
      }
    },
    studentName: {
      type: student,
      args: {
        name: {type: GraphQLString}
      },
      resolve: (parent, args) => {
        return new Promise(function(resolve, reject) {
          Students.find({name: args.name}, function(err, data) {
            resolve(data[0])
          })
        })
      }
    }
  },
  class: {
    type: cls,
    args: {
      id: { type: GraphQLInt }
    },
    type: GraphQLInt,
    resolve: (parent, args) => {
      return new Promise(function(resolve, reject) {
        Classes.find({id: args.id}, function(err, data) {
          resolve(data[0])
        })
      })
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
