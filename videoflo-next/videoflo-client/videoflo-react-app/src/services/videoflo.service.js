import axios from "axios";
import { REACT_APP_VIDEOFLO_URL } from "../appConfig.js";

export const getWsToken = ({ sessionId, participantId, token }) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify({});

    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/getWsToken`
          : `${localStorage.getItem("_vf_app_url")}/clientApi/getWsToken`,

        {
          sessionId,
          participantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      )
      .then((response) => {
        console.log("WS_TOKEN", response);
        resolve(response.data.accessToken);
      })
      .catch((error) => reject(error));
  });
};

/**
 *
 * @param {*} appId
 * @param {*} secretKey
 * @returns accessToken
 */
export const getAccessToken = async (appId, secretKey) => {
  const token = new Promise((resolve, reject) => {
    var data = JSON.stringify({});

    let url = localStorage.getItem("_vf_app_url");
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/token/getToken`
          : `${localStorage.getItem("_vf_app_url")}/token/getToken`,
        {
          appId,
          secretKey,
        }
      )
      .then((response) => {
        resolve(response.data.accessToken);
      })
      .catch((error) => reject(error));
  });
  return token;
};

/**
 *
 * @param {access token} token
 * @param {activitites, webhooks, participants, name} body
 * @returns {sessionId and array of particapants}
 */
export const createSessions = async (token, body) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify();

    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/videoSessions/createSession`
          : `${localStorage.getItem(
              "_vf_app_url"
            )}/videoSessions/createSession`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const compareImage = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/compareFaces`
          : `${localStorage.getItem("_vf_app_url")}/clientApi/compareFaces`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        resolve(error);
      });
    // reject(error));
  });
};

export const compareImageAQR = async (body) => {
  console.log("from aadhar qr")
  return new Promise((resolve, reject) => {
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/compareFacesAadharQR`
          : `${localStorage.getItem("_vf_app_url")}/clientApi/compareFacesAadharQR`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        resolve(error);
      });
    // reject(error));
  });
};

export const panRecognition = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/panRecognition`
          : `${localStorage.getItem("_vf_app_url")}/clientApi/panRecognition`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const posematch = async (body) => {
  // return new Promise(async(resolve, reject)=>{
  //   if(body){
  //     delay(1000)
  //     resolve({"pose":"faceright","response":{"success":true,"errorCode":null,"errorMessage":null,"results":[{"imageId":1,"errorCode":null,"errorMessage":null,"result":true},{"imageId":2,"errorCode":null,"errorMessage":null,"result":true},{"imageId":3,"errorCode":null,"errorMessage":null,"result":true},{"imageId":4,"errorCode":null,"errorMessage":null,"result":true},{"imageId":5,"errorCode":null,"errorMessage":null,"result":true}]}})
  //   }else reject({"pose":"faceleft","response":{"success":true,"errorCode":null,"errorMessage":null,"results":[{"imageId":1,"errorCode":null,"errorMessage":null,"result":false},{"imageId":2,"errorCode":null,"errorMessage":null,"result":false},{"imageId":3,"errorCode":null,"errorMessage":null,"result":false},{"imageId":4,"errorCode":null,"errorMessage":null,"result":false},{"imageId":5,"errorCode":null,"errorMessage":null,"result":false}]}})
  // })

  return new Promise((resolve, reject) => {
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/matchHeadPose`
          : `${localStorage.getItem("_vf_app_url")}/clientApi/matchHeadPose`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.warn(response.data);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const getCustomerIpInfo = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/getCustomerIpInfo`
          : `${localStorage.getItem(
              "_vf_app_url"
            )}/clientApi/getCustomerIpInfo`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const getGeocodeLocation = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/getGeocodeLocation`
          : `${localStorage.getItem(
              "_vf_app_url"
            )}/clientApi/getGeocodeLocation`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.warn(response.data);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const getDetectedSignature = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        localStorage.getItem("_vf_app_url") == undefined
          ? `${REACT_APP_VIDEOFLO_URL}/clientApi/detectSignature`
          : `${localStorage.getItem("_vf_app_url")}/clientApi/detectSignature`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_vf_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
