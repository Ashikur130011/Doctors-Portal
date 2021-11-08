import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from "../Booking/Booking";

const bookings=[
    {
        id: 0,
        name: 'Teeth Orthodonics',
        time: '08.00 - 09.00 AM',
        space: 10
    },
    {
        id: 1,
        name: 'Teeth Orthodonics1',
        time: '08.00 - 09.00 AM',
        space: 12
    },
    {
        id: 2,
        name: 'Teeth Orthodonics2',
        time: '08.00 - 09.00 AM',
        space: 15
    },
    {
        id: 3,
        name: 'Teeth Orthodonics3',
        time: '08.00 - 09.00 AM',
        space: 5
    },
    {
        id: 4,
        name: 'Teeth Orthodonics4',
        time: '08.00 - 09.00 AM',
        space: 10
    },
    {
        id: 5,
        name: 'Teeth Orthodonics5',
        time: '08.00 - 09.00 AM',
        space: 13
    },
    {
        id: 6,
        name: 'Teeth Orthodonics6',
        time: '08.00 - 09.00 AM',
        space: 20
    },
    {
        id: 7,
        name: 'Teeth Orthodonics7',
        time: '08.00 - 09.00 AM',
        space: 18
    },
    {
        id: 8,
        name: 'Teeth Orthodonics8',
        time: '08.00 - 09.00 AM',
        space: 7
    }
]
const AvailableAppointment = ({date}) => {
    const[bookingSuccess, setBookingSuccess] = useState(false)
    return (
      <Container>
        <Typography
          sx={{ color: "info.main", fontWeight: 500, py: 4 }}
          variant="h5"
        >
          Available Appointment on {date.toDateString()}
        </Typography>
        {bookingSuccess && (
          <Alert severity="success">
            Booking successfully — check it out!
          </Alert>
        )}
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Booking
              key={booking.id}
              booking={booking}
              setBookingSuccess={setBookingSuccess}
              date={date}
            ></Booking>
          ))}
        </Grid>
      </Container>
    );
};

export default AvailableAppointment;