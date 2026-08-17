import { GROWTH_BIZ_TYPE, type GrowthBizType } from '@/api/growth.js'
import type { UserInfo } from '@/api/user.js'

export interface GrowthAudienceOption {
  bizType: GrowthBizType
  label: string
  path: string
}

export const GROWTH_AUDIENCES: GrowthAudienceOption[] = [
  {
    bizType: GROWTH_BIZ_TYPE.SELLER,
    label: '我是达人卖手',
    path: '/growth-center/sellers',
  },
  {
    bizType: GROWTH_BIZ_TYPE.SUPPLIER,
    label: '我是供应链商家',
    path: '/growth-center/suppliers',
  },
]

const SUPPLIER_ROLE_KEYS = ['supplier', 'supply', 'merchant', 'shop', 'vendor', '商家', '供应']
const SELLER_ROLE_KEYS = ['seller', 'daren', 'talent', 'distribution', 'promoter', '达人', '卖手']

function normalizeRoleValue(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
}

function getExplicitBizTypes(user?: UserInfo | null) {
  if (!user) return []
  const rawUser = user as any
  const values = [
    rawUser.bizType,
    ...(Array.isArray(rawUser.bizTypes) ? rawUser.bizTypes : []),
    ...(Array.isArray(rawUser.growthBizTypes) ? rawUser.growthBizTypes : []),
  ]
  return values.map(Number).filter((value) => Number.isFinite(value)) as GrowthBizType[]
}

function getRoleValues(user?: UserInfo | null) {
  if (!user) return []
  const rawUser = user as any
  return [
    rawUser.role,
    rawUser.userType,
    rawUser.identityType,
    ...(Array.isArray(rawUser.roles) ? rawUser.roles : []),
    ...(Array.isArray(rawUser.roleCodes) ? rawUser.roleCodes : []),
  ]
    .map(normalizeRoleValue)
    .filter(Boolean)
}

function roleMatches(user: UserInfo | null | undefined, keys: string[]) {
  return getRoleValues(user).some((role) => keys.some((key) => role.includes(key)))
}

export function getGrowthBizTypesByUser(user?: UserInfo | null): GrowthBizType[] {
  if (!user) return []

  const bizTypes = new Set<GrowthBizType>()
  getExplicitBizTypes(user).forEach((bizType) => {
    if (bizType === GROWTH_BIZ_TYPE.SUPPLIER || bizType === GROWTH_BIZ_TYPE.SELLER) {
      bizTypes.add(bizType)
    }
  })

  if (roleMatches(user, SUPPLIER_ROLE_KEYS)) bizTypes.add(GROWTH_BIZ_TYPE.SUPPLIER)
  if (roleMatches(user, SELLER_ROLE_KEYS)) bizTypes.add(GROWTH_BIZ_TYPE.SELLER)

  if (!bizTypes.size) {
    const mallState = Number((user as any).mall_state)
    if (mallState === 2 || mallState === 3) bizTypes.add(GROWTH_BIZ_TYPE.SUPPLIER)
    if (mallState === 4) bizTypes.add(GROWTH_BIZ_TYPE.SELLER)
  }

  return GROWTH_AUDIENCES.map((item) => item.bizType).filter((bizType) => bizTypes.has(bizType))
}

export function canAccessGrowthBizType(user: UserInfo | null | undefined, bizType: GrowthBizType) {
  return getGrowthBizTypesByUser(user).includes(bizType)
}

export function getGrowthAudienceOptions(user?: UserInfo | null) {
  const allowedBizTypes = getGrowthBizTypesByUser(user)
  return GROWTH_AUDIENCES.filter((item) => allowedBizTypes.includes(item.bizType))
}
