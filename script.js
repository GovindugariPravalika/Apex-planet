// Show section function
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  
  // Scroll to section
  document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

// Form Validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let valid = true;
  
  // Name validation
  const name = document.getElementById('name').value.trim();
  if (name === '') {
    document.getElementById('nameError').innerText = 'Name is required.';
    valid = false;
  } else {
    document.getElementById('nameError').innerText = '';
  }
  
  // Email validation
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('emailError').innerText = 'Enter a valid email address.';
    valid = false;
  } else {
    document.getElementById('emailError').innerText = '';
  }
  
  // Message validation
  const message = document.getElementById('message').value.trim();
  if (message.length < 20) {
    document.getElementById('messageError').innerText = 'Message must be at least 20 characters.';
    valid = false;
  } else {
    document.getElementById('messageError').innerText = '';
  }
  
  if (valid) {
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  }
});

// To-Do List Functions
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="task-actions">
      <button class="btn btn-success" onclick="toggleComplete(this)">
        <i class="fas fa-check"></i>
      </button>
      <button class="btn btn-danger" onclick="deleteTask(this)">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  
  document.getElementById('taskList').appendChild(li);
  input.value = '';
}

function deleteTask(button) {
  button.closest('li').remove();
}

function toggleComplete(button) {
  const taskItem = button.closest('li');
  taskItem.classList.toggle('completed');
}

function filterTasks(status) {
  const tasks = document.querySelectorAll('#taskList li');
  tasks.forEach(task => {
    switch(status) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'active':
        task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
        break;
    }
  });
}

function clearCompleted() {
  const completedTasks = document.querySelectorAll('#taskList li.completed');
  completedTasks.forEach(task => task.remove());
}

// Gallery Functions
function addImage() {
  const url = document.getElementById('imgUrl').value.trim();
  if (url === '') {
    alert('Please enter an image URL!');
    return;
  }
  
  const galleryItem = document.createElement('div');
  galleryItem.className = 'gallery-item';
  galleryItem.innerHTML = `
    <img src="${url}" alt="Gallery image">
    <button class="delete-btn" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add click to view functionality
  galleryItem.querySelector('img').addEventListener('click', function() {
    openModal(url);
  });
  
  document.getElementById('galleryContainer').appendChild(galleryItem);
  document.getElementById('imgUrl').value = '';
}

// Modal Functions
function openModal(url) {
  document.getElementById('modalImage').src = url;
  document.getElementById('imageModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Initialize with some tasks
window.onload = function() {
  const initialTasks = [
    'Create a new project',
    'Design the user interface',
    'Implement functionality',
    'Test the application',
    'Deploy to production'
  ];
  
  initialTasks.forEach(task => {
    document.getElementById('taskInput').value = task;
    addTask();
  });
  
  // Add event listeners to gallery items for modal
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
      openModal(this.src);
    });
  });
};