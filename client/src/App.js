import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';



import {Layout} from './components/Layout'
import MainPage from './pages/MainPage'
import PostsPage from './pages/PostsPage';
import {RegisterPage} from './pages/RegisterPage'
import {PostPage} from './pages/PostPage';
import {AddPostPage} from './pages/AddPostPage'
import {LoginPage} from './pages/LoginPage'
import EditPostPage from './pages/EditPostPage'

import {ToastContainer} from 'react-toastify';
import { checkIsAuth, getMe } from './redux/features/auth/authSlice';
import { UserProfilePage } from './pages/UserProfilePage';

function App() {  

  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(getMe());
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/posts' element={<PostsPage />}></Route>
        <Route path='/:id' element={<PostPage />}></Route>
        <Route path='/new' element={<AddPostPage />}></Route>
        <Route path='/:id/edit' element={<EditPostPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/me' element={<UserProfilePage />}></Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
