import { useState } from "react";

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>
        {text}
        {": "}
        {value}
      </td>
    </tr>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>;

const Statistics = ({ statistics }) => {
  const totalOpinions = statistics.good + statistics.bad + statistics.neutral;

  const average = (statistics.good - statistics.bad) / totalOpinions;
  const positivePercentage = (statistics.good * 100) / totalOpinions;

  if (totalOpinions != 0) {
    return (
      <>
        <h2> statistics </h2>
        <table>
          <tbody>
            <StatisticLine value={statistics.good} text="good" />
            <StatisticLine value={statistics.neutral} text="neutral" />
            <StatisticLine value={statistics.bad} text="bad" />
            <StatisticLine value={totalOpinions} text="all" />
            <StatisticLine value={average} text="average" />
            <StatisticLine value={`${positivePercentage}%`} text="positive" />
          </tbody>
        </table>
      </>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () => setStatistics({ ...statistics, good: statistics.good + 1 });

  const handleNeutral = () => setStatistics({ ...statistics, neutral: statistics.neutral + 1 });

  const handleBad = () => setStatistics({ ...statistics, bad: statistics.bad + 1 });

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
