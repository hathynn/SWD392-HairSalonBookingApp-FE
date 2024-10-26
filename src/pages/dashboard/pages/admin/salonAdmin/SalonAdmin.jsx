import React, { useEffect, useState } from "react";
import "./SalonAdmin.scss";
import { Card, Col, message, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../../../../../config/axios";

function SalonAdmin() {
  const [salon, setSalon] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCombos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/Admin/PrintAllSalon");
      const data = response.data.data;
      setSalon(data);
    } catch (error) {
      message.error("Can not loading salon data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCombos();
  }, []);

  return (
    <div className="salon-manage">
      <Row gutter={[16, 16]}>
        {loading ? (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            style={{ margin: "5em auto" }}
          />
        ) : (
          salon.map((salons) => (
            <Col span={6} key={salons.id}>
              <Card
                cover={<img src={salons.image} alt={salons.salonName} />}
                className="salon-manage__card"
              >
                <div className="salon-manage__card__upper">
                  <p className="salon-manage__card__upper__title">
                    {salons.salonName}
                  </p>
                  <p className="salon-manage__card__upper__subtitle">
                    Location: {salons.address}
                  </p>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default SalonAdmin;
