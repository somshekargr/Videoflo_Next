
//1// Make Socket connection for participant

//1.1// initializeParticipantSession  () =>
payload = {
 };

//1.2// initializeParticipantSession  <=
data = {
   
  activities: [
    {
  activityId: "randomQuestions", activityType: "QnA" },
    {
  activityId: "matchHeadPoses", activityType: "MatchHeadPoses" },
    {
  activityId: "faceRecognition", activityType: "FaceRecognition" },
    {
  activityId: "panCapture", activityType: "PanRecognition" },
  ],

  awaitForPrecallChecks: false,
  externalParticipantId: "customer-2",
  participantId: "a05d313bf7e74479a33dcfc7a4ffa199",
  participantName: "Customer",
  precallChecks: {
 
    awaitCallJoining: true,
    awaitMessage: {
 
      title: "Customer Onboarding in progress",
      description: "Please wait for the customer onboarding to complete",
    },
    checklist: [
      {
 
        continueButtonText: "Yes, I have them ready",
        id: "ensureDocuments",
        items: [
          "You have your original PAN Card with you",
          "You have put your signature on a blank white paper, it is clearly legibile and matches your signature",
        ],
        subTitle: "Make sure that:",
        title: "Do you have all the documents handy?",
      },
      {
 
        id: "ensureEnvironment",
        title: "Are you ready for the video call?",
        subTitle: "Ensure that:",
        items: Array(2),
        continueButtonText: "Yes, I am ready",
      },
      {
 
        id: "goodInternet",
        title: "Almost there!",
        body: "<h3>Do you have a strong internet connection?</h3>…stable mobile network or, use a WiFi network.</p>",
        footer:
          'Upon pressing the "Start Video Call" button, you w…presentative for a quick video-based KYC process.',
        continueButtonText: "Start Video Call",
      },
    ],
    consent: {
 
      title: "Thank you for your interest in Integra Video KYC Pilot.",
      subTitle:
        "Here are some instructions you need to know, before starting your video based KYC process.",
      body: '<ol><li>Follow the instructions to regarding camer…lick on "Proceed for Video KYC" button.</li></ol>',
      checkboxText:
        "I hereby authorize Integra Micro Systems Pvt. Ltd.…ess for the purpose of KYC identity verification.",
      validationErrorText:
        "You need to give your consent before proceeding further.",
    },
    devicePermissions: {
 
      title: "Give Permissions",
      subTitle:
        "We need a few permissions before we can connect you to the video call",
      geolocation: "Please give permission to access your location.",
      ipAddress: "",
      microphone: "Please give access to microphone.",
    },
    isCompleted: false,
  },
  role: "customer",
  sessionId: "18278305eefa452884af60139caef7de",
  sessionName: "Video KYC",
};

//2// onConsentAcquired =>
payload = {
 
  consentTimestamp: "Tue Jun 28 2022 23:10:07 GMT+0530 (India Standard Time)",
};

//3//  onPermissionsAcquired =>
payload: DevicePermissionsResponse = {
 
  cameraPermissionTimestamp:
    "Tue Jun 28 2022 23:10:09 GMT+0530 (India Standard Time) ",
  geoCoordinates:
    "{
 latitude: 13.0511078, longitude: 77.6107447, accuracy: 12.515}",
  locationPermissionTimestamp:
    "Tue Jun 28 2022 23:10:07 GMT+0530 (India Standard Time) ",
  microphonePermissionTimestamp:
    "Tue Jun 28 2022 23:10:08 GMT+0530 (India Standard Time)",
  rearCameraPermissionTimestamp:
    "Tue Jun 28 2022 23:10:09 GMT+0530 (India Standard Time)  ",
};

//4// onPrecallCustomChecklistCompleted =>
payload = {
 
  checklistId: "ensureDocuments",
  timestamp: "Tue Jun 28 2022 23:10:19 GMT+0530 (India Standard Time) ",
};

//4.1// Repeat 4 for all precall checks =>

//5// onPrecallChecksCompleted =>
payload = {
 };

/**This event we will get immidiatly after someone emits onPrecallChecksCompleted including our own onPrecallChecksCompleted emit*/
//6// onPrecallChecksCompleted <=
data = {
  hasPendingPrecallChecks: false };
/** So if hasPendingPrecallChecks is true we have to display waiting dialog
 */

//6.2// initializeParticipantVideoSession {
 }=>
payload = {
 };

//6.3// initializeParticipantVideoSession <=
data = {
 
  callUISettings: {
   autoPublish: true,
    chat: true,
    footer: false,
    toolbar: true,
    toolbarButtons: {
 
      audio: true,
      exit: false,
      fullScreen: true,
      layoutSpeaking: false,
      screenShare: false,
      video: true,
    }},
 
  videoLayoutSettings: {
  "agent-1": "Small", "customer-2": "Big" },
  webcamToken:
    "wss://openvidu-beta.videoflo.net?sessionId=ca061ac5561045fca2a612084731ba88&token=tok_WpRvwwgRwt7IBQqt",
};

//6// initializeActivities =>
payload = {
 };


// .............. wait for quaram to be fullfill....................
/**
 * if hasQuorum is false means other participants has not joined video call yet, so we can display an waiting dialog
 */
//7// onQuorumUpdate <=
data = {
  hasQuorum: false };

/**
 * Once we recieved onBeginActivity
 */
//8// onBeginActivity <=

data = {
 
  activity: {
 
    activityType: "QnA",
    configuration: {
 
      description: "Please answer a few questions for us.",
      noOfQuestionsToAsk: 3,
      qnaPairs: [
        {
 
          allowedAttempts: 3,
          expectedAnswer: "Krishnaiah",
          isAnswerCorrect: false,
          isAnswered: false,
          question: "What is your Father's name?",
          speech: {
  speak: "What is your Father's name?", audioUrl: "" },
        },

        {
 
          question: "Could you please confirm your current address?",
          expectedAnswer: "#67, 7th A Cross, Attur Layout, Bangalore 560064",
          allowedAttempts: 3,
          isAnswered: false,
        },
        {
 
          question: "What is your Date of Birth?",
          expectedAnswer: "08 Nov 1979",
          allowedAttempts: 3,
          isAnswered: false,
        },
        {
 
          question: "Where do you work?",
          expectedAnswer: "BOT AI ML",
          allowedAttempts: 3,
          isAnswered: false,
        },
      ],

      title: "Question/Answers",
    },
    displayTo: ["agent"],
    gatherFrom: ["customer"],
    id: "randomQuestions",
  },
  data: {
  fc45a09b47a54da4bc09b952a37d29e5: {
 } },
};


//9 _Agent onActivityDataGathered =>

payload  ={
 
    activityData:{
 
        gatheredFrom: "381d3885a90a4faa961f00a8474cfc5c",
payload:[{
 actualAnswer: undefined,
    attemptsMade: undefined,
    expectedAnswer: "08 Nov 1979",
    isAnswerCorrect: true,
    isAnswered: true,
    question: "What is your Date of Birth?"},
    {
 question: "What is your Father's name?", expectedAnswer: 'Krishnaiah', actualAnswer: undefined, isAnswered: true, isAnswerCorrect: true},
    {
 question: 'Could you please confirm your current address?', expectedAnswer: '#67, 7th A Cross, Attur Layout, Bangalore 560064', actualAnswer: undefined, isAnswered: true, isAnswerCorrect: true}
  ],  
    },

activityId: "randomQuestions",
responseRequired: undefined 
}


//9.2// After 9 customer and agent both will revieve onActivityDataAvailable <=
data = { 
    activityId: "randomQuestions",
data:{
 '381d3885a90a4faa961f00a8474cfc5c': {
 payload: [{
 expectedAnswer: "08 Nov 1979",
isAnswerCorrect: true,
isAnswered: true,
question: "What is your Date of Birth?"},
{
 question: "What is your Father's name?", expectedAnswer: 'Krishnaiah', isAnswered: true, isAnswerCorrect: true},
{
 question: 'Could you please confirm your current address?', expectedAnswer: '#67, 7th A Cross, Attur Layout, Bangalore 560064', isAnswered: true, isAnswerCorrect: true}
]}}
}


 
// 10// _agent on clicking on next button onActivityAction => 
payload = {
 
    accepted: true
acceptedBy: "4fa3d8b28c17495ab618f4b769c13d9a"
gatheredFrom: "381d3885a90a4faa961f00a8474cfc5c"
payload: Array(3)
0: {
 question: 'What is your Date of Birth?', expectedAnswer: '08 Nov 1979', isAnswered: true, isAnswerCorrect: true}
1: {
 question: "What is your Father's name?", expectedAnswer: 'Krishnaiah', isAnswered: true, isAnswerCorrect: true}
2: {
 question: 'Could you please confirm your current address?', expectedAnswer: '#67, 7th A Cross, Attur Layout, Bangalore 560064', isAnswered: true, isAnswerCorrect: true}
}
 
//10.1// Image match  "onBeginActivity" <=

agent_data = {
 
"activity":{
 
  "id":"faceRecognition",
   "activityType":"FaceRecognition",
   "gatherFrom":["customer"],
   "displayTo":["agent"],
      "configuration":
        {
 "title":"Face Recognition",
          "face1":
            {
 "sourceType":"Base64",
            "value":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA",
            "caption":"Photo in Aadhar Card",
            "displayTo":["agent-1"]},
          "face2":
            {
 "sourceType":"Camera",
            "caption":"Photo from Live Stream",
            "capturerExternalId":"agent-1",
            "instructionTitle":"Capturing your photo",
            "instructionDescription":"Please hold your face straight and look towards the camera",
            "capturerInstructionTitle":"Capture Customer's Photo",
            "capturerInstructionDescription":"Make sure that the customer is faced towards the camera and the full-frontal face is visible"}
          }},
      
"data":{
 "e3a70bf7767a4f9b964b89f1075f63c2":{
 }}}

customer_data = 42["onBeginActivity",{
 "activity":{
 "id":"faceRecognition","activityType":"FaceRecognition","gatherFrom":["customer"],"displayTo":["agent"],"configuration":{
 "title":"Face Recognition","face1":{
 "sourceType":"Base64","value":"rtybggfhft","caption":"Photo in Aadhar Card","displayTo":["agent-1"]},"face2":{
 "sourceType":"Camera","caption":"Photo from Live Stream","capturerExternalId":"agent-1","instructionTitle":"Capturing your photo","instructionDescription":"Please hold your face straight and look towards the camera","capturerInstructionTitle":"Capture Customer's Photo","capturerInstructionDescription":"Make sure that the customer is faced towards the camera and the full-frontal face is visible"}}},"data":{
 "e3a70bf7767a4f9b964b89f1075f63c2":{
 }}}]

//10.2 Agent onActivityDataGathered =>
agent_payload = 42["onActivityDataGathered",{
 "activityId":"faceRecognition","activityData":{
 "gatheredFrom":"e3a70bf7767a4f9b964b89f1075f63c2","payload":{
 "image1":{
 "base64Image":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/0M/bM//Z"},"faceMatchingResult":null}}}]

//10.3 onActivityDataAvailable <= 

agetn_Data = 42["onActivityDataAvailable",{
 "activityId":"faceRecognition","data":{
 "e3a70bf7767a4f9b964b89f1075f63c2":{
 "payload":{
 "image1":{
 "base64Image":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QEmRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAQAAAAcodpAAQAAAABAAAAgoglAAQAAAABAAAAtgAAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQubmV0IDQuMi44AAACkAMAAgAAABQAAACgkpEAAgAAAAQ4OTYAAAAAADIwMjI6MDQ6MDYgMTQ6MzM6NTIAAAAABAABAAIAAAACTgAAAAACAAUAAAADAAAA7AADAAIAAAACRQAAAAAEAAUAAAADAAABBAAAAAAAAAAMAAAAAQAAADdQkaOa1hljZgSrLkGvPjm1SU+VryOj+yafLc/OTwx8ApNTuY7nXrxdF8Oxv8A6VfyDb6DZGCMs5JA4BAzk9MVX+IvxZ0jQLSXQvA9qtjZxnyZdRYYubtVJPXqFPBPPPcDpVT9qrxhqet/FzWIrq8lkh0++mtbaIYSK3iUkBURcKvAGcDnqcmvN7Q+Y6Bvm6nmvtcLTjQpd5P8D5HFP2s7bRXT/MvWN3IVkXzXk+0MGlDN94jP+Nbmn3kmxF3bdvTngisC3byZQV+XOM10VlbpIyBlUjB7VtGTW5nfsakeptAgVZvl7YwaKdaWcQgH7tfyordR0M/bM//Z"},"faceMatchingResult":null}}}}]

//10.3 onCaptureImageRequest (agent)=>
agent_payload = {
 "type":"request","requestData":{
 }}

//10.4 onCaptureImageRequest (customer) & (agent)<=
data = {
 "type":"response","requestData":{
 }}


//10.5 onCaptureImageRequest (customer)=>
customer_payload=  {
 "type":"responseImage", "responseData":{
 "image":"data:image/jpeg;base64,/9j/4Anua"}}



//10.6 onCaptureImageResponse (agent) & (customer)<=
agent_data = {
 "type":"responseImage","responseData":{
 "image":"1r0//9k="}}
customer_data =  {
 "type":"responseImage","responseData":{
 "image":"data"}}]

//10.7 onActivityDataGathered (agent)=>
agent_payload ={
 "activityId":"faceRecognition",
                "activityData":{
 
                  "gatheredFrom":"e3a70bf7767a4f9b964b89f1075f63c2",
                  "payload":{ 
                      "image1":{
 "base64Image":"asasas"},"faceMatchingResult":null}}}]

//10.8 onActivityDataAvailable (customer) & (agent) <=
customer_data  = {
 "activityId":"faceRecognition",
                  "data":{
 
                    "e3a70bf7767a4f9b964b89f1075f63c2":{
 
                      "payload":{
 
                        "image1":{
 
                          "base64Image":"asasa"},
                  "image2":{
 "base64Image":"asasas"},"faceMatchingResult":null}}}}]

agent_data = 42["onActivityDataAvailable",{
 "activityId":"faceRecognition","data":{
 "e3a70bf7767a4f9b964b89f1075f63c2":{
 "payload":{
 "image1":{
 "base64Image":"asasasa"},"image2":{
 "base64Image":"asasdasd"},"faceMatchingResult":null}}}}]


//10.9 onActivityAction (agent)=> 

agent_payload  =42["onActivityAction",{
 "activityData":{
 "payload":{
 "image1":{
 "base64Image":"sdssf"},"image2":{
 "base64Image":"dsfsdfsdf"},"faceMatchingResult":{
 "success":true,"isMatching":true,"distance":0.8365718126296997,"matchingPercentage":72,"errorCode":null,"errorMessage":null}},"gatheredFrom":"e3a70bf7767a4f9b964b89f1075f63c2","accepted":true,"acceptedBy":"705ca36719264e57925e42d1d7816866"}}]


// 11.1 // _agent and _customer will again recieve onBeginActivity <=
agent_data ={
 
    activity:
activityType: "MatchHeadPoses"
configuration:
description: "Please turn your head in the direction prompted"
noOfFramesToCheck: 5
noOfPosesToCheck: 2
poses: Array(2)
0: "faceup"
1: "facedown"
length: 2
[[Prototype]]: Array(0)
title: "Liveness Detection"
[[Prototype]]: Object
displayTo: ['agent']
gatherFrom: ['customer']
id: "matchHeadPoses"
[[Prototype]]: Object
data:
381d3885a90a4faa961f00a8474cfc5c: {
 }
}

 customer_data = {
 
    activity:
activityType: "MatchHeadPoses"
configuration:
description: "Please turn your head in the direction prompted"
noOfFramesToCheck: 5
noOfPosesToCheck: 2
poses: Array(4)
0: "faceleft"
1: "faceright"
2: "faceup"
3: "facedown"
length: 4
[[Prototype]]: Array(0)
title: "Liveness Detection"
[[Prototype]]: Object
displayTo: ['agent']
gatherFrom: ['customer']
id: "matchHeadPoses"
[[Prototype]]: Object
data:
381d3885a90a4faa961f00a8474cfc5c: {
 }
 }



