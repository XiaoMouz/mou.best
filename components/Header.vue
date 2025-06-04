<script setup lang="ts">
const navItems = [
    { id: "home", name: "Home", href: "#home" },
    // { id: "blog", name: "Blog", href: "/blog" },
    // { id: "friends", name: "Friends", href: "/friends" }

] as const


type NavItemIds = typeof navItems[number]['id'];

const scrolled = ref(false)

const activeSection = ref<NavItemIds>('home')

const handleScroll = () => {
    scrolled.value = window.scrollY > 10
    activeSection.value = determineActiveSection()
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    activeSection.value = determineActiveSection()
})

const determineActiveSection = (): NavItemIds => {
    const sections = navItems.map((item) => item.href.substring(1))
    const allSections = [...sections, "open-source", "skills"]

    const offset = 100

    for (let i = allSections.length - 1; i >= 0; i--) {
        const sectionId = allSections[i]
        const section = document.getElementById(sectionId)
        if (section) {
            const rect = section.getBoundingClientRect()
            if (rect.top <= offset && rect.bottom >= offset) {
                if (sections.includes(sectionId)) return sectionId as NavItemIds
            }
        }
    }

    return "home"
}

</script>

<template>
    <header fixed top-0 z-50 w-full transition-all duration-300
        :class='scrolled ? "bg-background/70 backdrop-blur-lg shadow-sm border-b border-border/50" : "bg-transparent"'>
        <div container m-auto px-6 flex h-16 items-center justify-between>
            <NuxtLink href="/" flex items-center space-x-2>
                <div style="background-image: linear-gradient(to right, var(--un-gradient-from), var(--un-gradient-to))"
                    class="rounded-full from-[#2ef2c4] to-[#2d9ce0]  w-10 h-10 flex items-center relative me-logo-animation" />
                <img src="/me.gif" alt="logo"
                    class="absolute p-[2px] w-10 h-10 rounded-full object-cover transition duration-200 hover:rotate-10" />
            </NuxtLink>
            <nav flex items-center space-x-6>
                <div relative flex space-x-4 items-center>
                    <div v-for="item in navItems" :key="item.id" relative
                        :style="` animation: fade-in-down ${(navItems.findIndex((v) => item.id == v.id) + 1) * 2 * 0.1}s linear 1;`">
                        <div v-if="activeSection === item.href.substring(1)" class="animate-ease h-full absolute inset-0 rounded-md
                            -z-10 bg-primary/20" />
                        <NuxtLink :href="item.href"
                            class="text-sm font-medium transition-colors px-3 py-2 rounded-md relative"
                            :class="activeSection === item.href.substring(1) ? 'text-primary' : 'text-foreground'">
                            {{ item.name }}
                            <div v-if="activeSection === item.href.substring(1)" layoutId="underline" class="absolute -bottom-1
                                left-0 right-0 h-0.5 bg-primary" />
                        </NuxtLink>
                    </div>
                </div>
                <ModeToggle />
            </nav>
        </div>
    </header>
</template>

<style scoped>
@keyframes rainbow {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.me-logo-animation {
    animation: rainbow 4s infinite;
}

@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    60% {
        opacity: 0.6;
        transform: translate3d(0, -85%, 0)
    }


    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
</style>