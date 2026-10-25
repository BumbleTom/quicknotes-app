const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Load notes from localStorage
let notes =
  JSON.parse(localStorage.getItem("notes")) || [];

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem(
    "notes",
    JSON.stringify(notes)
  );
}

// Update note count
function updateCount() {
  const total = notes.length;

  if (total === 0) {
    noteCount.textContent =
      "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent =
      "You have 1 note.";
  } else {
    noteCount.textContent =
      `You have ${total} notes.`;
  }
}

// Render notes
function render(searchText = "") {
  notesList.textContent = "";

  const filteredNotes = notes.filter(note =>
    note.text
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  if (
    searchText.trim() !== "" &&
    filteredNotes.length === 0
  ) {
    const item = document.createElement("li");

    item.textContent =
      "No notes match your search.";

    notesList.appendChild(item);

    updateCount();
    return;
  }

  filteredNotes.forEach(note => {
    const li = document.createElement("li");

    li.classList.add("note-card");
    li.classList.add(
      `category-${note.category}`
    );

    const noteText =
      document.createElement("p");

    noteText.textContent = note.text;

    const category =
      document.createElement("span");

    category.classList.add(
      "category-label"
    );

    category.textContent =
      note.category.toUpperCase();

    const date =
      document.createElement("small");

    date.textContent =
      `Created: ${note.createdAt}`;

    const deleteButton =
      document.createElement("button");

    deleteButton.textContent =
      "Delete";

    deleteButton.addEventListener(
      "click",
      () => {
        notes = notes.filter(
          n => n.id !== note.id
        );

        saveNotes();
        render(searchInput.value);
      }
    );

    li.appendChild(noteText);
    li.appendChild(category);
    li.appendChild(
      document.createElement("br")
    );
    li.appendChild(date);
    li.appendChild(
      document.createElement("br")
    );
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });

  updateCount();
}

// Add new note
form.addEventListener(
  "submit",
  event => {
    event.preventDefault();

    const text =
      noteInput.value.trim();

    const category =
      categorySelect.value;

    if (text === "") {
      errorMessage.textContent =
        "Please type a note first.";
      return;
    }

    if (text.length > 200) {
      errorMessage.textContent =
        "Notes must be 200 characters or fewer.";
      return;
    }

    errorMessage.textContent = "";

    const newNote = {
      id: Date.now(),
      text: text,
      category: category,
      createdAt:
        new Date().toLocaleString()
    };

    notes.push(newNote);

    saveNotes();

    render(searchInput.value);

    noteInput.value = "";
  }
);

// Search notes
searchInput.addEventListener(
  "input",
  event => {
    render(event.target.value);
  }
);

// Initial render
render();