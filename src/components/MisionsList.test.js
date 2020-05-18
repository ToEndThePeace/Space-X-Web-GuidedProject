import React from "react";
import { render } from "@testing-library/react";
import MissionsList from "./MissionsList";

const testData = [
  {
    mission_id: 1,
    mission_name: "Apollo 1",
  },
  {
    mission_id: 2,
    mission_name: "Apollo 2",
  },
];

test("renders missions list without errors", () => {
  render(<MissionsList missions={[]} />);
});

test("renders error message if error prop is changed", () => {
  // First, render with no data and no errors
  const { getByText, queryByText, rerender } = render(
    <MissionsList missions={[]} error="" />
  );
  expect(queryByText(/this is an error message/i)).toBeNull();
  // Rerender as if there was a failed api call and component is rerendered with an error
  rerender(<MissionsList missions={[]} error="this is an error message" />);
  expect(getByText(/this is an error message/i)).toBeInTheDocument();
});

test("renders missions when missions data is passed down", () => {
  const { getAllByTestId, queryAllByTestId, t, rerender } = render(
    <MissionsList missions={[]} error="" />
  );
  expect(queryAllByTestId(/missions/i)).toHaveLength(0);
  rerender(<MissionsList missions={testData} error="" />);
  expect(queryAllByTestId(/missions/i)).toHaveLength(testData.length);
});
