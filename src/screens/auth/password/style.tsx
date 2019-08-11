import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  passwordInput: {
    textAlign: 'center',
    fontSize: 18,
    width: width * 0.8,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f8f8f8',
    shadowColor: 'rgba(191, 191, 191, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ededed',
    marginBottom: 15
  },
  continueButton: {
    width: width * 0.8,
    height: 45,
    borderRadius: 22.5
  },
  error: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    color: '#FFFFFF',
    marginBottom: 15
  }
});
