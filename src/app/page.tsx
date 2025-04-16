'use client';

import { useEffect, useState } from 'react';

import { Advocate } from '@/db/definitions';
import { AdvocateFilters } from '@/app/definitions';

import AdvocateTable from '@/app/advocates/table';
import AdvocateFiltersUI from '@/app/advocates/filters';

/**
 * getDefaultFilters allows a convenient way to set initial filters and reset
 * to the same state. Most users are not going to be looking for a name or
 * phone number through a filtering UI so I am only exposing filters that make
 * sense to find a relevant advocate.
 */
const getDefaultFilters = () : AdvocateFilters => {
  return { city: '', degree: '', specialty: '', experience: '', };
};

/**
 * useAdvocates separates the advocate fetch logic so it can be tested easier
 * and to keep the main page component easier to read quickly. 
 */
const useAdvocates = (filters: AdvocateFilters) => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<string[]>([]);
  const [specialtyOptions, setSpecialtyOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const baseURL = '/api/advocates';
    const params = new URLSearchParams();

    for (const filter in filters) {
      const filterVal = filters[filter];

      if (filterVal !== '') {
        params.append(filter, filterVal);
      }
    }

    const urlWithParams = `${baseURL}?${params.toString()}`;

    fetch(urlWithParams)
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }

        return response.json();
      })
      .then((response) => {
        setAdvocates(response.data);
        setCityOptions(response.cityOptions);
        setDegreeOptions(response.degreeOptions);
        setSpecialtyOptions(response.specialtyOptions);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [filters]);

  return { advocates, cityOptions, degreeOptions, specialtyOptions, isLoading, error };
};


export default function Home() {
  const [filters, setFilters] = useState<AdvocateFilters>(getDefaultFilters());
  const { advocates, cityOptions, degreeOptions, specialtyOptions, isLoading, error } = useAdvocates(filters);

  const handleFilterChange = (field: string, query: string) => {
    setFilters({ ...filters, [field]: query });
  };

  const handleFilterReset = () => {
    setFilters(getDefaultFilters());
  };

  return (
    <div className="body">
      <AdvocateFiltersUI
        filters={filters}
        cityOptions={cityOptions}
        degreeOptions={degreeOptions}
        specialtyOptions={specialtyOptions}
        onFilterchange={handleFilterChange}
        onResetFilters={handleFilterReset}
      />

      <AdvocateTable
        advocates={advocates}
        isLoading={isLoading}
      />
    </div>
  );
}
