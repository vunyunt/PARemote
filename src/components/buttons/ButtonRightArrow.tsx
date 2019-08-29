import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ViewStyles from "src/styles/ViewStyles";

interface ButtonRightArrowState {
  colorStyle: TextStyle;
}
interface ButtonRightArrowProps extends TouchableOpacityProps {
  label?: string;
  sublabel?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  iconSize?: number;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  disabled?: boolean;
}
export default class ButtonRightArrow extends Component<
  ButtonRightArrowProps,
  ButtonRightArrowState
> {
  static defaultProps: ButtonRightArrowProps = {
    iconSize: 28,
    topSeparator: false,
    bottomSeparator: false,
    disabled: false
  };

  constructor(props: ButtonRightArrowProps) {
    super(props);

    this.state = this.computeState(props);
  }

  componentWillReceiveProps(props: ButtonRightArrowProps) {
    this.computeState(props);
  }

  private computeState(prop: ButtonRightArrowProps): ButtonRightArrowState {
    if (prop.disabled) {
      return {
        colorStyle: {
          color: "lightgray"
        }
      };
    } else {
      return {
        colorStyle: {
          color: "gray"
        }
      };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          {...this.props}
          style={[
            ViewStyles.hflex,
            styles.touchable,
            this.props.containerStyle
          ]}
        >
          <View>
            <Text
              style={[
                styles.label,
                this.state.colorStyle,
                this.props.labelStyle
              ]}
            >
              {this.props.label}
            </Text>
            {this.props.sublabel && (
              <Text style={[styles.label, styles.subLabel]}>
                {this.props.sublabel}
              </Text>
            )}
          </View>
          <Icon
            name="chevron-right"
            size={this.props.iconSize}
            style={this.state.colorStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro"
  },

  innerContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  touchable: {
    padding: 16,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center"
  },

  label: {
    fontSize: 18
  },

  subLabel: {
    fontSize: 12,
    color: "gray"
  }
});
