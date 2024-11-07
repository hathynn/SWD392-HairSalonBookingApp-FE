import { Layout, Card, Col, Row, Tag, Space, Table, message, Button, Modal, Descriptions, Badge } from "antd";
import "./AdminDashboard.scss";
import Statistic from "antd/es/statistic/Statistic";
import { ArrowUpOutlined, DollarCircleFilled } from "@ant-design/icons";
import api from "../../../../../config/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Content } = Layout;

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    bookings: [],
  });
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [detail, setDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/Admin/GetAdminDashboard/admin-dashboard");
      const data = response.data.data;
      if (response.data.error === 0) {
        setDashboardData(data);
        setTotalRevenue(data.totalRevenue);
      } else {
        message.error(response.data.message || "Failed to fetch dashboard data.");
      }
    } catch (error) {
      message.error("An error occurred while fetching the dashboard data.");
    }
  };
  const fetchTotalCustomer = async () => {
    try {
      const response = await api.get("/Admin/CountCustomer");
      const data = response.data.data;
      if (response.data.error === 0) {
        setTotalCustomer(data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("An error occurred while fetching the dashboard data.");
    }
  };
  const getDetailBooking = async (bookingId) => {
    try {
      const response = await api.get(
        `/Booking/ViewBookingDetail?bookingId=${bookingId}`
      );
      setDetail(response.data.data);
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      message.error("Failed to load booking details.");
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchTotalCustomer();
  }, []);
  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
        title: "Services",
        dataIndex: "comboServiceName",
        key: "comboServiceName",
        render: (comboService) => (
            <div>
                {comboService.comboServiceName}
            </div>
        ),
    },
    {
      title: "Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, record) => (
        <Button
          style={{ fontWeight: "600" }}
          onClick={() => {
            showModal();
            getDetailBooking(record.id);
          }}
        >
          Detail
        </Button>
      ),
    },
  ];
  // const dataIncome = [
  //   { month: 'January', type: 'Gross Income', value: 10000 },
  //   { month: 'January', type: 'Net Income', value: 7500 },
  //   { month: 'February', type: 'Gross Income', value: 12000 },
  //   { month: 'February', type: 'Net Income', value: 8000 },
  //   { month: 'March', type: 'Gross Income', value: 15000 },
  //   { month: 'March', type: 'Net Income', value: 10500 },
  //   { month: 'April', type: 'Gross Income', value: 20000 },
  //   { month: 'April', type: 'Net Income', value: 14000 },
  //   { month: 'May', type: 'Gross Income', value: 18000 },
  //   { month: 'May', type: 'Net Income', value: 12500 },
  //   { month: 'June', type: 'Gross Income', value: 22000 },
  //   { month: 'June', type: 'Net Income', value: 16000 },
  //   { month: 'July', type: 'Gross Income', value: 25000 },
  //   { month: 'July', type: 'Net Income', value: 18000 },
  //   { month: 'August', type: 'Gross Income', value: 28000 },
  //   { month: 'August', type: 'Net Income', value: 20000 },
  //   { month: 'September', type: 'Gross Income', value: 30000 },
  //   { month: 'September', type: 'Net Income', value: 21500 },
  //   { month: 'October', type: 'Gross Income', value: 35000 },
  //   { month: 'October', type: 'Net Income', value: 25000 },
  //   { month: 'November', type: 'Gross Income', value: 40000 },
  //   { month: 'November', type: 'Net Income', value: 28500 },
  //   { month: 'December', type: 'Gross Income', value: 45000 },
  //   { month: 'December', type: 'Net Income', value: 32000 }
  // ];
  // const filteredDataIncome = dataIncome.filter(item => item.value != null);
  // const colorMap = {
  //   'Gross Income': '#4CAF50', // Green for Gross Income
  //   'Net Income': '#2196F3', // Blue for Net Income
  // };
  // const config = {
  //   data: filteredDataIncome,
  //   isGroup: true,
  //   xField: 'month',
  //   yField: 'value',
  //   seriesField: 'type',
  //   color: (type) => colorMap[type] || '#FF0000',
  //   label: {
  //     position: 'top',
  //     layout: [
  //       { type: 'interval-adjust-position' },
  //       { type: 'adjust-color' },
  //     ],
  //     offset: 8,
  //     style: {
  //       fill: '#000',
  //       fontSize: 12,
  //     },
  //   },
  //   columnStyle: {
  //     radius: [20, 20, 0, 0],
  //   },
  // };

  return (
    <Layout className="layout-dashboard">
      <Content
        style={{
          padding: "24px",
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row gutter={16}
          style={{
            marginTop: "10px",
          }}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Customer"
                value={totalCustomer}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Bookings"
                value={dashboardData.totalBookings}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Revenue"
                value={totalRevenue}
                precision={2}
                prefix={<span style={{ color: '#3f8600' }}><DollarCircleFilled /></span>}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col span={24}>
            <Card title="Bookings" bordered={false}>
              <Table columns={columns} dataSource={dashboardData.bookings} rowKey="id" />
            </Card>
          </Col>
        </Row>
        <Modal
        title="Booking Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        className="booking-table__modal"
      >
        {detail ? (
          <Descriptions bordered>
            <Descriptions.Item label="Customer Name">
              {detail.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {detail.customerPhoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {detail.paymentAmount} VND
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {dayjs(detail.bookingDate).format("YYYY-MM-DD")}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Badge
                status={detail.checked ? "success" : "processing"}
                text={detail.checked ? "Checked" : "Waiting"}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Stylist">
              {detail.stylistName}
            </Descriptions.Item>
            <Descriptions.Item label="Salon Address">
              123 ABC, D1
            </Descriptions.Item>
            <Descriptions.Item label="Service">
              {detail.comboServiceName?.length > 0 ? (
                detail.comboServiceName.map((service) => (
                  <div key={service.id}>{service.comboServiceName}</div>
                ))
              ) : (
                <p>No services available</p>
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
        {/* <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col span={24}>
            <Card title="Income Overview" bordered={false} style={{ marginTop: '16px' }}>
              <Column {...config} />
            </Card>
          </Col>
        </Row> */}
      </Content>
    </Layout>
  );
}

export default AdminDashboard