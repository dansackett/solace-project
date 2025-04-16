import { NextRequest } from 'next/server';
import { and, eq, sql } from 'drizzle-orm';

import db from '@/db';
import { advocates } from '@/db/schema';
import { specialties } from '@/db/seed/advocates';
import { Advocate } from '@/db/definitions';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const degree = searchParams.get('degree');
  const specialty = searchParams.get('specialty');

  const data = await db.select().from(advocates).where(
    and(
      city ? eq(advocates.city, city) : undefined,
      degree ? eq(advocates.degree, degree) : undefined,
      // LIKE or ILIKE is not ideal here but the jsonb type seems to have poor
      // query support in Drizzle so this is a compromise for this project
      // until I learn more about how to work with the datatype through this
      // library
      specialty ? sql`${advocates.specialties}::text LIKE ${'%' + specialty + '%'}::text` : undefined,
    )
  );

  // Build out available filter options on the server once rather than on
  // re-render on the client. This helps give a better search experience by
  // limiting options based on what results remain. If this becomes a
  // bottleneck we can do a separate selectUnique query to
  // build our options more efficiently.
  let _cityOptions = new Set();
  let _degreeOptions = new Set();

  for (const advocate of data) {
    _cityOptions.add(advocate.city);
    _degreeOptions.add(advocate.degree);
  }
  
  const cityOptions = Array.from(_cityOptions);
  const degreeOptions = Array.from(_degreeOptions);

  // ideally specialties are in their own database table
  const specialtyOptions = specialties;

  // sorting on the server will save us some additional client-side work
  cityOptions.sort();
  degreeOptions.sort();
  specialtyOptions.sort();

  return Response.json({
    data: data,
    cityOptions: Array.from(cityOptions),
    degreeOptions: Array.from(degreeOptions),
    specialtyOptions: specialtyOptions,
  });
}
