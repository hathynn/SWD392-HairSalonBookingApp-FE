import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import './BookingAssigned.scss';

function BookingAssigned() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const mockBookings = [
                {
                    id: '1',
                    bookingDate: '2024-10-30T08:30:00Z',
                    clientName: 'Alice Johnson',
                    service: 'Haircut',
                    status: 'Confirmed',
                },
                {
                    id: '2',
                    bookingDate: '2024-11-01T10:00:00Z',
                    clientName: 'Bob Smith',
                    service: 'Coloring',
                    status: 'Pending',
                },
                {
                    id: '3',
                    bookingDate: '2024-11-02T15:00:00Z',
                    clientName: 'Carol White',
                    service: 'Styling',
                    status: 'Completed',
                },
            ];

            setBookings(mockBookings);
            setLoading(false);
        }, 1000);
    }, []);

    // Define table columns
    const columns = [
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (text) => new Date(text).toLocaleDateString(), // Format date
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <div className="booking-applied">
            <h2>My Bookings</h2>
            <Table
                className='booking-table'
                columns={columns}
                dataSource={bookings}
                loading={loading}
                style={{ width: '90%', margin: 'auto auto'  }}
                rowKey="id"
            />
        </div>
    );
}

export default BookingAssigned;
