import "../styles/profile.css";
import { useRef, useState } from "react";
import { uploadProfileImage } from "../api/auth";

type UserProfileProps = {
  name: string;
  profileImage: string | null;
  onProfileUpdated: () => Promise<void>;
};

function UserProfile({
  name,
  profileImage,
  onProfileUpdated,
}: UserProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    setMessage("");
    setError("");
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      await uploadProfileImage(file);
      await onProfileUpdated();
      setMessage("Profile image uploaded successfully!");
    } catch (error) {
      console.error(error);

      setError("Failed to upload profile image.");
    }finally{
        event.target.value = "";
    }
  };

  return (
    <section className="user-profile">
      <div className="profile-avatar">
        {profileImage ? (
          <img src={`http://127.0.0.1:8000/${profileImage}`} alt={name} />
        ) : (
          <span>{name.charAt(0).toUpperCase()}</span>
        )}
      </div>

      <div className="profile-info">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleFileChange}
        />
        <h2>Welcome Back, {name}</h2>

        <button onClick={() => fileInputRef.current?.click()}>
          Change Photo
        </button>
        {message && <p className="success-message">{message}</p>}

        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
}

export default UserProfile;
