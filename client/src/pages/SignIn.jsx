import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
 
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart() );
    try{
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      

      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      } 
      dispatch(signInSuccess(data));
      navigate('/');

    }catch(error){
      dispatch(signInFailure(data.message));
      
    }

  }


  return (
    <div className = 'p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className = 'flex flex-col gap-4'>
          <input 
            type ='email' 
            placeholder ='email' 
            className = 'border p-3 rounded-lg' 
            id = 'email' 
            onChange={handleChange}
          />

          <input 
            type ='password' 
            placeholder ='password' 
            className = 'border p-3 rounded-lg' 
            id = 'password' 
            onChange={handleChange}
          />

          <button   
            className ='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled: opacity-80'>
            Sign In
          </button>
          {error && <p className='text-red-500 mt-5'>{error}</p> }
        </form>

    </div>
  )
}
