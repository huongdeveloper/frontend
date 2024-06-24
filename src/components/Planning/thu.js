import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Container } from "react-bootstrap";
import "./Planning.scss";
import { searchQueryAPI } from '../../services/api';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const ImageOverlayComponent = ({ imageUrl, bounds, opacity }) => {
    const map = useMap();
    const overlayRef = useRef(null);

    useEffect(() => {
        if (imageUrl && bounds) {
            const overlay = L.imageOverlay(imageUrl, bounds, { opacity }).addTo(map);
            overlayRef.current = overlay;

            map.flyToBounds(bounds);
        }

        return () => {
            if (overlayRef.current) {
                map.removeLayer(overlayRef.current);
            }
        };
    }, [map, imageUrl, bounds, opacity]);

    return null;
};

const Planning = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [overlayImages, setOverlayImages] = useState([null, null, null]);
    const [overlayBounds, setOverlayBounds] = useState([null, null, null]);
    const [opacities, setOpacities] = useState([1, 1, 1]);
    const [hanoiCoordinates, setHanoiCoordinates] = useState([21.0285, 105.8542]);
    const [mapHeight, setMapHeight] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Số lượng dữ liệu hiển thị trên mỗi trang

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            try {
                const response = await searchQueryAPI(searchQuery);
                setSearchResults(response.data);

                if (response.data.length > 0) {
                    handleResultClick(response.data[0]);
                }
            } catch (error) {
                console.error('Search error:', error);
            }
            setSearchQuery('');
        }
    };

    const handleResultClick = (result) => {
        setSelectedResult(result);
        setHanoiCoordinates([result.Imglat, result.Imglng]);

        const northWest = [result.Imglat + 0.01, result.Imglng - 0.01];
        const southEast = [result.Imglat - 0.01, result.Imglng + 0.01];
        const bounds = [northWest, southEast];

        setOverlayImages([result.ZoningImg, result.ZoningImg, result.ZoningImg]);
        setOverlayBounds([bounds, bounds, bounds]);

        // Reset phân trang về trang đầu tiên
        setCurrentPage(0);
    };

    const handleOpacityChange = (index, newValue) => {
        const newOpacities = [...opacities];
        newOpacities[index] = newValue / 100;
        setOpacities(newOpacities);
    };

    const toggleMapHeight = () => {
        setMapHeight(mapHeight === 1 ? 2 : mapHeight === 2 ? 3 : 1);
    };

    const scrollUp = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const scrollDown = () => {
        if ((currentPage + 1) * itemsPerPage < searchResults.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCloseOverlay = (index) => {
        const newOverlayImages = [...overlayImages];
        const newOverlayBounds = [...overlayBounds];

        newOverlayImages[index] = null;
        newOverlayBounds[index] = null;

        setOverlayImages(newOverlayImages);
        setOverlayBounds(newOverlayBounds);
    };

    const calculateDisplayRange = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, searchResults.length);
        return [startIndex, endIndex];
    };

    useEffect(() => {
        if (searchResults.length > itemsPerPage) {
            setCurrentPage(0);
        }
    }, [searchResults, itemsPerPage]);

    const maps = [
        { id: 0, className: 'Planning-maps-one' },
        { id: 1, className: 'Planning-maps-two' },
        { id: 2, className: 'Planning-maps-father' },
    ];

    // const emptyRowsCount = itemsPerPage - searchResults.length % itemsPerPage;

    return (  // phân tích quy hoạch planning analysis
        <Container className="Planning-container">
            <div className="Planning">
                <div className="Planning-analysis">
                    <div className="Planning-analysis-icon">

                    </div>
                    <div className="Planning-analysis-title">PHÂN TÍCH QUY HOẠCH</div>
                </div>
                <button onClick={toggleMapHeight}>

                </button>
            </div>
            <div className={`Planning-maps height-${mapHeight}`}>
                <div className="Planning-maps-item">
                    {maps.map(map => (
                        <div key={map.id} className={map.className}>
                            <div className="Planning-maps_map">
                                <MapContainer center={hanoiCoordinates} zoom={13} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {overlayBounds[map.id] && (
                                        <ImageOverlayComponent
                                            imageUrl={overlayImages[map.id]}
                                            bounds={overlayBounds[map.id]}
                                            opacity={opacities[map.id]}
                                        />
                                    )}
                                </MapContainer>
                                <>
                                    {overlayBounds[map.id] && (
                                        <Box sx={{ position: 'absolute', top: 10, right: 10, height: 300 }} className="slider-container">
                                            <Slider
                                                orientation="vertical"
                                                value={opacities[map.id] * 100}
                                                min={0}
                                                max={100}
                                                step={1}
                                                onChange={(e, newValue) => handleOpacityChange(map.id, newValue)}
                                                valueLabelDisplay="auto"
                                                aria-labelledby="opacity-slider"
                                            />
                                        </Box>
                                    )}
                                    <div className="Planning-maps_clear">
                                        <button onClick={() => handleCloseOverlay(map.id)}>

                                        </button>
                                    </div>
                                </>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="Planning-search-vector">
                <form className="Planning-search" onSubmit={handleSearchSubmit}>
                    <input placeholder="Nhập Quận, huyện cần tìm"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearchSubmit(e);
                            }
                        }}
                    />
                    <button type="submit" >

                    </button>
                </form>
                <div className="Planning-vector">

                    {searchResults.length > 0 && currentPage > 0 && (
                        <button className='Planning-vector_scrollUp' onClick={scrollUp}>

                        </button>
                    )}
                    {searchResults.length > 0 && (currentPage + 1) * itemsPerPage < searchResults.length && (
                        <button className='Planning-vector_scrollDown' onClick={scrollDown}>

                        </button>
                    )}
                    {searchResults.length === 0 && (
                        <button className='Planning-vector_scrollDown' onClick={scrollDown}>


                        </button>
                    )}

                </div>
            </div>
            <div className="Planning-table">
                <table className="Planning-table_data" border="1">
                    <thead>
                        <tr>
                            <th className='Planning-table_th'>STT</th>
                            <th>Huyện</th>
                            <th>Tọa độ</th>
                            <th>Tọa độ</th>
                            <th>Tọa độ</th>
                            <th>Tọa độ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.length > 0 &&
                            searchResults.slice(...calculateDisplayRange()).map((result, index) => (
                                <tr key={index} onClick={() => handleResultClick(result)}>
                                    <td>{index + 1 + currentPage * itemsPerPage}</td>
                                    <td>{result.Description}</td>
                                    <td>{result.Imglat}</td>
                                    <td>{result.Imglng}</td>
                                    <td>{result.OtherCoordinates1}</td>
                                    <td>{result.OtherCoordinates2}</td>
                                </tr>
                            ))}
                        {searchResults.length === 0 && Array.from({ length: itemsPerPage }).map((_, index) => (
                            <tr key={index}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </Container>
    )
}

export default Planning;