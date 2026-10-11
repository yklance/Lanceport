// When verkan is usually around. Times are in Toronto time (ET).
//
// days: 0 = Sunday, 1 = Monday, 2 = Tuesday ... 6 = Saturday
// offBlocks: regular times you're away. start/end are 24-hour clock hours.

export const schedule = {
  timezone: "America/Toronto",
  tzLabel: "ET",
  offBlocks: [{ day: 2, start: 18, end: 21 }], // Tuesday, 6 PM to 9 PM
};
