cons* form =
  document.querySelector("*note-form");

const noteInput =
  *ocument.querySelector("#note-input*);

const categorySelect =
  docum*nt.querySelector("#note-category")*

const notesList =
  document.que*ySelector("#notes-list");

let not*s = [];

function render() {

  no*esList.textContent = "";

  notes.*orEach(note => {

    const li =
 *    document.createElement("li");
*    li.classList.add("note-card");*
    li.classList.add(
      `cate*ory-${note.category}`
    );

    *onst text =
      document.createE*ement("p");

    text.textContent *
      note.text;

    const categ*ry =
      document.createElement(*small");

    category.textContent*=
      note.category;

    const *ate =
      document.createElement*"p");

    date.textContent =
    * note.createdAt;

    const delete*tn =
      document.createElement(*button");

    deleteBtn.textConte*t =
      "Delete";

    li.append*hild(text);
    li.appendChild(cat*gory);
    li.appendChild(date);
 *  li.appendChild(deleteBtn);

    *otesList.appendChild(li);

  });

*
  form.addEventListener(
  "s*bmit",
  event => {

    event.pre*entDefault();

    const newNote =*{

      id: Date.now(),

      te*t:
        noteInput.value,

     *category:
        categorySelect.v*lue,

      createdAt:
        new*Date().toLocaleString()

    };

 *  notes.push(newNote);

    render*);

    noteInput.value = "";

  }*);
  const errorMessage*=
  document.querySelector("#error*message");

const noteCount =
  do*ument.querySelector("#note-count")*
  function*updateCount() {

  if (notes.lengt* === 0) {

    noteCount.textContent =
      "You have no notes yet.";

  }

  else if (notes.length === 1) {

    noteCount.textContent =
      "You have 1 note.";

  }

  else {

    noteCount.textContent =
      `You have ${notes.length} notes.`;

  }

}
deleteBtn.addEventListener(
  "click",
  () => {

    notes =
      notes.filter(
        n => n.id !== note.id
      );

    render();
    updateCount();

  }
);
updateCount();
const searchInput =
 document.querySelector(
   "#search-input"
 );
 function saveNotes() {

 localStorage.setItem(
   "notes",
   JSON.stringify(notes)
 );

}
