export const formatDate = v => {
  if (!(v instanceof Date) || isNaN(v)) {
    v = parseDate(v);
    if (!(v instanceof Date)) return;
  };
  const yyyy = v.getFullYear().toString();
  const mm = (v.getMonth() + 1).toString();
  const dd = v.getDate().toString();
  return `${yyyy}-${mm}-${dd}`;
};
export const parseDate = v => {
  const match = matchLegacyDate(v);
  if (match === null) return;
  const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
  if (isNaN(d)) return;
  return d;
};
const matchLegacyDate = v => {
  // v is a string of "YYYY-MM-DD" format
  return /(\d{4})-(\d{2})-(\d{2})/.exec(v);
}
