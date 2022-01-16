import {
  NativeModules,
  Platform,
} from 'react-native';

const { RNZalo } = NativeModules;

class Zalo {
  static async login(verifier = "", code = "") {
    if (Platform.OS === 'ios') {
      try {
        const oauthCode = await RNZalo.login(verifier, code);
        return new Promise((resolve, reject) => {
          RNZalo.getProfile(oauthCode, verifier, (data) => {
            resolve({
              user: data,
              oauthCode,
              uId: null,
              channel: null,
            });
          }, (e) => {
            reject(e);
          });
        });
      } catch (error) {
        throw error;
      }
    } else {
      return await RNZalo.login();
    }
  }

  static logout() {
    RNZalo.logout();
  }
}

export default Zalo;
