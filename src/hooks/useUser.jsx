import {getMeApi} from '../api/user'

export const useUser = () => {

    const getMe = async(token) => {
        //eslint-disable-next-line
        try{
            const response = await getMeApi(token);
            return response

        }catch(error){
            throw error;
        }
    }
  
    return {
        getMe,
    };
    
  
}


