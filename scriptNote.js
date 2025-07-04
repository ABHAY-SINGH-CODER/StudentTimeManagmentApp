//This we will use to take input from uset and store it in local storage 

let Notes = [];
let taskSelector = document.querySelectorAll('.task-slab');


//Creating a separate datatype of note
let status_options = ['pending', 'completed'];

class noteslab{

    constructor(task = 'Untitled',description = 'Not defined',status = `${status_options[0]}`) {
        this.task = task;
        this.description = description;
        this.status = status; // status can be 'pending', 'in-progress', or 'completed'
    }
}

//Expecting noteslab as parameter
function render_a_note(note){

    let listofnotes = document.getElementById('listRender');
    listofnotes.innerHTML += `
            <div class = 'task-slab' id ='${note.task}'>
                <div class = 'name-task'>${note.task}</div>
                <div class = 'status'>${note.status}</div>
            </div>`;


    
   
}


function render_graphic(note){
    let Anote = document.getElementById(`${note.task}`);
    console.log(Anote); // For debugging purpose
     Anote.querySelector('.status').textContent = note.status;
    if (note.status === status_options[0]) {
        Anote.style.borderLeft = "5px solid yellow";
        Anote.querySelector('.status').backgroundColor = "yellow" // Update the status in the task slab
    }
    
    if (note.status === status_options[1]) {
        Anote.style.borderLeft = "5px solid green";
        Anote.querySelector('.status').style.backgroundColor = "green"
        Anote.querySelector('.status').style.color = "white"; // Change text color to white for better visibility
    
    }
}

function Updatestate(){
taskSelector.forEach((task, index) => {
    task.addEventListener('click', () => {
        let displayDescription = document.getElementById('display-description');
        displayDescription.innerHTML = `
            <h2>${Notes[index].task}</h2>
            <p>${(Notes[index].description).replace(/\n/g, "<br>")}</p>
            <p>Status: ${Notes[index].status}</p>

            <button id="close-btn">Close</button>
            <button id="complete-btn">Complete</button>
            <button id="delete-btn">Delete</button>
        `;

        displayDescription.style.display = 'flex'; // Show the description popup

        let closeButton = document.getElementById('close-btn');
        closeButton.addEventListener('click', () => {
            displayDescription.style.display = 'none'; // Hide the description popup
            render_graphic(Notes[index]); // Update the task slab graphic
        });

        let completeButton = document.getElementById('complete-btn');
        completeButton.addEventListener('click', () => {  
            Notes[index].status = status_options[1]; // Change status to 'completed'
            localStorage.setItem('notes', JSON.stringify(Notes)); // Update local storage
            task.querySelector('.status').textContent = Notes[index].status; // Update the status in the task slab
            displayDescription.querySelector('p:nth-child(3)').textContent = `Status: ${Notes[index].status}`; // Update the displayed status

        render_graphic(Notes[index]); // Update the task slab graphic
        });

        let deleteButton = document.getElementById('delete-btn');   
        deleteButton.addEventListener('click', () => {
            Notes.splice(index, 1); // Remove the note from the array
            localStorage.setItem('notes', JSON.stringify(Notes)); // Update local storage
            task.remove(); // Remove the task slab from the UI
            displayDescription.style.display = 'none'; // Hide the description popup

        render_graphic(Notes[index]); // Update the task slab graphic
        });

    });
});
}

// Function to take input from user 

function addNote(){
  

    console.log(task, description);//For debugging purpose
}

let saveButton = document.getElementById('save-btn');

saveButton.addEventListener('click', () => {

    let task = document.getElementById('task-heading').value;
    let description = document.getElementById('task-description-box').value;

    if (task === '' || description === '') {
        alert('Please fill in all fields.');
        return;
    }

    else {
        let newNote = new noteslab(task, description);
        Notes.push(newNote);
        render_a_note(newNote);
        //clear the input fields after saving
        document.getElementById('task-heading').value = '';
        document.getElementById('task-description-box').value = '';

        // Save the notes to local storage
        localStorage.setItem('notes', JSON.stringify(Notes));
        render_graphic(newNote);

        taskSelector = document.querySelectorAll('.task-slab');
        Updatestate(); // Update the event listeners for the new task slabs
    }

} );

console.log(Notes); // For debugging purpose
console.log(Notes.length)

function loadNotes() {
    // Load notes from local storage
    let savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        Notes = JSON.parse(savedNotes);
        Notes.forEach(note => render_a_note(note));
        taskSelector = document.querySelectorAll('.task-slab');
        taskSelector.forEach((task, index) => {
            render_graphic(Notes[index]);
        });
    }

     // Remove this line if you want to keep the notes in local storage


}


loadNotes();





Updatestate();