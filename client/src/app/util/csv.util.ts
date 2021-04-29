/**
 * Function to convert a csv string to and object
 *
 * @param csv csv as string
 */
export function convertCsvToObject(csv: string, areArray: Array<number>) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentline = lines[i].trim().split(',');
    for (let j = 0; j < headers.length; j++) {
      if (areArray.includes(j)){
        obj[headers[j].trim()] = currentline[j].split('|');
      } else {
        obj[headers[j].trim()] = currentline[j].trim();
      }
    }
    result.push(obj);
  }
  return result;
}
