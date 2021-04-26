export interface Course {
    id?: number;
    key: string;
    name: string;
    capacity: number;
    modules?: object [];
    avenue: string [];
    typeUF: string;
    semester: string;
    initialPeriod: number;
    weeks: number;
}
