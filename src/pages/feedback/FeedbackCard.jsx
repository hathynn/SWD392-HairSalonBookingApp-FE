import React from "react";
import { Card, Rate, Image, Row, Col } from "antd";
import "./Feedback.scss";
import { FaUserCircle } from "react-icons/fa";

const FeedbackCard = ({ userName, title, description }) => {
  return (
    <Card className="cardDetail">
      <Row gutter={[16, 16]} align="bottom">
        <Col>
          <FaUserCircle className="cardDetail__icon"/>
        </Col>
        <Col flex="auto">
          <Card.Meta
            className="cardDetail__info"
            title={userName}
            description={
              <>
                <p className="cardDetail__info__name">{title}</p>
                <p className="cardDetail__info__content">{description}</p>
                
              </>
            }
          />
        </Col>
      </Row>
    </Card>
  );
};

export default FeedbackCard;
