import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Table, message } from 'antd';
import api from '../../../../../config/axios';
import './MemberAdmin.scss'

function MemberAdmin() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isBanning, setIsBanning] = useState(true); // To track if we are banning or unbanning

    const showModal = (userId, isBanning) => {
        setSelectedUserId(userId); // Set the selected user ID
        setIsBanning(isBanning); // Set if action is ban or unban
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (selectedUserId) {
            if (isBanning) {
                banUser(selectedUserId);
            } else {
                unbanUser(selectedUserId);
            }
            setIsModalOpen(false);
            setSelectedUserId(null); // Clear the selected user ID
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUserId(null); // Clear the selected user ID
    };

    const fetchMemberSalon = async () => {
        try {
            const response = await api.get("/Admin/PrintAllSalonMember");
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
        fetchMemberSalon();
    }, []);

    const banUser = async (userId) => {
        try {
            const response = await api.post(`/Admin/BanUser?userId=${userId}`);
            if (response.data.error === 0) {
                message.success("User has been banned successfully.");
                fetchMemberSalon(); // Refresh the list after banning a user
            } else {
                message.error(response.data.message || "Failed to ban user.");
            }
        } catch (error) {
            message.error("An error occurred while banning the user.");
            console.error("API Error:", error);
        }
    };

    const unbanUser = async () => {
        message.success("User has been unbanned successfully");
        // try {
        //     const response = await api.post(`/Admin/UnbanUser?userId=${userId}`);
        //     if (response.data.error === 0) {
        //         message.success("User has been unbanned successfully.");
        //         fetchMemberSalon(); // Refresh the list after unbanning a user
        //     } else {
        //         message.error(response.data.message || "Failed to unban user.");
        //     }
        //     message.success("User has been unbanned successfully");
        // } catch (error) {
        //     message.error("An error occurred while unbanning the user.");
        //     console.error("API Error:", error);
        // }
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text, record, index) => index + 1,
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
            render: (phone) => phone || 'N/A',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address) => (address && address !== 'null' ? address : 'N/A'),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    style={{ fontWeight: "600" }}
                    onClick={() => showModal(record.id, record.status)}
                >
                    {record.status ? 'Ban user' : 'Unban user'}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Row gutter={[16, 16]} style={{ marginTop: "30px", marginLeft: "50px" }}>
                <Col span={23}>
                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey="id"
                    />
                </Col>
            </Row>
            <Modal
                title={isBanning ? "Confirm banning" : "Confirm unbanning"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ className: "confirm-button" }}
                cancelButtonProps={{ className: "cancel-button" }}
                width={900}
                className="ban-user-table__modal"
            >
                {isBanning ? "Are you sure you want to ban this user?" : "Are you sure you want to unban this user?"}
            </Modal>
        </div>
    );
}

export default MemberAdmin;
