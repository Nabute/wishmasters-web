import BaseModule from "../factory";
import type { UserDto, UserListResponse } from "../types";

export default class UserModule extends BaseModule<UserListResponse, UserDto> {
  protected RESOURCE = "/auth";

  async getAllAdmins(
    queryParams: object
  ): Promise<UserListResponse | undefined> {
    return await this.fetchData(queryParams, {}, "/admin-users/list");
  }

  async getAllUsers(
    queryParams: object
  ): Promise<UserListResponse | undefined> {
    return await this.fetchData(queryParams, {}, "/super/users");
  }

  async getUser(
    queryParams: object,
    userId: string
  ): Promise<UserListResponse | undefined> {
    return await this.fetchData(queryParams, {}, `/super/users/${userId}`);
  }
}
