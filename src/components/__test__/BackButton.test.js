// hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Provider } from "react-redux";
import BackButton from "../BackButton/index.jsx";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(
      <Provider store={mockStore({})}>
        <BackButton />
      </Provider>,
      container
    );
  });

  expect(container.textContent).toBe("Go Back");
});
