JWTMapApp Documentation

1.Setup Instructions
Create the project using Expo:npx create-expo-app JWTMapApp --template blank

2.Install dependencies:
npx expo install @react-navigation/native @react-navigation/stack
npx expo install @react-navigation/native-stack
npx expo install react-native-gesture-handler
npx expo install react-native-screens
npx expo install react-native-maps
npm install axios
npm install react-native-dotenv
npx expo install @react-native-async-storage/async-storage

3. Environment Variable Configuration (Google Maps API Key)
GOOGLE_MAPS_API_KEY=AIzaSyA96LWVndNZMxLLoysSoYtgSpDSCp9SJ8E

4.Project Structure
Create the src folder: This will hold all of project files.
JWTMapApp/
├── src/
│   ├── constants/
│   │   ├── Config.js           # Stores configuration settings (e.g., Google Map API keys,SERVER Url,Color,FontSize and String text)
│   ├── screens/
│   │   ├── Login.js            # The login screen for user authentication
│   │   ├── Map.js              # The map screen where locations are displayed
│   ├── utils/
│   │   ├── ApiService.js       # API service for handling network requests
│   └── App.js                  # Main application entry point
├── package.json                # Project dependencies and scripts

5.Implementation Decisions 
Login Screen:

A simple login UI is created to validate the user's credentials. Once the user clicks the login button,check the fields and show alert for errors, and if the credentials are correct,send request to api and if success, store token in AsyncStorage and navigate to the Map screen.
If the login fails, an alert is displayed to inform the user.

Map Screen:

Google Maps Integration: The react-native-maps library is used to display a map. The map's API key is stored in the Config file and used to load the map.
Markers: Markers are added to the map dynamically, and clicking a marker shows or hides additional details about the location.

Authentication:
The app first checks whether the user is logged in or not by looking for a token stored in AsyncStorage. If the token exists, the user is directly navigated to the map screen. If not, the login screen is shown.

API Calls:
A common function for API calls is created to handle all authentication and data-fetching requests. Axios is used for making HTTP requests.

6.Future Improvements

If more time were available, here are some features I would implement:
1.Improved Error Handling: Handle various error cases such as network errors, server issues, and expired JWT tokens more gracefully.
2.UI/UX Enhancements: Improve the user interface by adding animations, transitions, and a better visual design for both the login screen and the map view.
3.Offline Mode: Add offline support by caching markers and displaying them when the user is not connected to the internet.

7.App Flow
1. Login Flow:
When the app starts, it first checks if the user is logged in by looking for a JWT token in AsyncStorage.
If the token is found, the app navigates to the Map screen.
If no token is found, the app displays the Login screen where users can input their credentials.
On successful login, the token is stored in AsyncStorage, and the app navigates to the Map screen.
If the login fails, an alert is displayed to inform the user.
2. Map Screen Flow:
The app uses Google Maps to display a map of locations fetched from a backend server.
Markers are added on the map to represent locations.
Clicking a marker shows detailed information about that location.

