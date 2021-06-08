import { ComponentProps, VFC } from "react";

export const ProgressBar = ({ value, max = 100 }) => (
  <div className="progress-wrapper">
    <p className="progress-status">progress: {value}%</p>
    <progress className="progress-bar" max={max} value={value} />
  </div>
);
