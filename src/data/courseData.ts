export interface Unit {
  name: string;
  description: string;
  lessons: Array<string>;
}

export interface Lesson {
  title: string;
  content: string;
  expectedOutput: string;
  pretypedCode: string;
}
