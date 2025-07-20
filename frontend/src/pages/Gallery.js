import React from "react";
import "../components/Gallery.css";

const imageList = [
  { src: "/images/blooddonationpics.jpg", title: "College Donation Camp" },
  { src: "/images/BloodDonationMedicalTeam.jpeg", title: "Our Medical Team" },
  { src: "/images/BloodStorageFacility.jpeg", title: "Storage Facility" },
  { src: "/images/poster1.jpg", title: "Blood Awareness Poster" },
  // add more as needed
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2>📸 Gallery</h2>
      <p>Explore our donation drives, facilities, and team</p>
      <div className="gallery-grid">
        {imageList.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img.src} alt={img.title} />
            <p>{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

