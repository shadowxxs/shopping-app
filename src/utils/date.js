export function getDate(params) {
  const today = new Date();


  const dateOptions = {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
  };
  const dateStr = today.toLocaleDateString(`id-ID`, dateOptions);
  const timeStr = today.toLocaleTimeString(`id-ID`, {
    hour: `2-digit`,
    minute: `2-digit`,
  }).replace('.', ':');
  return `${dateStr} ${timeStr}`;
}