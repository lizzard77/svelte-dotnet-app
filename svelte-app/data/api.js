// API helper functions
// Remark - to use do: npm i axios svelte-routing 

import axios from 'axios';
import { navigate } from 'svelte-routing';
import { authToken, baseUrl } from "../data/store.js";
import { get } from 'svelte/store';

export class API 
{
    lastError = '';
    token = "";
    baseurl = "";

    constructor()
    {
        this.baseurl = get(baseUrl);
        this.token = get(authToken);        
        if (this.token) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        }
    }

    async get(uri)
    {
        try
        {
            const response = await axios.get(this.baseurl + uri);
            this.lastError = '';
            return response.data;
        } 
        catch (error)
        {
            this.checkError(error);
        }
    }

    async getFile(uri)
    {
        try
        {
            const response = await axios.get(this.baseurl + uri, { responseType: 'blob' });
            let fileName = "1000.pdf";
            if (response.headers["content-disposition"])
            {
                fileName = response.headers["content-disposition"].split(';')[1];
                fileName = fileName.replace("filename=", "").trim();
            }

            this.lastError = '';
            return { data: response.data, filename: fileName, contentType: "application/binary" };
        } 
        catch (error)
        {
            this.checkError(error);
        }
    }

    async getRaw(uri)
    {
        let response = {};
        try {
            response = await axios.get(this.baseurl + uri); //, { withCredentials: true })
            this.lastError = '';
        } 
        catch (error)
        {
            this.checkError(error);
        }
        return response;
    }

    async post(uri, formData) 
    {
        try
        {
            const response = await axios.post(this.baseurl + uri, formData); //, { withCredentials: true });
            this.lastError = '';
            return response;
        } 
        catch (error)
        {
            this.checkError(error);
        }
    }

    async put(uri, formData) 
    {
        try
        {
            const response = await axios.put(this.baseurl + uri, formData); //, { withCredentials: true });
            this.lastError = '';
            return response;
        } 
        catch (error)
        {
            this.checkError(error);
        }
    }

    checkError(error) {
        this.lastError = error.message;
        if (error.response.status === 401 || error.response.status === 403) {
            authToken.set(null);
            navigate('/login');
        } else if (error.response.status === 404) {
            navigate('/notfound');
        }
    }
}