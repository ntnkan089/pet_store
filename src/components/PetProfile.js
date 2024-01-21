import React, {useEffect, useState} from 'react'
import api from '../api/axios'
import paw from '../assets/7586571.webp'

import { Link, useParams } from 'react-router-dom'
import { petAPI } from '../api/axios'

/* import useAxiosPrivate from '../hooks/useAxiosInterceptor'*/
import useAuth from '../hooks/useAuth'

const pet = {
    img: paw,
    name: 'Couldn\'t find pet',
    
    breed: 'bre',
    gender: 'gende',
    age: 'agea',
    about: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe asperiores qui obcaecati ipsa nihil atque eligendi, vero rerum, adipisci deleniti ipsam similique et nemo illum quod dicta dolorem quisquam autem.'


}
const PetProfile = () => {
    //const petAPI = useAxiosPrivate()

    let accessa = '';
    const {id} = useParams()
    const [data, setData] = useState({})
    const [erraa, setErraa] = useState(false);

    const [access, setAccess] = useState('');
    const {auth, setAuth} = useAuth();
    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                const response = await petAPI.get(`/animals/${id}`
                ,{
                    headers:{
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
                }});
                setData(response?.data.animal)
                console.log(response?.data.animal);
                //console.log(process.env.REACT_APP_ACCESS_TOKEN);
                /* isMounted && setUsers(response.data); */
            } catch (err) {
                console.log(auth.access)
                console.error(err);
                setErraa(true)
                const resendTokenRequest = async () => {
                    try {
                        const response = await api.post('https://api.petfinder.com/v2/oauth2/token', {
                            grant_type: 'client_credentials',
                            client_id: 'JTmW0pVdSxBIqTlKRded20EwHwMC34dKFPDJugQi3wOMlOPCxm',
                            client_secret: 'zXksawaY84DckTRLAGdxWlTU9yM1Ekt5thRakvhN'
                        });

                        setAuth((prev)=>({...prev, access:response.data.access_token}))
                        accessa = response.data.access_token;
                        console.log(response.data.access_token)
                        console.log( `accessa: ${accessa}`);
                        setAccess(response.data.access_token)
                        console.log(auth.access);
                    } catch (error) {
                        console.error(error);
                    }
                };

                await resendTokenRequest();
                
               
                setTimeout(async () => {
                    try{const response = await petAPI.get(`/animals/${id}`
                    ,{
                        headers:{
                            Authorization: `Bearer ${accessa}`
                    }});
                    setData(response?.data.animal)
                    console.log(response?.data.animal);
                    }
                    catch(err){
                        console.log(err);
                    }
                    }, 0
                )

                
                
            }
        }

        getUsers();

        return () => {
            isMounted = false;
        }

    }, [/* auth.access, setAuth */])

  return (
    <div className='flex flex-col'>
        <div className='bg-yellow-300 flex text-center shadow-md'>
          <div className='max-w-screen-md text-white font-bold text-5xl flex items-center w-full justify-center mx-auto'>
              {data?.name}
          </div>
        </div>

        <div className='pt-5  w-full '>
          <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:max-w-screen-md mx-auto'>
            <div className='max-w-[350px]'>
                {data?.photo&&<img src={(data?.photos)?data?.photos[0]?.large:paw} alt="" />}
                {!data?.photo&&<img src={paw} alt="" />}
                
            </div>
            <div className='max-w-screen-sm'>
                <p className='font-bold'>Breed</p>
                <p className='my-3'>{data?.breeds?.primary}</p>
                <p className='font-bold'>Gender & Age</p>
                <p className='my-3'>{data?.gender}, {data.age}</p>
                <p className='font-bold'>Status:</p>
                <p className='my-3 capitalize'>{data?.status}</p>
                <p className='font-bold'>Address:</p>
                <p className='my-3 capitalize'>{`${(data?.contact?.address.address1)?data?.contact?.address.address1:''}, ${data?.contact?.address.city}, ${data?.contact?.address.state}  ${data?.contact?.address.postcode}`}</p>
                <p className='font-bold max-w-[250px]'>About <span className='underline text-orange-500'><a href={data.url} target='_blank' rel = 'noreferer'>{data?.name}</a></span></p>
                
                <p className='my-3 max-w-[250px]'>{data?.description}</p>
            </div>
          </div>
        </div>
    </div>
    
  )

}

export default PetProfile