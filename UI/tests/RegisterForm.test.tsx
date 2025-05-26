import "@testing-library/jest-dom";
import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
//
import RegisterForm from "@components/RegisterForm";


test("Register Form", () =>
{
  render(<RegisterForm makes={ [] } colours={ [] } />);

  const messageElement: HTMLParagraphElement = screen.getByTestId("message");
  const makeElement: HTMLSelectElement = screen.getByTestId("makeID");
  const colourElement: HTMLSelectElement = screen.getByTestId("colourID");
  const numberPlateElement: HTMLSelectElement = screen.getByTestId("numberPlate");
  const submitElement: HTMLButtonElement = screen.getByTestId("submit");

  act(() =>
  {
    makeElement.value = "Honda City";
    colourElement.value = "Black";
    numberPlateElement.value = "ABC123";

    submitElement.click();
  });

  console.log(messageElement.innerHTML);

  expect(messageElement.innerHTML).toBe("Vehicle Added Successfully!");
});