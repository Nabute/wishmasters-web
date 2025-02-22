import { defineStore } from "pinia";
import type { Metadata, UserDto } from "~/repository/types";

export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      adminList: [] as UserDto[],
      adminListLoading: false,
      adminListPagination: {} as Metadata,
      userList: [] as UserDto[],
      userListLoading: false,
      userListPagination: {} as Metadata,
      user: {} as UserDto,
      userLoading: false,
      userCreationLoading: false,
      userUpdateLoading: false,
    };
  },
  actions: {
    async getAllAdmins(queryParams: object = {}) {
      const { $api } = useNuxtApp();

      this.adminListLoading = true;
      this.adminList = [];

      await $api.super?.users
        .getAllAdmins(queryParams)
        .then((resp) => {
          this.adminList = resp?.data.results as UserDto[];
          this.adminListPagination = resp?.data.metadata as Metadata;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.adminListLoading = false;
        });
    },
    async getAllUsers(queryParams: object = {}) {
      const { $api } = useNuxtApp();

      this.userListLoading = true;
      this.userList = [];

      await $api.super?.users
        .getAllUsers(queryParams)
        .then((resp) => {
          this.userList = resp?.data.results as UserDto[];
          this.userListPagination = resp?.data.metadata as Metadata;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.userListLoading = false;
        });
    },
  },
});
