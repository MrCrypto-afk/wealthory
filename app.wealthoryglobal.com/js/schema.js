/**
 * Wealthory Global - JSON-LD Schema Injector
 * Dynamically injects structured data for SEO and LLMs (GEO)
 */

(function injectSchema() {
  const path = window.location.pathname;
  const orgId = "https://app.wealthoryglobal.com/#organization";
  const schemas = [];

  // 1. Core Organization Schema (Included everywhere as part of the Knowledge Graph)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    "name": "Wealthory Global",
    "url": "https://app.wealthoryglobal.com/",
    "logo": "https://app.wealthoryglobal.com/assets/logo-dark.png",
    "description": "Institutional-grade wealth architecture and premium financial calculators for serious Indian investors."
  };
  schemas.push(organizationSchema);

  // 2. Page-Specific Schemas
  if (path === '/' || path === '/index.html') {
    // Homepage Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://app.wealthoryglobal.com/",
      "name": "Wealthory Global Calculators",
      "publisher": {
        "@id": orgId
      }
    });
  } else if (path.includes('methodology')) {
    // About/Methodology Schema (E-E-A-T signals)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Methodology & Trust - Wealthory Global",
      "url": "https://app.wealthoryglobal.com/methodology",
      "about": {
        "@id": orgId
      },
      "creator": {
        "@type": "Person",
        "name": "Wealthory Professional",
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "NISM Series V-A Certification"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Active CFA Level I Candidate"
          }
        ],
        "knowsAbout": ["Financial Modeling", "Institutional-Grade Formulas", "Wealth Management", "Quantitative Finance"]
      }
    });
  } else {
    // Calculator Pages (SIP, EMI, etc.)
    // Extract tool name from path
    const toolMap = {
      '/sip': { name: 'SIP & Wealth Builder Calculator', desc: 'Calculate your mutual fund returns with our advanced SIP and Step-Up Calculator.', q1: 'What is a Step-Up SIP?', a1: 'A Step-Up SIP allows you to automatically increase your monthly investment amount by a specific percentage every year, compounding your wealth much faster as your income grows.', q2: 'How does compounding work in mutual funds?', a2: 'Compounding in mutual funds means you earn returns not just on your principal investment, but also on the accumulated returns of previous periods.' },
      '/emi': { name: 'EMI & Loan Planner', desc: 'Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans.', q1: 'How is EMI calculated?', a1: 'EMI is calculated using the formula: P x R x (1+R)^N / [(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is the number of months.', q2: 'Can I save interest by prepaying?', a2: 'Yes, prepaying a portion of your principal early in the loan tenure reduces the outstanding balance, significantly lowering the total interest paid over the life of the loan.' },
      '/goal-planner': { name: 'Dream Goal Planner', desc: 'Plan for your financial goals by calculating how much you need to save today.', q1: 'How does inflation affect financial goals?', a1: 'Inflation reduces the purchasing power of money over time, meaning a goal that costs ₹10 Lakhs today will cost significantly more in 10 years. Our planner adjusts for this expected inflation.', q2: 'What return expectation should I use?', a2: 'For long-term goals (5+ years), equity investments historically yield 10-12%. For short-term goals, conservative debt instruments yield 6-8%.' },
      '/retirement': { name: 'Retirement Planner', desc: 'Calculate your exact retirement corpus needed to achieve financial independence.', q1: 'What is a retirement corpus?', a1: 'A retirement corpus is the total accumulated sum of money you need to generate enough passive income to sustain your lifestyle after you stop working.', q2: 'How much of my income should I save for retirement?', a2: 'While 20% is a standard rule of thumb, the exact percentage depends on your current age, desired retirement age, and expected post-retirement lifestyle.' },
      '/fire': { name: 'FIRE Calculator', desc: 'Calculate how soon you can achieve Financial Independence, Retire Early (FIRE).', q1: 'What is the FIRE movement?', a1: 'FIRE stands for Financial Independence, Retire Early. It is a movement focused on aggressive savings and investments to retire much earlier than the traditional age of 60.', q2: 'What is the 4% rule?', a2: 'The 4% rule suggests you can safely withdraw 4% of your total retirement portfolio annually, adjusted for inflation, without running out of money over a 30-year period.' },
      '/tax': { name: 'Income Tax Saver (Old vs New Regime)', desc: 'Compare the Old vs New tax regime instantly and calculate your income tax liability.', q1: 'What is the difference between Old and New Tax Regimes?', a1: 'The Old regime allows various deductions (like 80C, HRA) but has higher tax rates. The New regime offers lower tax rates but removes most deductions and exemptions.', q2: 'Which tax regime is better?', a2: 'The better regime depends on your total income and eligible deductions. If your deductions are high, the Old regime may be better; otherwise, the New regime usually saves more tax.' },
      '/fd-vs-mf': { name: 'FD vs Mutual Funds Calculator', desc: 'Compare Fixed Deposits against Mutual Funds to see where your money grows fastest.', q1: 'Why choose Mutual Funds over Fixed Deposits?', a1: 'Mutual funds, particularly equity funds, have historically outperformed FDs over long periods and beaten inflation, whereas FD returns often fall short of real inflation rates.', q2: 'Are Fixed Deposits risk-free?', a2: 'While FDs offer guaranteed returns and high capital safety, they carry inflation risk—if the interest rate is lower than inflation, your real wealth decreases.' },
      '/cost-of-delay': { name: 'Cost of Delay Calculator', desc: 'Calculate the wealth destruction caused by waiting to invest.', q1: 'What is the cost of delay in investing?', a1: 'The cost of delay is the exponential loss in future wealth caused by starting your investments later, missing out on crucial early years of compounding.', q2: 'Why is starting early more important than amount invested?', a2: 'Because of compounding, time in the market is often more powerful than timing the market or the absolute amount invested. An early investor can accumulate more with smaller amounts than a late investor with larger amounts.' },
      '/swp': { name: 'SWP Pension Planner', desc: 'Calculate safe withdrawal rates and turn your corpus into a sustainable paycheck.', q1: 'What is a Systematic Withdrawal Plan (SWP)?', a1: 'An SWP allows you to withdraw a fixed amount regularly from your mutual fund investments, providing a steady stream of income while the remaining corpus continues to grow.', q2: 'How is SWP different from Dividend options?', a2: 'In an SWP, you control the withdrawal amount and frequency, and it is more tax-efficient as you only pay capital gains tax on the profit portion of the withdrawal.' }
    };

    let toolData = null;
    for (const [key, data] of Object.entries(toolMap)) {
      if (path.includes(key)) {
        toolData = data;
        break;
      }
    }

    if (toolData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": toolData.name,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": toolData.desc,
        "provider": {
          "@id": orgId
        }
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": toolData.q1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": toolData.a1
            }
          },
          {
            "@type": "Question",
            "name": toolData.q2,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": toolData.a2
            }
          }
        ]
      });
    }
  }

  // Inject the schemas into the DOM
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  });
})();
