export const calculateBmi = (height: number, mass: number): string => {
  const bmi: number = mass / ((height / 100) * (height / 100));

  if (bmi < 17) return "Underweight (unhealthy weight)";

  if (bmi < 25) return "Normal (healthy weight)";

  return "Overweight (unhealthy weight)";
};
