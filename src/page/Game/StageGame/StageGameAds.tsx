import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';

export const getAds = () => {
  try {
    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
    });

    rewarded.onAdEvent((type, error, reward) => {
      if (error) {
        console.log('동영상을 불러오는 중 오류가 발생했어요', error);
      }
      if (type === RewardedAdEventType.LOADED) {
        // 동영상 로드 완료
        rewarded.show(); // 동영상 광고 띄우기
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });
    rewarded.load();
  } catch (error) {
    console.log('catch error', error);
  }
};
