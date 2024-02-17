export const APP_ID = "e372f27d4ab4452e93550cbb650de233";
export const APP_URL = "http://localhost:3334";
export const SESSION_NAME = "Demo";
export const CUSTOMER_NAME = "Customer";
export const AGENT_NAME = "Agent";
export const SECRET_KEY = "7CEDHrP1I2ya9g1p5g7meQreyaCqZdI/iptWsYaQvY8=";
export const WEBHOOKS = {
  onParticipantConnected:
    "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onParticipantConnected",
  onParticipantDisconnected:
    "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onParticipantDisconnected",
  onWorkflowFinished:
    "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onWorkflowFinished",
  onRecordingAvailable:
    "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onRecordingAvailable",
  onRecordingError:
    "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onRecordingError",
};

export const ACTIVITIES = [
  {
    id: "termsconditions",
    activityType: "Conditions",
    gatherFrom: ["customer"],
    displayTo: ["agent"],
    configuration: {
      title: "Terms & Conditions",
      description: "Read all terms and conditions to the customer",
      arrOfConditions: [
        "It is an entrepreneurial work. We welcome you as an entrepreneur. You are not an employee of the company or the bank. You are working like a merchant/ service provider. More you serve the customers (transact), the more you earn commission from the bank for serving the bank's customers. There is a threshold, below that you earn nothing. You must cross the threshold every month.",
        "Minimum earning; minimum number of customer account opening; minimum number of PMJSBY, minimum number of PMJJBY, minimum number of APY, recovery, minimum number of days serving the customers.",
        "You must not take extra money from the customers. You will not differentiate the customer based on caste religion, region, economic status.",
        "You commission (your earnings) will be paid to you once Bank validates your work and pays to the company. The company pays within 3-4 days.",
        "Company does not take any money from you in cash or in any account - online you can pay from this number google pay/Phone Pay/BHIM/PayTM to integra@sbi (or on www.integramicro.com payment option).",
        "It is 40-year-old company and doe not encourage any favouritism of any type. To become a BC Agent you only pay one tie fee of Rs. 590/- or higher online for KIT or equipment.",
        "You are free to send email to Integra in confidence if you observe any instance of non-compliance.",
        "You need top be ethical and professional in your dealings, if found non-compliance, you would not be able to continue as a BC Agent.",
        "You need to sign the agreement with the company and make sure you fulfil the commitment of your profile - PVC, IIBF, education, place to work, area.",
        "if you have lied while applying - filling in profile, you can correct it now. If found later, company can take strong action. You are a defaulter or removed from BC operations or any other operations due to inefficiency or fraud.",
        "If you accept all this, say yes, I understand and accept it. Or you have opportunity to leave. We will refund if you have paid any fees.",
      ],
    },
  },
  // {
  //   id: "formFilling",
  //   activityType: "AssistForm",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   configuration: {
  //     title: "Form filling",
  //     description: "Assistance in filling loan application form",
  //     formUrl: "http://localhost:3000/pmsapplication/UE1TMDcyMDAyNDQ2OTU=",
  //     includeTTS: false,
  //     actionTime: 300000
  //   },
  // },
  {
    id: "randomQuestions",
    activityType: "QnA",
    gatherFrom: ["customer"],
    displayTo: ["agent"],
    configuration: {
      title: "Question/Answers",
      description: "Please answer a few questions for us.",
      noOfQuestionsToAsk: 3,
      qnaPairs: [
        {
          question: "What is your Father's name?",
          expectedAnswer: "Ramachandra",
          allowedAttempts: 3,
          speech: {
            speak: "What is your Father's name?",
            audioUrl: "",
          },
        },
        {
          question: "Could you please confirm your current address?",
          expectedAnswer:
            "#10, 1st Main, 2nd Cross, Balaji Nagar, SG palya, Bengaluru 560029",
          allowedAttempts: 3,
          speech: {
            speak: "Could you please confirm your current address?",
            audioUrl: "",
          },
        },
        {
          question: "What is your Date of Birth?",
          expectedAnswer: "09 March 1997",
          allowedAttempts: 3,
          speech: {
            speak: "What is your Date of Birth?",
            audioUrl: "",
          },
        },
        {
          question: "Where do you work?",
          expectedAnswer: "BOT AI ML",
          allowedAttempts: 3,
          speech: {
            speak: "Where do you work?",
            audioUrl: "",
          },
        },
      ],
    },
  },

  // {
  //   id: "ipVerification",
  //   activityType: "IpAddressVerification",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  // },
  // {
  //   id: "geolocationVerification",
  //   activityType: "GeolocationVerification",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  // },
  // {
  //   id: "panCapture",
  //   activityType: "PanRecognition",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   onActivityDataGathered:
  //     "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
  //   onActivityAction:
  //     "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
  //   configuration: {
  //     title: "Pan Recognition",
  //     responseRequired: true,
  //     requiredFields: ["pan_num", "name", "dob", "father_name"],
  //     optionalFields: ["face_image", "signature_image", "pan_image"],
  //     image: {
  //       sourceType: "Camera",
  //       caption: "Captured Pan Card Image",
  //       capturerExternalId: "agent-1",
  //       instructionTitle: "Capturing your pan photo",
  //       instructionDescription:
  //         "Please hold your pan straight and show to the camera",
  //       capturerInstructionTitle: "Capture Customer's PAN Card Photo",
  //       capturerInstructionDescription:
  //         "Make sure that the PAN Card is faced towards the camera, is being held in correct orientation and all the fields are visible and legible",
  //     },
  //     customBorder: {
  //       type: "rectangular", // rectangular
  //       include: ["customer"],
  //     },
  //   },
  // },
  // {
  //   id: "genericImageCaptureOne",
  //   activityType: "CaptureImage",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   configuration: {
  //     title: "Capture Image",
  //     options: {
  //       sourceType: "Camera",
  //       caption: "Captured Aadhar Image",
  //       instructionTitle: "Capturing your speciment image",
  //       instructionDescription:
  //         "Please sign on a white paper and show it to the camera",
  //       capturerInstructionTitle: "Capture Customer's Speciment Image",
  //       capturerInstructionDescription:
  //         "Make sure that the Speciment is fully focused and readable",
  //     },
  //     customBorder: {
  //       type: "rectangular", // rectangular
  //       include: ["customer"],
  //     },
  //     // checklist: ["Agreed", "Proceed"],
  //     // description: "Read out loud",
  //   },
  // },
  // {
  //   id: "genericImageCaptureTwo",
  //   activityType: "CaptureImageNew",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   configuration: {
  //     title: "Capture Voter ID Image",
  //     options: {
  //       sourceType: "Camera",
  //       caption: "Captured voter Id Image",
  //       instructionTitle: "Capturing your speciment image",
  //       instructionDescription:
  //         "Please sign on a white paper and show it to the camera",
  //       capturerInstructionTitle: "Capture Customer's Speciment Image",
  //       capturerInstructionDescription:
  //         "Make sure that the Speciment is fully focused and readable",
  //     },
  //     customBorder: {
  //       type: "rectangular", // rectangular
  //       include: ["customer"],
  //     },
  //     // checklist: ["Agreed", "Proceed"],
  //     // description: "Read out loud",
  //   },
  // },
  // {
  //   id: "genericImageCaptureThree",
  //   activityType: "CaptureImage",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   configuration: {
  //     title: "Capture DL Image",
  //     options: {
  //       sourceType: "Camera",
  //       caption: "Captured dl Image",
  //       instructionTitle: "Capturing your speciment image",
  //       instructionDescription:
  //         "Please sign on a white paper and show it to the camera",
  //       capturerInstructionTitle: "Capture Customer's Speciment Image",
  //       capturerInstructionDescription:
  //         "Make sure that the Speciment is fully focused and readable",
  //     },
  //     customBorder: {
  //       type: "rectangular", // rectangular
  //       include: ["customer"],
  //     },
  //     // checklist: ["Agreed", "Proceed"],
  //     // description: "Read out loud",
  //   },
  // },
  // {
  //   id: "genericImageCaptureFour",
  //   activityType: "CaptureImageNew",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   configuration: {
  //     title: "Capture PAN Image",
  //     options: {
  //       sourceType: "Camera",
  //       caption: "Captured pan Image",
  //       instructionTitle: "Capturing your speciment image",
  //       instructionDescription:
  //         "Please sign on a white paper and show it to the camera",
  //       capturerInstructionTitle: "Capture Customer's Speciment Image",
  //       capturerInstructionDescription:
  //         "Make sure that the Speciment is fully focused and readable",
  //     },
  //     customBorder: {
  //       type: "rectangular", // rectangular
  //       include: ["customer"],
  //     },
  //     // checklist: ["Agreed", "Proceed"],
  //     // description: "Read out loud",
  //   },
  // },
  // {
  //   id: "customerSignature",
  //   activityType: "MatchSignature",
  //   gatherFrom: ["customer"],
  //   displayTo: ["agent"],
  //   configuration: {
  //     title: "Capture Signature Image",
  //     options: {
  //       sourceType: "Camera",
  //       caption: "Captured Image",
  //       instructionTitle: "Capturing your speciment signature",
  //       instructionDescription:
  //         "Please sign on a white paper and show it to the camera",
  //       capturerInstructionTitle: "Capture Customer's Speciment Signature",
  //       capturerInstructionDescription:
  //         "Make sure that the signature is fully focused and readable",
  //     },
  //     // customBorder: {
  //     //   type: "rectangular", // rectangular
  //     //   include: ["customer"],
  //     // },
  //   },
  // },

  //   {
  //     id: "genericImageCaptureTwo",
  //     activityType: "CaptureImage",
  //     gatherFrom: ["customer"],
  //     displayTo: ["agent"],
  //     configuration: {
  //       title: "Capture Image",
  //       options: {
  //         sourceType: "Camera",
  //         caption: "Captured Image",
  //         instructionTitle: "Capturing your speciment image",
  //         instructionDescription:
  //           "Please sign on a white paper and show it to the camera",
  //         capturerInstructionTitle: "Capture Customer's Speciment Image",
  //         capturerInstructionDescription:
  //           "Make sure that the Speciment is fully focused and readable",
  //       },
  //       customBorder: {
  //         type: "rectangular", // rectangular
  //         include: ["customer"],
  //       },
  //       // checklist: ["Agreed", "Proceed"],
  //       // description: "Read out loud",
  //     },
  //   },
];

//   // {
//   //   id: "randomQuestions",
//   //   activityType: "QnA",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   //   configuration: {
//   //     title: "Question/Answers",
//   //     description: "Please answer a few questions for us.",
//   //     noOfQuestionsToAsk: 3,
//   //     qnaPairs: [
//   //       {
//   //         question: "What is your Father's name?",
//   //         expectedAnswer: "Ramachandra",
//   //         allowedAttempts: 3,
//   //         speech: {
//   //           speak: "What is your Father's name?",
//   //           audioUrl: "",
//   //         },
//   //       },
//   //       {
//   //         question: "Could you please confirm your current address?",
//   //         expectedAnswer:
//   //           "#10, 1st Main, 2nd Cross, Balaji Nagar, SG palya, Bengaluru 560029",
//   //         allowedAttempts: 3,
//   //         speech: {
//   //           speak: "Could you please confirm your current address?",
//   //           audioUrl: "",
//   //         },
//   //       },
//   //       {
//   //         question: "What is your Date of Birth?",
//   //         expectedAnswer: "09 March 1997",
//   //         allowedAttempts: 3,
//   //         speech: {
//   //           speak: "What is your Date of Birth?",
//   //           audioUrl: "",
//   //         },
//   //       },
//   //       {
//   //         question: "Where do you work?",
//   //         expectedAnswer: "BOT AI ML",
//   //         allowedAttempts: 3,
//   //         speech: {
//   //           speak: "Where do you work?",
//   //           audioUrl: "",
//   //         },
//   //       },
//   //     ],
//   //   },
//   // },
//   // {
//   //   id: "ipVerification",
//   //   activityType: "IpAddressVerification",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   // },
//   // {
//   //   id: "geolocationVerification",
//   //   activityType: "GeolocationVerification",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   // },

//   // {
//   //   id: "genericImageCapture",
//   //   activityType: "CaptureImage",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   //   configuration: {
//   //     title: "Capture Image",
//   //     options: {
//   //       sourceType: "Camera",
//   //       caption: "Captured Image",
//   //       instructionTitle: "Capturing your speciment image",
//   //       instructionDescription:
//   //         "Please sign on a white paper and show it to the camera",
//   //       capturerInstructionTitle: "Capture Customer's Speciment Image",
//   //       capturerInstructionDescription:
//   //         "Make sure that the Speciment is fully focused and readable",
//   //     },
//   //     customBorder: {
//   //       type: "rectangular", // rectangular
//   //       include: ["customer"],
//   //     },
//   //     // checklist: ["Agreed", "Proceed"],
//   //     // description: "Read out loud",
//   //   },
//   // },
//   // {
//   //   id: "customerSignature",
//   //   activityType: "MatchSignature",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   //   configuration: {
//   //     title: "Capture Signature Image",
//   //     options: {
//   //       sourceType: "Camera",
//   //       caption: "Captured Image",
//   //       instructionTitle: "Capturing your speciment signature",
//   //       instructionDescription:
//   //         "Please sign on a white paper and show it to the camera",
//   //       capturerInstructionTitle: "Capture Customer's Speciment Signature",
//   //       capturerInstructionDescription:
//   //         "Make sure that the signature is fully focused and readable",
//   //     },
//   //     customBorder: {
//   //       type: "rectangular", // rectangular
//   //       include: ["customer"],
//   //     },
//   //   },
//   // },
//   // {
//   //   id: "faceRecognition",
//   //   activityType: "FaceRecognition",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   //   configuration: {
//   //     title: "Face Recognition",
//   //     face1: {
//   //       sourceType: "Base64",
//   //       sourceFlag: "AadharQR",
//   //       value:
//   //         "data:image/jpeg;base64,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",
//   //       caption: "Photo in Aadhar Card",
//   //       displayTo: ["agent-1"],
//   //     },
//   //     face2: {
//   //       sourceType: "Camera",
//   //       caption: "Photo from Live Stream",
//   //       capturerExternalId: "agent-1",
//   //       instructionTitle: "Capturing your photo",
//   //       instructionDescription:
//   //         "Please hold your face straight and look towards the camera",
//   //       capturerInstructionTitle: "Capture Customer's Photo",
//   //       capturerInstructionDescription:
//   //         "Make sure that the customer is faced towards the camera and the full-frontal face is visible",
//   //     },
//   //     customBorder: {
//   //       type: "human", // rectangular
//   //       include: ["customer"],
//   //     },
//   //   },
//   // },
//   // {
//   //   id: "panCapture",
//   //   activityType: "PanRecognition",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   //   onActivityDataGathered:
//   //     "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
//   //   onActivityAction:
//   //     "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
//   //   configuration: {
//   //     title: "Pan Recognition",
//   //     responseRequired: true,
//   //     requiredFields: ["pan_num", "name", "dob", "father_name"],
//   //     optionalFields: ["face_image", "signature_image", "pan_image"],
//   //     image: {
//   //       sourceType: "Camera",
//   //       caption: "Captured Pan Card Image",
//   //       capturerExternalId: "agent-1",
//   //       instructionTitle: "Capturing your pan photo",
//   //       instructionDescription:
//   //         "Please hold your pan straight and show to the camera",
//   //       capturerInstructionTitle: "Capture Customer's PAN Card Photo",
//   //       capturerInstructionDescription:
//   //         "Make sure that the PAN Card is faced towards the camera, is being held in correct orientation and all the fields are visible and legible",
//   //     },
//   //     customBorder: {
//   //       type: "rectangular", // rectangular
//   //       include: ["customer"],
//   //     },
//   //   },
//   // },

//   // {
//   //   id: "matchHeadPoses",
//   //   activityType: "MatchHeadPoses",
//   //   gatherFrom: ["customer"],
//   //   displayTo: ["agent"],
//   //   configuration: {
//   //     title: "Liveness Detection",
//   //     description: "Please turn your head in the direction prompted",
//   //     poses: ["faceleft", "faceright", "faceup", "facedown"],
//   //     noOfPosesToCheck: 2,
//   //     noOfFramesToCheck: 5,
//   //   },
//   // },
// ];

// export const ACTIVITIES = [
//   {
//     id: "randomQuestions",
//     activityType: "QnA",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//     configuration: {
//       title: "Question/Answers",
//       description: "Please answer a few questions for us.",
//       noOfQuestionsToAsk: 3,
//       qnaPairs: [
//         {
//           question: "What is your contact number",
//           expectedAnswer: "My contact number is 9742711535",
//           allowedAttempts: 3,
//           speech: {
//             speak: "What is your Father's name?",
//             audioUrl: "",
//           },
//         },
//         {
//           question: "Could you please confirm your current address?",
//           expectedAnswer:
//             "#10, 1st Main, 2nd Cross, Balaji Nagar, SG palya, Bengaluru 560029",
//           allowedAttempts: 3,
//           speech: {
//             speak: "Could you please confirm your current address?",
//             audioUrl: "",
//           },
//         },
//         {
//           question: "What is your email-id",
//           expectedAnswer: "My email-id is somas@botaiml.com",
//           allowedAttempts: 3,
//           speech: {
//             speak: "What is your Date of Birth?",
//             audioUrl: "",
//           },
//         },
//         {
//           question: "Where do you work?",
//           expectedAnswer: "BOT AI ML",
//           allowedAttempts: 3,
//           speech: {
//             speak: "Where do you work?",
//             audioUrl: "",
//           },
//         },
//       ],
//     },
//   },
//   {
//     id: "ipVerification",
//     activityType: "IpAddressVerification",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//   },
//   {
//     id: "geolocationVerification",
//     activityType: "GeolocationVerification",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//   },

//   {
//     id: "panCapture",
//     activityType: "PanRecognition",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//     onActivityDataGathered:
//       "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
//     onActivityAction:
//       "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
//     configuration: {
//       title: "Pan Recognition",
//       responseRequired: true,
//       requiredFields: ["pan_num", "name", "dob", "father_name"],
//       optionalFields: ["face_image", "signature_image", "pan_image"],
//       image: {
//         sourceType: "Camera",
//         caption: "Captured Pan Card Image",
//         capturerExternalId: "agent-1",
//         instructionTitle: "Capturing your pan photo",
//         instructionDescription:
//           "Please hold your pan straight and show to the camera",
//         capturerInstructionTitle: "Capture Customer's PAN Card Photo",
//         capturerInstructionDescription:
//           "Make sure that the PAN Card is faced towards the camera, is being held in correct orientation and all the fields are visible and legible",
//       },
//       customBorder: {
//         type: "rectangular", // rectangular
//         include: ["customer"],
//       },
//     },
//   },

//   {
//     id: "genericImageCapture",
//     activityType: "CaptureImage",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//     configuration: {
//       title: "Capture Aadhar Card",
//       options: {
//         sourceType: "Camera",
//         caption: "Captured Image",
//         instructionTitle: "Capturing your speciment image",
//         instructionDescription:
//           "Please sign on a white paper and show it to the camera",
//         capturerInstructionTitle: "Capture Customer's Speciment Image",
//         capturerInstructionDescription:
//           "Make sure that the Speciment is fully focused and readable",
//       },
//       customBorder: {
//         type: "rectangular", // rectangular
//         include: ["customer"],
//       },
//       // checklist: ["Agreed", "Proceed"],
//       // description: "Read out loud",
//     },
//   },

//   {
//     id: "customerSignature",
//     activityType: "MatchSignature",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//     configuration: {
//       title: "Capture Signature Image",
//       options: {
//         sourceType: "Camera",
//         caption: "Captured Image",
//         instructionTitle: "Capturing your speciment signature",
//         instructionDescription:
//           "Please sign on a white paper and show it to the camera",
//         capturerInstructionTitle: "Capture Customer's Speciment Signature",
//         capturerInstructionDescription:
//           "Make sure that the signature is fully focused and readable",
//       },
//       // customBorder: {
//       //   type: "rectangular", // rectangular
//       //   include: ["customer"],
//       // },
//     },
//   },

//   {
//     id: "faceRecognition",
//     activityType: "FaceRecognition",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//     configuration: {
//       title: "Face Recognition",
//       face1: {
//         sourceType: "Base64",
//         sourceFlag: "AadharQR",
//         value:
//           "data:image/jpeg;base64,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",
//         caption: "Photo in Aadhar Card",
//         displayTo: ["agent-1"],
//       },
//       face2: {
//         sourceType: "Camera",
//         caption: "Photo from Live Stream",
//         capturerExternalId: "agent-1",
//         instructionTitle: "Capturing your photo",
//         instructionDescription:
//           "Please hold your face straight and look towards the camera",
//         capturerInstructionTitle: "Capture Customer's Photo",
//         capturerInstructionDescription:
//           "Make sure that the customer is faced towards the camera and the full-frontal face is visible",
//       },
//       customBorder: {
//         type: "human", // rectangular
//         include: ["customer"],
//       },
//     },
//   },

//   {
//     id: "matchHeadPoses",
//     activityType: "MatchHeadPoses",
//     gatherFrom: ["customer"],
//     displayTo: ["agent"],
//     configuration: {
//       title: "Liveness Detection",
//       description: "Please turn your head in the direction prompted",
//       poses: ["faceleft", "faceright", "faceup", "facedown"],
//       noOfPosesToCheck: 2,
//       noOfFramesToCheck: 5,
//     },
//   },
// ];

export const ACTIVITIES_MINIMAL = [
  {
    id: "geolocationVerification",
    activityType: "GeolocationVerification",
    gatherFrom: ["customer"],
    displayTo: ["agent"],
  },
];

export const PCC_FOR_CUSTOMER = {
  awaitCallJoining: true,
  awaitMessage: {
    title: "Customer Onboarding in progress",
    description: "Please wait for the customer onboarding to complete",
  },
  consent: {
    title: "Thank you for your interest in Integra Video KYC Pilot.",
    subTitle:
      "Here are some instructions you need to know, before starting your video based KYC process.",
    body: '<ol><li>Follow the instructions to regarding camera, mic and location access as they appear on the next screen.</li><li>Keep your PAN Card along with Specimen Signature (signed on a white paper) handy for the Video KYC session.</li><li>Tick the below consent checkbox to agree to our terms and click on "Proceed for Video KYC" button.</li></ol>',
    checkboxText:
      'I hereby authorize Integra Micro Systems Pvt. Ltd. to conduct Video KYC and to collect and store my "Proof of Identity", "Proof of Address", "Specimen Signature" &amp; "Live Picture" during the Video KYC process for the purpose of KYC identity verification.',
    validationErrorText:
      "You need to give your consent before proceeding further.",
    footer:
      'You will be redirected from the current page after clicking on "Proceed to Video KYC" button to start the Video KYC session.',
    continueButtonText: "Proceed to Video KYC",
  },
  devicePermissions: {
    title: "Give Permissions",
    subTitle:
      "We need a few permissions before we can connect you to the video call",
    geolocation: "Please give permission to access your location.",
    ipAddress: "",
    microphone: "Please give access to microphone.",
    microphoneNotFoundText: "Oops! Mic is not available",
    camera: "Please give access to camera.",
    cameraNotFoundText: "Oops! Camera is not available",
    rearCamera: "Please give access to back camera.",
    rearCameraNotFoundText:
      "Oops! Rear camera is not available. While you may still continue, we advice you to use a device with rear camera to ensure any documents that are captured, are as clear as possible.",
    isRearCameraMandatory: false,
  },
  checklist: [
    {
      id: "ensureDocuments",
      title: "Do you have all the documents handy?",
      subTitle: "Make sure that:",
      items: [
        "You have your original PAN Card with you",
        "You have put your signature on a blank white paper, it is clearly legibile and matches your signature",
      ],
      continueButtonText: "Yes, I have them ready",
    },
    {
      id: "ensureEnvironment",
      title: "Are you ready for the video call?",
      subTitle: "Ensure that:",
      items: [
        "You are in a well lit surrounding",
        "There are no background noises or disturbance",
      ],
      continueButtonText: "Yes, I am ready",
    },
    {
      id: "goodInternet",
      title: "Almost there!",
      body: "<h3>Do you have a strong internet connection?</h3><p>Ensure you are on a stable mobile network or, use a WiFi network.</p>",
      footer:
        'Upon pressing the "Start Video Call" button, you will be connected to an authorized representative for a quick video-based KYC process.',
      continueButtonText: "Start Video Call",
    },
  ],
};

export const PCC_FOR_AGENT = {
  devicePermissions: {
    title: "Give Permissions",
    subTitle:
      "We need a few permissions before we can connect you to the video call",
    microphone: "Please give access to microphone.",
    microphoneNotFoundText: "Oops! Mic is not available",
    camera: "Please give access to camera.",
    cameraNotFoundText: "Oops! Camera is not available",
  },
};
export const BODY = {
  name: "Video KYC",
  participants: [
    {
      externalParticipantId: "agent-1",
      name: "Agent",
      role: "agent",
      videoLayoutSettings: {
        agent_1: "Small",
        customer_2: "Big",
      },
      precallChecks: {
        devicePermissions: {
          title: "Give Permissions",
          subTitle:
            "We need a few permissions before we can connect you to the video call",
          microphone: "Please give access to microphone.",
          microphoneNotFoundText: "Oops! Mic is not available",
          camera: "Please give access to camera.",
          cameraNotFoundText: "Oops! Camera is not available",
        },
      },
    },
    {
      externalParticipantId: "customer-2",
      name: "Customer",
      role: "customer",
      precallChecks: {
        awaitCallJoining: true,
        awaitMessage: {
          title: "Customer Onboarding in progress",
          description: "Please wait for the customer onboarding to complete",
        },
        consent: {
          title: "Thank you for your interest in Integra Video KYC Pilot.",
          subTitle:
            "Here are some instructions you need to know, before starting your video based KYC process.",
          body: '<ol><li>Follow the instructions to regarding camera, mic and location access as they appear on the next screen.</li><li>Keep your PAN Card along with Specimen Signature (signed on a white paper) handy for the Video KYC session.</li><li>Tick the below consent checkbox to agree to our terms and click on "Proceed for Video KYC" button.</li></ol>',
          checkboxText:
            'I hereby authorize Integra Micro Systems Pvt. Ltd. to conduct Video KYC and to collect and store my "Proof of Identity", "Proof of Address", "Specimen Signature" &amp; "Live Picture" during the Video KYC process for the purpose of KYC identity verification.',
          validationErrorText:
            "You need to give your consent before proceeding further.",
          footer:
            'You will be redirected from the current page after clicking on "Proceed to Video KYC" button to start the Video KYC session.',
          continueButtonText: "Proceed to Video KYC",
        },
        devicePermissions: {
          title: "Give Permissions",
          subTitle:
            "We need a few permissions before we can connect you to the video call",
          geolocation: "Please give permission to access your location.",
          ipAddress: "",
          microphone: "Please give access to microphone.",
          microphoneNotFoundText: "Oops! Mic is not available",
          camera: "Please give access to camera.",
          cameraNotFoundText: "Oops! Camera is not available",
          rearCamera: "Please give access to back camera.",
          rearCameraNotFoundText:
            "Oops! Rear camera is not available. While you may still continue, we advice you to use a device with rear camera to ensure any documents that are captured, are as clear as possible.",
          isRearCameraMandatory: false,
        },
        checklist: [
          {
            id: "ensureDocuments",
            title: "Do you have all the documents handy?",
            subTitle: "Make sure that:",
            items: [
              "You have your original PAN Card with you",
              "You have put your signature on a blank white paper, it is clearly legibile and matches your signature",
            ],
            continueButtonText: "Yes, I have them ready",
          },
          {
            id: "ensureEnvironment",
            title: "Are you ready for the video call?",
            subTitle: "Ensure that:",
            items: [
              "You are in a well lit surrounding",
              "There are no background noises or disturbance",
            ],
            continueButtonText: "Yes, I am ready",
          },
          {
            id: "goodInternet",
            title: "Almost there!",
            body: "<h3>Do you have a strong internet connection?</h3><p>Ensure you are on a stable mobile network or, use a WiFi network.</p>",
            footer:
              'Upon pressing the "Start Video Call" button, you will be connected to an authorized representative for a quick video-based KYC process.',
            continueButtonText: "Start Video Call",
          },
        ],
      },
      videoLayoutSettings: {
        agent_1: "Small",
        customer_2: "Big",
      },
    },
  ],
  activities: [
    {
      id: "randomQuestions",
      activityType: "QnA",
      gatherFrom: ["customer"],
      displayTo: ["agent"],
      configuration: {
        title: "Question/Answers",
        description: "Please answer a few questions for us.",
        noOfQuestionsToAsk: 3,
        qnaPairs: [
          {
            question: "What is your Father's name?",
            expectedAnswer: "Ramachandra",
            allowedAttempts: 3,
            speech: {
              speak: "What is your Father's name?",
              audioUrl: "",
            },
          },
          {
            question: "Could you please confirm your current address?",
            expectedAnswer:
              "#10, 1st Main, 2nd Cross, Balaji Nagar, SG palya, Bengaluru 560029",
            allowedAttempts: 3,
            speech: {
              speak: "Could you please confirm your current address?",
              audioUrl: "",
            },
          },
          {
            question: "What is your Date of Birth?",
            expectedAnswer: "09 March 1997",
            allowedAttempts: 3,
            speech: {
              speak: "What is your Date of Birth?",
              audioUrl: "",
            },
          },
          {
            question: "Where do you work?",
            expectedAnswer: "BOT AI ML",
            allowedAttempts: 3,
            speech: {
              speak: "Where do you work?",
              audioUrl: "",
            },
          },
        ],
      },
    },
    {
      id: "matchHeadPoses",
      activityType: "MatchHeadPoses",
      gatherFrom: ["customer"],
      displayTo: ["agent"],
      configuration: {
        title: "Liveness Detection",
        description: "Please turn your head in the direction prompted",
        poses: ["faceleft", "faceright", "faceup", "facedown"],
        noOfPosesToCheck: 2,
        noOfFramesToCheck: 5,
      },
    },
    {
      id: "faceRecognition",
      activityType: "FaceRecognition",
      gatherFrom: ["customer"],
      displayTo: ["agent"],
      configuration: {
        title: "Face Recognition",
        face1: {
          sourceType: "Base64",
          value:
            "data:image/jpeg;base64,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",
          caption: "Photo in Aadhar Card",
          displayTo: ["agent-1"],
        },
        face2: {
          sourceType: "Camera",
          caption: "Photo from Live Stream",
          capturerExternalId: "agent-1",
          instructionTitle: "Capturing your photo",
          instructionDescription:
            "Please hold your face straight and look towards the camera",
          capturerInstructionTitle: "Capture Customer's Photo",
          capturerInstructionDescription:
            "Make sure that the customer is faced towards the camera and the full-frontal face is visible",
        },
      },
    },
    {
      id: "panCapture",
      activityType: "PanRecognition",
      gatherFrom: ["customer"],
      displayTo: ["agent"],
      onActivityDataGathered:
        "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
      onActivityAction:
        "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c",
      configuration: {
        title: "Pan Recognition",
        responseRequired: true,
        requiredFields: ["pan_num", "name", "dob", "father_name"],
        optionalFields: ["face_image", "signature_image", "pan_image"],
        image: {
          sourceType: "Camera",
          caption: "Captured Pan Card Image",
          capturerExternalId: "agent-1",
          instructionTitle: "Capturing your pan photo",
          instructionDescription:
            "Please hold your pan straight and show to the camera",
          capturerInstructionTitle: "Capture Customer's PAN Card Photo",
          capturerInstructionDescription:
            "Make sure that the PAN Card is faced towards the camera, is being held in correct orientation and all the fields are visible and legible",
        },
      },
    },
  ],
  webhooks: {
    onParticipantConnected:
      "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onParticipantConnected",
    onParticipantDisconnected:
      "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onParticipantDisconnected",
    onWorkflowFinished:
      "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onWorkflowFinished",
    onRecordingAvailable:
      "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onRecordingAvailable",
    onRecordingError:
      "https://webhook.site/8dce0beb-81fe-4bb9-a675-5ad954c18e0c/onRecordingError",
  },
};
