import React, { useRef, useState } from "react";
import "./profile.css";

export default function ProfilePage() {
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef();

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="profile-modal">
      <div className="profile-header">
        <span>PERSONAL DETAIL</span>
      </div>
      <div className="profile-photo-section">
        <div className="profile-photo">
          {photo ? (
            <img src={photo} alt="Profile" />
          ) : (
            <span className="profile-avatar">&#128100;</span>
          )}
        </div>
        <button
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Photo
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handlePhotoChange}
        />
        <a href="#" className="change-password">
          Change Password
        </a>
      </div>
      <form className="profile-form">
        <div className="profile-row">
          <div className="profile-field">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="profile-field">
            <label>Last Name</label>
            <input type="text" />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-field">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className="profile-field">
            <label>Mobile Number</label>
            <input type="text" />
          </div>
        </div>
        <div className="profile-section-label">ADDRESS</div>
        <div className="profile-row">
          <div className="profile-field">
            <label>Street</label>
            <input type="text" />
          </div>
          <div className="profile-field">
            <label>Address Locality</label>
            <input type="text" />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-field">
            <label>District</label>
            <input type="text" />
          </div>
          <div className="profile-field">
            <label>Region</label>
            <input type="text" />
          </div>
        </div>
        <div className="profile-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
