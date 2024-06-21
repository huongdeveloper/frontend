import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container } from "react-bootstrap";
import "./Planning.scss"
import { searchQueryAPI } from '../../services/api';
import { useEffect, useState } from 'react';

const Planning = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            try {
                const response = await searchQueryAPI(searchQuery);
                console.log('Search results:', response.data);
                setSearchResults(response.data);

            } catch (error) {
                console.error('Search error:', error);
            }
            setSearchQuery('');
        }
    };

    useEffect(() => {
        // Cập nhật tọa độ Hà Nội ban đầu từ kết quả tìm kiếm đầu tiên
        if (searchResults.length > 0) {
            const firstResult = searchResults[0];
            setHanoiCoordinates([firstResult.Imglat, firstResult.Imglng]);
        }
    }, [searchResults]);

    const [hanoiCoordinates, setHanoiCoordinates] = useState([21.0285, 105.8542]); // Tọa độ ban đầu là Hà Nội


    const handleResultClick = (result) => {
        setSelectedResult(result); // Cập nhật kết quả được chọn
        setHanoiCoordinates([result.Imglat, result.Imglng]); // Cập nhật tọa độ trung tâm cho Map
        console.log('Selected result:', result); // In thông tin kết quả lên console
    };

    return (  // phân tích quy hoạch planning analysis
        <Container className="Planning-container">
            <div className="Planning">
                <div className="Planning-analysis">
                    <div className="Planning-analysis-icon">

                    </div>
                    <div className="Planning-analysis-title">PHÂN TÍCH QUY HOẠCH</div>
                </div>
                <button>

                </button>
            </div>
            <div className="Planning-maps">
                <div className="Planning-maps-item">
                    <div className="Planning-maps-one">
                        <div className="Planning-maps_map">
                            <MapContainer center={hanoiCoordinates} zoom={13} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {searchResults.map((result, index) => (
                                    <Marker key={index} position={[result.Imglat, result.Imglng]}>
                                        <Popup>
                                            <div>
                                                <h6>{result.Description}</h6>
                                                <p>Tọa độ: ({result.Imglat}, {result.Imglng})</p>
                                                <img src={result.ZoningImg} alt="Zoning Map" style={{ maxWidth: '100%', height: 'auto' }} />
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                            <div className="Planning-maps_clear">

                            </div>
                        </div>
                    </div>
                    <div className="Planning-maps-two">
                        <div className="Planning-maps_map">

                            <div className="Planning-maps_clear">


                            </div>
                        </div>
                    </div>
                    <div className="Planning-maps-father">
                        <div className="Planning-maps_map">

                            <div className="Planning-maps_clear">

                            </div>
                        </div>
                    </div>
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
                        {searchResults.map((result, index) => (
                            <tr key={index} onClick={() => handleResultClick(result)}>
                                <td>{index + 1}</td>
                                <td>{result.Description}</td>
                                <td>{result.Imglat}</td>
                                <td>{result.Imglng}</td>
                                <td>{result.Imgwidth}</td>
                                <td>{result.Imgheight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </Container>
    )
}

export default Planning;