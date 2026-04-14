import { Timestamp } from "firebase/firestore";

export interface CourseProgressDetail {
  completed_lessons: number;
  percentage: number;
  enrolledAt: Timestamp;
  last_accessed: Timestamp | null;
}

export interface UserData {
  email: string;
  displayName: string;
  createdAt: Timestamp;
  courseProgress: Record<string, CourseProgressDetail>; 
}
