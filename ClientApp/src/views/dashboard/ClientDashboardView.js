import React, { useCallback, useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

import Overview from './Components/Overview';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import vehicleSalesService from '../../services/vehicleSalesService';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function ClientDashboardView({ timeRange }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [totalSale,setTotalSale] = useState(0);
  const [totalVehiclesSold,setTotalVehiclesSold] = useState(0);
  const [mostSoldVehicle,setMostSoldVehicle] = useState('');
  const [mostSalesDealership,setMostSalesDealership] = useState('');

  const getTotalSales = useCallback(async () => {
    var totalSales = await vehicleSalesService.getTotalSales();
    if (isMountedRef.current) {
        setTotalSale(totalSales);
    }
  }, [isMountedRef]);

  const getTotalVehiclesSold = useCallback(async() => {
    var totalVehicles = await vehicleSalesService.getTotalVehiclesSold();
    if (isMountedRef.current) {
        console.log(totalVehicles);
        setTotalVehiclesSold(totalVehicles);
    }
  }, [isMountedRef]);

  const getMostSoldVehicle = useCallback(async() => {
    var vehicle = await vehicleSalesService.getMostSoldVehicle();
    if (isMountedRef.current) {
        vehicle = vehicle.vehicleModel ? `${vehicle.year} ${vehicle.vehicleModel?.vehicleBrand?.name} ${vehicle?.vehicleModel.name}` : ''
        setMostSoldVehicle(vehicle);
    }
  }, [isMountedRef]);

  const getMostSalesDealership = useCallback(async() => {
    var mostSalesDealership = await vehicleSalesService.getMostSalesDealership();
    if (isMountedRef.current) {
        setMostSalesDealership(mostSalesDealership.name);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getTotalSales();
    getTotalVehiclesSold();
    getMostSoldVehicle();
    getMostSalesDealership();
  }, []);

  const data = [
    {
      title: 'Total Sales',
      value: "CAD$ " + totalSale
    },
    {
      title: 'Total Vehicles Sold',
      value: totalVehiclesSold
    },
    {
      title: 'Most Sold Vehicle',
      value: mostSoldVehicle
    },
    {
      title: 'Most Sales Dealership',
      value: mostSalesDealership
    }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Overview data={data} />
      </Grid>
      <Grid item lg={8} xl={9} xs={12}>
      </Grid>
    </Grid>
  );
}

export default ClientDashboardView;