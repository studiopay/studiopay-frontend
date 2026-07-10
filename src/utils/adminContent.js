// Versão da copy padrão da seção "Studio Shop" da landing pública.
// Um valor salvo no localStorage (studioPayAdmin_landingShopSection) só é
// considerado válido se tiver essa mesma versão em "_v" — isso evita que
// uma copy antiga, salva antes de uma atualização de texto, continue
// aparecendo indefinidamente na home pública. Incremente este número
// sempre que os textos padrão da seção Shop mudarem de novo.
export const LANDING_SHOP_COPY_VERSION = 2

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
