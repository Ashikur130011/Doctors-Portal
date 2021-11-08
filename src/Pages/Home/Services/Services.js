import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import Service from "../Service/Service";
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';

const services = [
  {
    name: "Fluoride Treatment",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aliquid, earum laudantium tenetur est ipsam voluptas maiores animi similique ipsa, dolor deleniti dolore dignissimos? Culpa nihil non fugit est repellat.",
    img: fluoride
    
  },
  {
    name: "Cavity Filling",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aliquid, earum laudantium tenetur est ipsam voluptas maiores animi similique ipsa, dolor deleniti dolore dignissimos? Culpa nihil non fugit est repellat.",
    img: cavity
    
  },
  {
    name: "Whitening",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aliquid, earum laudantium tenetur est ipsam voluptas maiores animi similique ipsa, dolor deleniti dolore dignissimos? Culpa nihil non fugit est repellat.",
    img: whitening
    
  }
];

const Services = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Typography
          sx={{ fontWeight: 500, m: 2, color: 'success.main' }}
          style={{ textAlign: "center" }}
          variant="h5"
          component="div"
        >
          OUR SERVIES
        </Typography>
        <Typography
          sx={{ fontWeight: 600, m: 5 }}
          style={{ textAlign: "center" }}
          variant="h4"
          component="div"
        >
          Serices we provide
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {services.map((service) => (
            <Service key={service.name} service={service}></Service>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
