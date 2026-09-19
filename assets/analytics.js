(() => {
  'use strict';

  // Fixed page labels only. Never derive analytics data from a visitor's URL.
  const pages = {
    home: ['/', 'Propose — работа сервиса приостановлена'],
    terms: ['/terms', 'Propose — о работе сервиса'],
    privacy: ['/privacy', 'Propose — конфиденциальность'],
    missing: ['/404', 'Propose — страница недоступна'],
  };
  const page = pages[document.documentElement.dataset.analyticsPage];
  if (!page || window.location.hostname !== 'propose.bobot.click') return;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl) return;

  // No remote tracker, cookies, storage, referrer, URL parameters or event data.
  fetch('https://umami.bobot.click/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    keepalive: true,
    body: JSON.stringify({
      type: 'event',
      payload: {
        website: '55674576-a521-40fb-86db-be2d5e051c62',
        hostname: 'propose.bobot.click',
        url: page[0],
        title: page[1],
        referrer: '',
      },
    }),
  }).catch(() => {});
})();
