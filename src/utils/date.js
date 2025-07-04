export function getDate() {
  const today = new Date();

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const dateStr = today.toLocaleDateString('id-ID', dateOptions);
  const timeStr = today.toLocaleTimeString('id-ID', timeOptions).replace(/\./g, ':');

  return `${dateStr} ${timeStr}`;
}