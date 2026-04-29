#import <AVFoundation/AVFoundation.h>
#import <React/RCTBridgeModule.h>

@interface AudioRecorder : NSObject <RCTBridgeModule, AVAudioRecorderDelegate, AVAudioPlayerDelegate>
@property (nonatomic, strong) AVAudioRecorder *recorder;
@property (nonatomic, strong) AVAudioPlayer *player;
@property (nonatomic, copy) NSString *recordedFilePath;
@end

@implementation AudioRecorder

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_METHOD(startRecording:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *sessionError = nil;
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayAndRecord error:&sessionError];
  [session setMode:AVAudioSessionModeDefault error:&sessionError];
  [session setActive:YES error:&sessionError];
  if (sessionError != nil) {
    reject(@"audio_session_error", @"Failed to setup audio session.", sessionError);
    return;
  }

  NSString *fileName = [NSString stringWithFormat:@"recording-%@.m4a", [[NSUUID UUID] UUIDString]];
  NSString *filePath = [NSTemporaryDirectory() stringByAppendingPathComponent:fileName];
  NSURL *fileURL = [NSURL fileURLWithPath:filePath];
  self.recordedFilePath = filePath;

  NSDictionary *settings = @{
    AVFormatIDKey: @(kAudioFormatMPEG4AAC),
    AVSampleRateKey: @44100.0,
    AVNumberOfChannelsKey: @1,
    AVEncoderAudioQualityKey: @(AVAudioQualityMedium)
  };

  NSError *recordingError = nil;
  self.recorder = [[AVAudioRecorder alloc] initWithURL:fileURL settings:settings error:&recordingError];
  self.recorder.delegate = self;
  if (recordingError != nil || ![self.recorder prepareToRecord] || ![self.recorder record]) {
    reject(@"recording_start_error", @"Failed to start recording.", recordingError);
    return;
  }

  resolve(@YES);
}

RCT_EXPORT_METHOD(stopRecording:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (self.recorder == nil) {
    reject(@"not_recording", @"No active recording to stop.", nil);
    return;
  }

  [self.recorder stop];
  self.recorder = nil;

  if (self.recordedFilePath == nil) {
    reject(@"missing_file", @"Recording file path is missing.", nil);
    return;
  }

  NSURL *url = [NSURL fileURLWithPath:self.recordedFilePath];
  resolve(url.absoluteString ?: @"");
}

RCT_EXPORT_METHOD(playAudio:(NSString *)uri
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (uri.length == 0) {
    reject(@"invalid_uri", @"Audio URI is required.", nil);
    return;
  }

  NSError *urlError = nil;
  NSURL *audioURL = [NSURL URLWithString:uri];
  if (audioURL == nil || !audioURL.isFileURL) {
    audioURL = [NSURL fileURLWithPath:uri];
  }

  NSError *sessionError = nil;
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayback error:&sessionError];
  [session setActive:YES error:&sessionError];
  if (sessionError != nil) {
    reject(@"audio_session_error", @"Failed to setup playback session.", sessionError);
    return;
  }

  self.player = [[AVAudioPlayer alloc] initWithContentsOfURL:audioURL error:&urlError];
  self.player.delegate = self;
  if (urlError != nil || ![self.player prepareToPlay] || ![self.player play]) {
    reject(@"playback_error", @"Failed to play audio.", urlError);
    return;
  }

  resolve(@YES);
}

RCT_EXPORT_METHOD(stopAudio:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (self.player != nil && self.player.isPlaying) {
    [self.player stop];
  }
  self.player = nil;
  resolve(@YES);
}

@end
