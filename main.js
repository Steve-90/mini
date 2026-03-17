document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const dateElement = document.getElementById('current-date');
  const studentListElement = document.getElementById('student-list');
  const totalCountElement = document.getElementById('total-count');
  const presentCountElement = document.getElementById('present-count');

  // 1. Theme Logic
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') body.classList.add('dark-mode');

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // 2. Date Logic
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
  dateElement.textContent = today.toLocaleDateString('ko-KR', options);

  // 3. Attendance Logic
  const students = [
    { id: 1, name: '김철수' },
    { id: 2, name: '이영희' },
    { id: 3, name: '박민수' },
    { id: 4, name: '최지우' },
    { id: 5, name: '정다은' },
    { id: 6, name: '강현우' },
    { id: 7, name: '윤서아' }
  ];

  function updateStats() {
    const presentCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
    presentCountElement.textContent = presentCount;
  }

  function renderStudents() {
    studentListElement.innerHTML = '';
    students.forEach(student => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${student.name}</td>
        <td><input type="checkbox" data-id="${student.id}"></td>
      `;
      tr.querySelector('input').addEventListener('change', updateStats);
      studentListElement.appendChild(tr);
    });
    totalCountElement.textContent = students.length;
  }

  renderStudents();
});
