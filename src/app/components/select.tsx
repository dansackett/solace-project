import { ChangeEvent } from 'react';
import { clsx } from 'clsx';

interface SelectProps {
  isFirst: boolean;
  fieldName: string;
  value: string;
  label: string;
  options: string[];
  placeholder: string;
  onChange: (fieldName: string, value: string) => void;
}

export default function SelectFilter(props: SelectProps) {
  return (
    <div className={clsx({ 'sm:col-span-2': true, 'sm:col-start-1': props.isFirst })}>
      <label htmlFor={props.fieldName} className="block text-sm/6 font-medium text-gray-900">
        { props.label }
      </label>

      <div className="mt-2">
        <select
          id={props.fieldName}
          name={props.fieldName}
          value={props.value}
          className="w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e: ChangeEvent<HTMLSelectElement>)=> {
            props.onChange(props.fieldName, e.target.value);
          }}
        >
          <option value="" disabled>
            { props.placeholder }
          </option>

          {
            props.options.map((opt)=> (
              <option key={opt} value={opt}>
                { opt }
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
};
