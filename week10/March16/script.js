let jsonData = `{
  "students": [
    {
      "name": "John",
      "major": "Computer Science"
    },
    {
      "name": "Emma",
      "major": "Information Technology"
    },
    {
      "name": "Michael",
      "major": "Software Engineering"
    }
  ]
}`

let students = JSON.parse(jsonData);

console.log(data.students[0].name);
console.log(data.students[1].major);
data.students.forEach(student => {
  console.log(student.name);
});