// Display Time
function displayTime(timestamp: Date): string
{
  let str: string = timestamp.toString();
  let arr: string[] = str.split("T");

  let date: string[] = arr[0].split("-");
  let time: string[] = arr[1].split(".");
  time = time[0].split(":");

  return `${ date[2] }/${ date[1] }/${ date[0] } ${ time[0] }:${ time[1] }`;
}

export { displayTime };