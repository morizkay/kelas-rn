import React from "react";
import renderer from "react-test-renderer";
// import { render, fireEvent, RenderAPI } from "@testing-library/react-native";
import HomeScreen from "./Home";

describe("Test Home Screen", () => {
  test("Snapshoot Home Screen", () => {
    const tree = renderer
      .create(<HomeScreen navigation={undefined} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test('Test TouchableOpacity Home Screen', () => {
  //   const mockNavigation = {
  //     navigate: (value) => value
  //   }
  //   const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
  //   const getButton = getByTestId('data-1');
  //   const handleButton = fireEvent.press(getButton);
  //   expect(handleButton).toBe('ListCityScreen');
  // });
});
