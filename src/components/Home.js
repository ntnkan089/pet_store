import React, {useEffect, useState} from 'react'
import api from '../api/axios'
import paw from '../assets/7586571.webp'

import { Link } from 'react-router-dom'
import { petAPI } from '../api/axios'

/* import useAxiosPrivate from '../hooks/useAxiosInterceptor'*/
import useAuth from '../hooks/useAuth'

const PetListing = () => {
    //const petAPI = useAxiosPrivate()
    const [page, nexPage] =  useState(1)

    const [data, setData] = useState({})
    const [erraa, setErraa] = useState(false);

    const [access, setAccess] = useState('');
    const {auth, setAuth} = useAuth();
    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                const response = await petAPI.get(`/animals`/* ,{
                    headers:{
                        Authorization: `Bearer ${auth.access}`
                }} */);
                setData(response?.data)
                console.log(response?.data);
                //console.log(process.env.REACT_APP_ACCESS_TOKEN);
                /* isMounted && setUsers(response.data); */
            } catch (err) {
                /* console.log(auth.access)
                console.error(err);
                setErraa(true)
                const resendTokenRequest = async () => {
                    try {
                        const response = await api.post('https://api.petfinder.com/v2/oauth2/token', {
                            grant_type: 'client_credentials',
                            client_id: 'YY7EZUrJOSmIqkDcjmO2rRuzQWdoJ7qEkICwfD4gwGC0HPsVcX',
                            client_secret: 'i79H3eEo0eYtgF2mXYu5KkfMr9VwC08ngRctviTs'
                        });
                        setAuth((prev)=>({...prev, access:response.data.access_token}))
                        console.log(response.data.access_token)
                        setAccess(response.data.access_token)
                        console.log(auth);
                    } catch (error) {
                        console.error(error);
                    }
                };

                resendTokenRequest()
                if(erraa){
                    const response2 = await petAPI.get('/animals', {
                        headers: {
                            Authorization: `Bearer ${auth.access}`
                        }
                    });
                    setData(response2?.data);
                    console.log(response2?.data);
        
                } */
            }
        }

        getUsers();

        return () => {
            isMounted = false;
        }
    }, [/* auth.access, setAuth */])

   /*  useEffect(() => {
        if(err){
            let isMounted = true;
            console.log('2nd');
            const getUsers = async () => {
                try {
                    setErr(false);
                    const response = await petAPI.get('/animals',{
                        headers:{
                            Authorization: `Bearer ${auth.access}`
                    }});
                    setData(response?.data)
                    console.log(response?.data);
                    //console.log(process.env.REACT_APP_ACCESS_TOKEN);
                    //isMounted && setUsers(response.data); 
                } catch (err) {
                    console.log(err);
                }
            }

            getUsers();

            return () => {
                isMounted = false;
            }
        }
    },[err]) */

  return (
    <>
    <div className='bg-yellow-300 flex text-center shadow-md'>
          <div className='max-w-screen-md text-white font-bold text-5xl flex items-center w-full justify-center mx-auto'>
              Welcome!
          </div>
        </div>
    <div className='grid md:grid-cols-2 lg:grid-cols-3 h-full'>
   
    {  
        data?.animals?.map((animal)=>{return(
            <div key = {animal?.id}  className='flex flex-col justify-center items-center gap-2'>
                {animal.photos[0]&&
                (<div>
                    <Link to={`/${animal.id}`} target='_blank' rel="noreferrer">
                    <img src={animal.photos[0]?.medium}                         className='max-height-25' alt="" />
                    </Link>
                </div>)
                }
                {
                    !animal.photos[0]&&
                    <div>
                        <Link to={`/${animal.id}`} target = '_blank'  rel="noreferrer">
                            <img src={paw} alt="" / >
                        </Link>
                    </div>
                }
                <div>
                    <p>
                        <a href={animal.url} target = '_blank'  rel="noreferrer"> {animal.name}</a>
                    </p>{/* 
                    <img src={animal?.photos[0]} alt="" /> */}
                </div>
            </div>
            )
        })
    }
    

    </div>
    <div className='flex items-center justify-center mt-4'>
    <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
      Next Page
    </button>
  </div>
    </>
  )

}

export default PetListing