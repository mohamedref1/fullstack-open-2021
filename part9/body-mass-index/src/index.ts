import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { bmiQueryParser } from './parser/bmi';
import { excercisesBodyParser } from './parser/excercise';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello, fullstack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, width } = bmiQueryParser(req.query);
    const bmi = calculateBmi(height, width);
    res.json({
      height,
      width,
      bmi
    });
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { target, dailyExcercisesHours } = excercisesBodyParser(req.body);
    res.json(calculateExercises(target, dailyExcercisesHours));
  } catch (err: unknown) {
    let errMessage = '';
    if (err instanceof Error) {
      errMessage += err.message;
    }
    res.json({ error: errMessage });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});