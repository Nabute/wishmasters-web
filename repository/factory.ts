//@ts-ignore
import type { AsyncDataOptions } from "#app";
import type { $Fetch, FetchOptions } from "ofetch";
import { type ErrorResponse, ErrorTypes } from "./types";

/*
 The HttpFactory acts as a wrapper around an HTTP client. 
 It encapsulates the functionality for making API requests asynchronously 
 through the call function, utilizing the provided HTTP client.
*/
class FetchFactory<BaseListResponse, BaseDto> {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param method the HTTP method (GET, POST, ...)
   * @param url the endpoint url
   * @param data the body data
   * @param fetchOptions fetch options
   * @returns
   */
  async call(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<"json">
  ): Promise<BaseListResponse> {
    return this.$fetch<BaseListResponse>(url, {
      method,
      body: data,
      ...fetchOptions,
    });
  }
}

abstract class BaseModule<BaseListResponse, BaseDto> extends FetchFactory<
  BaseListResponse,
  BaseDto
> {
  protected abstract RESOURCE: string;

  private handleError(error: unknown) {
    console.error("An error occurred:", error);
    throw error;
  }

  private async getToken(): Promise<string | null | undefined> {
    const { token } = useAuth();

    return token.value;
  }

  private getFetchOptions(
    token: string,
    additionalHeaders?: Record<string, string>
  ): FetchOptions<"json"> {
    return {
      headers: {
        Authorization: `${token}`,
        ...(additionalHeaders || {}),
      },
    };
  }

  private async getTokenAndFetchOptions(
    additionalHeaders?: Record<string, string>
  ): Promise<FetchOptions<"json">> {
    const token = await this.getToken();
    return this.getFetchOptions(token as string, additionalHeaders);
  }

  private async createUrl(
    queryParams: Record<string, any>, // Allow any type to handle arrays and strings
    extension: string = ""
  ): Promise<string> {
    const searchParams = new URLSearchParams();

    // Loop through each key in the queryParams object
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If the value is an array, append each item with the same key
        value.forEach((item) => searchParams.append(key, item));
      } else {
        // Otherwise, append the single value
        searchParams.append(key, value);
      }
    });

    // Construct the full URL with the extension and query string
    const paramsString = searchParams.toString();
    return `${this.RESOURCE}${extension}?${paramsString}`;
  }

  protected async fetchData<ResponseType>(
    queryParams: object,
    asyncDataOptions?: AsyncDataOptions<BaseListResponse>,
    extension = "",
    additionalHeaders?: Record<string, string>
  ): Promise<ResponseType | undefined> {
    try {
      const fetchOptions = await this.getTokenAndFetchOptions(
        additionalHeaders
      );
      const url = await this.createUrl(
        { ...queryParams, sort_by: "created_at", sort_order: "desc" },
        extension
      );

      const response = await this.call("GET", url, undefined, fetchOptions);

      return response as Awaited<ResponseType | undefined>;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  protected async createEntity(
    payload: Record<string, any>,
    extension = "",
    additionalHeaders?: Record<string, string>
  ): Promise<BaseDto> {
    const fetchOptions = await this.getTokenAndFetchOptions();
    const url = `${this.RESOURCE}${extension}`;
    const { data, error } = await useAsyncData(url, () => {
      return this.call("POST", url, payload, fetchOptions);
    });

    if (error.value !== null) {
      const errorObj = (error.value?.data as ErrorResponse) || {};
      this.throwError(errorObj);
    }

    return data as BaseDto;
  }
  protected async createEntityWoutHeader(
    payload: Record<string, any>,
    additionalHeaders?: Record<string, string>
  ): Promise<BaseDto> {
    const { data, error } = await useAsyncData(this.RESOURCE, () => {
      return this.call("POST", this.RESOURCE, payload);
    });

    if (error.value !== null) {
      const errorObj = (error.value?.data as ErrorResponse) || {};
      this.throwError(errorObj);
    }

    return data as BaseDto;
  }

  protected async updateEntity(
    id: string | number,
    payload: Record<string, any>,
    extension = "",
    additionalHeaders?: Record<string, string>
  ): Promise<BaseDto> {
    try {
      const fetchOptions = await this.getTokenAndFetchOptions(
        additionalHeaders
      );
      const url = `${this.RESOURCE}${extension}`;
      return (await this.call(
        "PATCH",
        url,
        payload,
        fetchOptions
      )) as unknown as BaseDto;
    } catch (error) {
      console.error("Error updating entity:", error);
      throw error;
    }
  }

  protected async deleteEntity(
    id: string | number,
    extension = "",
    additionalHeaders?: Record<string, string>
  ): Promise<void> {
    try {
      const fetchOptions = await this.getTokenAndFetchOptions(
        additionalHeaders
      );
      const url = `${this.RESOURCE}${extension}`;
      await this.call("DELETE", url, undefined, fetchOptions);
    } catch (error) {
      console.error("Error deleting entity:", error);
      throw error;
    }
  }

  private throwError(error: ErrorResponse) {
    const result = error.data.result; 
  
    if (result.type === ErrorTypes.SERVER_ERROR) {
      throw new Error("System Error. Please contact an administrator.");
    }

    let message = "An error occurred.";
    
    if (Array.isArray(result.errors)) {
      message = result.errors.map((err) => err.detail).join("\n");
    } else if (typeof result === "object") {
      message = Object.values(result)
        .flat()
        .join("\n");
    }
  
    throw new Error(message);
  }
  
}

export default BaseModule;
