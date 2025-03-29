import { useQuery } from '@tanstack/react-query';
import { getActiveCountriesApi } from './country.api';


export interface Country {
    _id: string;
    usedTime: string;
    country: {
        _id: string;
        name: string;
        code: string;
        emoji: string;
        image: string;
        dialCodes: string[];
        slug: string;
        createdAt: string;
        updatedAt: string;
    };
}

export function useGetActiveCountries() {
    return useQuery({
        queryKey: ['active-countries'],
        queryFn: () => getActiveCountriesApi()
    });
} 