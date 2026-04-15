import { Timestamp } from "firebase/firestore";

export interface UnitProgress {
  isComplete: boolean;
  completedExercises: Array<string>;
}

export interface ExerciseProgress {
  failedAttempts: number,
}

export interface UserData {
  email: string;
  displayName: string;
  createdAt: Timestamp;
  unitsProgress: Record<string, UnitProgress>; 
}
