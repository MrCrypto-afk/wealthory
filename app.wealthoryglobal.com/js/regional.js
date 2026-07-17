// js/regional.js

(function() {
  const currencyMap = {
    // North America
    'US': { symbol: '$', code: 'USD', locale: 'en-US' },
    'CA': { symbol: 'C$', code: 'CAD', locale: 'en-CA' },
    'MX': { symbol: '$', code: 'MXN', locale: 'es-MX' },
    // Europe
    'GB': { symbol: '£', code: 'GBP', locale: 'en-GB' },
    'FR': { symbol: '€', code: 'EUR', locale: 'fr-FR' },
    'DE': { symbol: '€', code: 'EUR', locale: 'de-DE' },
    'IT': { symbol: '€', code: 'EUR', locale: 'it-IT' },
    'ES': { symbol: '€', code: 'EUR', locale: 'es-ES' },
    'NL': { symbol: '€', code: 'EUR', locale: 'nl-NL' },
    'CH': { symbol: 'CHF', code: 'CHF', locale: 'de-CH' },
    'SE': { symbol: 'kr', code: 'SEK', locale: 'sv-SE' },
    'UA': { symbol: '₴', code: 'UAH', locale: 'uk-UA' },
    'RU': { symbol: '₽', code: 'RUB', locale: 'ru-RU' },
    // Asia & Pacific
    'IN': { symbol: '₹', code: 'INR', locale: 'en-IN' },
    'CN': { symbol: '¥', code: 'CNY', locale: 'zh-CN' },
    'JP': { symbol: '¥', code: 'JPY', locale: 'ja-JP' },
    'KR': { symbol: '₩', code: 'KRW', locale: 'ko-KR' },
    'SG': { symbol: 'S$', code: 'SGD', locale: 'en-SG' },
    'AU': { symbol: 'A$', code: 'AUD', locale: 'en-AU' },
    'NZ': { symbol: 'NZ$', code: 'NZD', locale: 'en-NZ' },
    // Middle East & Africa
    'AE': { symbol: 'AED', code: 'AED', locale: 'en-AE' },
    'SA': { symbol: 'SAR', code: 'SAR', locale: 'en-SA' },
    'ZA': { symbol: 'R', code: 'ZAR', locale: 'en-ZA' },
    'TR': { symbol: '₺', code: 'TRY', locale: 'tr-TR' },
    // South America
    'BR': { symbol: 'R$', code: 'BRL', locale: 'pt-BR' },
    'AR': { symbol: '$', code: 'ARS', locale: 'es-AR' }
  };
  const defaultRegion = { symbol: '$', code: 'USD', locale: 'en-US' };

  function applyRegion(country) {
    const regionData = currencyMap[country] || defaultRegion;
    if (country === 'IN') {
        regionData.symbol = '₹';
        regionData.code = 'INR';
        regionData.locale = 'en-IN';
    }

    window.wealthoryRegion = regionData;
    window.formatCurrency = (value) => {
      return new Intl.NumberFormat(regionData.locale, {
        style: 'currency',
        currency: regionData.code,
        maximumFractionDigits: 0
      }).format(value);
    };

    // Hide India-specific tools for international users
    if (country !== 'IN') {
      const taxCard = document.querySelector('a[href="/tax"]');
      if (taxCard) taxCard.style.display = 'none';
      
      const fdCard = document.querySelector('a[href="/fd-vs-mf"]');
      if (fdCard) fdCard.style.display = 'none';
    }

    // Replace currency symbols in the DOM
    document.querySelectorAll('.currency-symbol').forEach(el => {
      el.textContent = regionData.symbol;
    });

    // Replace currency in input wrappers (e.g. "₹ <input>") safely
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
      // Find the first text node child
      for (let node of wrapper.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes('₹')) {
          node.nodeValue = node.nodeValue.replace('₹', regionData.symbol);
        } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes('$')) {
          node.nodeValue = node.nodeValue.replace('$', regionData.symbol);
        }
      }
    });

    // Re-trigger calculator logic to update charts and outputs with new formatting
    if (typeof window.calculate === 'function') {
        window.calculate();
    }
  }

  let country = localStorage.getItem('wealthory-country');
  
  // Set a safe fallback immediately so synchronous scripts don't break
  window.formatCurrency = (value) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(value);
  };

  if (country) {
    applyRegion(country);
  } else {
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        country = data.country || 'IN';
        localStorage.setItem('wealthory-country', country);
        applyRegion(country);
      })
      .catch(() => {
        applyRegion('IN');
      });
  }
})();
