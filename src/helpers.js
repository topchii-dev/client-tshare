/*
 * This function expects the date format to be provided like so: 2023-10-07T15:27:35.000000Z
 * Output would be 07.10.2023.
 */
export function parseTimestamp(timestamp) {
  const dateObj = new Date(timestamp);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}