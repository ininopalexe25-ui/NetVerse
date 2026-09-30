import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const AUDIT_DIR = path.resolve('audit-results');
if (!fs.existsSync(AUDIT_DIR)) {
  fs.mkdirSync(AUDIT_DIR, { recursive: true });
}

const auditLog = {
  timestamp: new Date().toISOString(),
  targetUrl: 'http://localhost:5173',
  summary: {
    totalChecks: 0,
    passed: 0,
    warnings: 0,
    failed: 0
  },
  errors: [],
  warnings: [],
  checks: [],
  radiiAudit: {},
  screenshots: []
};

function recordCheck(name, passed, details = '') {
  auditLog.summary.totalChecks++;
  if (passed) {
    auditLog.summary.passed++;
    console.log(`  [PASS] ${name} ${details ? `(${details})` : ''}`);
  } else {
    auditLog.summary.failed++;
    console.error(`  [FAIL] ${name} ${details ? `(${details})` : ''}`);
  }
  auditLog.checks.push({ name, passed, details });
}

async function runAudit() {
  console.log('====================================================');
  console.log('   NETVERSE PLAYWRIGHT COMPREHENSIVE UI AUDIT       ');
  console.log('====================================================\n');

  let browser;
  const chromePath = fs.existsSync('/usr/bin/google-chrome-stable') 
    ? '/usr/bin/google-chrome-stable' 
    : (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

  try {
    browser = await chromium.launch({
      headless: true,
      executablePath: chromePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
  } catch (err) {
    console.log('Falling back to default chromium launcher...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  // Listeners for errors
  page.on('pageerror', err => {
    console.error('Page uncaught error:', err.message);
    auditLog.errors.push({ type: 'pageerror', message: err.message });
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      // Ignore innocuous webgl or 404 sketchfab third-party analytics
      const text = msg.text();
      if (!text.includes('sketchfab') && !text.includes('favicon')) {
        console.warn('Console error:', text);
        auditLog.warnings.push({ type: 'console-error', message: text });
      }
    }
  });

  try {
    // -------------------------------------------------------------
    // PHASE 1: Desktop Initial Load & Workbench
    // -------------------------------------------------------------
    console.log('1. Auditing Desktop Workbench (1280x800)...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Title & Branding
    const title = await page.title();
    recordCheck('Page Title exists', title.length > 0, `Title: "${title}"`);

    const brandSvg = await page.$('[data-nav="workbench"] svg');
    recordCheck('Brand Mark NV rendered', !!brandSvg, 'Bespoke SVG Vector Logo Verified');

    // Check Horizontal Overflow
    const isOverflowingDesktop = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    recordCheck('Zero Horizontal Overflow (Desktop)', !isOverflowingDesktop);

    // Radii & Design Tone Audit on Desktop
    const computedRadii = await page.evaluate(() => {
      const getRadius = (selector) => {
        const el = document.querySelector(selector);
        return el ? window.getComputedStyle(el).borderRadius : null;
      };

      return {
        navbar: getRadius('header > div > div'),
        bezelShell: getRadius('.bezel-shell'),
        bezelCore: getRadius('.bezel-core'),
        ctaPrimary: getRadius('[data-nav="crimping"]'),
        ctaSecondary: getRadius('[data-nav="materi"]')
      };
    });

    auditLog.radiiAudit = computedRadii;
    console.log('   Computed Radii Check:', JSON.stringify(computedRadii));

    // Verify radii are crisp (< 20px) and not oversized pills (> 30px)
    const isCrispNavbar = computedRadii.navbar && parseInt(computedRadii.navbar, 10) <= 16;
    recordCheck('Navbar Radius is Crisp (<= 16px)', !!isCrispNavbar, computedRadii.navbar);

    const isCrispShell = computedRadii.bezelShell && parseInt(computedRadii.bezelShell, 10) <= 16;
    recordCheck('Bezel Shell Radius is Crisp (<= 16px)', !!isCrispShell, computedRadii.bezelShell);

    const isCrispButton = computedRadii.ctaPrimary && parseInt(computedRadii.ctaPrimary, 10) <= 12;
    recordCheck('Primary Button Radius is Crisp (<= 12px)', !!isCrispButton, computedRadii.ctaPrimary);

    // Screenshot 1: Desktop Workbench
    const shot1 = path.join(AUDIT_DIR, '01_workbench_desktop.png');
    await page.screenshot({ path: shot1, fullPage: false });
    auditLog.screenshots.push('01_workbench_desktop.png');

    // -------------------------------------------------------------
    // PHASE 2: 3D Hardware Selector Switch
    // -------------------------------------------------------------
    console.log('\n2. Auditing 3D Hardware Selector & Native Model Switch...');
    const deviceOptions = await page.$$('#device-selector option');
    const deviceButtons = await page.$$('[data-select-device]');
    const count = Math.max(deviceOptions.length, deviceButtons.length);
    recordCheck('Hardware Selector Tabs present', count >= 4, `${count} hardware options`);

    const allDeviceTexts = await page.$$eval('#device-selector option', opts => opts.map(o => o.textContent.trim()));
    const hasPatchPanel = allDeviceTexts.some(t => t.toLowerCase().includes('patch panel'));
    recordCheck('Patch Panel model excluded from 3D devices', !hasPatchPanel, `Available: ${allDeviceTexts.join(', ')}`);

    const selectEl = await page.$('#device-selector');
    if (selectEl) {
      await page.selectOption('#device-selector', '2');
      await selectEl.dispatchEvent('change');
      await page.waitForTimeout(800);
    } else if (deviceButtons.length >= 3) {
      await deviceButtons[2].click();
      await page.waitForTimeout(800);
    }

      const deviceTitle = await page.$eval('.bezel-core h2', el => el.textContent.trim());
      recordCheck('Switched to Tang Crimping Model', deviceTitle.includes('Tang Crimping') || deviceTitle.includes('Crimping'), deviceTitle);

      const shot2 = path.join(AUDIT_DIR, '02_device_tang_crimping.png');
      await page.screenshot({ path: shot2 });
      auditLog.screenshots.push('02_device_tang_crimping.png');

    // -------------------------------------------------------------
    // PHASE 3: Crimping Master Minigame Simulation
    // -------------------------------------------------------------
    console.log('\n3. Auditing Crimping Master Minigame & Continuity Tester...');
    await page.click('button[data-nav="crimping"]');
    await page.waitForTimeout(800);

    const crimpingHeader = await page.$eval('h1', el => el.textContent.toLowerCase());
    recordCheck('Crimping Master Page Loaded', crimpingHeader.includes('kabel lan') || crimpingHeader.includes('crimping'));

    // Check standard toggles
    const btnT568B = await page.$('#set-t568b');
    const btnT568A = await page.$('#set-t568a');
    recordCheck('T568B & T568A Standard Toggles present', !!btnT568B && !!btnT568A);

    // Check video tutorial button in toolbar
    const crimpingVideoBtn = await page.$('button[data-open-crimping-video]');
    recordCheck('Video Tutorial Button rendered in Crimping Master toolbar', !!crimpingVideoBtn);

    // Check 8 Pin Slots
    const dropzones = await page.$$('.wire-dropzone');
    recordCheck('8 Pin Modular Plug Slots rendered', dropzones.length === 8);

    // Check wire palette buttons
    const wireButtons = await page.$$('[data-pick-wire]');
    recordCheck('Available UTP Wires Palette rendered', wireButtons.length === 8);

    // 1. Audit Guest Practice Lock & Zero XP Protection
    const guestCrimpingLock = await page.$('#btn-guest-unlock-crimping');
    recordCheck('Guest Crimping Feature Lock Banner rendered', !!guestCrimpingLock);

    const guestXp = await page.evaluate(() => window.__netverseState.userProfile.total_xp);
    recordCheck('Guest XP is strictly 0', guestXp === 0, `Total XP: ${guestXp}`);

    // Try interacting as guest -> Must trigger login modal
    await page.click('[data-pick-wire="WO"]');
    await page.waitForTimeout(300);
    const isModalOpenForGuest = await page.evaluate(() => !!document.getElementById('auth-modal-backdrop'));
    recordCheck('Guest wire interaction blocked & prompts login modal', isModalOpenForGuest);

    if (isModalOpenForGuest) {
      await page.click('#btn-close-auth-modal');
      await page.waitForTimeout(300);
    }

    // 2. Authenticate student to audit active wire crimping and continuity testing
    await page.evaluate(() => {
      window.__netverseState.session = {
        user: { id: 'test-student-id', email: 'mahasiswa@unesa.ac.id' }
      };
      window.__netverseState.userProfile = {
        id: 'test-student-id',
        nama_lengkap: 'Budi Santoso',
        username: 'buditkj',
        level: 1,
        total_xp: 250,
        role: 'mahasiswa'
      };
      window.__renderApp();
    });
    await page.waitForTimeout(200);

    // Place wires sequentially (T568B: WO, O, WG, B, WB, G, WBr, Br)
    console.log('   Simulating wire placement into RJ-45 pins as authenticated user...');
    const wireSequenceT568B = ['WO', 'O', 'WG', 'B', 'WB', 'G', 'WBr', 'Br'];
    for (const wireId of wireSequenceT568B) {
      const sel = `[data-pick-wire="${wireId}"]`;
      if (await page.$(sel)) {
        await page.click(sel);
        await page.waitForTimeout(120);
      }
    }

    // Check stopwatch running
    const timerText = await page.$eval('#crimping-timer-display', el => el.textContent);
    recordCheck('Stopwatch Timer ticking', timerText !== '0.0s', `Current: ${timerText}`);

    // Click "Uji Pres Konektor"
    const verifyBtn = await page.$('#btn-verify-crimping');
    recordCheck('Verify Button present', !!verifyBtn);
    if (verifyBtn) {
      await page.click('#btn-verify-crimping');
      try {
        await page.waitForSelector('.crimping-tester-grid', { timeout: 6000 });
      } catch (e) {
        await page.waitForTimeout(2000);
      }

      // Check continuity tester LEDs
      const testerSection = await page.$('.crimping-tester-grid') || await page.$('text=Hasil tes kabel LAN:');
      recordCheck('LAN Cable Tester Continuity Section active', !!testerSection);

      const perfectMsg = await page.$('text=SESUAI') || await page.$('text=SEMPURNA');
      recordCheck('100% Accuracy Perfect Match validated', !!perfectMsg);

      const shot3 = path.join(AUDIT_DIR, '03_crimping_assembled_tested.png');
      await page.screenshot({ path: shot3 });
      auditLog.screenshots.push('03_crimping_assembled_tested.png');
    }

    // -------------------------------------------------------------
    // PHASE 4: Kurikulum Teori & Micro-Learning
    // -------------------------------------------------------------
    console.log('\n4. Auditing Kurikulum Teori & Socratic Checkpoint...');
    await page.click('button[data-nav="materi"]');
    await page.waitForTimeout(800);

    const syllabusBtns = await page.$$('[data-select-modul]');
    recordCheck('Curriculum Syllabus Topics rendered', syllabusBtns.length >= 3, `${syllabusBtns.length} topics`);

    // Switch to Topic 2
    if (syllabusBtns.length >= 2) {
      await syllabusBtns[1].click();
      await page.waitForTimeout(500);
      const topic2Title = await page.$eval('h1', el => el.textContent.trim());
      recordCheck('Switched to Topic 2', topic2Title.includes('Standar Pengkabelan') || topic2Title.includes('Media Transmisi'), topic2Title);
    }

    const checkpointBtn = await page.$('#btn-trigger-ai-checkpoint');
    recordCheck('Socratic AI Discussion Trigger Button present', !!checkpointBtn);

    // Audit Kuis Evaluasi Section
    const enterQuizBtn = await page.$('[data-enter-quiz]');
    if (enterQuizBtn) {
      await enterQuizBtn.click();
      await page.waitForTimeout(500);
    }

    const quizSection = await page.$('#section-quiz-evaluasi');
    recordCheck('Kuis Evaluasi Diagnostik Section rendered', !!quizSection);

    if (quizSection) {
      // Check quiz options
      const quizQuestions = await page.$$('[data-quiz-q="0"]');
      recordCheck('Quiz question 1 options rendered', quizQuestions.length === 4, `${quizQuestions.length} options`);

      // Verify Guest Quiz Lock behavior
      await page.evaluate(() => {
        window.__netverseState.session = null;
        window.__netverseState.userProfile = {
          id: null,
          nama_lengkap: 'User',
          username: 'user',
          level: 1,
          total_xp: 0,
          role: 'tamu'
        };
        window.__renderApp();
      });
      await page.waitForTimeout(200);

      const guestQuizLock = await page.$('#btn-guest-unlock-quiz');
      recordCheck('Guest Quiz Feature Lock Banner rendered', !!guestQuizLock);

      // Verify guest answering attempt is blocked and prompts login modal
      await page.click('[data-quiz-q="0"][data-quiz-opt="0"]');
      await page.waitForTimeout(300);
      const isQuizGuestModalOpen = await page.evaluate(() => !!document.getElementById('auth-modal-backdrop'));
      recordCheck('Guest quiz interaction blocked & prompts login modal', isQuizGuestModalOpen);

      if (isQuizGuestModalOpen) {
        await page.click('#btn-close-auth-modal');
        await page.waitForTimeout(300);
      }

      // Re-authenticate student to answer questions and complete evaluation
      await page.evaluate(() => {
        window.__netverseState.session = {
          user: { id: 'test-student-id', email: 'mahasiswa@unesa.ac.id' }
        };
        window.__netverseState.userProfile = {
          id: 'test-student-id',
          nama_lengkap: 'Budi Santoso',
          username: 'buditkj',
          level: 1,
          total_xp: 250,
          role: 'mahasiswa'
        };
        window.__renderApp();
      });
      await page.waitForTimeout(200);

      // Radii check on quiz elements
      const quizRadii = await page.evaluate(() => {
        const getRad = (sel) => {
          const el = document.querySelector(sel);
          return el ? window.getComputedStyle(el).borderRadius : 'N/A';
        };
        return {
          quizCard: getRad('#section-quiz-evaluasi'),
          quizOption: getRad('[data-quiz-q="0"]'),
          submitBtn: getRad('#btn-submit-quiz')
        };
      });

      console.log('  [RADII AUDIT - Quiz Component]:', quizRadii);
      recordCheck('Quiz Section Container Radius <= 12px', parseFloat(quizRadii.quizCard) <= 12, `Computed: ${quizRadii.quizCard}`);
      recordCheck('Quiz Option Button Radius <= 8px', parseFloat(quizRadii.quizOption) <= 8, `Computed: ${quizRadii.quizOption}`);
      recordCheck('Quiz Submit Button Radius <= 8px', parseFloat(quizRadii.submitBtn) <= 8, `Computed: ${quizRadii.submitBtn}`);

      // Simulate answering all questions in Topic 2
      for (let q = 0; q < 5; q++) {
        const opt = await page.$(`[data-quiz-q="${q}"][data-quiz-opt="0"]`);
        if (opt) {
          await opt.click();
          await page.waitForTimeout(100);
        }
      }

      // Submit Quiz
      await page.click('#btn-submit-quiz');
      await page.waitForTimeout(500);

      // Verify post-submission results
      const explanationCards = await page.$$('.bg-emerald-950\\/20');
      recordCheck('Socratic Post-Submission Explanations rendered', explanationCards.length >= 1, `${explanationCards.length} explanations`);

      const retryBtn = await page.$('#btn-retry-quiz');
      recordCheck('Quiz Retry Button available after evaluation', !!retryBtn);
    }

    const shot4 = path.join(AUDIT_DIR, '04_kurikulum_module_quiz.png');
    await page.screenshot({ path: shot4 });
    auditLog.screenshots.push('04_kurikulum_module_quiz.png');

    // -------------------------------------------------------------
    // Auditing YouTube Video Learning Materials Options
    // -------------------------------------------------------------
    console.log('\n4b. Auditing YouTube Video Learning Materials Options...');
    await page.click('button[data-nav="materi"]');
    await page.waitForTimeout(500);

    // Switch to Topic 2 (Media Transmisi & UTP)
    await page.click('button[data-select-modul="1"]');
    await page.waitForTimeout(400);

    // Verify format switcher buttons exist
    const formatVideoBtn = await page.$('button[data-materi-format="video"]');
    recordCheck('Materi Format Switcher (Video Tutorial) button rendered', !!formatVideoBtn);

    if (formatVideoBtn) {
      await formatVideoBtn.click();
      await page.waitForTimeout(500);

      // Verify iframe player is rendered with Video 1 (TrqZDU7Ywf4)
      const iframeSrc = await page.$eval('#youtube-player-frame', el => el.getAttribute('src'));
      recordCheck('YouTube Video Player rendered with Crimping Video (TrqZDU7Ywf4)', iframeSrc.includes('TrqZDU7Ywf4'), `src: ${iframeSrc}`);

      // Verify Video 2 selection (MikroTik Setting - WKrRWSCXo38)
      const selectVideo2Btn = await page.$('button[data-select-video="WKrRWSCXo38"]');
      recordCheck('Video 2 (MikroTik Setting) option rendered in selector', !!selectVideo2Btn);

      if (selectVideo2Btn) {
        await selectVideo2Btn.click();
        await page.waitForTimeout(500);

        const updatedIframeSrc = await page.$eval('#youtube-player-frame', el => el.getAttribute('src'));
        recordCheck('YouTube Video Player switched to MikroTik Tutorial (WKrRWSCXo38)', updatedIframeSrc.includes('WKrRWSCXo38'), `src: ${updatedIframeSrc}`);
      }

      const shot4b = path.join(AUDIT_DIR, '04b_youtube_video_materi.png');
      await page.screenshot({ path: shot4b });
      auditLog.screenshots.push('04b_youtube_video_materi.png');

      // Switch back to theory format
      const formatTeoriBtn = await page.$('button[data-materi-format="teori"]');
      if (formatTeoriBtn) {
        await formatTeoriBtn.click();
        await page.waitForTimeout(400);
      }
    }

    // -------------------------------------------------------------
    // PHASE 5: Leaderboard / Papan Peringkat Realtime
    // -------------------------------------------------------------
    console.log('\n5. Auditing Leaderboard Table, Podium & Realtime Features...');
    await page.click('button[data-nav="leaderboard"]');
    await page.waitForTimeout(800);

    const realtimeIndicator = await page.$('text=Pembaruan langsung aktif') || await page.$('text=Realtime Aktif');
    recordCheck('Realtime Supabase WebSocket Indicator active', !!realtimeIndicator);

    // Check Top 3 Podium Cards
    const podiumChampion = await page.$('text=#1 TERATAS') || await page.$('text=JUARA UTAMA');
    recordCheck('Top 1 Champion Podium card rendered', !!podiumChampion);

    // Audit radii in Leaderboard Component
    const leaderboardRadii = await page.evaluate(() => {
      const getRad = (sel) => {
        const el = document.querySelector(sel);
        return el ? window.getComputedStyle(el).borderRadius : 'N/A';
      };
      return {
        tableShell: getRad('.bezel-shell'),
        tableCore: getRad('.bezel-core'),
        podiumCard: getRad('.border-amber-400\\/30'),
        filterTab: getRad('[data-filter-leaderboard="all"]')
      };
    });

    console.log('  [RADII AUDIT - Leaderboard Component]:', leaderboardRadii);
    recordCheck('Leaderboard Container Radius <= 12px', parseFloat(leaderboardRadii.tableShell) <= 12, `Computed: ${leaderboardRadii.tableShell}`);
    recordCheck('Podium Card Radius <= 12px', parseFloat(leaderboardRadii.podiumCard) <= 12, `Computed: ${leaderboardRadii.podiumCard}`);
    recordCheck('Filter Tab Radius <= 8px', parseFloat(leaderboardRadii.filterTab) <= 8, `Computed: ${leaderboardRadii.filterTab}`);

    // Test Cable Standard Filtering
    await page.click('[data-filter-leaderboard="T568B"]');
    await page.waitForTimeout(400);
    const rowsB = await page.$$eval('tbody tr', els => els.length);
    recordCheck('Filtered by Standar T568B', rowsB > 0, `${rowsB} rows displayed`);

    await page.click('[data-filter-leaderboard="T568A"]');
    await page.waitForTimeout(400);
    const rowsA = await page.$$eval('tbody tr', els => els.length);
    recordCheck('Filtered by Standar T568A', rowsA > 0, `${rowsA} rows displayed`);

    // Reset filter to all
    await page.click('[data-filter-leaderboard="all"]');
    await page.waitForTimeout(300);

    const tableRows = await page.$$('tbody tr');
    recordCheck('Leaderboard Rows rendered', tableRows.length > 0, `${tableRows.length} ranked students`);

    // Test Realtime Toast Banner
    await page.evaluate(() => {
      if (window.__netverseState) {
        window.__netverseState.realtimeToast = {
          id: Date.now(),
          text: 'Rian Pratama baru saja menyelesaikan T568B dengan akurasi 100% (18s)!'
        };
        window.__renderApp();
      }
    });
    await page.waitForTimeout(300);

    const toastBanner = await page.$('#realtime-toast-banner');
    recordCheck('Realtime Toast Banner renders on live activity', !!toastBanner);

    const shot5 = path.join(AUDIT_DIR, '05_leaderboard_podium_table.png');
    await page.screenshot({ path: shot5 });
    auditLog.screenshots.push('05_leaderboard_podium_table.png');

    // Close toast
    const closeToastBtn = await page.$('#btn-close-toast');
    if (closeToastBtn) {
      await closeToastBtn.click();
      await page.waitForTimeout(200);
    }

    // -------------------------------------------------------------
    // PHASE 6: Floating AI Tutor Drawer & Inquiries
    // -------------------------------------------------------------
    console.log('\n6. Auditing Floating Socratic AI Tutor Drawer...');
    const aiFab = await page.$('#ai-fab-btn');
    recordCheck('AI Tutor FAB Button present', !!aiFab);

    if (aiFab) {
      await aiFab.click();
      await page.waitForTimeout(500);

      const isDrawerVisible = await page.$eval('#ai-chat-drawer', el => !el.classList.contains('hidden'));
      recordCheck('AI Chat Drawer Toggled Open', isDrawerVisible);

      // Audit radii in AI Tutor Drawer
      const aiRadii = await page.evaluate(() => {
        const getRad = (sel) => {
          const el = document.querySelector(sel);
          return el ? window.getComputedStyle(el).borderRadius : 'N/A';
        };
        return {
          drawer: getRad('#ai-chat-drawer'),
          input: getRad('#ai-user-query'),
          submitBtn: getRad('#ai-input-form button[type="submit"]'),
          chip: getRad('.ai-quick-chip')
        };
      });

      console.log('  [RADII AUDIT - AI Tutor Drawer]:', aiRadii);
      recordCheck('AI Drawer Container Radius <= 12px', parseFloat(aiRadii.drawer) <= 12, `Computed: ${aiRadii.drawer}`);
      recordCheck('AI Input Radius <= 8px', parseFloat(aiRadii.input) <= 8, `Computed: ${aiRadii.input}`);
      recordCheck('AI Submit Button Radius <= 8px', parseFloat(aiRadii.submitBtn) <= 8, `Computed: ${aiRadii.submitBtn}`);
      recordCheck('AI Suggestion Chip Radius <= 6px', parseFloat(aiRadii.chip) <= 6, `Computed: ${aiRadii.chip}`);

      const quickChips = await page.$$('.ai-quick-chip');
      recordCheck('Contextual Suggestion Chips rendered', quickChips.length >= 2, `${quickChips.length} chips`);

      // Test submitting a question to live Supabase Edge Function
      const aiInput = await page.$('#ai-user-query');
      if (aiInput) {
        await aiInput.fill('Mengapa pada standar T568B pin 3 dan 6 dipisah mengapit kawat biru?');
        await page.click('#ai-input-form button[type="submit"]');

        // Wait for response from Supabase Edge Function (loading finished and at least 3 messages present)
        await page.waitForFunction(() => {
          const loading = document.querySelector('#ai-message-list .animate-pulse');
          const count = document.querySelectorAll('#ai-message-list > div').length;
          return !loading && count >= 3;
        }, { timeout: 15000 });

        const messagesCount = await page.$$eval('#ai-message-list > div', els => els.length);
        recordCheck('User message sent & Socratic AI responded via Edge Function', messagesCount >= 3, `${messagesCount} messages in stream`);
      }

      const shot6 = path.join(AUDIT_DIR, '06_ai_socratic_drawer.png');
      await page.screenshot({ path: shot6 });
      auditLog.screenshots.push('06_ai_socratic_drawer.png');

      // Test Reset Chat Button
      await page.click('#btn-reset-ai-chat');
      await page.waitForTimeout(400);
      const resetCount = await page.$$eval('#ai-message-list > div', els => els.length);
      recordCheck('Reset Chat Session resets dialog stream', resetCount === 1, `${resetCount} message`);

      // Close AI drawer using selector click
      await page.click('#btn-close-ai');
      await page.waitForTimeout(300);
    }

    // -------------------------------------------------------------
    // PHASE 7: Mobile Viewport Audit (390x844 - Smartphone)
    // -------------------------------------------------------------
    console.log('\n7. Auditing Mobile Responsiveness (390x844 iPhone / Smartphone)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click('header [data-nav="workbench"]');
    await page.waitForTimeout(800);

    const isOverflowingMobile = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    recordCheck('Zero Horizontal Overflow (Mobile 390px)', !isOverflowingMobile);

    const mobileMenuBtn = await page.$('#mobile-menu-btn');
    recordCheck('Mobile Hamburger Menu Button visible', !!mobileMenuBtn);

    const shot7 = path.join(AUDIT_DIR, '07_mobile_workbench.png');
    await page.screenshot({ path: shot7 });
    auditLog.screenshots.push('07_mobile_workbench.png');

    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await page.waitForTimeout(300);
      const isMobileMenuOpen = await page.$eval('#mobile-menu', el => !el.classList.contains('hidden'));
      recordCheck('Mobile Drawer Menu opens on toggle', isMobileMenuOpen);

      // Navigate to Crimping via mobile drawer
      await page.click('#mobile-menu [data-nav="crimping"]');
      await page.waitForTimeout(800);

      const isOverflowingMobileCrimping = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      recordCheck('Zero Horizontal Overflow (Mobile Crimping)', !isOverflowingMobileCrimping);

      const shot8 = path.join(AUDIT_DIR, '08_mobile_crimping.png');
      await page.screenshot({ path: shot8 });
      auditLog.screenshots.push('08_mobile_crimping.png');
    }

    // -------------------------------------------------------------
    // PHASE 8: Auth Modal & Profile Management Audit
    // -------------------------------------------------------------
    console.log('\n8. Auditing Supabase Auth Modal & Profile Interface...');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.click('header [data-nav="workbench"]');
    // Ensure clean guest state for Auth Modal Login/Register testing
    await page.evaluate(() => {
      window.__netverseState.session = null;
      window.__netverseState.userProfile = {
        id: null,
        nama_lengkap: 'User',
        username: 'user',
        level: 1,
        total_xp: 0,
        role: 'tamu'
      };
      window.__renderApp();
    });
    await page.waitForTimeout(300);

    const authTriggerBtn = await page.$('#btn-open-auth-modal');
    recordCheck('Auth/Profile trigger button rendered in Navbar', !!authTriggerBtn);

    if (authTriggerBtn) {
      await authTriggerBtn.click();
      await page.waitForTimeout(500);

      const isAuthModalVisible = await page.$eval('#auth-modal-backdrop', el => !!el);
      recordCheck('Auth Modal opens on Navbar trigger', isAuthModalVisible);

      // Audit radii in Auth Modal
      const modalRadii = await page.evaluate(() => {
        const getRad = (sel) => {
          const el = document.querySelector(sel);
          return el ? window.getComputedStyle(el).borderRadius : 'N/A';
        };
        return {
          modalShell: getRad('.bezel-shell'),
          authEmailInput: getRad('#auth-email'),
          submitBtn: getRad('#btn-submit-auth'),
          tabLogin: getRad('#tab-auth-login')
        };
      });

      console.log('  [RADII AUDIT - Auth Modal]:', modalRadii);
      recordCheck(
        'Auth Modal Container Radius <= 12px',
        parseFloat(modalRadii.modalShell) <= 12,
        `Computed: ${modalRadii.modalShell}`
      );
      recordCheck(
        'Auth Input Radius <= 8px',
        parseFloat(modalRadii.authEmailInput) <= 8,
        `Computed: ${modalRadii.authEmailInput}`
      );
      recordCheck(
        'Auth Submit Button Radius <= 8px',
        parseFloat(modalRadii.submitBtn) <= 8,
        `Computed: ${modalRadii.submitBtn}`
      );

      // Switch to Register Tab
      const tabRegister = await page.$('#tab-auth-register');
      if (tabRegister) {
        await tabRegister.click();
        await page.waitForTimeout(300);
        const nameInputVisible = await page.$eval('#auth-nama-lengkap', el => !!el);
        recordCheck('Register tab displays Full Name and Username fields', nameInputVisible);
      }

      // Test Show/Hide Password Toggle
      const togglePwBtn = await page.$('#btn-toggle-password');
      recordCheck('Show/Hide Password toggle button present', !!togglePwBtn);

      if (togglePwBtn) {
        const initialType = await page.$eval('#auth-password', el => el.type);
        recordCheck('Password initially hidden', initialType === 'password');

        await togglePwBtn.click();
        await page.waitForTimeout(200);
        const shownType = await page.$eval('#auth-password', el => el.type);
        recordCheck('Password type toggles to text on click', shownType === 'text');

        await togglePwBtn.click();
        await page.waitForTimeout(200);
        const hiddenType = await page.$eval('#auth-password', el => el.type);
        recordCheck('Password type toggles back to password on second click', hiddenType === 'password');
      }

      const shot9 = path.join(AUDIT_DIR, '09_auth_modal.png');
      await page.screenshot({ path: shot9 });
      auditLog.screenshots.push('09_auth_modal.png');

      // Switch back to Login Tab and test Invalid Credentials Warning Notice
      const tabLogin = await page.$('#tab-auth-login');
      if (tabLogin) {
        await tabLogin.click();
        await page.waitForTimeout(200);
      }

      const emailInput = await page.$('#auth-email');
      const passInput = await page.$('#auth-password');
      const submitBtn = await page.$('#btn-submit-auth');

      if (emailInput && passInput && submitBtn) {
        await emailInput.fill('salah_login@unesa.ac.id');
        await passInput.fill('passwordsalah123');
        await submitBtn.click();

        try {
          await page.waitForSelector('#auth-notice-box', { timeout: 5000 });
          const noticeText = await page.$eval('#auth-notice-box', el => el.innerText);
          const hasMismatchWarning = noticeText.includes('Kata sandi atau email tidak cocok') || noticeText.includes('Peringatan Masuk Akun');
          recordCheck('Login displays warning notice when email or password does not match', hasMismatchWarning, noticeText.replace(/\n+/g, ' ').trim());

          const shotNotice = path.join(AUDIT_DIR, '09b_auth_invalid_credentials_notice.png');
          await page.screenshot({ path: shotNotice });
          auditLog.screenshots.push('09b_auth_invalid_credentials_notice.png');
        } catch (e) {
          recordCheck('Login displays warning notice when email or password does not match', false, e.message);
        }
      }

      // Close modal
      const closeAuthBtn = await page.$('#btn-close-auth-modal');
      if (closeAuthBtn) {
        await closeAuthBtn.click();
        await page.waitForTimeout(300);
        const isClosed = await page.evaluate(() => !document.getElementById('auth-modal-backdrop'));
        recordCheck('Auth Modal closes successfully on close button click', isClosed);
      }
    }

    // -------------------------------------------------------------
    // PHASE 9: Light, Dark, Midnight Blue, and Dark Emerald Theme Dropdown Audit
    // -------------------------------------------------------------
    console.log('\n9. Auditing 4-Theme Dropdown (Light, Dark, Midnight Blue, Dark Emerald)...');
    const themeToggleBtn = await page.$('#btn-theme-toggle');
    recordCheck('Theme Dropdown Trigger Button rendered in Navbar', !!themeToggleBtn);

    if (themeToggleBtn) {
      // 1. Initial State should be Dark
      const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light'));
      recordCheck('Initial Theme defaults to Dark Mode', initialTheme === 'dark');

      // Helper to open theme dropdown if hidden
      const openThemeDropdown = async () => {
        const isHidden = await page.$eval('#theme-dropdown-menu', el => el.classList.contains('hidden'));
        if (isHidden) {
          await page.click('#btn-theme-toggle');
          await page.waitForTimeout(200);
        }
      };

      // Test opening dropdown popover
      await openThemeDropdown();
      const isDropdownOpen = await page.$eval('#theme-dropdown-menu', el => !el.classList.contains('hidden'));
      recordCheck('Theme Dropdown Menu opens on click', isDropdownOpen);

      // 2. Select Light Theme
      const btnLight = await page.$('button[data-set-theme="light"]');
      recordCheck('Light Theme option present in dropdown', !!btnLight);
      if (btnLight) {
        await btnLight.click();
        await page.waitForTimeout(400);

        const lightThemeState = await page.evaluate(() => {
          const isHtmlLight = document.documentElement.classList.contains('light');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          return { isHtmlLight, themeAttr, storageVal };
        });

        recordCheck('Theme switches to Light Mode on HTML and root dataset', lightThemeState.isHtmlLight && lightThemeState.themeAttr === 'light');
        recordCheck('Theme preference saved to localStorage as light', lightThemeState.storageVal === 'light');

        const shot10 = path.join(AUDIT_DIR, '10_light_theme_workbench.png');
        await page.screenshot({ path: shot10 });
        auditLog.screenshots.push('10_light_theme_workbench.png');
      }

      // 3. Select Midnight Blue Theme
      await openThemeDropdown();
      const btnMidnight = await page.$('button[data-set-theme="midnight"]');
      recordCheck('Midnight Blue option present in dropdown', !!btnMidnight);
      if (btnMidnight) {
        await btnMidnight.click();
        await page.waitForTimeout(400);

        const midnightThemeState = await page.evaluate(() => {
          const isHtmlMidnight = document.documentElement.classList.contains('midnight');
          const isHtmlDark = document.documentElement.classList.contains('dark');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          return { isHtmlMidnight, isHtmlDark, themeAttr, storageVal };
        });

        recordCheck(
          'Theme switches to Midnight Blue Mode (dominant dark blue)',
          midnightThemeState.isHtmlMidnight && midnightThemeState.themeAttr === 'midnight',
          `Class: midnight, dark; data-theme: ${midnightThemeState.themeAttr}`
        );
        recordCheck('Theme preference saved to localStorage as midnight', midnightThemeState.storageVal === 'midnight');

        const shot11 = path.join(AUDIT_DIR, '11_midnight_theme_workbench.png');
        await page.screenshot({ path: shot11 });
        auditLog.screenshots.push('11_midnight_theme_workbench.png');
      }

      // 4. Select Dark Emerald (Hijau Gelap) Theme
      await openThemeDropdown();
      const btnEmerald = await page.$('button[data-set-theme="emerald"]');
      recordCheck('Dark Emerald (Hijau Gelap) option present in dropdown', !!btnEmerald);
      if (btnEmerald) {
        await btnEmerald.click();
        await page.waitForTimeout(400);

        const emeraldThemeState = await page.evaluate(() => {
          const isHtmlEmerald = document.documentElement.classList.contains('emerald');
          const isHtmlDark = document.documentElement.classList.contains('dark');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          return { isHtmlEmerald, isHtmlDark, themeAttr, storageVal };
        });

        recordCheck(
          'Theme switches to Dark Emerald Mode (dominant dark forest green)',
          emeraldThemeState.isHtmlEmerald && emeraldThemeState.themeAttr === 'emerald',
          `Class: emerald, dark; data-theme: ${emeraldThemeState.themeAttr}`
        );
        recordCheck('Theme preference saved to localStorage as emerald', emeraldThemeState.storageVal === 'emerald');

        const shot12 = path.join(AUDIT_DIR, '12_emerald_theme_workbench.png');
        await page.screenshot({ path: shot12 });
        auditLog.screenshots.push('12_emerald_theme_workbench.png');
      }

      // 5. Select Dark Theme (Default)
      await openThemeDropdown();
      const btnDark = await page.$('button[data-set-theme="dark"]');
      recordCheck('Dark Theme option present in dropdown', !!btnDark);
      if (btnDark) {
        await btnDark.click();
        await page.waitForTimeout(400);

        const darkThemeState = await page.evaluate(() => {
          const isHtmlDark = document.documentElement.classList.contains('dark');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          return { isHtmlDark, themeAttr, storageVal };
        });

        recordCheck('Theme returns to Dark Mode cleanly', darkThemeState.isHtmlDark && darkThemeState.themeAttr === 'dark');
        recordCheck('Theme preference updated in localStorage as dark', darkThemeState.storageVal === 'dark');

        const shot12b = path.join(AUDIT_DIR, '12b_dark_theme_restored.png');
        await page.screenshot({ path: shot12b });
        auditLog.screenshots.push('12b_dark_theme_restored.png');
      }

      // Return to workbench
      await page.click('button[data-nav="workbench"]');
      await page.waitForTimeout(300);
    }

    // -------------------------------------------------------------
    // PHASE 10: Multi-Language (i18n) Switching Audit (ID, EN, JP, CN)
    // -------------------------------------------------------------
    console.log('\n10. Auditing Multi-Language (i18n) Switching (ID, EN, JP, CN)...');
    const langToggleBtn = await page.$('#btn-lang-toggle');
    recordCheck('Language Switcher Trigger Button present in Navbar', !!langToggleBtn);

    if (langToggleBtn) {
      // 1. Initial State should be Indonesian (ID)
      const initialLang = await page.evaluate(() => {
        return {
          langAttr: document.documentElement.getAttribute('lang') || 'id',
          storageVal: localStorage.getItem('netverse-lang') || 'id'
        };
      });
      recordCheck('Initial Language is ID (Bahasa Indonesia)', initialLang.storageVal === 'id');

      // Helper to open dropdown if hidden
      const openLangDropdown = async () => {
        const isHidden = await page.$eval('#lang-dropdown-menu', el => el.classList.contains('hidden'));
        if (isHidden) {
          await page.click('#btn-lang-toggle');
          await page.waitForTimeout(200);
        }
      };

      // 2. Switch to English (EN)
      await openLangDropdown();
      const btnEn = await page.$('button[data-select-lang="en"]');
      recordCheck('English (EN) option present in menu', !!btnEn);
      if (btnEn) {
        await btnEn.click();
        await page.waitForTimeout(400);

        const enState = await page.evaluate(() => {
          const navText = document.querySelector('button[data-nav="crimping"]')?.textContent || '';
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang'),
            navText
          };
        });

        recordCheck('Switched to English (EN)', enState.storageVal === 'en' && enState.langAttr === 'en');
        recordCheck('Navigation translated to English', enState.navText.includes('Cable Crimping') || enState.navText.includes('Crimping'));

        const shot13 = path.join(AUDIT_DIR, '13_lang_english.png');
        await page.screenshot({ path: shot13 });
        auditLog.screenshots.push('13_lang_english.png');
      }

      // 3. Switch to Japanese (JP)
      await openLangDropdown();
      const btnJp = await page.$('button[data-select-lang="jp"]');
      recordCheck('Japanese (JP) option present in menu', !!btnJp);
      if (btnJp) {
        await btnJp.click();
        await page.waitForTimeout(400);

        const jpState = await page.evaluate(() => {
          const navText = document.querySelector('nav button[data-nav="workbench"]')?.textContent || '';
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang'),
            navText
          };
        });

        recordCheck('Switched to Japanese (JP)', jpState.storageVal === 'jp' && jpState.langAttr === 'ja');
        recordCheck('Navigation translated to Japanese', jpState.navText.includes('ホーム') || jpState.navText.includes('ワークベンチ'));

        const shot14 = path.join(AUDIT_DIR, '14_lang_japanese.png');
        await page.screenshot({ path: shot14 });
        auditLog.screenshots.push('14_lang_japanese.png');
      }

      // 4. Switch to Chinese (CN)
      await openLangDropdown();
      const btnCn = await page.$('button[data-select-lang="cn"]');
      recordCheck('Chinese (CN) option present in menu', !!btnCn);
      if (btnCn) {
        await btnCn.click();
        await page.waitForTimeout(400);

        const cnState = await page.evaluate(() => {
          const navText = document.querySelector('nav button[data-nav="workbench"]')?.textContent || '';
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang'),
            navText
          };
        });

        recordCheck('Switched to Chinese (CN)', cnState.storageVal === 'cn' && cnState.langAttr === 'zh-CN');
        recordCheck('Navigation translated to Chinese', cnState.navText.includes('首页') || cnState.navText.includes('工作台'));

        const shot15 = path.join(AUDIT_DIR, '15_lang_chinese.png');
        await page.screenshot({ path: shot15 });
        auditLog.screenshots.push('15_lang_chinese.png');
      }

      // 5. Restore to Indonesian (ID)
      await openLangDropdown();
      const btnId = await page.$('button[data-select-lang="id"]');
      if (btnId) {
        await btnId.click();
        await page.waitForTimeout(400);

        const idState = await page.evaluate(() => {
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang')
          };
        });

        recordCheck('Restored language back to Indonesian (ID)', idState.storageVal === 'id' && idState.langAttr === 'id');
      }
    }


  } catch (error) {
    console.error('Audit encountered unexpected exception:', error);
    auditLog.errors.push({ type: 'fatal', message: error.message });
  } finally {
    await browser.close();
  }

  // Write audit results
  const reportPath = path.join(AUDIT_DIR, 'ui_audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditLog, null, 2));

  console.log('\n====================================================');
  console.log('   AUDIT COMPLETE                                   ');
  console.log(`   Passed:   ${auditLog.summary.passed}/${auditLog.summary.totalChecks}`);
  console.log(`   Failed:   ${auditLog.summary.failed}`);
  console.log(`   Warnings: ${auditLog.warnings.length}`);
  console.log(`   Report:   ${reportPath}`);
  console.log('====================================================\n');
}

runAudit();
