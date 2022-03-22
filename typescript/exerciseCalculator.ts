export const calculateExercises = (dailyHours: Array<number>, target: number): object => {
  if (dailyHours.length < 7) {
    for (let i = dailyHours.length; i < 7; i++) {
      dailyHours[i] = 0;
    }
  }

  const periodLength = (arr: Array<number>): number => arr.length;
  const trainingDays = (arr: Array<number>): number => arr.filter((e) => e !== 0).length;
  const average = (arr: Array<number>): number => arr.reduce((sum, e) => (sum = sum + e), 0) / arr.length;
  const success = (average: number, target: number) => average >= target;
  const rating = (average: number): number => Math.round(average);
  const ratingDescription = (rating: number): string => {
    switch (rating) {
      case 0:
        return "horrible";
      case 1:
        return "Very bad";
      case 2:
        return "could be better";
      case 3:
        return "awesome";
      default:
        return "value must be between 1 and 3";
    }
  };
  return {
    periodLength: periodLength(dailyHours),
    trainingDays: trainingDays(dailyHours),
    target: target,
    average: average(dailyHours),
    success: success(average(dailyHours), target),
    rating: rating(average(dailyHours)),
    ratingDescription: ratingDescription(rating(average(dailyHours))),
  };
};
