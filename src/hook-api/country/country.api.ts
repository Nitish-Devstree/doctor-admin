import instance from '@/instance/intance';
import API from '@/instance/api';

export async function getActiveCountriesApi() {
  const response = await instance.get(API.country.getActiveCountries);
  return response.data.data;
}
