import tinycolor from 'tinycolor2';

const ColorBorder = (color: string): string =>
  tinycolor(color).darken(15).toRgbString();
const ColorTextBackground = (color: string): string =>
  tinycolor(color).lighten(30).setAlpha(0.2).toRgbString();

let colors: any = {
  text: 'white',
  necessary: 'rgb(50, 205, 50)',
  possible: 'rgb(255, 215, 0)',
  must_not: 'rgb(255, 51, 0)',
  important: 'rgb(30, 144, 255)',
};

colors.textBorder = ColorBorder(colors.text);
colors.textTextBackground = 'rgb(245, 245, 245)';
colors.necessaryBorder = ColorBorder(colors.necessary);
colors.necessaryTextBackground = ColorTextBackground(colors.necessary);
colors.possibleBorder = ColorBorder(colors.possible);
colors.possibleTextBackground = ColorTextBackground(colors.possible);
colors.must_notBorder = ColorBorder(colors.must_not);
colors.must_notTextBackground = ColorTextBackground(colors.must_not);
colors.importantBorder = ColorBorder(colors.important);
colors.importantTextBackground = ColorTextBackground(colors.important);
colors.navBlueBackground = '#62b6cf';
colors.navText = 'white';
colors.buttonHighlightsWhite = 'rgba(255,255,255,0.4)';
colors.articleText = '#333';
colors.articleTitleText = '#333';
colors.articleImageBorder = 'rgb(97, 59, 16)';
colors.touchableHighligts = 'rgba(0,0,0,0.05)';

colors.toolbarText = '#333';
colors.borderColorToolbar = '#666';
colors.toolbarBackground = '#fff';
colors.menuBackgroundActive = '#c4f2ff';

export default colors;
