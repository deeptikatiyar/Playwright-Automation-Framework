import { APIRequestContext } from "@playwright/test";
import { config } from "@/utils/envHelper";

export async function createPost(apiContext: APIRequestContext, postData: any) {
    const response = await apiContext.post(`${config.apiBaseURL}/posts`, {
      data: postData
    });
  
    const responseBody = await response.json();
  
    return {
      response,
      responseBody
    };
  }