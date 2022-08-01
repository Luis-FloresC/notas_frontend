//import './List.css';

import { useNavigate } from 'react-router-dom';


const ListNotes = ({ documents = [] }) => {

  const listItems = documents.map((o) => {
    return <ListItem key={o._id} {...o} />
  })
  return (
    <>
      <div className="grid h-full card bg-base-300 rounded-box place-items-center">
        {listItems}
      </div>

    </>

  );
}
const ListItem = ({ title, description, keyword, created,_id,updated }) => {
  const Navigator = useNavigate();
  const keywords = keyword.map(
    (o) => {
      return (
        <span key={o} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{o}</span>
      )
    }
  );

 
  const onEditarClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.value;
    Navigator(`/note/UPD/${id}`);
  
  }

  const onEliminarClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.value;
    Navigator(`/note/DEL/${id}`);
  
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg bg-primary-focus w-full">

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <div className="text-sm text-left">Fecha de Creación: {new Date(created).toLocaleDateString()} {updated && "/ Fecha de Actualización: " + new Date(updated).toLocaleDateString()} </div>
          <p className="text-white text-base">
           Descripción: {description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {keywords}
        </div>
        <div className="btn-group justify-end mb-4 mr-4">
          <button className="btn bg-warning  text-black hover:text-white" onClick={onEditarClick} value={_id}>Editar Nota</button>
          <div class="divider divider-horizontal text-black bg-black w-1"></div>
          <button className="btn bg-red-600 text-black hover:text-white" onClick={onEliminarClick} value={_id}>Eliminar</button>
        </div>
      </div>
      <div className="divider text-white"></div>
    </>
  )
}
export default ListNotes;