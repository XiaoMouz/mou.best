import { getGavatar } from '~/utils/net'
import { ref } from 'vue'

export const useProfile = () => {
  const info = ref({
    name: '',
    avatarLink: '',
    email: '' as string,
    username: '',
  })

  const fetchProfile = async () => {
    const user = useSupabaseUser()
    if (user.value) {
      const client = useSupabaseClient()
      const res = await client
        .from('profiles')
        .select(`id,username,display_name,avatar_link`)
        .eq('id', user.value.id)
        .single()

      if (res && res.data) {
        info.value.name = res.data.display_name || res.data.username
        info.value.avatarLink = res.data.avatar_link
        info.value.email = user.value.email || 'No Email'
        info.value.username = res.data.username
      }
      if (!info.value.avatarLink && user.value.email) {
        info.value.avatarLink = getGavatar(user.value.email)
      }
    }
  }
  onMounted(fetchProfile)

  return {
    profile: info,
    refresh: fetchProfile,
  }
}
