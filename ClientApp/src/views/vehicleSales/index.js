import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import UploadBar from './UploadBar';
import Results from './Results';
import Header from './Header';
import { useSnackbar } from 'notistack';
import vehicleSalesService from 'src/services/vehicleSalesService';
import {
  Container,
  Grid,
  makeStyles,
  Button,
  Typography,
  Box
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 40
  }
}));

const AddVehicleSales = () => {
  const classes = useStyles();
  const [sales, setSales] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getVehicleSales = async () =>{
    try{
      enqueueSnackbar("Fetching vehicle sales data.", { 
        variant: 'info',
        autoHideDuration: 1000
      })
      var sales = await vehicleSalesService.getAllSales();
      setSales(sales);
    } catch(err) {
      enqueueSnackbar("Something went wrong while retrieving sales. Please try again", { 
          variant: 'error',
      })
    }
    
  }

  const reloadData = () => {
    getVehicleSales();
  }

  useEffect(() => {
    getVehicleSales();
  }, []);

  return (
    <Page className={classes.root} title="Add Vehicle Sales">
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid item lg={12} sm={12} xs={12}>
            <Header />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <UploadBar reloadData={reloadData} />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <Results sales={sales} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AddVehicleSales;
