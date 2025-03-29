'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export function useUniversityTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [countryFilter, setCountryFilter] = useQueryState(
    'country',
    searchParams.country.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCountryFilter(null);

    setPage(1);
  }, [setSearchQuery, setCountryFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!countryFilter;
  }, [searchQuery, countryFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    countryFilter,
    setCountryFilter
  };
}
