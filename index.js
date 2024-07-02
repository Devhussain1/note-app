
const btnEl = document.getElementById("btn");
    const appEl = document.getElementById("app");

    getNotes().forEach((note) => {
      const noteEl = createNoteEl(note.id, note.content);
      appEl.insertBefore(noteEl, btnEl);
    });

    function createNoteEl(id, content) {
      const element = document.createElement("textarea");
      element.classList.add("note");
      element.placeholder = "type here";
      element.value = content;

      // Apply random background color
      element.style.backgroundColor = getRandomColor();

      element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?");
        if (warning) {
          deleteNote(id, element);
        }
      });

      element.addEventListener("input", () => {
        updateNote(id, element.value);
      });

      return element;
    }

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 14)];
      }
      return color;
    }

    function deleteNote(id, element) {
      const notes = getNotes().filter((note) => note.id != id);
      saveNote(notes);
      appEl.removeChild(element);
    }

    function updateNote(id, content) {
      const notes = getNotes();
      const target = notes.find((note) => note.id == id);
      target.content = content;
      saveNote(notes);
    }

    function addNote() {
      const notes = getNotes();
      const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
      };
      const noteEl = createNoteEl(noteObj.id, noteObj.content);
      appEl.insertBefore(noteEl, btnEl);

      notes.push(noteObj);
      saveNote(notes);
    }

    function saveNote(notes) {
      localStorage.setItem("note-app", JSON.stringify(notes));
    }

    function getNotes() {
      return JSON.parse(localStorage.getItem("note-app") || "[]");
    }

    btnEl.addEventListener("click", addNote);