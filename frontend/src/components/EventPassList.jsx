import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventPassList = ({ eventPasses, setEventPasses, setEditingEventPass }) => {
  const { user } = useAuth();

  const handleDelete = async (passId) => {
    try {
      await axiosInstance.delete(`/api/event-passes/${passId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEventPasses(eventPasses.filter((pass) => pass._id !== passId));
    } catch (error) {
      alert('Failed to delete event pass.');
    }
  };

  const handleValidate = async (passId) => {
    try {
      const response = await axiosInstance.put(`/api/event-passes/${passId}`, { isValidated: true }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEventPasses(eventPasses.map((pass) => (pass._id === response.data._id ? response.data : pass)));
    } catch (error) {
      alert('Failed to validate event pass.');
    }
  };

  const handleLogAttendance = async (passId) => {
    try {
      const response = await axiosInstance.put(`/api/event-passes/${passId}`, { attendanceLogged: true }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEventPasses(eventPasses.map((pass) => (pass._id === response.data._id ? response.data : pass)));
    } catch (error) {
      alert('Failed to log attendance.');
    }
  };

  return (
    <div>
      {eventPasses.map((pass) => (
        <div key={pass._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{pass.eventName}</h2>
          <p>Event Date: {new Date(pass.eventDate).toLocaleDateString()}</p>
          <img src={pass.qrCode} alt="QR Code" className="w-32 h-32 my-2" />
          <p>Validated: {pass.isValidated ? 'Yes' : 'No'}</p>
          <p>Attendance Logged: {pass.attendanceLogged ? 'Yes' : 'No'}</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => setEditingEventPass(pass)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleValidate(pass._id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={pass.isValidated}
            >
              Validate
            </button>
            <button
              onClick={() => handleLogAttendance(pass._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={pass.attendanceLogged}
            >
              Log Attendance
            </button>
            <button
              onClick={() => handleDelete(pass._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventPassList;