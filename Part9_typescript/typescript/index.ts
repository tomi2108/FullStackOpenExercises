import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const params = req.query;
  const height = Number(params.height);
  const weight = Number(params.weight);
  res.json({ height, weight, bmi: calculateBmi(height, weight) });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyHours, target }: { dailyHours: Array<number>; target: number } = req.body;

  if (!dailyHours || !target) res.send({ error: "parameters missing" }).status(400);
  if (typeof dailyHours !== typeof [0] || typeof target !== typeof 1) res.send({ error: "malformed parameters" }).status(400);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(dailyHours, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
