'use client';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { useVideoTableFilters } from './use-video-table-filters';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';

export function QuizTableAction() {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useVideoTableFilters();

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
