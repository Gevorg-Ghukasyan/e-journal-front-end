export function createFakeJWTPayload(user) {
  if (!user) return null
  const now = Date.now() / 1000
  return {
    sub: user.id,
    preferred_username: user.name,
    realm_access: { roles: [user.role.toLowerCase()] },
    iat: now,
    exp: now + 3600,
    iss: 'https://mock-keycloak.local/auth/realms/EJournal',
    aud: 'e-journal-client',
  }
}

export function isTokenValid(token) {
  if (!token || !token.exp) return false
  return Date.now() / 1000 < token.exp
}
