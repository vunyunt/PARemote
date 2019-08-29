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

    hflex: {
      flexDirection: "row"
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
