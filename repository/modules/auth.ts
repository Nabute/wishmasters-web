import type { AsyncDataOptions } from "#app";
import type { RegistrationDto, RegistrationResponse } from "../types";
import BaseModule from "../factory";

export default class AuthModule extends BaseModule<
    RegistrationResponse,
    RegistrationDto
> {
  protected RESOURCE = "/account/register";

  async register(
    payload: RegistrationDto,
    asyncDataOptions: AsyncDataOptions<RegistrationResponse>
  ): Promise<RegistrationDto> {
    return this.createEntity(payload, asyncDataOptions);
  }
}
