import React, { Component } from "react";
import PropTypes from "prop-types";
import colors from "../constants/colors";
import { Params, ParamsKey } from "../constants/params";
import { Text, View, StyleSheet, Image } from "react-native";
import { observer, inject } from "mobx-react/native";
import { Storages } from "../constants/storages";

@inject(Storages.Storage)
@observer
export default class MenuArticleItem extends Component {
  static defaultProps = {
    imgUrl: "",
    label: "",
    locked: false
  };

  render() {
    let locked = null;
    if (this.props.locked) {
      locked = (
        <View style={styles.itemIconLockContainer}>
          <Image
            style={styles.itemIconLock}
            source={require("../images/icon_lock.png")}
          />
        </View>
      );
    }

    let storageSettings = this.props.storage.settings,
      styleItemLabel = {
        fontSize:
          Params[ParamsKey.MenuTextFontSize] * storageSettings.getFontSize()
      };

    let stylesLocal = {
      itemContainer: {
        backgroundColor: this.props.active
          ? colors.menuBackgroundActive
          : "white"
      }
    };

    return (
      <View style={[styles.itemContainer, stylesLocal.itemContainer]}>
        <View style={styles.itemSeparator} />
        <View style={styles.item}>
          <Image style={styles.itemImage} source={{ uri: this.props.imgUrl }} />
          {locked}
          <View style={styles.itemLabelContainer}>
            <Text style={[styles.itemLabel, styleItemLabel]}>
              {this.props.label}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

MenuArticleItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white"
  },
  item: {
    flexDirection: "row",
    height: Params[ParamsKey.MenuItemHeight],
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  itemIconLockContainer: {
    position: "absolute",
    left: 70,
    top: 5
  },
  itemIconLock: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white"
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 10
  },
  itemLabelContainer: {
    flex: 1,
    padding: 5
  },
  itemLabel: {
    color: "#333"
  },
  itemSeparator: {
    height: 1,
    backgroundColor: "#DDDDDD"
  }
});
