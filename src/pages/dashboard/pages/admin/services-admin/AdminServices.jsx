import React, { useEffect, useState } from 'react'
import api from '../../../../../config/axios';
import { Card, Col, message, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './AdminServices.scss'

function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllServices = async () => {
        setLoading(true);
        try {
            const response = await api.get("/Combo/getAll-comboServices");
            const data = response.data.data;
            setServices(data);
        } catch (error) {
            message.error("Can not loading services data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllServices();
    }, []);
    return (
        <div className="services-manage">
            <Row gutter={[16, 16]}>
                {loading ? (
                    <Spin
                        indicator={<LoadingOutlined spin />}
                        size="large"
                        style={{ margin: "5em auto" }}
                    />
                ) : (
                    services.map((service) => (
                        <Col span={6} key={service.id}>
                            <Card
                                cover={<img src={service.image} alt={service.comboServiceName} />}
                                className="services-manage__card"
                            >
                                <div className="services-manage__card__upper">
                                    <p className="services-manage__card__upper__title">
                                        {service.comboServiceName}
                                    </p>
                                    <p className="services-manage__card__upper__subtitle">
                                        {service.comboDetails.map(detail => detail.content).join(", ")}
                                    </p>
                                    <p className="services-manage__card__upper__subtitle">
                                        Price: {service.price}
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    )
}

export default AdminServices