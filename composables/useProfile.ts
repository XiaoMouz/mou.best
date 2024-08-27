import { getGavatar } from '~/utils/net'

export const useProfile = async () => {
  const user = useSupabaseUser()
  const info = {
    name: '',
    avatarLink: '',
    email: '' as string | undefined,
  }
  if (user.value) {
    const client = useSupabaseClient()
    const res = await client
      .from('profiles')
      .select(`id,username,display_name,avatar_link`)
      .eq('id', user.value.id)
      .returns<
        [
          {
            id: string
            username: string
            display_name: string
            avatar_link: string
          }
        ]
      >()

    if (res && res.data) {
      info.name = res.data[0].display_name
        ? res.data[0].display_name
        : res.data[0].username
      info.avatarLink = res.data[0].avatar_link
      info.email = user.value.email
    }
    if (!info.avatarLink && user.value.email) {
      info.avatarLink = getGavatar(user.value.email)
    }
  }
  return info
}
