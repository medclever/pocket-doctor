import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Slider
} from "react-native";
import params from "../constants/params";
import colors from "../constants/colors";
import ArticleRepository from "../repository/ArticleRepository";
import ImageRepository from "../repository/ImageRepository";
import ArticlePartGroup from "./ArticlePartGroup";
import ArticleHelper from "../helper/ArticleHelper";
import { Storages } from "../constants/storages";
import { SettingsKeys } from "../storages/SettingsStorage";
import { inject, observer } from "mobx-react/native";
import { i18n, i18n_keys } from "../constants/i18n";

@inject(Storages.Storage)
@observer
export class ArticleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        parts: [
          {
            type: "group",
            data: {
              title: {
                color: "rgb(50, 205, 50)",
                colorBorder: "rgb(35, 143, 35)",
                text: ""
              },
              group: {
                colorBorder: "rgb(35, 143, 35)",
                backgroundColor: "rgba(173, 235, 173, 0.2)"
              },
              parts: [
                {
                  type: "text",
                  data: { content: "" }
                }
              ]
            }
          }
        ]
      }
    };
  }

  render() {
    const { data } = this.state;
    data.parts[0].data.title.text = this.props.title;
    data.parts[0].data.parts[0].data.content = this.props.text;

    let storageSettings = this.props.storage.settings,
      stylesTitle = {
        fontSize: params.ArticleTitleFontSize * storageSettings.getFontSize()
      };

    return (
      <View style={styles.articleContainer}>
        <ArticlePartGroup key={JSON.stringify(data)} data={data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: "white"
  },
  title: {
    color: colors.articleTitleText
  }
});
