import React, { useState } from 'react';
import { Col, Row, Steps } from 'antd';
import './Booking.scss';
import PersonalInfo from './PersonalInfo';
import ServiceCategory from './ServiceCategory';

function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({ name: '', phone: '' });
  const [service, setService] = useState('');

  const steps = [
    {
      title: 'Confirm Info',
      description: 'Xác nhận thông tin cá nhân',
      component: (
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          onNext={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: 'Choose Service',
      description: 'Chọn dịch vụ làm tóc',
      component: (
        <ServiceCategory
          service={service}
          setService={setService}
          onNext={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: 'Complete',
      description: 'Hoàn thành đặt lịch',
      component: (
        <StyleSheetList
          personalInfo={personalInfo}
          service={service}
          // onSubmit={handleSubmit}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    const bookingData = { ...personalInfo, service };
    try {
      // await axios.post('/api/booking', bookingData);
      alert('Đặt lịch thành công!');
    } catch (error) {
      alert('Đặt lịch thất bại!');
    }
  };

  return (
    <div className="booking">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="booking__img"
      />
      <div className="booking__text">Booking An Appointment.</div>
      <div>
        <Row className="booking__container">
          <Col span={6} className="booking_container__left">
            <Steps
              progressDot
              current={currentStep}
              direction="vertical"
              items={steps.map((step) => ({
                title: step.title,
                description: step.description,
              }))}
            />
          </Col>
          <Col span={18} className="booking_container__right">
            {steps[currentStep].component}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Booking;
