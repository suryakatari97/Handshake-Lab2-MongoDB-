//Register
//import { TEST_DISPATCH } from "./types";
import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import jwt_decode from "jwt-decode";
import setAuthToken from "../components/auth/HelperApis";

export const registerUser = (userData, history) => dispatch => {
               axios.post("/user/signUpStudent", userData)
                .then(res => history.push('/login'))
                // return {
                //     type: TEST_DISPATCH,
                //     payload : userData
                // }
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    }))
             };

export const registerCompany = (userData, history) => dispatch => {
  axios
    .post("/user/signUpCompany", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
          
export const loginUser = (userData, history) => dispatch => {
    axios.post('/user/signIn', userData)
        .then(res => {
            const { token } = res.data;
            //set token to local storage
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            //Decode token
            const decoded = jwt_decode(token);
            console.log(decoded);
            
            //set current user
            dispatch(setCurrentUser(decoded));
        }).catch(err =>
            dispatch(
                {
                    type: GET_ERRORS,
                    payload: err.response.data
                }));
};       

export const setCurrentUser = (decoded) => {
    console.log(decoded);
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//LogOut
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    //remove auth
    setAuthToken(false);
    //Set current user empty obj
    dispatch(setCurrentUser({}));
}