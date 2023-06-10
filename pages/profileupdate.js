import React, { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";

function ProfileDetail() {
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState([]);
  const [updateError, setUpdateError] = useState([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    try {
      const record = await pb.collection("cendrawasih_users").get("RECORD_ID");
      setUsername(record.username);
      setEmail(record.email);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data profil:", error);
    }
  }

  async function updateUsername() {
    try {
      const newData = {
        username: newUsername,
      };

      await pb.collection("cendrawasih_users").update("RECORD_ID", newData);
      setUsername(newUsername);
      setEditMode(false);
      setUpdateError("");
    } catch (error) {
      setUpdateError(
        "Terjadi kesalahan saat mengupdate username: " + error.message
      );
    }
  }

  return (
    <div>
      <h2>Detail Profil</h2>
      <p>Email: {email}</p>
      {editMode ? (
        <div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={updateUsername}>Simpan</button>
          <button onClick={() => setEditMode(false)}>Batal</button>
          {updateError && <p>{updateError}</p>}
        </div>
      ) : (
        <div>
          <p>Username: {username}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default ProfileDetail;
