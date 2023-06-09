// Get the containers
const containers = document.querySelectorAll('.container');
const [sourceContainer, targetContainer] = containers;

// Get the reset button
const resetBtn = document.getElementById('resetBtn');

// Store the dragged item
let draggedItem = null;

// Add event listeners to the containers
sourceContainer.addEventListener('dragstart', dragStart);
sourceContainer.addEventListener('dragend', dragEnd);
targetContainer.addEventListener('dragover', dragOver);
targetContainer.addEventListener('drop', drop);
resetBtn.addEventListener('click', reset);

// Drag start event handler
function dragStart(e) {
  draggedItem = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.innerHTML);
  e.target.classList.add('dragging');
}

// Drag end event handler
function dragEnd(e) {
  draggedItem.classList.remove('dragging');
}

// Drag over event handler
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

// Drop event handler
function drop(e) {
  e.preventDefault();
  targetContainer.innerHTML = e.dataTransfer.getData('text/html');
  draggedItem.parentNode.removeChild(draggedItem);
  draggedItem = null;
  showSuccessMessage();
}

// Reset button click event handler
function reset() {
  sourceContainer.innerHTML = `
    <div class="item" draggable="true">Item 1</div>
    <div class="item" draggable="true">Item 2</div>
    <div class="item" draggable="true">Item 3</div>
  `;
  targetContainer.innerHTML = '<h2>Drop Here</h2>';
}

// Display success message
function showSuccessMessage() {
  const successMsg = document.createElement('div');
  successMsg.textContent = 'Item dropped successfully!';
  successMsg.classList.add('success-message');
  targetContainer.appendChild(successMsg);

  // Remove the success message after 2 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 2000);
}
