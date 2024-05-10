export function truncateString(string = "") {
  if (string?.length > 50) {
    return `${string?.slice(0, 51)}...`;
  }
  return string;
}
