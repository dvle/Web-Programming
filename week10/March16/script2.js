const jsString = {
 "students": [
  {
   "name": "John",
   "age": 20,
   "major": "Computer Science",
   "details": {
    "year": "Sophomore",
    "semester": "Fall"
   },
   "grades": {
    "webProgramming": "A",
    "python": "B+",
    "database": "A-"
   }
  },
  {
   "name": "Emma",
   "age": 21,
   "major": "Information Technology",
   "details": {
    "year": "Junior",
    "semester": "Spring"
   },
   "grades": {
    "webProgramming": "A-",
    "python": "A",
    "database": "B+"
   }
  },
  {
   "name": "Michael",
   "age": 22,
   "major": "Software Engineering",
   "details": {
    "year": "Senior",
    "semester": "Fall"
   },
   "grades": {
    "webProgramming": "B+",
    "python": "A",
    "database": "A"
   }
  }
 ]
}

let students = jsString;
console.log(data.students[0].name);
console.log(data.students[1].major);
data.students.forEach(student => {
  console.log(student.name);
});