# How to install

1. Clone project

   ```bash
   git clone https://github.com/fachrihawari/github-mobile
   ```

2. Enter directory project
   ```bash
   cd github-mobile
   ```
3. Install depedencies
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```
4. ANDROID only, copy your debug.keystore to android/app/debug.keystore
5. IOS only, install pod depedencies

   ```bash
   cd ios && pod install
   ```

6. Run packager

   ```bash
       yarn start
   ```

   or

   ```bash
       npm start
   ```

7. Run test

   ```bash
       yarn test
   ```

   or

   ```bash
       npm test
   ```

8. Run the app
   ```bash
   react-native run-android
   ```
   or
   ```bash
   react-native run-ios
   ```
