export function formatDateString(dateString: string): string {
  // Convert input string to a Date object
  const dateObject: Date = new Date(dateString);

  // Define formatting options
  const options: Intl.DateTimeFormatOptions = {
    month: 'short', // e.g., "Nov"
    day: 'numeric', // e.g., "2"
    year: 'numeric' // e.g., "2025"
  };

  // Format date in English (US)
  return new Intl.DateTimeFormat('en-US', options).format(dateObject);
}

