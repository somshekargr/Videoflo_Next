export class WorkflowEvents {
  /**Should be emmited once App recieved valid session configs  with data {}
   * Will be called once session is created in VF server with data  {Dto.SessionJoinDto}
   */
  static initializeParticipantSession = "initializeParticipantSession";
  /**Should be emmited once concent PCC continue button clicked with data { consentTimestamp: new Date() } */
  static onConsentAcquired = "onConsentAcquired";
  /**
     * Once all permissions are granted with data
     *  {cameraPermissionTimestamp?: Date; rearCameraPermissionTimestamp?: Date;  microphonePermissionTimestamp?: Date;  locationPermissionTimestamp?: Date;
        geoCoordinates?: {
            latitude: number;
            longitude: number;
            accuracy: number;
     }; 
     */
  static onPermissionsAcquired = "onPermissionsAcquired";
  /** Emit this event on each of custom checklist submit with data
   * { checklistId: string; timestamp: Date }
   */
  static onPrecallCustomChecklistCompleted =
    "onPrecallCustomChecklistCompleted";
  /**emit this event once all PCC have been completed with data  {}
   * Will be called once other participant has completed PCC with data { hasPendingPrecallChecks  }
   */
  static onPrecallChecksCompleted = "onPrecallChecksCompleted";

  /** emit this event once onPrecallChecksCompleted is recieved with data {}
     * Listen to this event (once) at the same time with data {dtos.VideoSessionJoinDto}
     * ===> Below object repreject a sesssionInfo <==
     * 
     * {
        sessionId: this._sessionId,
        participantId: this._participantId,
        participantName: participantName,
        sessionName:  videofloSessionName,
        tokens:  tokens,
        ovSettings: ovSettings
      }
     */
  static initializeParticipantVideoSession =
    "initializeParticipantVideoSession";
  /** emit this event with data {} */
  static initializeActivities = "initializeActivities";
  /** listen to this event to get quarom update with data {payload.hasQuorum}
   * can show/hide waiting dialog based on hasQuorum,
   *
   * This event will be called whenever a participants initialize activities workflow, and sets the initial activity index based on session history
   */
  static onQuorumUpdate = "onQuorumUpdate";
  /** Once Quoram is completed (or onActivityAction) App willl recieve this event from VF server 
     * with data 
     * {
        activity: currentActivity,
        data: updatedSession.data[currentActivity?.id]
      }
     * 
     */
  static onBeginActivity = "onBeginActivity";
  /**
   *
   * VF server will send data without context property
   */
  static onActivityStateChanged = "onActivityStateChanged";
  /** Emit this event on lastQna Asked, pan data processed, image captured etc */
  static onActivityDataGathered = "onActivityDataGathered";
  /**will be called by VF server once data from onActivityDataGathered is persited into Mongodb succesfully */
  static onActivityDataAvailable = "onActivityDataAvailable";
  /** Should be emmited when next button of an activity is clicked with data {
     payload?: any;
    gatheredFrom: string;
    accepted?: boolean;
    acceptedBy?: string;
    rejectedBy?: string;
    } */
  static onActivityAction = "onActivityAction";
  /** Will be called by VF server immidetly afrter last activity next button clicked with data
     * export class WorkflowData {
    [activityId: string]: ActivityData;
    }
    */
  static onCaptureImageResponse = "onCaptureImageResponse";
  /** Emit this event once agent click on Final Acticity's Accept or reject with data {accepted:boolean}  */
  static onWorkflowFinished = "onWorkflowFinished";

  /** Activity Specific Events */
  static onActivitiesExhausted = "onActivitiesExhausted";
  static onCaptureImageRequest = "onCaptureImageRequest";

  /**Webhook events */
  static onParticipantConnected = "onParticipantConnected";
  static onParticipantDisconnected = "onParticipantDisconnected";
  static onRecordingAvailable = "onRecordingAvailable";
  static onRecordingError = "onRecordingError";
}
