import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Services.scss';
import { selectUser } from '../../redux/features/counterSlice';
import { useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Image, message, notification } from 'antd';
import api from '../../config/axios';

function Services() {
    const user = useSelector(selectUser);
    const nav = useNavigate();
    const [comboService, setComboService] = useState([]);

    const handleClick = () => {
        notification.info({
            message: "Information",
            description: "You need to login first.",
            placement: "topRight",
            duration: 3,
        });
    };

    const getComboService = async () => {
        try {
            const response = await api.get('/Combo/getAll-comboServices');
            const data = response.data;
            setComboService(data.data);
        } catch (error) {
            message.error('Failed to fetch combo services');
            console.error(error);
        }
    };

    useEffect(() => {
        getComboService();
    }, []);

    return (
        <div className="services-page">
            <div className="hero">
                <img
                    src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
                    alt="maverick barber"
                    className="hero__img"
                />
                <div className="hero__overlay-text">Maverick Haircuts & Grooming</div>
                {user ? (
                    <div className="hero__button">
                        <ConfigProvider theme={{ components: { Button: { defaultColor: "black", defaultBg: "#FAA300", defaultBorderColor: "#FAA300", defaultHoverBorderColor: "black", defaultHoverColor: "white", defaultHoverBg: "black", defaultActiveBg: "#FAA300", defaultActiveBorderColor: "#FAA300", defaultActiveColor: "black" } } }}>
                            <Button onClick={() => nav("/booking")} className="hero__button__buttons">
                                Book Now
                            </Button>
                        </ConfigProvider>
                    </div>
                ) : (
                    <div className="hero__button">
                        <ConfigProvider theme={{ components: { Button: { defaultColor: "black", defaultBg: "#FAA300", defaultBorderColor: "#FAA300", defaultHoverBorderColor: "black", defaultHoverColor: "white", defaultHoverBg: "black", defaultActiveBg: "#FAA300", defaultActiveBorderColor: "#FAA300", defaultActiveColor: "black" } } }}>
                            <Button className="hero__button__buttons" onClick={handleClick}>
                                Book Now
                            </Button>
                        </ConfigProvider>
                    </div>
                )}
            </div>
            <div className="category-section">
                <div className="category">
                    <h2 className="category__title">Hair Services</h2>
                    <div className="category__images">
                        {comboService.map((service) => (
                            <div key={service.id} className="image-container">
                                <Image
                                    width={530}
                                    height={400}
                                    style={{ marginBottom: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                                src={service.image}
                                alt={service.comboServiceName}
                                preview={false}
                                />
                                <span className="image-caption">{service.comboServiceName}</span>
                                <span className="image-price">${service.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="spa-category">
                    <h2 className="spa-category__title">Spa Services</h2>
                    <div className="spa-category__images">
                        {comboService.map((service) => (
                            <div key={service.id} className="spa-image-container">
                                <Image
                                    width={530}
                                    height={400}
                                    style={{ marginBottom: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                                    src={service.image}
                                    alt={service.comboServiceName}
                                    preview={false}
                                />
                                <span className="spa-image-caption">{service.comboServiceName}</span>
                                <span className="spa-image-price">${service.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
