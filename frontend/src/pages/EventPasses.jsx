import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import EventPassForm from '../components/EventPassForm';
import EventPassList from '../components/EventPassList';
import { useAuth } from '../context/AuthContext';

const EventPasses = () => {
  const { user } = useAuth();
  const [eventPasses, setEventPasses] = useState([]);
  const [editingEventPass, setEditingEventPass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    const fetchEventPasses = async () => {
      try {
        const response = await axiosInstance.get('/api/event-passes', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEventPasses(response.data);
      } catch (error) {
        alert('Failed to fetch event passes.');
      }
    };

    fetchEventPasses();
  }, [user, navigate]);

  if (!user) return <div>Please log in to view event passes.</div>; // Prevent rendering if not logged in

  return (
    <div className="container mx-auto p-6">
      <EventPassForm
        eventPasses={eventPasses}
        setEventPasses={setEventPasses}
        editingEventPass={editingEventPass}
        setEditingEventPass={setEditingEventPass}
      />
      <EventPassList 
        eventPasses={eventPasses} 
        setEventPasses={setEventPasses} 
        setEditingEventPass={setEditingEventPass} 
      />
    </div>
  );
};

export default EventPasses;