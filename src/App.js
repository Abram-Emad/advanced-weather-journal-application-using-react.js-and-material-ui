// REACT
import React from "react";
import { useEffect, useState } from "react";
import WeatherDetails from "./components/WeatherDetails";
import LatitudeAndLongitudeInputs from "./components/LatitudeAndLongitudeInputs";
import "./App.css";

// EXTERNAL LIBRARIES
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

let cancelAxiosRequest = null;

function App() {
  const [dateAndTime, setDateAndTime] = useState("");
  const [weatherData, setWeatherData] = useState({
    number: null,
    min: null,
    max: null,
    icon: null,
    city: "",
    description: "",
  });
  const [latitudeAndLongitude, setLatitudeAndLongitude] = useState({
    latitude: "",
    longitude: "",
  });
  const [openWeatherCard, setOpenWeatherCard] = useState(false);
  const [locale, setLocale] = useState("ar");

  const { i18n } = useTranslation();
  const direction = locale === "ar" ? "rtl" : "ltr";

  function handleSubmitClick() {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeAndLongitude.latitude}&lon=${latitudeAndLongitude.longitude}&appid=ed45824eb86483e19547c49e73684d87`,
          {
            cancelToken: new axios.CancelToken((cancel) => {
              cancelAxiosRequest = cancel;
            }),
          }
        );
        const { main, weather, sys } = response.data;
        setWeatherData({
          number: Math.round(main.temp - 272.15),
          min: Math.round(main.temp_min - 272.15),
          max: Math.round(main.temp_max - 272.15),
          icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
          city: `${response.data.name}  ${sys.country}`,
          description: weather[0].description,
        });
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    fetchData();
    setLatitudeAndLongitude({
      latitude: "",
      longitude: "",
    });
    setOpenWeatherCard(true);
    return () => {
      cancelAxiosRequest();
    };
  }

  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
}

  useEffect(() => {
    i18n.changeLanguage(locale);
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [locale, i18n]);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container maxWidth='sm'>
          <div className='weather-page-content'>
            <LatitudeAndLongitudeInputs
              direction={direction}
              latitudeAndLongitude={latitudeAndLongitude}
              setLatitudeAndLongitude={setLatitudeAndLongitude}
              handleSubmitClick={handleSubmitClick}
            />
            {openWeatherCard && (
              <WeatherDetails
                direction={direction}
                weatherData={weatherData}
                dateAndTime={dateAndTime}
                handleLanguageClick={handleLanguageClick}
                locale={locale}
              />
            )}
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
