import { Advocate } from '@/db/definitions';

import NoData from '@/app/advocates/no_data';
import Loading from '@/app/advocates/loading';

interface AdvocateTableProps {
  advocates: Advocate[];
  isLoading: boolean;
}

function formatPhoneNumber(phoneNumber: number) {
  var cleaned = ('' + phoneNumber).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return null;
}

export default function AdvocateTable({ advocates, isLoading }: AdvocateTableProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && advocates.length === 0) {
    return <NoData />;
  }

  return (
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">First Name</th>
            <th scope="col" className="px-6 py-3">Last Name</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">Degree</th>
            <th scope="col" className="px-6 py-3">Specialties</th>
            <th scope="col" className="px-6 py-3">Years of Experience</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr key={advocate.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{advocate.firstName}</td>
                <td className="px-6 py-4">{advocate.lastName}</td>
                <td className="px-6 py-4">{advocate.city}</td>
                <td className="px-6 py-4 text-center">{advocate.degree}</td>
                <td className="px-6 py-4">
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td className="px-6 py-4 text-center">{advocate.yearsOfExperience}</td>
                <td className="px-6 py-4 text-center">{formatPhoneNumber(advocate.phoneNumber)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );
};
