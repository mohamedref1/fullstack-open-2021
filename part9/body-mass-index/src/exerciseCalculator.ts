import { CalculateExercisesResult, CalculateRatingResult } from './types/exercise';
// import { excercisesCliParser } from './parser/excercise';

/**
 * Calculate the 1-to-3 rating value
 * @param value1 the first value to compare
 * @param value2 the second value to compare by
 * @returns an object of the rating value and the description attached to it
 */
const calculateRating = (value1: number, value2: number): CalculateRatingResult => {
  let rating: number;
  if (value1 === value2) {
    rating = 3;
  } else if (value1 + 0.5 >= value2 || value1 <= value2 + 0.5) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'you have to work hard';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'fantastic! you reached the goal';
      break;
    default:
      throw new Error(`Invalid rating value: ${rating}`);
  }

  return {
    rating,
    ratingDescription
  };
};

/**
 * Excercises calculator
 * @param target the target hours to reach
 * @param dailyExercisesHours a list of daily excercises hours
 * @returns an object describing how far the dailyExercisesHours reaches the target
 */
export const calculateExercises =
  (target: number, dailyExercisesHours: number[]): CalculateExercisesResult => {
    const periodLength = dailyExercisesHours.length;
    const trainingDays = dailyExercisesHours.filter((d) => d !== 0).length;
    const totalDailyExercisesHours =
      dailyExercisesHours.reduce((prev, curr) => prev + curr);
    const average = totalDailyExercisesHours / dailyExercisesHours.length;
    const success = Number(average.toFixed(1)) === Number(target.toFixed(1));
    const { rating, ratingDescription } =
      calculateRating(Number(average.toFixed(2)), Number(target.toFixed(2)));

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };

// try {
//   const { target, dailyExcercisesHours } = excercisesCliParser();
//   console.log(calculateExercises(target, dailyExcercisesHours));
// } catch (err) {
//   let errorMessage = 'Something went wrong.\n';
//   if (err instanceof Error) {
//     errorMessage += `${err.message}.\n`;
//   }
//   console.log(errorMessage);
// }