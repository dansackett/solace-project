import { ChangeEvent } from 'react';

import SelectFilter from '@/app/components/select';
import { AdvocateFilters } from '@/app/definitions';

interface AdvocateFilterProps {
  filters: AdvocateFilters;
  cityOptions: string[];
  degreeOptions: string[];
  specialtyOptions: string[];
  onFilterchange: (field: string, query: string) => void;
  onResetFilters: () => void;
}

const FILTER_FIELD_CITY = 'city';
const FILTER_FIELD_DEGREE = 'degree';
const FILTER_FIELD_SPECIALTY = 'specialty';
const FILTER_FIELD_EXPERIENCE = 'experience';


export default function AdvocateFiltersUI({
  filters,
  cityOptions,
  degreeOptions,
  specialtyOptions,
  onFilterchange,
  onResetFilters
}: AdvocateFilterProps) {
  const { city, degree, specialty, experience } = filters;

  return (
    <div className="my-5">
      <form className="border-b border-gray-900/10 pb-5">
        <div className="space-y-12">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900">Find an advocate</h2>

            <p className="mt-1 text-sm/6 text-gray-600">
              Use our amazing filtering tool to find an advocate to help you navigate your health journey
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <SelectFilter
                isFirst={true}
                fieldName={FILTER_FIELD_CITY}
                value={city}
                label="City"
                placeholder="Select a city"
                options={cityOptions}
                onChange={onFilterchange}
              />

              <SelectFilter
                isFirst={false}
                fieldName={FILTER_FIELD_DEGREE}
                value={degree}
                label="Degree"
                placeholder="Select a degree"
                options={degreeOptions}
                onChange={onFilterchange}
              />

              <SelectFilter
                isFirst={false}
                fieldName={FILTER_FIELD_SPECIALTY}
                value={specialty}
                label="Specialty"
                placeholder="Select a specialty"
                options={specialtyOptions}
                onChange={onFilterchange}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-start gap-x-6">
          <button type="button" onClick={onResetFilters} className="text-sm/6 font-semibold text-gray-900">Reset filters</button>
        </div>
      </form>
    </div>
  );
}
