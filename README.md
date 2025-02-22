# Yetenaweg Admin Portal

## Project Overview

The **Inventory Admin Portal** is a Nuxt.js-based web application designed to manage and administer inventory systems. This project includes components for data presentation, reusable composables for form validation, and filtering, along with multi-language support and plugins integration. The project is structured in a modular way to ensure scalability and maintainability.

## Project Structure

```
INVENTORY_ADMIN_PORTAL/
├── app.vue						# Main Vue instance file
├── assets						# Directory for static assets like images, CSS files, and other resources.
│   ├── css
│   │   └── main.css			# Main CSS file that can be used for global styles in the application.
│   └── img
│       ├── login_bg.jpg
│       └── logo.png
├── components
│   ├── auth
│   │   ├── changePassword
│   │   │   └── Editor.vue
│   │   └── suspendAccount
│   │       └── Editor.vue
│   ├── common					# Common reusable components
│   │   ├── DataTable.vue
│   │   ├── EditorDialog.vue
│   │   ├── FileInput.vue
│   │   ├── LocaleInputBase.vue
│   │   ├── LocaleTextArea.vue
│   │   ├── LocaleTextField.vue
│   │   └── Pagination.vue
│   ├── dashboard				# Dashboard-specific components like charts and cards.
│   │   ├── AreaChart.vue
│   │   ├── BarChart.vue
│   │   ├── Card.vue
│   │   ├── ColumnChart.vue
│   │   ├── DonutChart.vue
│   │   ├── PieChart.vue
│   │   └── SteppedAreaChart.vue
│   ├── navDrawer  				# Components for the navigation drawer/menu.
│   │   └── Section.vue
│   ├── notification			# Components for handling notifications (e.g., editor, viewer).
│   │   ├── Editor.vue
│   │   └── Viewer.vue
│   └── systemSetting			# Components related to system settings (editors for system preferences).
│       ├── Editor.vue
│       └── ResetEditor.vue
├── composables					# Reusable logic (e.g., utility functions, mixins) using the Composition API.
│   ├── formFieldRules.ts		# Reusable form validation rules
│   ├── mixins.ts				# Common reusable mixins
│   └── useFilters.ts			# Filtering logic used across various components
├── layouts						# Global layout templates for different parts of the app.
│   └── default.vue				# Default layout wrapper for the application
├── locales						# Localization and multi-language support
│   ├── am						# Amharic language files
│   │   ├── auth.ts
│   │   ├── core.ts
│   │   ├── dashboard.ts
│   │   ├── form.ts
│   │   └── index.ts
│   └── en						# English language files
│       ├── auth.ts
│       ├── core.ts
│       ├── dashboard.ts
│       ├── form.ts
│       └── index.ts
├── middleware					# Custom middleware for handling routing or authentication guards.
│   └── guard.global.ts			# A global route guard middleware for managing access permissions.
├── nuxt.config.ts
├── package.json
├── pages						# Pages represent views tied to routes in Nuxt.js.
│   ├── 401.vue					# Page displayed for unauthorized access (401 error).
│   ├── forgot.vue				# Page for password recovery.
│   ├── index.vue				# Home page of the application
│   ├── portal					# Directory containing portal-related pages
│   │   ├── configurations
│   │   │   ├── index.vue
│   │   │   └── lookup-data.vue
│   │   └── index.vue
│   ├── portal.vue				# Pages related to the portal section / layout of the app.
│   └── reset.vue				# Page for resetting passwords.
├── plugins						# Nuxt.js plugins for extending the functionality of Vue and third-party libraries.
│   ├── api.ts					# Plugin for handling API requests.
│   ├── chartkick.ts			# Plugin for integrating Chartkick into the app
│   └── vuetify.ts 				# Plugin for integrating Vuetify (UI component library) into the app.
├── pnpm-lock.yaml
├── public
│   └── favicon.ico 			# The favicon for the site.
├── README.md
├── repository					# Directory for the repository pattern to manage API interactions.
│   ├── factory.ts				# Factory pattern file to create instances of repositories.
│   ├── modules					# Individual modules for different entities in the app (e.g., notifications, lookup data).
│   │   ├── lookupData.ts
│   │   ├── notification.ts
│   │   ├── systemSetting.ts
│   │   └── topicTag.ts
│   └── types.ts  				# TypeScript type definitions used in repositories.
├── server						# Configuration and code for server-side logic.
│   └── tsconfig.json			# TypeScript configuration for server-side code.
├── stores						# Pinia stores for managing the global application state.
│   ├── auth.ts
│   ├── core.ts
│   ├── lookups.ts
│   ├── notifications.ts
│   ├── permissionStore.ts
│   ├── systemSettings.ts
│   └── topicTags.ts
├── tailwind.config.js			# Configuration file for TailwindCSS.
├── tests 						# Test files for unit and integration testing.
│   ├── components				# Tests for individual components.
│   │   └── common
│   │       ├── DataTable.spec.ts
│   │       ├── EditorDialog.spec.ts
│   │       ├── FileInput.spec.ts
│   │       ├── LocaleInputBase.spec.ts
│   │       ├── LocaleTextArea.spec.ts
│   │       ├── LocaleTextField.spec.ts
│   │       └── Pagination.spec.ts
│   ├── repository				# Tests for the repository pattern.
│   │   └── factory.spec.ts
│   ├── setup
│   │   ├── i18n.setup.ts
│   │   └── vuetify.setup.ts
│   └── stores					# Tests for Pinia stores.
├── tsconfig.json				# TypeScript configuration for the entire project.
└── vitest.config.ts			# Configuration file for Vitest, the testing framework.

```

## Key Features

- **Reusable Components:** Includes `DataTable`, `EditorDialog`, and `Pagination` components for efficient UI development.
- **Composable Utilities:** The `formFieldRules`, `mixins`, and `useFilters` are provided to ensure modularity and code reuse.
- **Multi-language Support:** Locales are set up for Amharic (`am`) and English (`en`) languages.
- **API Integration:** The `api.ts` file handles external API requests, making it easy to manage data from backend services.
- **Vuetify Integration:** Vuetify is set up for UI component styling and layout configuration.
- **Pinia Store:** Centralized state management using Pinia, with modules for managing core application logic.

## Getting Started

## Repository Structure

The `repository/` directory is responsible for managing the data interactions within the application, including handling API requests, managing resources, and defining TypeScript types. It is designed to be easily extensible and scalable by applying the **factory pattern**.

### Key Files and Directories:

- **`modules/`**:

  - This folder contains modules for different resources within the application (e.g., products, users, etc.). Each module defines how the corresponding data resource is managed, including fetching, creating, updating, and deleting operations.

- **`factory.ts`**:

  - This file implements the **factory pattern** used throughout the repository. The factory pattern abstracts the process of creating instances of different data entities (such as products or users), making it easy to add new resources without repeating code.
  - The factory function in this file centralizes resource creation and management logic, enabling consistency and reducing redundancy across the app's data models. This approach makes the application more modular and promotes code reuse.

- **`types.ts`**:
  - Contains TypeScript type definitions used across the repository modules. Defining types in this file allows for consistent typing of data models throughout the app, ensuring type safety and reducing errors when working with different entities (e.g., Product, User, etc.).

## Factory Pattern Overview

The factory pattern is a design pattern that provides an interface for creating objects without specifying their exact class or type. This allows the application to manage various types of resources in a uniform way, making the codebase easier to maintain and extend.

### How the Factory Pattern Works in This Project:

- **Resource Creation**:

  - The factory function in `factory.ts` specifies instances of different resources based on the type passed into it. This allows for the centralization of resource creation logic and reduces duplication.

- **Unified API Handling**:

  - Each resource module under `repository/modules/` leverages the factory pattern to handle API calls and data management in a consistent way. For example, whether you're working with products, users, or any other entity, the logic for interacting with the API remains uniform, thanks to the factory pattern.

- **Scalability**:
  - Adding new resources (e.g., a new entity like `Orders`) is simplified with the factory pattern. You can easily create a new module in the `modules/` directory, define the API interactions, and then use the factory to instantiate and manage the new entity. This eliminates the need for boilerplate code.

## Plugins

- **API Plugin (`api.ts`):** Manages the connection to the backend API and handles all HTTP requests.

- the API Plugin forms new instances of the resource modules created and provides methods that the corresponding pinia store can use to make calls and change its states from their initial value to the incoming data, where the pinia store will pass the states to appropriate components for proper display.

## Example: Adding a New Resource

1. **Create a Module**: Add a new module in `repository/modules/`, e.g., `lookupData.ts`, where you define how the new resource will interact with the API (e.g., fetch lookups, update them, etc.).

2. **Use the Factory**: Leverage the factory in `factory.ts` to create instances of the `lookupData` entity, just like any other resource.

3. **Define Types**: Add relevant TypeScript types for the new entity in `types.ts` to ensure type safety.

By following this approach, adding new data resources becomes a streamlined process, which helps in keeping the codebase DRY (Don't Repeat Yourself) and easy to extend.

## Repository Directory and Pinia Store Integration

In your project, the **repository directory** and the **Pinia store** work hand-in-hand to manage data and application state efficiently. The **factory pattern** used in the repository abstracts the creation and handling of various entities, while Pinia acts as the state management solution to track and store that data across your application. Together, they create a cohesive flow for managing and utilizing data.

### How the Repository (Factory Pattern) Interacts with Pinia

1. **Separation of Concerns**:

   - The **repository directory** is responsible for handling the interaction with external APIs or services. It fetches, creates, updates, and deletes data entities using a unified factory pattern.
   - The **Pinia store** focuses on maintaining the state of these data entities once they are retrieved or modified by the repository.

   This separation allows you to keep your state management logic clean and focused, while also keeping the API and data handling logic isolated and reusable.

2. **Factory Pattern for Consistent Data Management**:

   - When using the repository, each module (e.g., products, users) leverages the **factory pattern** to create consistent data handling functions.
   - These functions (such as `fetchAll`, `create`, `update`, `delete`) return data, which can then be stored or manipulated in Pinia.

3. **Pinia Store as a Single Source of Truth**:

   - Once data is fetched from the repository, it is stored in the Pinia store. This makes the store the single source of truth for the application state, which components and other parts of the app can rely on.
   - For example, the `products` module in the repository might fetch a list of products from an API, and the Pinia store would store this data so that it can be accessed and displayed across different components.

4. **Actions and Getters in Pinia**:

   - **Actions** in Pinia will call the repository methods (such as the factory-generated `fetchAll`, `create`, or `update` functions) to retrieve or modify data.
   - Once the action receives the data, it commits this data to the Pinia store, where it can be accessed via **getters** or directly as state.

   This flow ensures a clean structure where the repository handles external API interactions, and Pinia manages the resulting data and makes it available throughout the app.

### Example of Integration

Here's a simple example of how the repository and Pinia work together:

#### Repository (`repository/modules/lookupData.ts`)

```typescript
//@ts-ignore
import { AsyncDataOptions } from '#app';

import BaseModule from '../factory';
import type { LookupListResponse, DataLookup } from '../types';

export default class DataLookupModule extends BaseModule<
	LookupListResponse,
	DataLookup
> {
	protected RESOURCE = '/core/data-lookups';

	async getAll(
		queryParams: object,
		asyncDataOptions?: AsyncDataOptions<LookupListResponse>
	): Promise<LookupListResponse> {
		return this.fetchData(queryParams, asyncDataOptions);
	}

	// ... other CRUD methods
}
```

#### Pinia Store (`stores/lookups.ts`)

```typescript
import { defineStore } from 'pinia';
import { DataLookup, DataLookupTypes, Metadata } from '../repository/types';

export const useDataLookupStore = defineStore('lookup', () => {
	const { $api } = useNuxtApp();

	let lookupLoading = ref(false);
	let dataLookupList = ref<DataLookup[]>([]);
	let lookupPagination = ref<Metadata>({});

	function toggleLookupLoading(flag = true) {
		lookupLoading.value = flag;
	}

	async function getAllDataLookups(queryparams = { limit: 0 }) {
		toggleLookupLoading();
		dataLookupList.value = [];
		await $api.core.lookupData
			.getAll(queryparams)
			.then((resp) => {
				dataLookupList.value = resp.results as Array<DataLookup>;
				lookupPagination.value = resp.metadata as Metadata;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				toggleLookupLoading(false);
			});
	}

	function getLookupsByType(type: DataLookupTypes) {
		return dataLookupList.value.filter((lookup) => lookup.type === type);
	}

	function getLookupsByValue(value: string) {
		return dataLookupList.value.find((lookup) => lookup.value === value);
	}

	// ... other actions for update, delete, etc.

	return {
		lookupLoading,
		dataLookupList,
		lookupPagination,
		getAllDataLookups,
		getLookupsByType,
		getLookupsByValue,
	};
});
```

### Benefits of This Approach

- **Modularity**: The repository modules are responsible for handling the data lifecycle, while the Pinia store keeps your application’s state consistent. This ensures your codebase is modular, making it easy to maintain and scale.
- **Reusability**: The factory pattern allows for reusable data handling logic, which reduces code duplication and promotes consistency when interacting with different types of data entities (e.g., products, users).

- **Scalability**: As your application grows, adding new entities or features becomes straightforward. You simply add a new repository module and integrate it with Pinia, following the same established pattern.

By combining the repository's factory pattern with the Pinia store, you have a highly organized, maintainable system for managing state and data in your Nuxt.js application.

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [PNPM](https://pnpm.io/) for package management

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd inventory_admin_portal
   ```

2. Install dependencies using PNPM:

   ```bash
   pnpm install
   ```

3. Copy the `.env.example` file to `.env` and configure your environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run the development server:

   ```bash
   pnpm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`.

### Start Developing

- Once you have ran the project and have displayed the bare template, you can start adding your own project-specific menus on the collapsible sidebar by going to the `portal.vue` file, locating the <script setup lang="ts"></script> and within it, there will be a `sectionData` array where you can be able to add your menu items like this:

#### Portal Layout (`pages/portal.vue`)

```vue
<template></template>

<script setup lang="ts">
	// ...
	const sectionData = computed(() => [
		// Add as many menus as preferred here,
		{
			value: 'messaging',
			title: t('dashboard.menus.messaging_management.title'),
			icon: 'mdi-message',
			menus: messagingManagementMenus.value,
		},
		{
			value: 'settings',
			title: t('dashboard.menus.settings.title'),
			icon: 'mdi-cog',
			menus: settingMenus.value,
		},
		// This is a project-specific menu
		{
			value: Modules.PARKING,
			title: t('dashboard.menus.parking_management.title'),
			icon: 'mdi-car',
			menus: parkingManagementMenus.value, // this is a sub-menu
		},
	]);

	// Add the sub-menus like this
	const parkingManagementMenus = computed(() => [
		{
			title: t('dashboard.menus.parking_management.dashboard'),
			icon: 'mdi-view-dashboard-outline',
			activeIcon: 'mdi-view-dashboard',
			to: '/portal/parking',
		},
		{
			title: t('dashboard.menus.parking_management.parking_activities'),
			icon: 'mdi-car-outline',
			activeIcon: 'mdi-car',
			to: '/portal/parking/activities',
		},
		{
			title: t('dashboard.menus.parking_management.branch_offices'),
			icon: 'mdi-office-building-marker-outline',
			activeIcon: 'mdi-office-building-marker',
			to: '/portal/parking/branches',
		},
		{
			title: t('dashboard.menus.parking_management.associations'),
			icon: 'mdi-account-group-outline',
			activeIcon: 'mdi-account-group',
			to: '/portal/parking/associations',
		},
		{
			title: t('dashboard.menus.parking_management.parking_lots'), // this is a dynamically rendered title from your `/locale` directory
			icon: 'mdi-map-marker-radius-outline',
			activeIcon: 'mdi-map-marker-radius',
			to: '/portal/parking/lots',
		},
	]); // this will add the Parking Management menu with an accordion and have the above sub-menus as the accordion content.
</script>
```

### Build for Production

To build the project for production, run:

```bash
pnpm run build
```

This will create a `dist/` directory with your production-ready files.

### Linting & Formatting

To check for linting errors, run:

```bash
pnpm run lint
```

To fix formatting issues, run:

```bash
pnpm run lint:fix
```

## Plugins

- **API Plugin (`api.ts`):** Manages the connection to the backend API and handles all HTTP requests.
- **Vuetify (`vuetify.ts`):** A Vue.js UI framework for building responsive and accessible web applications.

## State Management

The project uses [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) for state management. The store is divided into modules to organize state, getters, actions, and mutations for different parts of the application.

## Localization

The project supports multiple languages through the `locales/` directory. To add or update translations, modify the respective JSON files in this directory.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

---

This README provides a comprehensive guide to understanding and contributing to the project while ensuring clarity and professionalism. Let me know if you would like further customizations!
