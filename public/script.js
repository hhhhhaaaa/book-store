const editBtn = document.querySelector('.edit-btn');
const editForm = document.querySelector('.edit-form');
const bookDisplay = document.querySelector('.book-display');
const saveBtn = document.querySelector('.save-btn');

if (editBtn) {
  editBtn.addEventListener('click', function() {
    bookDisplay.style.display = 'none';
    editForm.style.display = 'block';
  });
}

if (saveBtn) {
  saveBtn.addEventListener('click', function() {
    bookDisplay.style.display = 'block';
    editForm.style.display = 'none';
  });
}
