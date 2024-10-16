import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function AdminAccount() {
    const user = useSelector(selectUser);

    return (
        <div className="admin-account">
            {/* Avatar and role will be placed in a horizontal row */}
            <Avatar
                icon={<UserOutlined />}
                className="admin-account_avatar"
            />
            <div className="admin-account_info">
                <p className="admin-account_info_role">{user?.Role}</p>
            </div>
        </div>
    );
}

export default AdminAccount;
