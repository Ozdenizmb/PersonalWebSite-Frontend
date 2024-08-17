import { useEffect, useState } from 'react';
import axios from "axios";

export const useApiProgress = (apiMethod ,apiPath, strictPath) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [pendingApiCall, setPendingApiCall] = useState(false);

    apiPath = API_BASE_URL + apiPath;

    useEffect(() => {

        let numberRequest, numberResponse;

        const updateApiCallFor = (method, url, inProgress) => {
            if(method !== apiMethod) {
                return;
            }
            if(strictPath && url === apiPath) {
                setPendingApiCall(inProgress);
            }
            else if(!strictPath && url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        }

        const registerInterceptors = () => {
            numberRequest = axios.interceptors.request.use((request) => {

                const { url, method } = request;
                updateApiCallFor(method, url, true);
                return request;
            });
    
            numberResponse = axios.interceptors.response.use((response) => {

                const { url, method } = response.config;
                updateApiCallFor(method, url, false);
                return response;
    
            }, (error) => {

                const { url, method } = error.config;
                updateApiCallFor(method, url, false);
                throw error;
    
            });
        }

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(numberRequest);
            axios.interceptors.response.eject(numberResponse);
        }

        registerInterceptors();

        return function cleanup() {
            unregisterInterceptors();
        }

    }, [apiPath, apiMethod, strictPath]);

    return pendingApiCall;
}