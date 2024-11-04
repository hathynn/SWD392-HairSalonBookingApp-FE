import { Layout, Card, Col, Row, Tag, Space, Table } from "antd";
import "./AdminDashboard.scss";
import Statistic from "antd/es/statistic/Statistic";
import { ArrowUpOutlined, DollarCircleFilled } from "@ant-design/icons";
import { Column } from '@ant-design/charts';

const { Content } = Layout;

function AdminDashboard() {
    const columns = [
        {
          title: 'Services',
          dataIndex: 'services',
          key: 'services',
        },
        {
          title: 'In charge',
          dataIndex: 'in_charge',
          key: 'in_charge',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Branch',
          dataIndex: 'branch',
          key: 'branch',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Time',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'Details',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>View</a>
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          services: 'Haircut, Shaving',
          in_charge: 'Justin Bieber',
          branch: 'Lake Park',
          address: 'New York No. 1 Lake Park',
          date: '20-10-2024',
          time: '15:00'
        },
        {
          key: '2',
          services: 'Hair coloring, Hair styling',
          in_charge: 'Taylor Swift',
          branch: 'Lake Park',
          address: 'London No. 1 Lake Park',
          date: '20-10-2024',
          time: '10:00'
        },
        {
          key: '3',
          services: 'Haircut, Shaving',
          in_charge: 'Kayne West',
          branch: 'Lake Park',
          address: 'Sydney No. 1 Lake Park',
          date: '20-10-2024',
          time: '13:00'
        },
      ];
      const dataIncome = [
        { month: 'January', type: 'Gross Income', value: 10000 },
        { month: 'January', type: 'Net Income', value: 7500 },
        { month: 'February', type: 'Gross Income', value: 12000 },
        { month: 'February', type: 'Net Income', value: 8000 },
        { month: 'March', type: 'Gross Income', value: 15000 },
        { month: 'March', type: 'Net Income', value: 10500 },
        { month: 'April', type: 'Gross Income', value: 20000 },
        { month: 'April', type: 'Net Income', value: 14000 },
        { month: 'May', type: 'Gross Income', value: 18000 },
        { month: 'May', type: 'Net Income', value: 12500 },
        { month: 'June', type: 'Gross Income', value: 22000 },
        { month: 'June', type: 'Net Income', value: 16000 },
        { month: 'July', type: 'Gross Income', value: 25000 },
        { month: 'July', type: 'Net Income', value: 18000 },
        { month: 'August', type: 'Gross Income', value: 28000 },
        { month: 'August', type: 'Net Income', value: 20000 },
        { month: 'September', type: 'Gross Income', value: 30000 },
        { month: 'September', type: 'Net Income', value: 21500 },
        { month: 'October', type: 'Gross Income', value: 35000 },
        { month: 'October', type: 'Net Income', value: 25000 },
        { month: 'November', type: 'Gross Income', value: 40000 },
        { month: 'November', type: 'Net Income', value: 28500 },
        { month: 'December', type: 'Gross Income', value: 45000 },
        { month: 'December', type: 'Net Income', value: 32000 }
      ];
      const filteredDataIncome = dataIncome.filter(item => item.value != null);  
      const colorMap = {
        'Gross Income': '#4CAF50', // Green for Gross Income
        'Net Income': '#2196F3', // Blue for Net Income
      };
      const config = {
        data: filteredDataIncome,
        isGroup: true,
        xField: 'month',
        yField: 'value',
        seriesField: 'type',
        color: (type) => colorMap[type] || '#FF0000',
        label: {
          position: 'top',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'adjust-color' },
          ],
          offset: 8,
          style: {
            fill: '#000',
            fontSize: 12, 
          },
        }, 
        columnStyle: {
          radius: [20, 20, 0, 0],
        },
      };
    
      return (
        <Layout className="layout-dashboard">
          <Content
            style={{
              padding: "24px",
              margin: 0,
              minHeight: 280,
              background: "#f0f2f5",
            }}
          >
            <h2>Dashboard Overview</h2>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Customer"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Bookings"
                    value={15}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Revenue"
                    value={200}
                    precision={2}
                    prefix={<span style={{ color: '#3f8600' }}><DollarCircleFilled /></span>}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Card title="Recent bookings" bordered={false}>
                  <Table columns={columns} dataSource={data} />
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Card title="Income Overview" bordered={false} style={{ marginTop: '16px' }}>
                  <Column {...config} />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      );
}

export default AdminDashboard