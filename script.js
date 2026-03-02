// Database simulation using localStorage
class Database {
  static getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
  }

  static addStudent(student) {
    const students = this.getStudents();
    student.id = this.generateId();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    return student;
  }

  static getStudentById(id) {
    const students = this.getStudents();
    return students.find(s => s.id === id);
  }

  static getVisits() {
    return JSON.parse(localStorage.getItem('visits')) || [];
  }

  static addVisit(visit) {
    const visits = this.getVisits();
    visit.id = this.generateId();
    visit.timestamp = new Date().toISOString();
    visits.push(visit);
    localStorage.setItem('visits', JSON.stringify(visits));
    return visit;
  }

  static getVisitsByStudentId(studentId) {
    const visits = this.getVisits();
    return visits.filter(v => v.studentId === studentId);
  }

  static generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

// QR Code Generator
class QRGenerator {
  static generate(studentId, elementId) {
    const qrElement = document.getElementById(elementId);
    if (qrElement) {
      QRCode.toCanvas(qrElement, studentId, { width: 200 }, (error) => {
        if (error) console.error(error);
      });
    }
  }
}

// Form handlers
document.addEventListener('DOMContentLoaded', function() {
  // Register form handler
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const student = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        age: document.getElementById('age').value,
        grade: document.getElementById('grade').value,
        section: document.getElementById('section').value,
        department: document.getElementById('department').value
      };

      const newStudent = Database.addStudent(student);
      
      // Show success message and QR code
      document.getElementById('registration-success').classList.remove('hidden');
      document.getElementById('student-id').textContent = newStudent.id;
      QRGenerator.generate(newStudent.id, 'student-qr');
      
      // Scroll to QR code section
      document.getElementById('qr-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Visit form handler
  const visitForm = document.getElementById('visit-form');
  if (visitForm) {
    // Check for student ID in URL (from QR code)
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    
    if (studentId) {
      const student = Database.getStudentById(studentId);
      if (student) {
        document.getElementById('student-id-field').value = studentId;
        document.getElementById('full-name').value = `${student.firstName} ${student.lastName}`;
        document.getElementById('age').value = student.age;
        document.getElementById('grade-section').value = `${student.grade} - ${student.section}`;
        document.getElementById('department').value = student.department;
      }
    }

    visitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const visit = {
        studentId: document.getElementById('student-id-field').value,
        reason: document.getElementById('reason').value,
        diagnosis: document.getElementById('diagnosis').value,
        treatment: document.getElementById('treatment').value
      };
      const savedVisit = Database.addVisit(visit);
      
      // Show success message with visit ID
      document.getElementById('visit-success').classList.remove('hidden');
      document.getElementById('visit-id').textContent = savedVisit.id;
      visitForm.reset();
});
  }
  // Directory initialization and filter handler
  const filterForm = document.getElementById('filter-form');
  if (filterForm) {
    // Load all students initially
    const students = Database.getStudents();
    displayStudents(students);

    filterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const department = document.getElementById('filter-department').value;
      const grade = document.getElementById('filter-grade').value;
      const section = document.getElementById('filter-section').value;
      
      let filteredStudents = Database.getStudents();
      
      if (department) {
        filteredStudents = filteredStudents.filter(s => s.department === department);
      }
      
      if (grade) {
        filteredStudents = filteredStudents.filter(s => s.grade === grade);
      }
      
      if (section) {
        filteredStudents = filteredStudents.filter(s => s.section === section);
      }
      
      displayStudents(filteredStudents);
    });
  }
function displayStudents(students) {
    const tableBody = document.getElementById('student-table-body');
    tableBody.innerHTML = '';
    
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.age}</td>
        <td>${student.grade}-${student.section}</td>
        <td>${student.department}</td>
        <td>
          <a href="profile.html?id=${student.id}" class="text-blue-500 hover:underline">View</a>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
});