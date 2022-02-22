import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, Text, StyleSheet } from "react-native";
import { i18n, i18n_keys } from "../constants/i18n";
import colors from "../constants/colors";

export class HeaderButtonSettings extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={colors.touchableHighligts}
      >
        <Text style={styles.button}>{i18n.t(i18n_keys.SETTINGS_TITLE)}</Text>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  container: {},
  button: {
    padding: 10,
    fontSize: 20,
    color: colors.navText,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.navText
  }
});
