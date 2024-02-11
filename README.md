# To-do mobile widget app 

A mobile app for writing down stuff to do and being able to see it on the home page withing an app widget.


Written in react native, but was only developped for android.


![demogif (2)](https://github.com/Iaol12/todowidget/assets/113976963/4dfc27b7-c5de-43b8-875f-185f998baa51)

## Dev Build

npm install


download android studio with android sdk, connect android device via adb 


npm start,  then press a for android when prompted


in case of errors fill all requirenments listed when "npx react-native doctor" is run



## technical side
Javascript side(open app) and android native side(widget) communicate using native modules bridge https://reactnative.dev/docs/native-modules-intro


Data is saved to SharedPreferences https://developer.android.com/reference/android/content/SharedPreferences
