/**
 * @params 
 *  ms - time in miliseconds
 *  pad - how much digits the date should have  
 */

export function createTimestamp(ms = Date.now()) {
  const date = new Date(ms);
  const formatter = (number, pad = 2) => (`${new Array(pad).fill(0)}${number}`).slice(-pad);

  return `${formatter(date.getFullYear(), 4)}-${formatter(date.getMonth() + 1)}-${formatter(date.getDate())} ${formatter(date.getHours())}:${formatter(date.getMinutes())}:${formatter(date.getSeconds())}`;
}