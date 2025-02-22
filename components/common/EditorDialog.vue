<template>
	<v-dialog
		v-model="dialogFlag"
		opacity="0.7"
		scrim="overlay-bg"
		:transition="transition"
		:width="mWidth"
		:fullscreen="fullscreen"
		:retain-focus="false"
		:persistent="persistent"
		scrollable
		@keydown.esc="closeModal"
	>
		<template v-if="!hideToolbar">
			<v-toolbar
				dark
				color="primary darken-2 rounded-t-lg"
			>
				<v-toolbar-title class="black--text"
					>{{ title }}
					<v-chip
						v-show="readonly"
						:text="$t('common.field.readonly')"
						color="background"
						class="text-uppercase"
						size="small"
						label
					></v-chip
				></v-toolbar-title>
				<v-spacer></v-spacer>
				<template v-if="props.closeable">
					<v-btn
						icon
						dark
						color="white"
						@click="closeModal"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</template>
			</v-toolbar>
		</template>
		<div class="scrollable">
			<slot name="body"></slot>
		</div>
	</v-dialog>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	const props = defineProps({
		title: {
			type: String,
			default: 'Editor Form',
		},
		mWidth: {
			type: String,
			default: '70%',
		},
		hideToolbar: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: 'black',
		},
		dark: {
			type: Boolean,
			default: true,
		},
		persistent: {
			type: Boolean,
			default: true,
		},
		fullscreen: {
			type: Boolean,
			default: false,
		},
		transition: {
			type: String,
			default: 'dialog-bottom-transition',
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		sync: {
			type: Function,
			default: null,
		},
		closeable: {
			type: Boolean,
			default: true,
		},
	});

	let dialogFlag = ref(false);

	const openModal = function () {
		dialogFlag.value = true;
	};

	const closeModal = function () {
		if (!props.closeable) return;

		dialogFlag.value = false;
		if (props.sync && typeof props.sync === 'function') {
			props.sync();
		}
	};

	defineExpose({
		openModal,
		closeModal,
	});
</script>
<style>
	.scrollable {
		overflow-y: auto;
		max-height: 90vh;
	}
</style>
