import React, {FC} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

export interface ISpinnerProps {
  visible: boolean;
  cancelable: boolean;
  textContent: string;
  color: string;
  size?: number | 'small' | 'large';
  textStyle: any;
  overlayColor: string;
}

export const Spinner: FC<ISpinnerProps> = ({
  visible = false,
  textContent = '',
  textStyle,
  color = 'white',
  size = 'large',
  overlayColor = 'rgba(0, 0, 0, 0.25)',
  children,
}) => {
  if (!visible) return null;

  const renderDefault = () => (
    <View style={[styles.background, {backgroundColor: overlayColor}]}>
      <ActivityIndicator color={color} size={size} style={{flex: 1}} />
      <View style={styles.textContainer}>
        <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container} key={'spinner_' + 'Date.now()'}>
      {children ? children : renderDefault()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    marginTop: 5,
  },
  textContent: {
    height: 50,
    fontSize: 25,
    fontWeight: 'bold',
  },
  background: {},
});
