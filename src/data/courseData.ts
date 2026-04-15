export interface Unit {
  name: string,
  description: string,
  lessons: Array<string>,
}

export interface Lesson {
  unit_id: number,
}
