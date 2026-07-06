export const ADMIN_KEYS = {
  landing:            'studioPayAdmin_landing',
  landingShopSection: 'studioPayAdmin_landingShopSection',
  dashboardBanners:   'studioPayAdmin_dashboardBanners',
  shopHero:           'studioPayAdmin_shopHero',
  shopCategories:     'studioPayAdmin_shopCategories',
  shopProducts:       'studioPayAdmin_shopProducts',
  studioCoreSection:  'studioPayAdmin_studioCoreSection',
  studioShopSection:  'studioPayAdmin_studioShopSection',
  studioLearnSection: 'studioPayAdmin_studioLearnSection',
  settings:           'studioPayAdmin_settings',
}

export function getAdminContent(key, fallback = null) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export function setAdminContent(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error('[AdminContent] localStorage error:', e)
    return false
  }
}

export function clearAdminContent(key) {
  localStorage.removeItem(key)
}

export function resetAllAdminContent() {
  Object.values(ADMIN_KEYS).forEach(k => localStorage.removeItem(k))
}
