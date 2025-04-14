import "../css/table.css";
import { IoMdCreate } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

export const Table = ({ movies, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="movies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de creación</th>
            <th>Productores</th>
            <th>Estudio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan="4">No hay películas</td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.name}</td>
                <td>{new Date(movie.createdAt).toLocaleDateString()}</td>
                <td>{movie.producers[0].name}</td>
                <td>{movie.studios[0].name}</td>
                <td className="actions">
                  <button onClick={() => onEdit(movie)}><IoMdCreate /></button>
                  <button onClick={() => onDelete(movie)}><FiTrash2 /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};