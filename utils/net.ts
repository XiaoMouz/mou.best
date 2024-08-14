import crypto from 'crypto-js'

export const getGavatar = (email: string): string => {
  const hash = crypto.MD5(email.trim().toLowerCase()).toString()
  return `https://www.gravatar.com/avatar/${hash}`
}
