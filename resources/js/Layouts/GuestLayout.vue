<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0 pb-12"
    >
        <div class="mb-8">
            <Link href="/">
                <ApplicationLogo class="h-24 w-24 fill-current text-primary" />
            </Link>
        </div>

        <div
            class="mt-6 w-full overflow-hidden bg-surface px-8 py-8 shadow-xl sm:max-w-md sm:rounded-2xl border border-border"
        >
            <slot />
        </div>
    </div>
</template>

