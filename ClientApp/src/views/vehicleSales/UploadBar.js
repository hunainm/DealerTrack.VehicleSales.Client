import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import vehicleSalesService from 'src/services/vehicleSalesService';
import { Card, Button, Box, makeStyles } from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';

const useStyles = makeStyles(theme => ({
    root: {},
    uploadFileBtn: {
        float: "right"
    }
}));

const UploadBar = ({reloadData}) => {
    
  const classes = useStyles();
  const [importFile, setImportFile] = useState(0);
  const [fileUploading, setFileUploading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImportFile(file);
  }

  const uploadFile = async () => {
    setFileUploading(true)
    var snackbar = enqueueSnackbar("Uploading File. Please donot refresh page.", { 
        variant: 'info',
        autoHideDuration: null
    })
    try{
        await vehicleSalesService.uploadSalesFile(importFile);
        closeSnackbar(snackbar)
        enqueueSnackbar("File uploaded successfully.", { 
            variant: 'info',
            autoHideDuration: 3000
        })
        setTimeout(function(){
            reloadData()
        },1000)
    } catch(ex) {
        enqueueSnackbar(ex.Message, { 
            variant: 'error',
            autoHideDuration: 3000
        })
    }
    
  }

  return (
    <div>
      <Card>
        <Box>
            <label htmlFor="upload-ledger">
                <input
                    style={{ display: 'none' }}
                    id="upload-ledger"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={event => handleFileChange(event)}
                />
                <Button
                   
                    size="medium"
                    component="span"
                    aria-label="add"
                    variant="contained"
                    type="file"
                >
                    <AttachmentIcon /> {!importFile && 'Select Vehicle Sales File'}
                    <span>
                    {importFile !== 0 && importFile.name}
                    </span>
                </Button>
            </label>
            <Button
                color="primary"
                size="medium"
                component="span"
                variant="contained"
                disabled={fileUploading}
                className={classes.uploadFileBtn}
                onClick={uploadFile}
            >
                Upload File
            </Button>
        </Box>
      </Card>
    </div>
  );
};

export default UploadBar;