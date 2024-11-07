import { Col, Row } from "antd";
import "./Feedback.scss";
import FeedbackCard from "./FeedbackCard";
import { useEffect, useState } from "react";
// import api from "../../../../config/axios";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  // const getFeedback = async () => {
  //   try {
  //     const response = await api.get("/api/Review/GetAllFeedback");

  //     let data = response.data.$values.reverse();

  //     setFeedback(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   getFeedback();
  // }, []);

  const data = [
    {
      userName: "john_doe",
      title: "Exploring JavaScript Basics",
      description: "A beginner's guide to understanding variables, loops, and functions in JavaScript."
    },
    {
      userName: "jane_smith",
      title: "React Component Design",
      description: "Tips and best practices for designing reusable components in React applications."
    },
    {
      userName: "tech_guru",
      title: "API Integration with Axios",
      description: "Learn how to use Axios to fetch and manipulate data from external APIs in your projects."
    },
    {
      userName: "dev_master",
      title: "Getting Started with Firebase",
      description: "An introduction to Firebase for building scalable backend solutions for web applications."
    },
    {
      userName: "coder123",
      title: "Introduction to CSS Flexbox",
      description: "Understanding the basics of Flexbox and how to create responsive layouts with CSS."
    }
  ];
  

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
          {data.length > 0 ? (
            data.map((item, index) => (
              <Row key={index} style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <FeedbackCard
                    userName={`Customer: ${item.userName}`}
                
                    title={`Product: ${item.title}`}
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
