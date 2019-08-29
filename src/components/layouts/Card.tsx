import React, { Component, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import VSeparator from "./VSeparator";

interface CardProps {
  title?: string;
  headerRight?: ReactNode;
}

export default class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);

    console.log({ props });
  }

  render() {
    return (
      <View style={styles.card}>
        {this.props.title && (
          <View style={[styles.titleContainer]}>
            <View style={styles.titleInnerContainer}>
              <Text style={[styles.title]}>{this.props.title}</Text>
              {this.props.headerRight}
            </View>

            <VSeparator />
          </View>
        )}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderColor: "gainsboro",
    backgroundColor: "white",
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3
  },

  titleContainer: {
    marginBottom: 12,
    width: "100%"
  },

  titleInnerContainer: {
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    flexDirection: "row",
    paddingLeft: 4,
    paddingRight: 4
  },

  title: {
    marginBottom: 12,
    fontWeight: "bold",
    fontSize: 16
  }
});
