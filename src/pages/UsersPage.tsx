// 📁 src/pages/UsersPage.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Utilisateur");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe(); // nettoyage à la destruction du composant
  }, []);

  const handleAddUser = async () => {
    if (!name || !email) return alert("Nom et email requis");
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        role,
        status: "Actif",
        createdAt: new Date(), // Stocke une Date JS, Firestore convertira en Timestamp
      });
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Erreur ajout:", error);
    }
  };

  // Fonction utilitaire pour afficher la date correctement
  const formatDate = (createdAt) => {
    if (!createdAt) return "Non défini";

    // createdAt peut être un objet Timestamp Firestore ou une Date JS native
    // Si Timestamp Firestore, il a une méthode toDate()
    let dateObj;
    if (createdAt.toDate) {
      dateObj = createdAt.toDate();
    } else if (createdAt instanceof Date) {
      dateObj = createdAt;
    } else {
      return "Non défini";
    }

    return dateObj.toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>

      {/* Formulaire d'ajout */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Ajouter un utilisateur</h2>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded mr-2"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-4 py-2 rounded mr-2"
        >
          <option>Administrateur</option>
          <option>Gestionnaire</option>
          <option>Analyste</option>
          <option>Utilisateur</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des utilisateurs */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Rôle</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>
                <td className="p-2">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
