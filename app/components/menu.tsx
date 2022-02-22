import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableHighlight } from "react-native";
import { PropTypes as PropTypesMX } from "mobx-react";
import MenuArtcileItem from "./menuArtcileItem";
import ArticleEntity from "../entity/ArticleEntity";

export default class Menu extends Component {
  static propTypes = {
    items: PropTypesMX.observableArray.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemActive: PropTypes.func
  };

  static defaultProps = {
    items: [],
    onItemClick: () => {},
    onItemActive: () => false
  };

  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    return (
      <View>
        {this.props.items && this.props.items.map(i => this.renderItem(i))}
      </View>
    );
  }

  /**
   * @param {ArticleEntity} article
   */
  renderItem(article) {
    let { onItemClick } = this.props;
    return (
      <TouchableHighlight
        key={article.id}
        onPress={() => onItemClick(article)}
        underlayColor={underlayColor}
      >
        <View>
          <MenuArtcileItem
            imgUrl={article.image}
            label={article.title}
            locked={article.is_locked}
            active={this.props.onItemActive(article)}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

var underlayColor = "#E3F2FD";
