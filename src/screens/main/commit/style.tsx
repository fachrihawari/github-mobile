import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  usernameInput: {
    textAlign: 'center',
    fontSize: 18,
    width: width * 0.9,
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
    width: width * 0.9,
    height: 45,
    borderRadius: 22.5
  },
  commitsWrapper: {
    width: width * 0.9,
    marginTop: 20
  },
  commitItem: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  commitItemImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 8
  },
  commitItemMessage: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  commitItemAuthor: {
    flexDirection: 'row'
  },
  logoutText: {
    marginRight: 15
  },
  loadingText: {
    marginBottom: 15,
    alignSelf: 'center'
  }
});
