import { Timestamp } from "firebase/firestore";

export interface UnitProgress {
  completedLessons: Array<string>;
}

export interface LessonProgress {
  failedAttempts: number,
}

export interface UserData {
  email: string;
  displayName: string;
  createdAt: Timestamp;
  unitsProgress: Record<string, UnitProgress>; 
}
