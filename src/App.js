import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const fetchWeather = async () => {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=XXXXX&units=metric&lang=ja'
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
    <figure>
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt = {data?.weather?.[0]?.main} />
        <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
}
