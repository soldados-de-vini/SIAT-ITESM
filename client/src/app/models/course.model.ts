export interface Course {
  id?: number;
  key: string;
  name: string;
  capacity: number;
  semester: number;
  modules?: Array<any>;
  avenue: Array<string>;
  typeUF: string;
  initialWeek: number;
  weeks: number;
}
