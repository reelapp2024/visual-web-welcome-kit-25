
import { useMySiteData } from './useMySiteData.js';

export const useProcessData = () => {
  const { data, isLoading, error } = useMySiteData({
    pageType: "home",
    reqFrom: "Process"
  });

  return {
    projectOurProcess: data?.projectInfo?.ourProcessSection || [],
    projectCategory: data?.projectInfo?.serviceType || "",
    isLoading,
    error
  };
};
