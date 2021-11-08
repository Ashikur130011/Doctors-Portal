import { Container, Grid } from '@mui/material';
import React from 'react';
import Chair from '../../../images/chair.png';
import Calender from '../../Shared/Calender/Calender';

const AppointmentHeader = ({date, setDate}) => {
    return (
      <Container>
        <Grid container style={{marginTop: 25}} spacing={2}>
          <Grid item sm={12} md={6}>
            <Calender date={date} setDate={setDate}></Calender>
          </Grid>
          <Grid item sm={12} md={6}>
            <img src={Chair} style={{ width: "100%" }} alt="" />
          </Grid>
        </Grid>
      </Container>
    );
};

export default AppointmentHeader;