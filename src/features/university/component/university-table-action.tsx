'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { useGetActiveCountries } from '@/hook-api/country/country.hook';
import Image from 'next/image';
import { useUniversityTableFilters } from './use-university-table-filters';

export default function UniversityTableAction() {
  const {
    countryFilter,
    setCountryFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useUniversityTableFilters();

  const { data: countriesData } = useGetActiveCountries();

  const countryOptions =
    countriesData?.map((item) => ({
      label: (
        <div className='flex items-center gap-2'>
          <div className='relative h-4 w-6 overflow-hidden rounded'>
            <Image
              src={item.country.image}
              alt={item.country.name}
              fill
              className='object-cover'
            />
          </div>
          <span>{item.country.name}</span>
        </div>
      ),
      value: item.country._id
    })) || [];

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

      <DataTableFilterBox
        filterKey='country'
        title='Country'
        options={countryOptions}
        setFilterValue={setCountryFilter}
        filterValue={countryFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
