import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";
import HomeScreen from "./Home";

describe("Test Home Screen", () => {
  test("Snapshoot Home Screen", () => {
    const tree = renderer
      .create(<HomeScreen navigation={undefined} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Test TouchableOpacity Home Screen", () => {
    const mockNavigation = {
      navigate: (value) => value,
    };
    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    const getButton = getByTestId("pressable-logistic");
    const handleButton = fireEvent.press(getButton);
    expect(handleButton).toBe("LogisticHome");
  });
});
