import pb from "@/lib/pocketbase";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profiles, setProfiles] = useState([]);

  async function getProfiles() {
    try {
      const resultList = await pb.collection("cendrawasih_users").getFullList({
        expand: "email,username",
      });
      setProfiles(resultList);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Profile Detail</h1>
      {profiles.length > 0 ? (
        <div className="list-group">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>Username: {profile.username}</h5>
                <p>Email: {profile.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No profiles found.</p>
      )}
    </div>
  );
}
