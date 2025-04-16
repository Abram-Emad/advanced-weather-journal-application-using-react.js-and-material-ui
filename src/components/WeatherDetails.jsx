// REACT
import React from "react";

// MATERIAL UI COMPONENTS
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NightsStayTwoToneIcon from "@mui/icons-material/NightsStayTwoTone";

// EXTERNAL LIBRARIES
import { useTranslation } from "react-i18next";

const WeatherDetails = ({
  direction,
  weatherData,
  dateAndTime,
  handleLanguageClick,
  locale,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div dir={direction} className='weather-card-details'>
        <div className='weather-card-content'>
          <div dir={direction} className='weather-card-city-and-time'>
            <Typography
              variant='h4'
              style={{ fontWeight: "600", marginRight: "20px" }}>
              {t(weatherData.city)}
            </Typography>
            <Typography variant='h5' style={{ marginRight: "20px" }}>
              {dateAndTime}
            </Typography>
          </div>
          <hr />
          <div className='weather-card-temp-degree-and-icon'>
            <div className='weather-card-degree-and-description'>
              <div className='weather-card-temp'>
                <Typography variant='h1' style={{ textAlign: "right" }}>
                  {weatherData.number}°
                </Typography>
                <img
                  src={weatherData.icon}
                  alt={weatherData.description || "Weather icon"}
                />
              </div>
              <Typography variant='h6'>{t(weatherData.description)}</Typography>
              <div className='weather-card-temp-min-and-max'>
                <h5>
                  {t("min")}: {weatherData.min}
                </h5>
                <h5 style={{ margin: "0 5px" }}>|</h5>
                <h5>
                  {t("max")}: {weatherData.max}
                </h5>
              </div>
            </div>
            <NightsStayTwoToneIcon
              style={{
                fontSize: "200px",
                color: "white",
              }}
            />
          </div>
        </div>
      </div>
      <div dir={direction} className='weather-card-translation-container'>
        <Button
          variant='contained'
          style={{
            background: "rgb(28 52 91 / 36%)",
            color: "white",
            padding: "10px",
            borderRadius: "25px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
            marginBottom: "20px",
          }}
          onClick={handleLanguageClick}>
          {locale === "en" ? "Arabic" : "English"}
        </Button>
      </div>
    </>
  );
};

export default WeatherDetails;
