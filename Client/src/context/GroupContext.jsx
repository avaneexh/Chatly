import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  // Fetch all groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get('/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups();
  }, []);

  // Join a group
  const joinGroup = async (groupId) => {
    try {
      const response = await axiosInstance.post('/groups/join', { groupId });
      setGroups((prevGroups) =>
        prevGroups.map((group) => (group._id === groupId ? response.data : group))
      );
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  return (
    <GroupContext.Provider value={{ groups, currentGroup, setCurrentGroup, joinGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
