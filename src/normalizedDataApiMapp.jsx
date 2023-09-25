import normalized_data_api_mapping from './normalized_data_api_mapping.json';
import normalized_employee_admin_mapping from './normalized_employee_admin_mapping.json';

export const normalizedDataApiMapp = (newActiveTab, id) => {
  try {
    const tabData = JSON.parse(JSON.stringify(normalized_employee_admin_mapping)); 
    const selectedTab = tabData.find(tab => tab.page_tab_name === newActiveTab);
    
    if (selectedTab) {
      console.log(selectedTab);
      return selectedTab.api_put_url.replace("id", id);
    } else {
      console.log("No matching tab configuration found for tab title:", newActiveTab);
      return null;
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return null;
  }
};