#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <UIKit/UIKit.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>
#import <Photos/Photos.h>

@interface MediaPicker : NSObject <RCTBridgeModule, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UIDocumentPickerDelegate>
@property (nonatomic, strong) RCTPromiseResolveBlock imageResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock imageReject;
@property (nonatomic, strong) RCTPromiseResolveBlock documentResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock documentReject;
@end

@implementation MediaPicker

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)presentImagePickerWithSourceType:(UIImagePickerControllerSourceType)sourceType
{
  UIViewController *presentedController = RCTPresentedViewController();
  if (!presentedController || self.imageReject == nil) {
    return;
  }

  if (![UIImagePickerController isSourceTypeAvailable:sourceType]) {
    self.imageReject(@"unavailable", sourceType == UIImagePickerControllerSourceTypeCamera ? @"Camera is not available on this device." : @"Photo library is not available.", nil);
    self.imageResolve = nil;
    self.imageReject = nil;
    return;
  }

  UIImagePickerController *picker = [UIImagePickerController new];
  picker.delegate = self;
  picker.modalPresentationStyle = UIModalPresentationFullScreen;
  picker.sourceType = sourceType;
  picker.mediaTypes = @[@"public.image"];

  [presentedController presentViewController:picker animated:YES completion:nil];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_METHOD(pickImage:(NSString *)source
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (self.imageResolve != nil) {
    reject(@"busy", @"An image request is already in progress.", nil);
    return;
  }

  UIViewController *presentedController = RCTPresentedViewController();
  if (!presentedController) {
    reject(@"no_controller", @"Could not find a view controller to present image picker.", nil);
    return;
  }

  self.imageResolve = resolve;
  self.imageReject = reject;
  BOOL useCamera = [source isEqualToString:@"camera"];
  if (!useCamera) {
    [self presentImagePickerWithSourceType:UIImagePickerControllerSourceTypePhotoLibrary];
    return;
  }

  UIAlertController *sheet = [UIAlertController alertControllerWithTitle:nil
                                                                 message:nil
                                                          preferredStyle:UIAlertControllerStyleActionSheet];
  __weak typeof(self) weakSelf = self;
  [sheet addAction:[UIAlertAction actionWithTitle:@"Take Photo"
                                            style:UIAlertActionStyleDefault
                                          handler:^(UIAlertAction * _Nonnull action) {
    [weakSelf presentImagePickerWithSourceType:UIImagePickerControllerSourceTypeCamera];
  }]];
  [sheet addAction:[UIAlertAction actionWithTitle:@"Choose from Gallery"
                                            style:UIAlertActionStyleDefault
                                          handler:^(UIAlertAction * _Nonnull action) {
    [weakSelf presentImagePickerWithSourceType:UIImagePickerControllerSourceTypePhotoLibrary];
  }]];
  [sheet addAction:[UIAlertAction actionWithTitle:@"Cancel"
                                            style:UIAlertActionStyleCancel
                                          handler:^(UIAlertAction * _Nonnull action) {
    if (weakSelf.imageReject != nil) {
      weakSelf.imageReject(@"cancelled", @"Image picking was cancelled.", nil);
    }
    weakSelf.imageResolve = nil;
    weakSelf.imageReject = nil;
  }]];
  [presentedController presentViewController:sheet animated:YES completion:nil];
}

RCT_EXPORT_METHOD(pickDocument:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (self.documentResolve != nil) {
    reject(@"busy", @"A document request is already in progress.", nil);
    return;
  }

  UIViewController *presentedController = RCTPresentedViewController();
  if (!presentedController) {
    reject(@"no_controller", @"Could not find a view controller to present document picker.", nil);
    return;
  }

  self.documentResolve = resolve;
  self.documentReject = reject;

  UIDocumentPickerViewController *picker;
  if (@available(iOS 14.0, *)) {
    picker = [[UIDocumentPickerViewController alloc] initForOpeningContentTypes:@[UTTypeData] asCopy:YES];
  } else {
    picker = [[UIDocumentPickerViewController alloc] initWithDocumentTypes:@[@"public.data"] inMode:UIDocumentPickerModeImport];
  }
  picker.delegate = self;
  picker.modalPresentationStyle = UIModalPresentationFormSheet;
  [presentedController presentViewController:picker animated:YES completion:nil];
}

RCT_EXPORT_METHOD(getRecentImages:(nonnull NSNumber *)limit
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSInteger safeLimit = MAX(1, MIN(limit.integerValue, 60));
  PHAuthorizationStatus authStatus;
  if (@available(iOS 14, *)) {
    authStatus = [PHPhotoLibrary authorizationStatusForAccessLevel:PHAccessLevelReadWrite];
  } else {
    authStatus = [PHPhotoLibrary authorizationStatus];
  }

  void (^fetchBlock)(void) = ^{
    PHFetchOptions *options = [PHFetchOptions new];
    options.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:NO]];
    PHFetchResult<PHAsset *> *assets = [PHAsset fetchAssetsWithMediaType:PHAssetMediaTypeImage options:options];
    NSMutableArray *result = [NSMutableArray array];
    PHImageRequestOptions *requestOptions = [PHImageRequestOptions new];
    requestOptions.synchronous = YES;
    requestOptions.deliveryMode = PHImageRequestOptionsDeliveryModeFastFormat;

    NSInteger count = 0;
    for (PHAsset *asset in assets) {
      if (count >= safeLimit) break;
      __block UIImage *image = nil;
      [[PHImageManager defaultManager] requestImageForAsset:asset
                                                 targetSize:CGSizeMake(512, 512)
                                                contentMode:PHImageContentModeAspectFill
                                                    options:requestOptions
                                              resultHandler:^(UIImage * _Nullable resultImage, NSDictionary * _Nullable info) {
        image = resultImage;
      }];

      if (image == nil) {
        continue;
      }

      NSData *data = UIImageJPEGRepresentation(image, 0.8);
      if (data == nil) {
        continue;
      }

      NSString *fileName = [NSString stringWithFormat:@"recent-%@.jpg", asset.localIdentifier ?: [NSUUID UUID].UUIDString];
      NSString *tempPath = [NSTemporaryDirectory() stringByAppendingPathComponent:fileName];
      [data writeToFile:tempPath atomically:YES];
      NSString *uri = [NSURL fileURLWithPath:tempPath].absoluteString;

      NSDictionary *item = @{
        @"uri": uri ?: @"",
        @"name": fileName,
        @"mimeType": @"image/jpeg",
        @"size": @(data.length)
      };
      [result addObject:item];
      count += 1;
    }
    resolve(result);
  };

  BOOL isAuthorized = authStatus == PHAuthorizationStatusAuthorized || authStatus == PHAuthorizationStatusLimited;
  if (isAuthorized) {
    fetchBlock();
    return;
  }

  if (@available(iOS 14, *)) {
    [PHPhotoLibrary requestAuthorizationForAccessLevel:PHAccessLevelReadWrite handler:^(PHAuthorizationStatus status) {
      dispatch_async(dispatch_get_main_queue(), ^{
        if (status == PHAuthorizationStatusAuthorized || status == PHAuthorizationStatusLimited) {
          fetchBlock();
        } else {
          reject(@"permission_denied", @"Photos permission is required to load gallery images.", nil);
        }
      });
    }];
  } else {
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
      dispatch_async(dispatch_get_main_queue(), ^{
        if (status == PHAuthorizationStatusAuthorized) {
          fetchBlock();
        } else {
          reject(@"permission_denied", @"Photos permission is required to load gallery images.", nil);
        }
      });
    }];
  }
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<UIImagePickerControllerInfoKey,id> *)info
{
  NSURL *url = info[UIImagePickerControllerImageURL];
  if (url == nil) {
    UIImage *image = info[UIImagePickerControllerOriginalImage];
    NSData *data = UIImageJPEGRepresentation(image, 0.9);
    NSString *tempName = [NSString stringWithFormat:@"picked-%@.jpg", [[NSUUID UUID] UUIDString]];
    NSString *tempPath = [NSTemporaryDirectory() stringByAppendingPathComponent:tempName];
    [data writeToFile:tempPath atomically:YES];
    url = [NSURL fileURLWithPath:tempPath];
  }

  NSString *fileName = url.lastPathComponent ?: @"image.jpg";
  NSNumber *fileSize = nil;
  NSDictionary<NSFileAttributeKey, id> *attributes = [[NSFileManager defaultManager] attributesOfItemAtPath:url.path error:nil];
  if (attributes != nil) {
    fileSize = attributes[NSFileSize];
  }

  UIImage *image = info[UIImagePickerControllerOriginalImage];
  NSNumber *width = image ? @(image.size.width) : nil;
  NSNumber *height = image ? @(image.size.height) : nil;

  NSMutableDictionary *payload = [@{
    @"uri": url.absoluteString ?: @"",
    @"name": fileName,
    @"mimeType": @"image/jpeg"
  } mutableCopy];

  if (fileSize != nil) payload[@"size"] = fileSize;
  if (width != nil) payload[@"width"] = width;
  if (height != nil) payload[@"height"] = height;

  [picker dismissViewControllerAnimated:YES completion:^{
    if (self.imageResolve != nil) {
      self.imageResolve(payload);
    }
    self.imageResolve = nil;
    self.imageReject = nil;
  }];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
  [picker dismissViewControllerAnimated:YES completion:^{
    if (self.imageReject != nil) {
      self.imageReject(@"cancelled", @"Image picking was cancelled.", nil);
    }
    self.imageResolve = nil;
    self.imageReject = nil;
  }];
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller didPickDocumentsAtURLs:(NSArray<NSURL *> *)urls
{
  NSURL *url = urls.firstObject;
  if (url == nil) {
    if (self.documentReject != nil) {
      self.documentReject(@"no_document", @"No document was selected.", nil);
    }
    self.documentResolve = nil;
    self.documentReject = nil;
    return;
  }

  [url startAccessingSecurityScopedResource];
  NSDictionary<NSFileAttributeKey, id> *attributes = [[NSFileManager defaultManager] attributesOfItemAtPath:url.path error:nil];
  [url stopAccessingSecurityScopedResource];

  NSNumber *fileSize = attributes[NSFileSize];
  NSString *fileName = url.lastPathComponent ?: @"document";
  NSString *mimeType = @"application/octet-stream";
  if (@available(iOS 14.0, *)) {
    UTType *type = [UTType typeWithFilenameExtension:url.pathExtension];
    if (type.preferredMIMEType != nil) {
      mimeType = type.preferredMIMEType;
    }
  }

  NSMutableDictionary *payload = [@{
    @"uri": url.absoluteString ?: @"",
    @"name": fileName,
    @"mimeType": mimeType
  } mutableCopy];
  if (fileSize != nil) payload[@"size"] = fileSize;

  if (self.documentResolve != nil) {
    self.documentResolve(payload);
  }
  self.documentResolve = nil;
  self.documentReject = nil;
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController *)controller
{
  if (self.documentReject != nil) {
    self.documentReject(@"cancelled", @"Document picking was cancelled.", nil);
  }
  self.documentResolve = nil;
  self.documentReject = nil;
}

@end
