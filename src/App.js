import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const fetchWeather = async () => {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=9791fa1a1d025a2e9db47def29efcc19&units=metric'
  );

  const json = await res.json();
  console.log(json);
  return json; 
};

function Weather() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data || !data.main || !data.weather) return <div>No data</div>;

  return (
    <div>
      <h2>Tokyo Weather</h2>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Weather: {data.weather[0].description}</p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
}
