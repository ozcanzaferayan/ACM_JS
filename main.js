function fetchStudent() {
    var input = document.getElementById("myInput");
    var  studentName = input.value;
    fetch("http://localhost:3005/students", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ name: studentName })
    })
      .then((response) => response.json())
      .then(function(student){
          addStudent(student);
          input.value = "";
          input.focus();
      });
}

function addStudent(student){
    var div = document.getElementById("studentsContainer");
    var template = getTemplate(student);
    div.innerHTML += template;
}

function getStudents() {
    fetch("http://localhost:3005/students")
      .then((response) => response.json())
      .then((data) => initStudents(data));
}

function initStudents(myList) {
  var div = document.getElementById("studentsContainer");
  var template = "";
  for (var i = 0; i < myList.length; i++) {
    var student = myList[i];
    template += getTemplate(student);
  }
  div.innerHTML = template;
}

function getTemplate(student) {
return `<li>${student.name} 
<button onClick="deleteStudent(${student.id})">Sil</button>
</li>`;
}

function deleteStudent(studentId){
    fetch(`http://localhost:3005/students/${studentId}`, {
        method: 'DELETE'
    })
      .then((response) => response.json())
      .then(function(data){
          getStudents();
      });
}


document.addEventListener("DOMContentLoaded", function(event) {
    getStudents();
});