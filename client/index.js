Courses  = new Meteor.Collection('courses');
Stdcres  = new Meteor.Collection('studentscourses');
Students = new Meteor.Collection('students');

Meteor.subscribe("students");
