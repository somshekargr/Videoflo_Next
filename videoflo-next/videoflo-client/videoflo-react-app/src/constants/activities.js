export class activityName {
  static LIVENESS_DETECTION_ACTIVITY = "MatchHeadPoses";
  //static PANCARD_DETECTION_ACTIVITY = "PANCARD_DETECTION_ACTIVITY";
  static PANCARD_DETECTION_ACTIVITY = "PanRecognition";
  static POSE_MATCH_ACTIVITY = "POSE_MATCH_ACTIVITY";
  // static IMAGE_MATCH_ACTIVITY = "IMAGE_MATCH_ACTIVITY";
  static IMAGE_MATCH_ACTIVITY = "FaceRecognition";
  //static RANDOM_QnA_ACTIVITY = "RANDOM_QnA_ACTIVITY";
  static RANDOM_QnA_ACTIVITY = "QnA";
  //static LIVENESS_DETECTION_ACTIVITY = "LIVENESS_DETECTION_ACTIVITY"
  static IP_VERIFICATION_ACTIVTIY = "IpAddressVerification";
  static GEO_LOCATION_ACTIVITY = "GeolocationVerification";
  static SIGNATURE_MATCH_ACTIVITY = "MatchSignature";
  static IMAGE_CAPTURE_ACTIVITY = "CaptureImage";
  static ASSIST_FORM_FILLING = "AssistForm";
  static IMAGE_CAPTURE_NEW_ACTIVITY = "CaptureImageNew";
  static TERMS_AND_CONDITIONS = "Conditions";
  static TEST = "test";
}

export class activityId {
  static LIVENESS_DETECTION_SUMMARY = "matchHeadPoses";
  static PANCARD_DETECTION_SUMMARY = "panCapture";
  static POSE_MATCH_SUMMARY = "POSE_MATCH_ACTIVITY";
  static IMAGE_MATCH_SUMMARY = "faceRecognition";
  static SIGNATURE_MATCH_SUMMARY = "customerSignature";
  static RANDOM_QnA_SUMMARY = "randomQuestions";
  static IP_SUMMARY = "ipVerification";
  static GEO_LOCATION_SUMMARY = "geolocationVerification";
  static IMAGE_CAPTURE_SUMMARY = "genericImageCapture";
}
