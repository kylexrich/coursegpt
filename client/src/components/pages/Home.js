import React, { useEffect, useState } from 'react';
import SidePanel from '../organisms/SidePanel/SidePanel';
import RightSection from '../organisms/RightSection/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/authSlice';
import LoadingSpinner from '../atoms/LoadingSpinner/LoadingSpinner';
import { fetchAllSchools } from '../../redux/schoolsSlice';
import RegisterUserDetails from '../organisms/RegisterUserDetails/RegisterUserDetails';
import {
  fetchAllCourses,
  setCurrentlySelectedDropdownCourse,
} from '../../redux/coursesSlice';
import { setActivePanelInfo } from '../../redux/userSlice';
import { fetchUserChats, setWaitingFirstMessage } from '../../redux/chatsSlice';

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const persistedDropdownCourse = useSelector(
    state => state.user.selectedCourse
  );
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidepanelVisible, setIsSidepanelVisible] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      loginAndLoadUserData();
    } else {
      loadData();
    }
  }, [isAuthenticated, dispatch]);

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser());
      if (isAuthenticated) {
        loadData();
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    try {
      await dispatch(fetchAllSchools());
      await dispatch(fetchAllCourses());
      dispatch(setCurrentlySelectedDropdownCourse(persistedDropdownCourse));
      if (persistedDropdownCourse) {
        dispatch(setActivePanelInfo());
        dispatch(setWaitingFirstMessage(true));
      }
      await dispatch(fetchUserChats());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidePanelVisibility = () => {
    setIsSidepanelVisible(isSidepanelVisible => !isSidepanelVisible);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="App">
      {!user.type ? (
        <RegisterUserDetails />
      ) : (
        <>
          <RightSection
            isSidepanelVisible={isSidepanelVisible}
            toggleSidePanelVisibility={toggleSidePanelVisibility}
          />
          <SidePanel
            toggleSidePanelVisibility={toggleSidePanelVisibility}
            isSidepanelVisible={isSidepanelVisible}
            setIsSidepanelVisible={setIsSidepanelVisible}
          />
        </>
      )}
    </div>
  );
}

export default Home;
