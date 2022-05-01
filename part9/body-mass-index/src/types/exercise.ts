export interface ExcercisesParserResult {
  target: number;
  dailyExcercisesHours: number[];
}

export interface CalculateRatingResult {
  rating: number;
  ratingDescription: string
}

export interface CalculateExercisesResult extends CalculateRatingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number
}
