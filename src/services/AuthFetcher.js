import { useState, useEffect,useCallback } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useAuthFetcher = () => {
    const { setError, setLoggedIn, setUsername } = useStore((state) => ({
        setError: state.Auth.setError,
        setLoggedIn: state.User.setLoggedIn,
        setUsername: state.User.setUsername,
      }));    
      const {APICheck: {setStatus}} = useStore();

    const registerUser = useCallback(async (user) => {
      localStorage.clear();
        try {
        const resp = await fetch(apiLink + '/user/signup' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
          body: JSON.stringify({
              "username": user.username,
              "password": user.password,
              "clientID": user.clientID,
              "clientSecret": user.clientSecret
        }),
        });
        const data = await resp.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        if (data.status === "fail" || data.status === "error") {
          setError(data.message);
        }
        if (data.status == "success") {
          console.log(data.token);
          setLoggedIn(true);
          setUsername(user.username);
        }


    } catch (err) {
        console.log(err);
      }
    }, []);

    const loginUser = useCallback(async (user) => {
      localStorage.clear();
        try {
        const resp = await fetch(apiLink + '/user/login' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

        },
        
          body: JSON.stringify({
              "username": user.username,
              "password": user.password,
          }),
        });
        const data = await resp.json();
        console.log(data);
        if (data.status === "fail" || data.status === "error") {
          setError(data.message);
        }
        if (data.status == "success") {
          setLoggedIn(true);
          setUsername(user.username);
          localStorage.setItem("token", data.token);
        }

    } catch (err) {
        console.log(err);
      }
    }, []);


    const signOutUser = useCallback(async () => {
        try {
        const resp = await fetch(apiLink + '/user/signout' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

            },
            
            });
            const data = await resp.json();
            if (data.status == "success") {
                console.log("fing");
                localStorage.clear();
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
          }
    }, []);

    const updateAccess = useCallback(async (d) => {
      try {
      const resp = await fetch(apiLink + '/user/updateAccess' , {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          
          body: JSON.stringify({
              "clientID": d.clientID,
              "clientSecret": d.clientSecret
          }),
          });
          const data = await resp.json();
          if (data.status != "success") {
            setError(data.message);
          } else {
            location.reload();
          }
      } catch (err) {
          console.log(err);
        }
  }, []);

  const getStatus = useCallback(async () => {
    try {
    const resp = await fetch(apiLink + '/status' , {
        method: 'GET',
    })
        const data = await resp.json();
        setStatus(true);
    } catch (err) {
        console.log(err);
      }
    }, []);

  return { registerUser, loginUser, signOutUser,updateAccess,getStatus };
};

export default useAuthFetcher;