import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Auction.scss';
import { WidthFull } from '@mui/icons-material';

const AuctionForm = () => {
  const [formData, setFormData] = useState({
    assetName: '',
    organization: '',
    ownerName: '',
    province: '',
    district: '',
    fromDateAuction: '',
    toDateAuction: '',
    fromDateAnnouncement: '',
    toDateAnnouncement: '',
    fromPrice: '',
    toPrice: '',
    sortOption: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container className="auction-form-container">
      <div className='nav-page'>
        <label >Trang chủ</label>
        <label >Thông báo đấu giá</label>
      </div>
      <h2 className="text-center">DANH SÁCH THÔNG BÁO CÔNG KHAI VIỆC ĐẤU GIÁ</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formAssetName">
          <Form.Label column sm={2}>Tên tài sản</Form.Label>
          <Col sm={4} style={{width: '83%'}}>
            <Form.Control 
              type="text" 
              name="assetName" 
              value={formData.assetName} 
              onChange={handleChange} 
              placeholder="Tên tài sản" 
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formOrganization">
          <Form.Label column sm={2}>Tổ chức ĐGTS</Form.Label>
          <Col sm={4}>
            <Form.Control 
              as="select" 
              name="organization" 
              value={formData.organization} 
              onChange={handleChange}
            >
              <option>Tất cả</option>
              {/* Thêm các tùy chọn khác */}
            </Form.Control>
          </Col>
        <Form.Label column sm={2}>Người có tài sản</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="text" 
              name="ownerName" 
              value={formData.ownerName} 
              onChange={handleChange} 
              placeholder="Họ và tên người có tài sản" 
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDistrict">
          <Form.Label column sm={2}>Quận/huyện</Form.Label>
          <Col sm={4}>
            <Form.Control 
              as="select" 
              name="district" 
              value={formData.district} 
              onChange={handleChange}
            >
              <option>Tất cả</option>
            </Form.Control>
          </Col>
          <Form.Label column sm={2}>Tỉnh thành</Form.Label>
          <Col sm={4}>
            <Form.Control 
              as="select" 
              name="province" 
              value={formData.province} 
              onChange={handleChange}
            >
              <option>Tất cả</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDateAuction">
          <Form.Label column sm={2}>Từ ngày</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="date" 
              name="fromDateAuction" 
              value={formData.fromDateAuction} 
              onChange={handleChange}
            />
          </Col>
          <Form.Label column sm={2}>Từ ngày</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="date" 
              name="fromDateAnnouncement" 
              value={formData.fromDateAnnouncement} 
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDateAnnouncement">
        <Form.Label column sm={2}>Đến ngày</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="date" 
              name="toDateAuction" 
              value={formData.toDateAuction} 
              onChange={handleChange}
            />
          </Col>
          <Form.Label column sm={2}>Đến ngày</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="date" 
              name="toDateAnnouncement" 
              value={formData.toDateAnnouncement} 
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPriceRange">
          <Form.Label column sm={2}>Giá khởi điểm từ</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="number" 
              name="fromPrice" 
              value={formData.fromPrice} 
              onChange={handleChange} 
              placeholder="Giá khởi điểm từ" 
            />
          </Col>
          <Form.Label column sm={2}>Giá khởi điểm đến</Form.Label>
          <Col sm={4}>
            <Form.Control 
              type="number" 
              name="toPrice" 
              value={formData.toPrice} 
              onChange={handleChange} 
              placeholder="Giá khởi điểm đến" 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formSortOption">
          <Form.Label column sm={2}>Tiêu chí sắp xếp</Form.Label>
          <Col sm={4}>
            <Form.Control 
              as="select" 
              name="sortOption" 
              value={formData.sortOption} 
              onChange={handleChange}
            >
              <option>Ngày công khai việc đấu giá</option>
              {/* Thêm các tùy chọn khác */}
            </Form.Control>
          </Col>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">Tìm kiếm</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AuctionForm;
