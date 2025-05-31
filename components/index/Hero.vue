<script lang="ts" setup>
const snippets = [
    'A Gamer',
    'A Full Stack Developer',
    'A Frontend Developer',
    'A Windows WPF Developer',
]

</script>
<template>
    <section id="home" class="py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh]">
        <div class="container px-4 md:px-6 mx-auto">
            <div class="flex flex-col items-center space-y-4 text-center">
                <div class="space-y-2">
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Hi, I'm <span class="gradient-text">XiaoMouz</span></h1>
                    <p class="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
                        <HeroTyprWrite description="Senior Software Engineer" :snippets="snippets" />
                    </p>
                </div>
                <div class="max-w-[700px] text-muted-foreground">
                    <p class="text-lg"></p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <a class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-2xl"
                        href="#about">Falling Down
                    </a>

                    <!-- <a href="" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-2xl">
                        My Resume</a> -->

                </div>
                <div class="flex gap-4 mt-6">
                    <HeroSoicalButton href="https://github.com/XiaoMouz" label="GitHub">
                        <IconGithub fill-foreground size-5 />
                    </HeroSoicalButton>
                    <HeroSoicalButton href="https://space.bilibili.com/64110204" label="Bilibili">
                        <IconBilibili fill-foreground size-5 />
                    </HeroSoicalButton>
                    <HeroSoicalButton href="https://x.com/XiaoMouz" label="Twitter">
                        <IconTwitter fill-foreground size-5 />
                    </HeroSoicalButton>
                    <HeroSoicalButton href="https://t.me/XiaoMouz" label="Telegram">
                        <IconTelegram fill-foreground size-5 />
                    </HeroSoicalButton>
                </div>
            </div>

            <!-- <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 hidden md:block js-only">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-circle-arrow-up h-10 w-10 text-primary animate-bounce">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m16 12-4-4-4 4"></path>
                        <path d="M12 16V8"></path>
                    </svg>
                </a>
            </div> -->
        </div>
    </section>
</template>