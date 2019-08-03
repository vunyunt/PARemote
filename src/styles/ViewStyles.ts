import { StyleSheet } from "react-native";

class ViewStylesClass {
  constructor() {}

  mConstants = Object.freeze({
    paddings: {
      NORMAL: 28
    }
  });

  mStyles = StyleSheet.create({
    screenRoot: {
      padding: 24
    },

    card: {
      marginLeft: 0,
      marginRight: 0,
      borderRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 2,
      shadowColor: "black",
      shadowOpacity: 0.5
    },

    normalPadding: {
      padding: this.mConstants.paddings.NORMAL
    }
  });

  getStyles() {
    return this.mStyles;
  }
}
const ViewStylesInstance = new ViewStylesClass();
const ViewStyles = ViewStylesInstance.getStyles();

export default ViewStyles;
