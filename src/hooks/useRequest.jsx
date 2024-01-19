import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuthorizationContext } from '../pages/Context/AuthorizationContext';

const useRequest = () => {
  const API_KEY = 'WsdKue2LFxsqmdimIkCyvBgbFLHbcQkk8DjiHohkRccDPRcNdg';
  const {t} = useTranslation();
  const {user, setUser} = useAuthorizationContext();
  
  const updateUser = async (body, id,message) => {
    try {
      const request = await fetch(`https://crudapi.co.uk/api/v1/Authorization/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body)})

        if(message === 'addCard' && request.ok) {
          setUser(body)
          toast.success(t("cardsSucessfullyAdded"));
        }

        if(message === 'deleteCard' && request.ok) {
          setUser(body)
          toast.success(t("cardSucessfullyDeleted"));
        }

        if(message === 'editCard' && request.ok) {
          setUser(body)
          toast.success(t("cardSucessfullyEdited"));
        }

        if(message === 'training' && request.ok) {
          setUser(body)
          toast.success(t("resultAppliedToProgress"));
        }
     
    } catch (error) {
      toast.error((error.message));
      console.log(error.message)
    }
  }


  return {updateUser};
};

export default useRequest;