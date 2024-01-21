
import { petAPI } from "../api/axios";
import { useEffect } from "react";


import api from "../api/axios"


import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth, setAuth } = useAuth();
    /* setAuth({...auth, accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJZWTdFWlVySk9TbUlxa0Rjam1PMnJSdXpRV2RvSjdxRWtJQ3dmRDRnd0dDMEhQc1ZjWCIsImp0aSI6ImJhODU5N2JhOTE0Zjc5YTEzODZiYjg4YzA2ODgzYzI0MDAxMmJlOTA5MzIyMmE2NDA0NzlkOTA2OTc2NTNmNmNkMDAwNjkzYjE0ZmMxNjEzIiwiaWF0IjoxNzA1ODA3MjA2LCJuYmYiOjE3MDU4MDcyMDYsImV4cCI6MTcwNTgxMDgwNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.EU3F8-MfKf5U4S5kr2Ns3Lq2pufYY526HBFaT0aEnJG5lhUJhIQnEiZ8X3SeSgr-HwwEewARBMmPOkjpsHF0cwfeHhU3BvkuSAJ8FRpW_MKgW9upa5r7A6Fi2dZYnjKnrx-8tIA0t5TPwUl5qIbKhBZhQWTGKgrwn0xacNdm-L7pw7SICfGpQiUhu5sFxHByD00RtmqSKz-t-XTkLKInbYweKTu9NJOd3LZOMQfR-GpHFAFD7nDZ-QMdQka3WOJo8_2_zdVmCnTBRejgPvl4N2hyBRobiNqow-f6LZcUglIGoMIkrGoVUeLbLLWEXLAR6uoswjRy7Tm94von1LrQAA'}) */
    useEffect(() => {
        console.log('repea');
        const requestIntercept = petAPI.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        console.log('befo.');

        const responseIntercept = petAPI.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error) {
                    console.log(error)
                    console.log('repea 0');

                    const resendTokenRequest = async () => {
                        try {
                            const response = await api.post('https://api.petfinder.com/v2/oauth2/token', {
                                grant_type: 'client_credentials',
                                client_id: 'YY7EZUrJOSmIqkDcjmO2rRuzQWdoJ7qEkICwfD4gwGC0HPsVcX',
                                client_secret: 'i79H3eEo0eYtgF2mXYu5KkfMr9VwC08ngRctviTs'
                            });
                            
                            console.log(response.data);
                            return response.data;
                        } catch (error) {
                            console.error(`err.data`);
                        }
                    };
                    console.log('resObj ')
                    let resObj = {};
                    if (!prevRequest?.sent){
                        prevRequest.sent = true;
                        resObj = await resendTokenRequest();
                    }
                    const newAccessToken = resObj.accessToken;
                    setAuth((prevAuth) => ({ ...prevAuth, accessToken: newAccessToken }));
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return petAPI(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            petAPI.interceptors.request.eject(requestIntercept);
            petAPI.interceptors.response.eject(responseIntercept);
        }
    }, [setAuth])

    return petAPI;
}

export default useAxiosPrivate;