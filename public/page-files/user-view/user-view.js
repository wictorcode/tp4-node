function getAuthToken() {
    return localStorage.getItem("authToken")
}
async function fetchUsers() {
    try {
        const token = getAuthToken();
        
        if (!token) {
            console.error("Aucun token d'authentification trouvé");
            alert("Vous devez vous connecter pour accéder à cette page");
            window.location.href = "/pages/login"; // Rediriger vers la page de connexion
            return;
        }

        const response = await fetch("/api/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error("Token invalide ou expiré");
                alert("Session expirée, veuillez vous reconnecter");
                localStorage.removeItem("authToken");
                sessionStorage.removeItem("authToken");
                window.location.href = "/login";
                return;
            }
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const users = await response.json();
        populateUserTable(users);

    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        alert("Erreur lors du chargement des utilisateurs");
    }
}

function populateUserTable(users) {
    const table = document.getElementById("userViewTable");
    
    const tbody = table.querySelector("tbody");

    users.forEach(user => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
           <td>${user._id}</td>
           <td>${user.name || user.username || "N/A"}</td>
           <td>${user.email}</td>
           <td>
               <select data-user-id="${user._id}" onchange="changeRole(this)">
                   <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                   <option value="moderator" ${user.role === 'moderator' ? 'selected' : ''}>Moderator</option>
                   <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
               </select>
           </td>
           <td>
               <button onclick="deleteUser('${user._id}')" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">
                   Supprimer
               </button>
           </td>
       `;
        
        if (tbody) {
            tbody.appendChild(row);
        } else {
            table.appendChild(row);
        }
    });
}

function init() {
    const token = getAuthToken();
    if (!token) {
        alert("Vous devez vous connecter pour accéder à cette page");
        window.location.href = "/pages/login";
        return;
    }

    fetchUsers();
}
document.addEventListener("DOMContentLoaded", init);

function refreshUserList() {
    fetchUsers();
}