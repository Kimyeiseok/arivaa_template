import React from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import SocialSignIn from '../main';

var view = function () {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.description]}>
        A Social Sign In component will help users to sign in or register using
        social platforms like Facebook or Google.
      </Text>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Social Sign In with Facebook</Text>
        <SocialSignIn
          clientId={'513432372363654'}
          scopes={['public_profile']}
          type="facebook"
          onSuccess={(result) => {
            alert(
              'Logged into facebook Successfully - Response - ' +
                JSON.stringify(result)
            );
          }}
          onError={(error) => {
            alert(
              'Error while logging into facebook - Response - ' +
                JSON.stringify(error)
            );
          }}
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Social Sign In with Google</Text>
        <SocialSignIn
          clientId={[
            '69935791112-29dfkr3n0fhtp7s0k51ctleireu44sqq.apps.googleusercontent.com',
            '69935791112-f29ach1noraci1cv5ben4evobtb1hir7.apps.googleusercontent.com',
          ]}
          type="google"
          onSuccess={(result) => {
            alert(
              'Logged into google Successfully - Response - ' +
                JSON.stringify(result)
            );
          }}
          onError={(error) => {
            console.log({ error });
            alert('Error while logging into google.', +JSON.stringify(error));
          }}
        />
      </View>
      {/* <View style={[styles.section]}>
                <Text style={[styles.title]}>Social Sign In with Twitter</Text>
                <SocialSignIn
                    clientId={[
                        'RcE2YAo819Js7N4C2Pws6KpUV',
                        'hxYvdKUBML8yLYW59AdgPS69jBkbzthGWYx8xIpOmYMFoxUYap']}
                    scopes={
                        ['profile', 'email']
                    }
                    type="twitter"
                    triggerElement={
                        <Button type="primary" style={[styles.googleBtn]} textStyle={styles.buttonText}
                                text={'Sign In With Twitter'}/>
                    }
                    onSuccess={(result) => {
                        alert('Logged into twitter Successfully - Response - ' + JSON.stringify(result))
                    }}
                    onError={(error) => {
                        alert('Error while logging into twitter.', +JSON.stringify(error))
                    }}
                />
            </View>
            <View style={[styles.section]}>
                <Text style={[styles.title]}>Social Sign In with Linkedin</Text>
                <SocialSignIn
                    clientId={[
                        '810fixo0d9df83',
                        'w31LcBnbeqYRANl3'
                    ]}
                    scopes={
                        ['r_basicprofile',
                            'r_emailaddress',
                            'w_share',]
                    }
                    type="linkedin"
                    triggerElement={
                        <Button type="primary" style={[styles.googleBtn]} textStyle={styles.buttonText}
                                text={'Sign In With Linkedin'}/>
                    }
                    onSuccess={(result) => {
                        alert('Logged into linkedin Successfully - Response - ' + JSON.stringify(result))
                    }}
                    onError={(error) => {
                        alert('Error while logging into linkedin.', +JSON.stringify(error))
                    }}
                />
            </View> */}
    </View>
  );
};
module.exports = view;
