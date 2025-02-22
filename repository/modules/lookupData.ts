//@ts-ignore
import { AsyncDataOptions } from "#app";

import BaseModule from "../factory";
import type {
  LookupListResponse,
  DataLookup,
} from "../types";

export default class DataLookupModule extends BaseModule<
  LookupListResponse,
  DataLookup
> {
  protected RESOURCE = "/core/data-lookups";

  async getAll(
    queryParams: object,
    asyncDataOptions: AsyncDataOptions<LookupListResponse>
  ): Promise<LookupListResponse> {
    return this.fetchData(queryParams, asyncDataOptions);
  }

}