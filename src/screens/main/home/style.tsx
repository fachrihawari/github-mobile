import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  repositoryWrapper: {
    marginTop: 50
  },
  usernameInput: {
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
  logoutText: {
    marginRight: 15
  },
  userWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  userAvatar: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    borderRadius: 50,
    marginRight: 10
  },
  userName: {
    fontSize: 18,
    marginBottom: 5
  },
  userBlog: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue'
  },
  userBio: {
    fontSize: 16,
    fontStyle: 'italic'
  }
});
