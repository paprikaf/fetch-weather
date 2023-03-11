import { useState, useEffect } from 'react';
import React from 'react';
import wretch from 'wretch';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoadingComponenet from '@/components/loadingCpt';
import FailureComponent from '@/components/failureCpt';

//TODO: create 3 hour forcast interface
interface forcast {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
  };
}
//TODO: create FULL weather interface
interface WeatherData {
  list: forcast[];
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export enum UnitOfMeasurementType {
  standard = 'standard',
  metric = 'metric',
  imperial = 'imperial',
}

const formatTimestamp = (timestamp: number): string => {
  const date: Date = new Date(timestamp * 1000);
  const formattedDate: string = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  return formattedDate;
};

const formatTimestampToHour = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')} ${ampm}`;
};

const getDayOfWeek = (timestamp: number): string => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(timestamp * 1000);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

const WeatherComponent: React.FC<{
  zipCode: string;
  unit: UnitOfMeasurementType;
}> = ({ zipCode, unit }) => {
  const router = useRouter();
  zipCode = router.query.zip as string;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`${inputValue}`);
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };
  //TODO: use Key
  const key = process.env.KEY;
  const [error, setError] = useState<Error | null>(null);
  //TODO: add  unitof measurment condition eg metric
  useEffect(() => {
    wretch(
      //   `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=69f0beec5f92e93c76e807049c478d86&units=${unit}`
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=69f0beec5f92e93c76e807049c478d86&units=imperial`
    )
      .get()
      .notFound((err) => setError(err))
      .badRequest((err) => setError(err))
      .internalError((err) => setError(err))
      .json((data) => setWeatherData(data))
      .catch((err) => setError(err));
  }, [zipCode]);

  //TODO:: Error component
  if (error) {
    return <FailureComponent error={error.message} />;
  }
  //TODO:add a loading component
  if (!weatherData) {
    return <LoadingComponenet />;
  }
  const fiveDaysForcast = weatherData.list;
  const oneDayForcast = [];
  for (let i = 0; i < fiveDaysForcast.length; i += 8) {
    const chunk = fiveDaysForcast.slice(i, i + 8);
    oneDayForcast.push(chunk);
  }
  //TODO: create forcast component
  return (
    <div>
      <div className="max-w-lg mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-lg">
              5-Day Weather Forecast in {weatherData.city.name}
            </h2>{' '}
            <div className="flex items-center">
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter zip code"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md ml-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="border-b border-gray-400 w-1/2"></div>
        <div className="mx-3">
          {' '}
          Sunrise for {formatTimestamp(
            weatherData.city.sunrise
          )} 🌞{' '}
        </div>
        <div className="mx-3">
          Sunset for {formatTimestamp(weatherData.city.sunset)} 🌚
        </div>
        <div className="border-b border-gray-400 w-1/2"></div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {oneDayForcast.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-gray-700 font-semibold">
              {getDayOfWeek(day[index].dt)}
            </h3>
            {day.map((hourforcast, i) => (
              <div key={i}>
                <p className="text-gray-400">
                  {formatTimestampToHour(hourforcast.dt)}
                </p>
                <p className="text-gray-700">
                  Temprature: {Math.round(hourforcast.main.temp)}
                  &deg;F
                </p>
                <p className="text-gray-700">
                  Feels Like:{' '}
                  {Math.round(hourforcast.main.feels_like)}
                  &deg;F
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;
