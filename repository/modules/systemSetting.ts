import type { AsyncDataOptions } from "#app";
import type { SystemSettingListResponse, SystemSettingDto } from "../types";
import BaseModule from "../factory";

export default class SystemSettingsModule extends BaseModule<
  SystemSettingListResponse,
  SystemSettingDto
> {
  protected RESOURCE = "/core/system-settings";

  async getAll(
    queryParams: object,
    asyncDataOptions: AsyncDataOptions<SystemSettingListResponse>
  ): Promise<SystemSettingListResponse> {
    return this.fetchData(queryParams, asyncDataOptions);
  }

  async create(
    payload: SystemSettingDto,
    asyncDataOptions: AsyncDataOptions<SystemSettingListResponse>
  ): Promise<SystemSettingDto> {
    return this.createEntity(payload, asyncDataOptions);
  }

  async update(
    id: string,
    payload: SystemSettingDto,
    asyncDataOptions: AsyncDataOptions<SystemSettingListResponse>
  ): Promise<SystemSettingDto> {
    return this.updateEntity(id, payload, asyncDataOptions);
  }

  async reset(
    id: string,
    asyncDataOptions: AsyncDataOptions<SystemSettingListResponse>
  ): Promise<SystemSettingDto> {
    return this.updateEntity(id, {}, asyncDataOptions, "reset");
  }
}
