#import "MdmPermissions.h"
#import <AVFoundation/AVFoundation.h>
#import <UserNotifications/UserNotifications.h>
#import <Photos/Photos.h>

@implementation MdmPermissions

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(requestAllPermissions:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        // Request Camera
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL cameraGranted) {
            
            // Request Microphone
            [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL micGranted) {
                
                // Request Photos
                [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus photoStatus) {
                    BOOL photosGranted = (photoStatus == PHAuthorizationStatusAuthorized || photoStatus == PHAuthorizationStatusLimited);
                    
                    // Request Notifications
                    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
                    [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
                                          completionHandler:^(BOOL notifGranted, NSError * _Nullable error) {
                        
                        NSDictionary *results = @{
                            @"camera": @(cameraGranted),
                            @"microphone": @(micGranted),
                            @"photos": @(photosGranted),
                            @"notifications": @(notifGranted)
                        };
                        resolve(results);
                    }];
                }];
            }];
        }];
    });
}

@end
