<template>
	<NuxtLayout>
		<v-app>
			<NuxtPage />
			<NuxtNotifications
				position="top right"
				class="mt-10"
				:speed="1000"
			/>
			<Toaster
				position="top-right"
				:duration="4000"
				richColors
				closeButton
				pauseWhenPageIsHidden
			/>
		</v-app>
	</NuxtLayout>
</template>
