export function convertTimestampToDatetimeLocal(timestamp) {
  // Parse the timestamp into a JavaScript Date object
  const date = new Date(timestamp);

  // Format the date into a string suitable for datetime-local input
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format string: "yyyy-MM-ddThh:mm"
  const formattedDatetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDatetimeLocal;
}

export function convertLocaltimeStampToUTC(datetimeLocal) {
  // Create a new Date object in local time
  const localDate = new Date(datetimeLocal);

  // Get UTC values
  const utcYear = localDate.getUTCFullYear();
  const utcMonth = String(localDate.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const utcDay = String(localDate.getUTCDate()).padStart(2, "0");
  const utcHours = String(localDate.getUTCHours()).padStart(2, "0");
  const utcMinutes = String(localDate.getUTCMinutes()).padStart(2, "0");
  const utcSeconds = String(localDate.getUTCSeconds()).padStart(2, "0");
  const utcMilliseconds = String(localDate.getUTCMilliseconds()).padStart(
    3,
    "0"
  );

  // Adjust for local timezone offset
  const offsetMinutes = localDate.getTimezoneOffset();
  const adjustedDate = new Date(
    Date.UTC(
      utcYear,
      utcMonth - 1, // Month is 0-indexed
      utcDay,
      utcHours,
      utcMinutes - offsetMinutes, // Adjust for timezone offset
      utcSeconds,
      utcMilliseconds
    )
  );

  // Create the timestamp in the original format
  const timestamp = `${adjustedDate.getUTCFullYear()}-${String(
    adjustedDate.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(adjustedDate.getUTCDate()).padStart(
    2,
    "0"
  )} ${String(adjustedDate.getUTCHours()).padStart(2, "0")}:${String(
    adjustedDate.getUTCMinutes()
  ).padStart(2, "0")}:${String(adjustedDate.getUTCSeconds()).padStart(
    2,
    "0"
  )}.${String(adjustedDate.getUTCMilliseconds()).padStart(3, "0")}`;

  return timestamp;
}
