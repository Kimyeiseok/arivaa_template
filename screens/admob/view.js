import React from 'react';
import styles from './styles';
import { ScrollView, Text, View } from 'react-native';
import { Button, LinkBack } from '@arivaa-react-native/common';
import { AdMobBanner } from 'expo-ads-admob';
import { AD_MOB as Admob } from '../../constants/environment';

var view = function () {
  const { translate } = this.props;
  const { adUnits } = Admob;
  return (
    <View style={[styles.container]}>
      <View style={[styles.back]}>
        <LinkBack />
      </View>
      <ScrollView>
        <View style={[styles.content]}>
          <View style={[styles.adMob]}>
            {(adUnits || []).map((ad, index) => {
              switch (ad.type) {
                case 'banner':
                  return (
                    <View key={index} style={[styles.banner]}>
                      <AdMobBanner
                        bannerSize={ad.bannerSize || 'fullBanner'}
                        adUnitID={ad.unitId}
                        onDidFailToReceiveAdWithError={this.bannerError}
                      />
                    </View>
                  );
                case 'interstitial':
                  return (
                    <View key={index} style={[styles.item]}>
                      <Button onClick={this.showInterstitialAd.bind(this, ad)}>
                        <Text style={[styles.text]}>Show Interstitial Ad</Text>
                      </Button>
                    </View>
                  );
                case 'rewarded':
                  return (
                    <View key={index} style={[styles.item]}>
                      <Button onClick={this.showRewardedAd.bind(this, ad)}>
                        <Text style={[styles.text]}>Show Rewarded Ad</Text>
                      </Button>
                    </View>
                  );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
module.exports = view;
