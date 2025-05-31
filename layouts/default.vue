<script setup lang="ts">

</script>
<template>
    <div relative flex min-h-screen flex-col overflow-hidden>
        <ClientOnly>
            <noscript>
                <div bg-yellow-100 dark:bg-yellow-900 p-4 text-center text-sm>
                    For the best experience, please enable JavaScript. Some features may be limited without it.
                </div>
            </noscript>
        </ClientOnly>
        <AnimatedBackground />
        <Header />
        <main ref="main">
            <Suspense>
                <NuxtPage />
            </Suspense>
        </main>
        <Footer />
    </div>
</template>
