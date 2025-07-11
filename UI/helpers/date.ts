// Format Date
export function formatDate(x: string): string[] {
  const arr: string[] = x.split("T");
  const date: string[] = arr[0].split("-");
  const time: string[] = arr[1].split(".");

  return [`${date[2]}/${date[1]}/${date[0]}`, time[0]];
}
