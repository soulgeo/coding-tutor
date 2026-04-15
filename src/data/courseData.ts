export interface Unit {
  name: string,
  description: string,
  exercises: Array<string>,
}

export interface Exercise {
  unit_id: number,
}
