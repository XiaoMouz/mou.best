<script setup lang="ts">
type Domain = (typeof groups)[number]['domains'][number]

const groups = [
  {
    label: 'Local',
    domains: [
      {
        label: 'mou.best',
        value: 'mou.best',
      },
    ],
  },
  {
    label: 'Remote',
    domains: [
      {
        label: 'api.mou.best',
        value: 'api.mou.best',
      },
      {
        label: 'source.mou.best',
        value: 'source.mou.best',
      },
    ],
  },
]
const open = ref(false)
const showNewTeamDialog = ref(false)
const selectedDomain = ref<Domain>(groups[0].domains[0])
</script>

<template>
  <Dialog v-model:open="showNewTeamDialog">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="open"
          aria-label="Select a team"
          :class="cn('w-[200px] justify-between', $attrs.class ?? '')"
        >
          <Avatar class="mr-2 h-5 w-5">
            <AvatarImage
              :src="`https://${selectedDomain.value}/favicon.ico`"
              :alt="selectedDomain.label"
            />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          {{ selectedDomain.label }}
          <IconNavSwap
            class="ml-auto h-4 w-4 shrink-0 opacity-50 dark:fill-slate-200"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search domain..." />
            <CommandEmpty>No domain found.</CommandEmpty>
            <CommandGroup
              v-for="group in groups"
              :key="group.label"
              :heading="group.label"
            >
              <CommandItem
                v-for="domain in group.domains"
                :key="domain.value"
                :value="domain"
                class="text-sm"
                @select="
                  () => {
                    selectedDomain = domain
                    open = false
                  }
                "
              >
                <Avatar class="mr-2 h-5 w-5">
                  <AvatarImage
                    :src="`https://${domain.value}/favicon.ico`"
                    :alt="domain.label"
                    :class="
                      cn(
                        selectedDomain.value !== domain.value ? 'grayscale' : ''
                      )
                    "
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {{ domain.label }}
                <IconCheck
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      selectedDomain.value === domain.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <DialogTrigger as-child>
                <CommandItem
                  value="create-team"
                  @select="
                    () => {
                      open = false
                      showNewTeamDialog = true
                    }
                  "
                >
                  <IconAdd class="mr-2 h-5 w-5 dark:fill-slate-200" />
                  New Domain
                </CommandItem>
              </DialogTrigger>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </Dialog>
</template>
