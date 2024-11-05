import React, { useEffect, useState } from 'react';
import { Col, Row, Table, message } from 'antd';
import api from '../../../../../config/axios';
import './UserAdmin.scss'

function UserAdmin() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/Admin/PrintAllUser");
            if (response.data.error === 0) {
                setUsers(response.data.data);
            } else {
                message.error(response.data.message || "Failed to fetch user data.");
            }
        } catch (error) {
            message.error("An error occurred while fetching the user data.");
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text, record, index) => index + 1, // Renders a sequential number
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => phone || 'N/A', // Display 'N/A' if phone is null
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address) => (address && address !== 'null' ? address : 'N/A'), // Handle "null" string cases
        },
    ];

    return (
        <div>
            <Row gutter={[16, 16]} style={{ marginTop: "30px", marginLeft: "50px" }}>
                <Col span={23}>
                        <Table
                            columns={columns}
                            dataSource={users}
                            rowKey="id" // Use 'id' as the unique key for each row
                        />
                </Col>
            </Row>

        </div>
    );
}

export default UserAdmin;
