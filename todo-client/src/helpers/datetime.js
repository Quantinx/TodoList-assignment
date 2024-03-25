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
  // Parse the datetime-local string into a JavaScript Date object
  const date = new Date(datetimeLocal);

  // Format the date into the original format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  // Format string: "yyyy-MM-dd HH:mm:ss.ssssss+00"
  const formattedOriginal = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;

  return formattedOriginal;
}
