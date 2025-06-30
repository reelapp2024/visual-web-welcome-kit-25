
import { useMySiteData } from './useMySiteData.js';

export const useHeaderData = () => {
  const { data, isLoading, error } = useMySiteData({
    pageType: "home"
  });

  return {
    phoneNumber: data?.aboutUs?.phone || "",
    projectName: data?.projectInfo?.projectName || "",
    projectCategory: data?.projectInfo?.serviceType || "",
    projectFasFA: data?.projectInfo?.defaultFasFaIcon || "",
    projectSlogan: data?.projectInfo?.projectSlogan || `Professional ${data?.projectInfo?.serviceType || ''}`,
    isLoading,
    error
  };
};
