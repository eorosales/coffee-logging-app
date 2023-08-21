import { useDispatch, useSelector } from "react-redux";
import { deleteDial, dialsSelector, dialsStatusSelector } from "./dialsSlice";
import { deleteDialByIdRequest } from "./dialsApi";

const DialsTable = ({ coffee }) => {
  const dispatch = useDispatch();
  const dials = useSelector(dialsSelector);

  const handleDelete = (dialId) => {
    dispatch(deleteDial(dialId));
    deleteDialByIdRequest(dialId);
  };

  const sortedDials = () => {
    const filteredDials = Object.values(dials).filter(
      (dial) => dial.coffee === coffee
    );
    return filteredDials.sort((a, b) => b.createdAt - a.createdAt);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Weight</th>
            <th>Grind</th>
            <th>Time</th>
            <th>Yield</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedDials().map((dial) => {
            return (
              <tr key={dial.id}>
                <td>{dial.temp}</td>
                <td>{dial.weight}</td>
                <td>{dial.grind}</td>
                <td>{dial.time}</td>
                <td>{dial.yield}</td>
                <td>
                  <button onClick={() => handleDelete(dial.id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DialsTable;
