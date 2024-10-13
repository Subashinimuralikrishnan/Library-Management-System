document.getElementById('manage-books').addEventListener('click', function() {
    window.location.href = '/manage-books.html';
});

document.getElementById('view-students').addEventListener('click', function() {
    fetch('/students', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = "<h3>Registered Students:</h3>";
        data.students.forEach(student => {
            resultsDiv.innerHTML += `<p>${student.name} - ${student.email}</p>`;
        });
    });
});