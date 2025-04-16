# Things to consider / justifications

Considering the time allowed for this project I wanted to highlight some
specific things that appear outside of the scope of this project but should be
looked at in greater details sometime down the line.

- package.json commands for database do not work as expected. For example
  seeding the database in this manner is not possible since an index file
  doesn't exist in the seed directory. We can still seed through the API but
  ideally we wouldn't have a publically accessible seeding endpoint open. In
  the spirit of this project I'm accepting the risk for the sake of completion.
- I didn't have the time to implement pagination but this would be a high
  priority to implement on the API level. If there are hundreds of thousands of
  advocates this would be critical for page load and basic user navigation on
  the frontend.
- I like aspects of my design such as the header with filtering UI but the
  table is probably not the best design decision considering the specialties
  field can be packed with many different specialties. I think using cards with
  a picture of the advocate would be more use friendly.
- If a table were to be used I would suggest adding sorting on the columns and
  certainly pagination buttons at the bottom of the table.
- I haven't worked with Drizzle before and only have some experience with
  Postgres (I have used MySQL in all of my previous positions) so I had trouble
  with the jsonb field for the array of specialties. I read a lot of
  documentation about it and tried in the psql console to do array_includes
  syntax but it was failing. From open issues I read I think there is a problem
  with the jsonb field and how it was defined in the schema. I would take more
  time to get that right to make filter queries more efficient than the text
  conversion and LIKE query.
- I accounted for API errors in terms of collecting it but I didn't use the
  value. With more time I would use the error object to display more helpful
  errors for the end-user.
- The fetch promise works for client-side fetching but I know there are other
  libraries and loading techniques we could use to optimize the API reads
  better. I wanted to use some of the Suspense ideas from the NextJS
  documentation but I kept it simple for this project.
