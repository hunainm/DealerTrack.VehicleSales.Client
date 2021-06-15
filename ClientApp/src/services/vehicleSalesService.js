import { Auth0Client } from '@auth0/auth0-spa-js';
var API_URL = process.env.REACT_APP_VEHICLE_SALES_API
var bearerToken = localStorage.getItem("accessToken");

class VehicleSalesService {

  uploadSalesFile = (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append(
          "file",
          file,
          file.name
        );

        fetch(`${API_URL}/vehicleSales`, { 
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              "Authorization" : `Bearer ${bearerToken}`
          },
          body: formData
        }).then(resolve()).catch(ex => reject(ex))
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
    
  }

  getAllSales = () =>
    new Promise(async (resolve, reject) => {
      try {
        fetch(`${API_URL}/vehicleSales`, { 
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Authorization" : `Bearer ${bearerToken}`
          } 
        }).then(response => response.json())
        .then(data => resolve(data));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });

  getTotalSales = () => {
    return new Promise(async (resolve, reject) => {
      try {
        fetch(`${API_URL}/vehicleSales/total`, { 
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Authorization" : `Bearer ${bearerToken}`
          } 
        }).then(response => response.json())
        .then(data => resolve(data));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  getTotalVehiclesSold = () => {
    return new Promise(async (resolve, reject) => {
      try {
        fetch(`${API_URL}/vehicleSales/vehicles/totalSold`, { 
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Authorization" : `Bearer ${bearerToken}`
          } 
        }).then(response => response.json())
        .then(data => resolve(data));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  getMostSoldVehicle = () => {
    return new Promise(async (resolve, reject) => {
      try {
        fetch(`${API_URL}/vehicleSales/vehicle/mostSold`, { 
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Authorization" : `Bearer ${bearerToken}`
          } 
        }).then(response => response.json())
        .then(data => resolve(data));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  getMostSalesDealership = () => {
    return new Promise(async (resolve, reject) => {
      try {
        fetch(`${API_URL}/vehicleSales/dealership/mostSales`, { 
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Authorization" : `Bearer ${bearerToken}`
          } 
        }).then(response => response.json())
        .then(data => resolve(data));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
}

const vehicleSalesService = new VehicleSalesService();

export default vehicleSalesService;
