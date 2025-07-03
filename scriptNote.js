//This we will use to take input from uset and store it in local storage 

let Notes = [];

//Creating a separate datatype of note
let status_options = ['pending', 'rejected', 'completed'];

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
            <div class = 'task-slab' id ='task${Notes.length - 1}'>
                <div class = 'name-task'>${note.task}</div>
                <div class = 'status'>${note.status}</div>
            </div>`;


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
    }

    localStorage.removeItem('notes'); // Remove this line if you want to keep the notes in local storage
}


loadNotes();


