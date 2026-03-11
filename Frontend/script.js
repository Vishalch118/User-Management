async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",                               //sends data to server
    headers: {
      "Content-Type": "application/json"          //data is in json format
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();             //reply from backend

  console.log("LOGIN RESPONSE:", data);

  // store user data
  localStorage.setItem("user", JSON.stringify(data)); 

  // redirect based on role
  if (data.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "blog.html";
  }
}


async function loadUsers() {

  const response = await fetch("http://localhost:5000/admin/users"); 
  const users = await response.json();

  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach(user => {                       //for each user a table row with their permission is displayed.

    const row = `
      <tr>
        <td>${user.name}</td>

        <td>
          <input 
            type="radio" 
            name="perm_${user.id}"
            ${user.permission === "read" ? "checked" : ""}
            onclick="updatePermission(${user.id}, 'read')"
          >
        </td>

        <td>
          <input 
            type="radio" 
            name="perm_${user.id}"
            ${user.permission === "write" ? "checked" : ""}
            onclick="updatePermission(${user.id}, 'write')"
          >
        </td>

        <td>
          <input 
            type="radio" 
            name="perm_${user.id}"
            ${user.permission === "none" ? "checked" : ""}
            onclick="updatePermission(${user.id}, 'none')"
          >
        </td>

      </tr>
    `;

    table.innerHTML += row;

  });

}

async function updatePermission(id, permission) {

  await fetch("http://localhost:5000/admin/permission", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      permission: permission
    })
  })

  alert("Permission Updated")

}

async function loadBlog() {

  const res = await fetch("http://localhost:5000/blog")
  const blog = await res.json()

  const user = JSON.parse(localStorage.getItem("user"))

  const blogContent = document.getElementById("blogContent")
  const editBox = document.getElementById("editBox")
  const updateBtn = document.querySelector("button")

  blogContent.innerText = blog.content
  editBox.value = blog.content

  // permission control
  if (user.permission === "read") {
    editBox.disabled = true
    updateBtn.style.display = "none"
  }

  if (user.permission === "none") {
    blogContent.innerText = "Access Denied"
    editBox.style.display = "none"
    updateBtn.style.display = "none"
  }

}

async function updateBlog() {

  const user = JSON.parse(localStorage.getItem("user"))
  const content = document.getElementById("editBox").value

  await fetch("http://localhost:5000/blog/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: content,
      user: user.name
    })
  })

  alert("Blog Updated")

  loadBlog()

}

