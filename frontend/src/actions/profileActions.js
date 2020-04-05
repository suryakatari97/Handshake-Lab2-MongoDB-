import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_EDUCATION,
  GET_EXPERIENCE,
  EDU_LOADING,
  EXP_LOADING
} from "./types";


export const getCurrentProfile = (id) => dispatch => {
    console.log("IN GET STUDENT PROFILE :", id);
    
    dispatch(setProfileLoading());    
    axios('/student/studentdetails',{
        method: 'get',
        params:{"id" : id}
    })
    .then(res => 
        dispatch({
            type : GET_PROFILE,
            payload: res.data
        })
        )
        .catch(err =>
             dispatch({
            type : GET_PROFILE,
            payload: {}//if there is no profile,this will take us to create profile
        })
        );
};

export const createProfile = (profileData, history) => dispatch => {
    console.log(profileData);
    
    axios.post('/student/studentdetails', profileData)
    .then(res => history.push('/viewprofile'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const addEducationRecord = (educationData, history) => dispatch => {
  axios
    .post("/student/studentEducation", educationData)
    .then(res => history.push("/viewprofile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addExperienceRecord = (experienceData, history) => dispatch => {
  axios
    .post("/student/studentExperience", experienceData)
    .then(res => history.push("/viewprofile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const getStudentEducation = id => dispatch => {
  dispatch(setEduProfileLoading());
  console.log("id", id);
  axios("/student/studentEducation", {
    method: "get",
    params: { "id": id }
  })
    .then(res =>
      dispatch({
        type: GET_EDUCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EDUCATION,
        payload: {}
      })
    );
};

export const getStudentExperience = id => dispatch => {
  dispatch(setExpProfileLoading());
  console.log("id", id);
  axios("/student/studentExperience", {
    method: "get",
    params: { "id": id }
  })
    .then(res =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: {}
      })
    );
};
// profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
//Education Loading 
export const setEduProfileLoading = () => {
    return{
        type: EDU_LOADING
    }
}
//Experience Loading 
export const setExpProfileLoading = () => {
    return{
        type: EXP_LOADING
    }
}

//clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const createCompanyProfile = (profileData, history) => dispatch => {
  axios
    .post("/company/updateCompanyProfile", profileData)
    .then(res => history.push("/companyProfile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentCompanyProfile = id => dispatch => {
  dispatch(setProfileLoading());
  console.log("id", id);
  axios("/company/getCompanyProfile", {
    method: "get",
    params: { "id": id }
  })
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};