import React from "react";

// MATERIAL UI COMPONENTS
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// EXTERNAL LIBRARIES
import { useTranslation } from "react-i18next";

const LatitudeAndLongitudeInputs = ({
  direction,
  latitudeAndLongitude,
  setLatitudeAndLongitude,
  handleSubmitClick,
}) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={2}
      dir={direction}
      className='latitude-and-longitude-inputs-container'>
      <Typography variant='h6' className='latitude-and-longitude-inputs-title'>
        {t("Please enter the city's latitude and longitude")}
      </Typography>
      <div className='latitude-and-longitude-inputs'>
        <Grid size={8} container direction='column'>
          <TextField
            className='latitude-and-longitude-input'
            color='success'
            id='outlined-basic'
            label={t("Longitude")}
            variant='outlined'
            value={latitudeAndLongitude.longitude}
            onChange={(e) => {
              setLatitudeAndLongitude({
                ...latitudeAndLongitude,
                longitude: e.target.value,
              });
            }}
          />
          <TextField
            className='latitude-and-longitude-input'
            color='success'
            id='outlined-basic'
            label={t("latitude")}
            variant='outlined'
            value={latitudeAndLongitude.latitude}
            onChange={(e) => {
              setLatitudeAndLongitude({
                ...latitudeAndLongitude,
                latitude: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid size={4}>
          <Button
            onClick={() => {
              handleSubmitClick();
            }}
            variant='contained'
            color='success'
            disabled={
              latitudeAndLongitude.latitude === "" ||
              latitudeAndLongitude.longitude === ""
            }>
            {t("Get weather data")}
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default LatitudeAndLongitudeInputs;
