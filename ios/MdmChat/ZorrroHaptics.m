#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface ZorrroHaptics : NSObject <RCTBridgeModule>
@end

@implementation ZorrroHaptics

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(trigger:(NSString *)type)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([type isEqualToString:@"selection"]) {
      UISelectionFeedbackGenerator *generator = [[UISelectionFeedbackGenerator alloc] init];
      [generator prepare];
      [generator selectionChanged];
    } else if ([type isEqualToString:@"light"]) {
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleLight];
      [generator prepare];
      [generator impactOccurred];
    } else if ([type isEqualToString:@"medium"]) {
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleMedium];
      [generator prepare];
      [generator impactOccurred];
    } else if ([type isEqualToString:@"heavy"]) {
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleHeavy];
      [generator prepare];
      [generator impactOccurred];
    } else if ([type isEqualToString:@"success"]) {
      UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
      [generator prepare];
      [generator notificationOccurred:UINotificationFeedbackTypeSuccess];
    } else if ([type isEqualToString:@"warning"]) {
      UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
      [generator prepare];
      [generator notificationOccurred:UINotificationFeedbackTypeWarning];
    } else if ([type isEqualToString:@"error"]) {
      UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
      [generator prepare];
      [generator notificationOccurred:UINotificationFeedbackTypeError];
    }
  });
}

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
