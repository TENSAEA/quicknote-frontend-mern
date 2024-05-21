import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, fetchUserProfile } from "./userSlice";
import { selectUserById } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfileId = useSelector((state) => state.user.currentUserId);
  const userProfile = useSelector((state) =>
    selectUserById(state, userProfileId)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userProfile) {
      dispatch(fetchUserProfile(userProfileId));
    }
  }, [dispatch, userProfile, userProfileId]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name,
        email: userProfile.email,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(profile))
      .unwrap()
      .then(() => {
        // After the profile update is successful, navigate to the dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Failed to update the profile: ", error);
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Profile</h2>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label style={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          style={styles.input}
          type="text"
          id="name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <label style={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          style={styles.input}
          type="email"
          id="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <button
          style={styles.button}
          type="button"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </form>
      <div style={styles.userInfo}>
        <h3 style={styles.header}>Current User Information</h3>
        {userProfile ? (
          <>
            <p>Name: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
          </>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <button style={styles.backButton} onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "20px 0",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
  },
  userInfo: {
    textAlign: "center",
  },
  backButton: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    background: "#ff4500",
    color: "white",
    cursor: "pointer",
  },
};

export default UserProfile;
