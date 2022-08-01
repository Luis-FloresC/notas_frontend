import { axiosPrivate } from "../../Services/api/axios";
import { postNew, putNote }  from "../../Services/api/notesApi";


export const NOTES_LOAD = "NOTES_LOAD";
export const NOTES_SUCCESS = "NOTES_SUCCESS";
export const NOTES_FAILED = "NOTES_FAILED";
export const NOTES_CLEAR_ERROR = "NOTES_CLEAR_ERROR";
export const NOTES_PAGE_CHANGE = "NOTES_PAGE_CHANGE";
export const NOTES_LIMIT_CHANGE = "NOTES_LIMIT_CHANGE";
export const NOTE_ADD_SUCCESS = "NOTE_ADD_SUCCESS";
export const NOTE_ADD_FAILED = "NOTE_ADD_FAILED";
export const NOTE_POR_ID_SUCCESS = "NOTE_POR_ID_SUCCESS";
export const NOTE_UPDATE_SUCCESS = "NOTE_UPDATE_SUCCESS";
export const NOTE_UPDATE_FAILED = "NOTE_UPDATE_FAILED";
export const NOTE_DELETE_SUCCESS = "NOTE_DELETE_SUCCESS";
export const NOTE_DELETE_FAILED = "NOTE_DELETE_FAILED";
export const getNotesDocuments = async (dispatch, page, limit) => {
  try {
    dispatch({ type: NOTES_LOAD, payload: null });
    const { data } = await axiosPrivate.get(`/notes/page/${page}/${limit}`);
    dispatch({ type: NOTES_SUCCESS, payload: data });
  } catch (ex) {
    console.log("notesActions", ex);
    dispatch({ type: NOTES_FAILED, payload: "Error al Cargar Documentos" });
  }
}

export const addNote = async (dispatch,{description,title,keyword} ) => {
 
    dispatch({ type: NOTES_LOAD, payload: null });
    const ok = await postNew(title,description,keyword)
    .then((response) => {
      const data = response;
      dispatch({ type: NOTE_ADD_SUCCESS, payload: data });
      console.log(response)
      return true;
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload 
        dispatch({ type: NOTE_ADD_FAILED, payload: error.response.data.error });
        return false;
      }
    });
    return ok;
 
}

export const updateNote = async (dispatch,{description,title,keyword,id} ) => {
  
    
   const ok = await putNote(title,description,keyword,id)
    .then((response) => {
      dispatch({ type: NOTES_LOAD, payload: null });
      const data = response;
      dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
      console.log("Response",response);
      return true;
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload 
        dispatch({ type: NOTE_UPDATE_FAILED, payload: error.response.data.error });
        return false;
      }
      return false;
    });

    return ok;

 
}

export const deleteNote = async (dispatch,{id} ) => {
  try {
    dispatch({ type: NOTES_LOAD, payload: null });
    const { data } = await axiosPrivate.delete(`/notes/eliminar/${id}`);
    dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
    return true;
  } catch (ex) {
    console.log("notesActions", ex);
    dispatch({ type: NOTE_DELETE_FAILED, payload: "Error al Eliminar Documentos" });
    return false;
  }
}

export const getNote = async (dispatch,{idNota})=>{
  try {
    
    dispatch({ type: NOTES_LOAD, payload: null });
    const { data } = await axiosPrivate.get(`/notes/porId/${idNota}`);
    dispatch({ type: NOTE_POR_ID_SUCCESS, payload: data });
  } catch (ex) {
    console.log("notesActions", ex);
    dispatch({ type: NOTES_FAILED, payload: "Error al buscar nota" });
  }
}

export const setNotesPage = (dispatch, page) => {
  dispatch({ type: NOTES_PAGE_CHANGE, payload: page });
}

export const setNotesLimit = (dispatch, limit) => {
  dispatch({ type: NOTES_LIMIT_CHANGE, payload: limit });
}

export const clearNotesError = (dispatch) => {
    dispatch({ type: NOTES_CLEAR_ERROR, payload: null });
  }
  