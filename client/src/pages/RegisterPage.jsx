import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

import {checkIsAuth, registerUser} from './../../src/redux/features/auth/authSlice';

export const RegisterPage = () => {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const status = useSelector(state => state.authSlice.status);
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect( () => {
     if (status) {
      toast(status)
     }
     if (isAuth) {
      navigate("/")
     }
  }, [status, isAuth, navigate])


  const handleSubmit = () => {
    try {
      dispatch(registerUser({username, password}));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
    onSubmit={(e) => e.preventDefault()}
    className="w-1/5 h-60 mx-auto mt-10"
  >
    <label className="text-sm text-blue-400">
      Username:
      <input
        type="text"
        placeholder="Username"
        className="mt-1 text-white w-full rounded-lg bg-neutral-800 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
    </label>
    <label className="text-sm text-blue-400">
      Password:
      <input
        type="password"
        placeholder="Password"
        className="mt-1 text-black w-full rounded-lg bg-neutral-800 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
    </label>
    <div className="flex mt-5 justify-center">
      <div className="flex gap-8 justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center h-6 items-center text-xs text-black rounded-lg px-4 bg-blue-400"
        >
          Register
        </button>
      </div>
    </div>
  </form>
  )
}