<template>
    <section id="about" class="py-20 w-full">
        <div class="container px-4 md:px-6 mx-auto">
            <div class="space-y-12">
                <div class="space-y-4 text-center">
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h2>
                    <p
                        class="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Might have something.
                    </p>
                </div>
                <div class="w-full gap-6 mt-6">
                    <Suspense>
                        <BlogList />

                        <template #fallback>
                            <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6>
                                <BlogPlaceholderCard />
                                <BlogPlaceholderCard />
                                <BlogPlaceholderCard />
                            </div>
                        </template>
                    </Suspense>


                </div>
            </div>
        </div>
    </section>
</template>
