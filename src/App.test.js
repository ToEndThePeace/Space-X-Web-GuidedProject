import React from "react";
import { render, waitFor } from "@testing-library/react";
import { fetchMissions } from "./api/fetchMissions";
import userEvent from "@testing-library/user-event";
import App from "./App";

const testData = {
  data: [
    {
      mission_id: 1,
      mission_name: "Apollo 1",
    },
    {
      mission_id: 2,
      mission_name: "Apollo 2",
    },
  ],
};

// Outside tests, mock fetchMissions
jest.mock("./api/fetchMissions");

test("renders app wthout errors", () => {
  render(<App />);
});

test("renders data after api call", async () => {
  //Before render, mock the resolved value (just once) so that
  //we can reuse the mocked function in other tests

  fetchMissions.mockResolvedValueOnce(testData);

  /**
   * test needs to render the app, click on "get data" button, and
   * assert that the data is rendered AFTER api fetch is done
   */
  const { getByText, queryAllByTestId } = render(<App />);
  // fireEvent.click(getByText(/get data/i));
  userEvent.click(getByText(/get data/i));

  //fetchMissions is being called and will return testData ONCE

  //we need to mimic waiting for the reolustion
  //turn the test function inso an async function
  //then await for the promise to be resolved
  await waitFor(() => expect(queryAllByTestId(/missions/i)).toHaveLength(2));
  expect(fetchMissions).toHaveBeenCalledTimes(1);
});
