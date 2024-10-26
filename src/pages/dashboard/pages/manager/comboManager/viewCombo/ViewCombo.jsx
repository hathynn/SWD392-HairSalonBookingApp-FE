import React, { useEffect, useState } from "react";
import "./ViewCombo.scss";
import { Button, Card, Col, ConfigProvider, message, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../../../../../../config/axios";

function ViewCombo() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCombos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/Combo/getAll-comboServices");
      const comboData = response.data.data;

      // Lấy chi tiết cho từng combo
      const comboDetails = await Promise.all(
        comboData.map(async (combo) => {
          const detailResponse = await api.get(
            `/Combo/get-comboServices/${combo.id}`
          );
          console.log(detailResponse);
          return { ...combo, details: detailResponse.data.data[0] };
        })
      );

      setCombos(comboDetails);
    } catch (error) {
      message.error("Không thể tải danh sách và chi tiết combo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCombos();
  }, []);

  return (
    <div className="view-combo">
      <Row gutter={[16, 16]}>
        {loading ? (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            style={{ margin: "5em auto" }}
          />
        ) : (
          combos.map((combo) => (
            <Col span={6} key={combo.id}>
              <Card
                cover={<img src={combo.image} alt={combo.comboServiceName} />}
                className="view-combo__card"
              >
                <div className="view-combo__card__upper">
                  <p className="view-combo__card__upper__title">
                    {combo.comboServiceName}
                  </p>
                  <p className="view-combo__card__upper__subtitle">
                    Price: ${combo.price}
                  </p>
                </div>
                <div className="view-combo__card__lower">
                  <p className="view-combo__card__lower__title">
                    Combo Detail:
                  </p>
                  {combo.details?.comboDetails ? (
                    combo.details?.comboDetails.map((detail) => (
                      <p
                        key={detail.comboDetailId}
                        className="view-combo__card__lower__subtitle"
                      >
                        - {detail.content} 
                      </p>
                    ))
                  ) : (
                    <p className="view-combo__card__lower__subtitle">
                      Không có mô tả
                    </p>
                  )}
                </div>
                <div className="view-combo__card__button">
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultColor: "black",
                          defaultBg: "#FAA300",
                          defaultBorderColor: "#FAA300",
                          defaultHoverBorderColor: "black",
                          defaultHoverColor: "white",
                          defaultHoverBg: "black",
                          defaultActiveBg: "#FAA300",
                          defaultActiveBorderColor: "#FAA300",
                          defaultActiveColor: "black",
                        },
                      },
                    }}
                  >
                    <Button className="view-combo__card__button__buttons">
                      Edit
                    </Button>
                  </ConfigProvider>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default ViewCombo;