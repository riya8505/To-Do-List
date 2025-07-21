
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const timeDisplay = document.getElementById("time-display");
    const dateDisplay = document.getElementById("date-display");

 function updateDateTime() {
  const now = new Date();
  timeDisplay.textContent = now.toLocaleTimeString();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  dateDisplay.textContent = `${day}/${month}/${year}`;
}
    setInterval(updateDateTime, 1000);
    updateDateTime();

    function addTodo() {
      const text = input.value.trim();
      if (!text) return;

      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
        <span contenteditable="false">${text}</span>
        <div>
          <button class="btn btn-sm btn-success me-1" onclick="markDone(this)"><i class="fa-solid fa-circle-check"></i></button>
          <button class="btn btn-sm btn-warning me-1" onclick="editTodo(this)"><i class="fa fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="removeTodo(this)"><i class="fas fa-trash"></i></button>
        </div>
      `;
      list.appendChild(li);
      input.value = "";
    }

    function markDone(button) {
      const item = button.closest(".todo-item");
      item.classList.toggle("done");
    }

    function removeTodo(button) {
      const item = button.closest(".todo-item");
      item.remove();
    }

    function editTodo(button) {
      const item = button.closest(".todo-item");
      const span = item.querySelector("span");
      const editing = span.getAttribute("contenteditable") === "true";

      if (editing) {
        span.setAttribute("contenteditable", "false");
        button.innerHTML = '<i class="fa fa-edit"></i>';
      } else {
        span.setAttribute("contenteditable", "true");
        span.focus();

        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(span);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);

        button.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      }
    }

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") addTodo();
    });

    // Background Image Rotation
    const bgImages = [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1748025476920-7b79e80a0a7e?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1503264116251-35a269479413"
        // "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab"
    ];
    let currentBg = 0;
    setInterval(() => {
      currentBg = (currentBg + 1) % bgImages.length;
      document.body.style.background = `url('${bgImages[currentBg]}') no-repeat center center/cover`;
    }, 3000);
