import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useAxios from "../utils/useAxios";
import Swal from "sweetalert2";
const MapComponent = ({
  isEditable,
  officeLocation,

  setIsEditable,
}) => {
  const [latitude, setLatitude] = useState(officeLocation.latitude);
  const [longitude, setLongitude] = useState(officeLocation.longitude);
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  const handleOk = async () => {
    setLoading(true);
    try {
      const response = await api.post("v1/office/change-office-location", {
        latitude,
        longitude,
      });

      setLoading(false);

      Swal.fire({
        title: "Office Location updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      console.error(error.response.data.error);
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return <Marker position={[latitude, longitude]}></Marker>;
  };

  return (
    <div className="row">
      <div className={`${isEditable ? "col-lg-8" : "col-lg-12"}`}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{
            height: "500px",
            width: "100%",
          }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance; // Store the map instance
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div className="col-lg-4">
        {isEditable && (
          <div>
            <label className="form-label">Latitude: </label>
            <input
              type="text"
              className="form-control"
              value={latitude}
              readOnly
              // onChange={(e) => {
              //   setLatitude(e.target.value);
              // }}
            />
            <br />
            <label className="form-label">Longitude: </label>
            <input
              type="text"
              className="form-control"
              value={longitude}
              readOnly
              // onChange={(e) => {
              //   setLongitude(e.target.value);
              // }}
            />
            {!loading ? (
              <div className="w-100 mt-3">
                <button className="btn btn-info me-3" onClick={handleOk}>
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    setIsEditable(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-info me-3"
                  disabled
                  onClick={handleOk}
                >
                  Update
                </button>
                <button
                  disabled
                  className="btn btn-danger"
                  onClick={(e) => {
                    setIsEditable(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
