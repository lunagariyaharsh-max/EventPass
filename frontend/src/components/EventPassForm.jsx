import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventPassForm = ({ eventPasses, setEventPasses, editingEventPass, setEditingEventPass }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ eventName: '', eventDate: '' });

  useEffect(() => {
    if (editingEventPass) {
      setFormData({
        eventName: editingEventPass.eventName,
        eventDate: editingEventPass.eventDate.split('T')[0],
      });
    } else {
      setFormData({ eventName: '', eventDate: '' });
    }
  }, [editingEventPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User is null, cannot proceed with submission.');
      alert('Please log in to create an event pass.');
      return;
    }
    try {
      console.log('User data:', user); // Debug log
      if (editingEventPass) {
        const response = await axiosInstance.put(`/api/event-passes/${editingEventPass._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEventPasses(eventPasses.map((pass) => (pass._id === response.data._id ? response.data : pass)));
      } else {
        console.log('Sending POST request with data:', { ...formData, userId: user.id });
        console.log('Token:', user.token);
        const response = await axiosInstance.post('/api/event-passes', { ...formData, userId: user.id }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEventPasses([...eventPasses, response.data]);
      }
      setEditingEventPass(null);
      setFormData({ eventName: '', eventDate: '' });
    } catch (error) {
      console.error('Error saving event pass:', error.response ? error.response.data : error.message);
      alert('Failed to save event pass. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingEventPass ? 'Edit Event Pass' : 'Create Event Pass'}</h1>
      <input
        type="text"
        placeholder="Event Name"
        value={formData.eventName}
        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.eventDate}
        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingEventPass ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EventPassForm;