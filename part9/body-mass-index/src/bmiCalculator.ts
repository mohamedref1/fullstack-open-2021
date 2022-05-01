// import { bmiCliParser } from "./parser/bmi";

/**
 * Calculate the body mass index
 * @param height the height in centimeters
 * @param width the width in kilograms
 * @returns a string describing the resulted bmi
 */
const calculateBmi = (height: number, width: number): string => {
  const heightInMeter = (height * (1 / 100));
  const squaredHeight = heightInMeter * heightInMeter;
  const mdi = width / squaredHeight;

  let result = '';
  if (mdi > 1.60 && mdi < 16.0) {
    result = 'Underweight (Severe thinness)';
  } else if (mdi >= 16.0 && mdi <= 16.9) {
    result = 'Underweight (Moderate thinness)';
  } else if (mdi >= 17.0 && mdi <= 18.4) {
    result = 'Underweight (Mild thinness)';
  } else if (mdi >= 18.5 && mdi <= 24.9) {
    result = 'Normal range';
  } else if (mdi >= 25.0 && mdi <= 29.9) {
    result = 'Overweight (Pre-obese)';
  } else if (mdi >= 30.0 && mdi <= 34.9) {
    result = 'Overweight (Pre-obese)';
  } else if (mdi >= 35.0 && mdi <= 39.9) {
    result = 'Obese (Class II)';
  } else if (mdi >= 40.0 || mdi <= 1.60) {
    result = 'Obese (Class III)';
  } else {
    throw new Error(`Invaild mdi result: ${mdi}`);
  }

  return result;
};

// try {
//   const { height, width } = bmiCliParser();
//   console.log(calculateBmi(height, width));
// } catch (err: unknown) {
//   let errorMessage = 'Something went wrong.\n';
//   if (err instanceof Error) {
//     errorMessage += `${err.message}.\n`;
//   }
//   console.log(errorMessage);
// }

export default calculateBmi;