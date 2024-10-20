import './HistoryBooking.scss'
import { Space, Table, Tag } from 'antd';

function HistoryBooking() {
    const columns = [
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
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Stylist',
            key: 'stylist',
            dataIndex: 'stylist',
        },
        {
            title: 'Salon',
            key: 'salon',
            dataIndex: 'salon',
        },
        {
            title: 'Action',
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
            date: '20/01/2024',
            time: "15:00",
            service: "Haircut",
            stylist: "Stylist 1",
            salon: 'Maverick Vinhomes',
        },
        {
            key: '2',
            date: '20/03/2024',
            time: "15:00",
            service: "Haircut",
            stylist: "Stylist 1",
            salon: 'Maverick Vinhomes',
        },
        {
            key: '3',
            date: '20/06/2024',
            time: "15:00",
            service: "Haircut",
            stylist: "Stylist 1",
            salon: 'Maverick Vinhomes',
        },
        {
            key: '4',
            date: '20/10/2024',
            time: "15:00",
            service: "Haircut",
            stylist: "Stylist 1",
            salon: 'Maverick Vinhomes',
        },
        
    ];
    return (
        <>
            <Table columns={columns} dataSource={data} />;
        </>
    )
}

export default HistoryBooking