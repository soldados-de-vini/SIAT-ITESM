export interface Course {
  id?: string;
  key: string;
  name: string;
  capacity: number;
  semester: number;
  modules?: Array<any>;
  avenue: Array<string>;
  typeUF: string;
  initialWeek: number;
  weeks: number;
  udc?: number;
}
