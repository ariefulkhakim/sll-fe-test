import apiInstance from '@/service/apiService';
import type { DefaultApiResponseType } from '@/types/apiResponse';

// eslint-disable-next-line func-names
const SpeciesService = (function () {
  const Queries = {
    GET_SPECIES: 'GET_SPECIES',
  };

  const getSpecies = async (params: any): Promise<DefaultApiResponseType> => {
    return apiInstance.get({
      path: `/species`,
      params,
    });
  };

  const getSpeciesDetail = async (id?: any): Promise<DefaultApiResponseType> => {
    return apiInstance.get({
      path: `/species/${id}`,
    });
  };

  const addSpecies = async (payload: any): Promise<DefaultApiResponseType> => {
    return apiInstance.post({
      path: `/species`,
      body: payload,
    });
  };

  const updateSpecies = async (payload: any): Promise<DefaultApiResponseType> => {
    return apiInstance.put({
      path: `/species/${payload.id}`,
      body: payload.body,
    });
  };

  const deleteSpecies = async (id?: any): Promise<DefaultApiResponseType> => {
    return apiInstance.remove({
      path: `/species/${id}`,
    });
  };

  return {
    Queries,
    getSpecies,
    getSpeciesDetail,
    addSpecies,
    updateSpecies,
    deleteSpecies
  };
})();

export default SpeciesService
