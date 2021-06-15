import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

const MaterialDataTable = ({sales}) => {

  const columns = [
    { title: "Deal Number", field: "dealNumber" },
    { title: "Customer Name", render: rowData => <span>{rowData.customer.firstName} {rowData.customer.lastName}</span>},
    { title: "Dealership Name", render: rowData => <span>{rowData.dealership.name}</span>},
    { title: "Vehicle", render: rowData => <span>{rowData.vehicle.year} {rowData.vehicle.vehicleModel.vehicleBrand.name} {rowData.vehicle.vehicleModel.name}</span>},
    { title: "Price", render: rowData => <span>CAD$ {rowData.salePrice.toLocaleString()}</span> },
    { title: "Date", render: rowData => <span>{new Date(rowData.saleDate).toLocaleDateString()}</span> }
  ];
  
  return (
    <div>
      <div>
          <MaterialTable
            title="Vehicle Sales"
            data={sales}
            columns={columns}
            options={{
              exportButton: true,
              actionsColumnIndex: -1
            }}
          />
      </div>
    </div>
  );
};

export default MaterialDataTable;