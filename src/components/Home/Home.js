import './Home.scss'
// import { CiCirclePlus } from "react-icons/ci";
// import { GrSubtractCircle } from "react-icons/gr";
// import { BsArrowLeftCircle } from "react-icons/bs";
// import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { GiGolfFlag } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { LuShare2 } from "react-icons/lu";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { RiSubtractLine } from "react-icons/ri";
// import { IoLocationSharp } from "react-icons/io5";
import { BsBookmarkFill } from "react-icons/bs";
import { CiDollar } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useDropzone } from 'react-dropzone';
import 'rc-slider/assets/index.css';
import 'leaflet/dist/leaflet.css';
// import { calc } from 'antd/es/theme/internal';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { message } from 'antd';
const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 56px)',
};
const center = [21.136663, 105.7473446];

function Home() {
  const [image, setImage] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState(center);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [currentSize, setCurrentSize] = useState({ width: 0, height: 0 });
  const [mapZoom, setMapZoom] = useState(14);
  const [value, setValue] = useState(50);
  const [selectedPosition, setSelectedPosition] = useState(null); // State để lưu trữ vị trí được chọn trên bản đồ

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  const handleLocationArrowClick = () => {
    if (!selectedPosition) {
     message.success('Vui lòng chọn vị trí bạn muốn tìm')
    }else{
      const [lat, lng] = selectedPosition;
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  };

  const increaseValue = () => {
    setValue((prevValue) => Math.min(prevValue + 1, 100));
  };

  const decreaseValue = () => {
    setValue((prevValue) => Math.max(prevValue - 1, 0));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(reader.result);
        setImageSize({ width: img.width, height: img.height });
        setCurrentSize({ width: img.width, height: img.height });
      };
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  useEffect(() => {
    if (imageSize.width && imageSize.height) {
      const newWidth = imageSize.width * scale;
      const newHeight = imageSize.height * scale;
      setCurrentSize({ width: newWidth, height: newHeight });
    }
  }, [scale, imageSize]);

  useEffect(() => {
    const handleZoomEnd = () => {
      const zoom = mapRef.current.getZoom();
      setMapZoom(zoom);
    };

    if (mapRef.current) {
      mapRef.current.on('zoomend', handleZoomEnd);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off('zoomend', handleZoomEnd);
      }
    };
  }, []);

  const calculateImageBounds = useCallback((center, size) => {
    const halfWidth = size.width / 2;
    const halfHeight = size.height / 2;
    return [
      [center[0] - halfHeight / 111320, center[1] - halfWidth / 111320],
      [center[0] + halfHeight / 111320, center[1] + halfWidth / 111320]
    ];
  }, []);

  const mapRef = useRef();

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
      }
    });
    return null;
  };

  return (
    <div className='home-container'>
      {/* Slider Container */}
      <div className="slider-container" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, padding: 10, borderRadius: 4 }}>
        <div className='slider-container-range'>
          <div className='nav-icon-arrow'>
            <FiPlus size={22} onClick={increaseValue} />
          </div>
          <input
            type="range"
            className="slider"
            orientation="vertical"
            value={value}
            onChange={handleSliderChange}
            min="0"
            max="100"
            style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
          />
          <div className='nav-icon-arrow'>
            <RiSubtractLine size={22} onClick={decreaseValue} />
          </div>
          <div className='nav-icon'>
            <div className='nav-icon-arrow'>
              <FaArrowRotateLeft size={20} />
            </div>
            <div className='nav-icon-arrow' onClick={handleLocationArrowClick}>
              <FaLocationArrow size={18} />
            </div>
            <div className='nav-icon-flag-delete'>
              <GiGolfFlag size={24} />
              <MdDeleteForever size={22} />
            </div>
            <div className='nav-icon-arrow'>
              <FaPaintBrush size={18} />
            </div>
            <div className='nav-icon-arrow'>
              <LuShare2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Header Container */}
      <div className="container-header" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000, padding: 10, borderRadius: 4 }}>
        <div className='container-header-select'>
          <div className='slider-container-range'>
            <BsBookmarkFill />
            <select id="mySelect">
              <option value="option1" selected>Thửa đã lưu</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className='slider-container-location'>
            <GrLocation />
            <span>Phường 26, Quận Bình Thạnh, TP. Hồ Chí Minh</span>
          </div>

          <div className='slider-container-range'>
            <CiDollar size={24} />
            <select id="mySelect">
              <option value="option1" selected>Hiển thị giá</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
        <div className='container-header-option'>
          <div className='container-header-option-item'>Quy hoạch 2030</div>
          <div className='container-header-option-item'>Quy hoạch 2024</div>
          <div className='container-header-option-item'>QH Xây dựng</div>
          <div className='container-header-option-item'>Quy hoạch khác</div>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        style={mapContainerStyle}
        center={center}
        zoom={mapZoom}
        whenCreated={map => { mapRef.current = map; }}
      >
        <MapEvents />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedPosition && ( // Hiển thị marker tại vị trí đã chọn trên bản đồ
          <Marker position={selectedPosition} icon={L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          })}>
            <Popup>Vị trí đã chọn</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Home;