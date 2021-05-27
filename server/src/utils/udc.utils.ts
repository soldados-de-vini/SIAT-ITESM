// 1 UDC is equal to 20 hours.
const HOURS_TO_UDC_RATIO = 1 / 20;

/**
 * Converts the given hours to UDCs.
 * @param hours The hours to be transformed.
 * @returns The UDC number.
 */
function convertHoursToUdc(hours: number): number {
  return round(hours * HOURS_TO_UDC_RATIO);
}

/**
 * Converts hours and minutes to hours.
 * @param hours The total hours.
 * @param minutes The total minutes.
 * @returns The total in hours.
 */
function calculateTotalHours(hours: number, minutes: number) {
  let total = 0;
  if (hours) {
    total += hours;
  }
  if (minutes) {
    total += minutes / 60;
  }
  return round(total);
}

/**
 * Rounds the number to 2 decimal places.
 * @param num The number to be rounded.
 * @returns The rounded number.
 */
function round(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export { convertHoursToUdc, calculateTotalHours };
