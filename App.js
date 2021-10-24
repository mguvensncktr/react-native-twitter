import React, { useEffect } from 'react';
import Router from './src/router/index';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify, {
  Auth,
  API,
  graphqlOperation
} from 'aws-amplify'
import config from './src/aws-exports'
import { getUser } from './queries'
import { createUser } from './mutations'
Amplify.configure(config)

function App() {

  const getRandomImage = () => {
    return 'https://www.merlininkazani.com/images/games/12350/108680_640.jpg'
  }

  const saveUserToDB = async (user) => {
    await API.graphql(graphqlOperation(createUser, { input: user }))
  }

  useEffect(() => {
    const updateUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (userInfo) {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),

          }
          await saveUserToDB(user);
        } else {
          console.log('Kullanıcı var')
        }

      }
    }
    updateUser();
  }, [])

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
