const userList = document.getElementById('userList');
const reloadBtn = document.getElementById('reloadBtn');
const errorBox = document.getElementById('error');

async function fetchUsers() {
  userList.innerHTML = '';
  errorBox.textContent = '';

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const users = await res.json();

    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(card);
    });
  } catch (err) {
    errorBox.textContent = `❌ Failed to load users: ${err.message}`;
  }
}

// Initial fetch
fetchUsers();
reloadBtn.addEventListener('click', fetchUsers);
