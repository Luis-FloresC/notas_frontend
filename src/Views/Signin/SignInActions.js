import getSignIn from '../../Services/api/signinapi';
const SIGNIN_LOADING = "SIGNIN_LOADING";
const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_FAILED = "SIGNIN_FAILED";
const SIGNIN_CLEAN_ERROR = "SIGNIN_CLEAN_ERROR";


export const submitSignIn = async (dispatch, email, password) => {

  
    dispatch({ type: SIGNIN_LOADING, payload: null });
   const ok =  await getSignIn(email, password)
      .then((response) => {
        const data = response;
        dispatch({ type: SIGNIN_SUCCESS, payload: data });
        console.log(response)
        return true;
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload 
          dispatch({ type: SIGNIN_FAILED, payload: error.response.data.error });
          return false;
        }
      });
      return ok;
}

export const cleanSignInError = (dispatch) => {
  dispatch({ type: SIGNIN_CLEAN_ERROR, payload: null });
}