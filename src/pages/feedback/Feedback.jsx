import { Col, Row } from "antd";
import "./Feedback.scss";
import FeedbackCard from "./FeedbackCard";
import { useEffect, useState } from "react";
import api from "../../config/axios";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const getFeedback = async () => {
    try {
      const response = await api.get("/Admin/ViewListFeedback");

      let data = response.data.data;

      setFeedback(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

 
  

  return (
    <div className="feedback">
      <div className="about-us">
        <img
          src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
          alt="maverick barber"
          className="about-us__img"
        />
      </div>
      <div className="about-us__text">Our Feedback.</div>
      <Row
        style={{
          minHeight: "100vh",
        }}
      >
        <Col span={12} md={5} sm={0}>
          {/* Sidebar placeholder */}
        </Col>
        <Col span={24} md={16} sm={24}>
          {feedback.length > 0 ? (
            feedback.map((item, index) => (
              <Row key={index} style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <FeedbackCard
                    userName={`Customer: ${item.userName}`}
                
                    title={item.title}
                    description={item.description}
            
                  />
                </Col>
              </Row>
            ))
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Col span={12} md={4} sm={0}>
          {/* Sidebar placeholder */}
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;
