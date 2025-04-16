
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Portfolio"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5210, hash: '56da185510dc519094fb12b5dbcc311bf949f6c2aa25520b5c79ec93feb51ba4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1182, hash: '49eb30899d25997c0baf60cc12fc9322165dee21e009f75d9a32440c92826fc5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 33531, hash: 'c41b7cc74c2f6f882b4929e7798e63860bb96b4dba224a55902c91bf70a59ca8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-7M6TO2Z7.css': {size: 314427, hash: 'Lc8kK3Pktj8', text: () => import('./assets-chunks/styles-7M6TO2Z7_css.mjs').then(m => m.default)}
  },
};
