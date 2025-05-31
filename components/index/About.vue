<script setup lang="ts">

</script>

<template>
    <div class="w-full bg-muted/30">
        <section id="about" class="py-20 w-full">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="space-y-12">
                    <div class="space-y-4 text-center">
                        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                        <p
                            class="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            A developer who prioritizes pragmatism and minimalism.
                        </p>
                    </div>
                    <div class="mx-auto max-w-3xl text-center">
                        <p class="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                            Skilled in various <span class=" text-primary/80">&lt;interdisciplinary + computer
                                software&gt;</span>
                            projects, with extensive experience in project design.<br />
                            Possessing over 3 years of development experience, with involvement in frontend, backend,
                            client-side, DevOps, CI/CD, and more. <br /> </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <AboutCard title="Full Stack Development"
                            description="Expertise in Vue & TypeScript, Nuxt 3, Java Springboot, WPF and Android">
                            <Icon name="mdi:code-tags" h-10 w-10 text-primary />
                        </AboutCard>
                        <AboutCard title="Cloud Solutions"
                            description="Have experience in Docker, single-machine services, Edge Function and various cloud function services">
                            <Icon name="mdi:cloud-outline" h-10 w-10 text-primary />
                        </AboutCard>
                        <AboutCard title="Database and KV Store Design"
                            description="Have experience in MySQL, PostgreSQL, MongoDB, D1, Redis, Cloudflare KV and more">
                            <Icon name="mdi:database-outline" h-10 w-10 text-primary />
                        </AboutCard>
                        <AboutCard title="Project Design"
                            description="Have experience in project design, including architecture design, database design, and more">
                            <Icon name="mdi:code-tags" h-10 w-10 text-primary />
                        </AboutCard>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>