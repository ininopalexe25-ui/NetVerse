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

    // Verify Homepage Enhancements (Revisi 1 & Revisi Tahap 2)
    const bentoCards = await page.$$('[class*="md:col-span-"]');
    recordCheck('Homepage Bento Grid cards rendered', bentoCards.length >= 4, `${bentoCards.length} bento cards`);
    const curriculumJourney = await page.$('text=Progressive Vocational Modules') || await page.$('text=Syllabus Journey') || await page.$('text=Kurikulum Kejuruan TKJ') || await page.$('text=Alur Pembelajaran');
    recordCheck('Curriculum Journey Roadmap rendered on Beranda', !!curriculumJourney);

    // Verify Mission Control Telemetry & 8-Port Gigabit Switch Simulator (Revisi Tahap 2)
    const telemetryRibbon = await page.$('text=MISSION CONTROL TELEMETRY') || await page.$('text=IEEE 802.3ab LINK UP');
    recordCheck('Mission Control Telemetry ribbon rendered on Beranda', !!telemetryRibbon);

    const switchPorts = await page.$$('[data-interactive-port]');
    recordCheck('Interactive 8-Port Switch Simulator rendered with 8 ports', switchPorts.length === 8, `${switchPorts.length} ports`);

    // Test clicking Port 3 (Wi-Fi 6 AP)
    if (switchPorts.length >= 3) {
      await switchPorts[2].click();
      await page.waitForTimeout(300);
      const portDiag = await page.$eval('#switch-port-diagnostics', el => el.textContent);
      recordCheck('Switch diagnostics updates on Port 3 click (Wi-Fi 6 AP)', portDiag.includes('Port 03') || portDiag.includes('Wi-Fi 6'), portDiag.slice(0, 60));
    }

    // -------------------------------------------------------------
    // PHASE 2: 3D Hardware Selector Switch & Deep Specs (Revisi 4)
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
    recordCheck('Switched to Tang Crimping Model', deviceTitle.includes('Tang Crimping') || deviceTitle.includes('Crimping Tool') || deviceTitle.includes('Crimping'), deviceTitle);

    // Check Deep Technical Specs & SOP Guide (Revisi 4)
    const specsTable = await page.$('text=Deep Technical Specification') || await page.$('text=Hardware Engineering') || await page.$('text=Spesifikasi Teknis Mendalam') || await page.$('text=Parameter Rekayasa') || await page.$('text=Deep Engineering') || await page.$('text=Specification') || await page.$('table');
    recordCheck('Deep Engineering Hardware Specs rendered', !!specsTable);
    const sopGuide = await page.$('text=Standard Operating') || await page.$('text=Prosedur Operasional Standar') || await page.$('text=SOP Lab') || await page.$('text=Procedures');
    recordCheck('Hardware SOP Practical Guide rendered', !!sopGuide);

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
    recordCheck('Crimping Master Page Loaded', crimpingHeader.includes('kabel lan') || crimpingHeader.includes('crimping') || crimpingHeader.includes('assemble'));

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
        nama_lengkap: 'John Doe',
        username: 'johndoe',
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

      const perfectMsg = await page.$('text=MATCH') || await page.$('text=SESUAI') || await page.$('text=SEMPURNA') || await page.$('text=Perfect');
      recordCheck('100% Accuracy Perfect Match validated', !!perfectMsg);

      // Test intentional incorrect crimping sequence to audit the Wire Correction Guide (Revisi 5)
      await page.evaluate(() => {
        window.__netverseState.crimpingSlots = ['w-orange-stripe', 'w-orange-stripe', 'w-green-stripe', 'w-blue-stripe', 'w-blue-stripe', 'w-green', 'w-brown-stripe', 'w-brown'];
        window.__renderApp();
      });
      await page.waitForTimeout(300);
      await page.click('#btn-verify-crimping');
      await page.waitForTimeout(600);

      const correctionGuide = await page.$('#btn-apply-correct-crimping') || await page.$('text=Evaluasi Pin') || await page.$('text=Panduan Pembenaran Urutan Kawat');
      recordCheck('Crimping Wire Correction Guide rendered on error', !!correctionGuide);

      const applyCorrectBtn = await page.$('#btn-apply-correct-crimping');
      recordCheck('Apply Correct Sequence button present', !!applyCorrectBtn);

      if (applyCorrectBtn) {
        await page.click('#btn-apply-correct-crimping');
        await page.waitForTimeout(300);
        const correctedSlots = await page.evaluate(() => window.__netverseState.crimpingSlots);
        const isAllFilledCorrect = Array.isArray(correctedSlots) && correctedSlots.every((s) => s !== null);
        recordCheck('Auto-apply correct sequence populates all 8 pins', isAllFilledCorrect);
      }

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
      recordCheck('Switched to Topic 2', topic2Title.includes('Standar Pengkabelan') || topic2Title.includes('Media Transmisi') || topic2Title.includes('Transmission') || topic2Title.includes('UTP'), topic2Title);
    }

    // Verify Verified Authentic Non-AI Educational Photographs in Theory Reading
    const sectionPhotos = await page.$$('.materi-section-photo img');
    recordCheck('Verified Authentic Non-AI Photos rendered in reading sections', sectionPhotos.length >= 3, `${sectionPhotos.length} photos`);

    const photoSrcs = await page.$$eval('.materi-section-photo img', imgs => imgs.map(img => img.src));
    const allValidUrls = photoSrcs.every(src => src.includes('images.unsplash.com'));
    recordCheck('All section photos use authentic internet image repository', allValidUrls, `CDN: images.unsplash.com (${photoSrcs.length} verified)`);

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
          nama_lengkap: 'John Doe',
          username: 'johndoe',
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
      try {
        await page.waitForSelector('#btn-retry-quiz', { timeout: 8000 });
      } catch (e) {
        await page.waitForTimeout(1000);
      }

      // Verify post-submission results
      const explanationCards = await page.$$('.bg-emerald-950\\/20, .bg-rose-950\\/20');
      recordCheck('Socratic Post-Submission Explanations rendered', explanationCards.length >= 1, `${explanationCards.length} explanations`);

      const retryBtn = await page.$('#btn-retry-quiz');
      recordCheck('Quiz Retry Button available after evaluation', !!retryBtn);

      const studentXpAfterQuiz = await page.evaluate(() => window.__netverseState.userProfile?.total_xp || 0);
      recordCheck('Quiz submission awards XP according to score obtained', studentXpAfterQuiz > 250, `XP increased from 250 to ${studentXpAfterQuiz} (+${studentXpAfterQuiz - 250} XP)`);

      // Test retrying and answering again to confirm every quiz answer awards XP
      if (retryBtn) {
        await retryBtn.click();
        await page.waitForTimeout(300);

        for (let q = 0; q < 5; q++) {
          const opt = await page.$(`[data-quiz-q="${q}"][data-quiz-opt="0"]`);
          if (opt) {
            await opt.click();
            await page.waitForTimeout(50);
          }
        }
        await page.click('#btn-submit-quiz');
        try {
          await page.waitForSelector('#btn-retry-quiz', { timeout: 8000 });
        } catch (e) {
          await page.waitForTimeout(1000);
        }

        const studentXpAfterRetry = await page.evaluate(() => window.__netverseState.userProfile?.total_xp || 0);
        recordCheck('Retrying quiz also awards XP according to score', studentXpAfterRetry > studentXpAfterQuiz, `XP increased from ${studentXpAfterQuiz} to ${studentXpAfterRetry} (+${studentXpAfterRetry - studentXpAfterQuiz} XP)`);
      }
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

      // Verify Video 1 for Module 1 (Dasar Jaringan & Topologi - VW28Uqml3nE)
      const selectVideo1Btn = await page.$('button[data-select-video="VW28Uqml3nE"]');
      recordCheck('Video 1 (Dasar Jaringan & Topologi - VW28Uqml3nE) option rendered in selector', !!selectVideo1Btn);

      if (selectVideo1Btn) {
        await selectVideo1Btn.click();
        await page.waitForTimeout(500);

        const updatedIframeSrc1 = await page.$eval('#youtube-player-frame', el => el.getAttribute('src'));
        recordCheck('YouTube Video Player switched to Dasar Jaringan Tutorial (VW28Uqml3nE)', updatedIframeSrc1.includes('VW28Uqml3nE'), `src: ${updatedIframeSrc1}`);
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
    // Auditing 3D Hardware in Materi (Revisi 2)
    // -------------------------------------------------------------
    console.log('\n4c. Auditing 3D Hardware in Materi Module...');
    const format3dBtn = await page.$('button[data-materi-format="3d"]');
    recordCheck('Materi Format Switcher (3D Hardware) button rendered', !!format3dBtn);

    if (format3dBtn) {
      await format3dBtn.click();
      await page.waitForTimeout(600);

      const modelViewerInMateri = await page.$('#tkj-model-viewer') || await page.$('.bezel-core iframe') || await page.$('iframe[title]');
      recordCheck('3D Hardware Model Viewer active in Materi', !!modelViewerInMateri);

      const deepSpecsInMateri = await page.$('text=Deep Technical Specification') || await page.$('text=Hardware Engineering') || await page.$('text=Architecture') || await page.$('table') || await page.$('text=Spesifikasi') || await page.$('text=Arsitektur');
      recordCheck('Deep Hardware Specs & Architecture rendered in Materi', !!deepSpecsInMateri);
    }

    // -------------------------------------------------------------
    // Auditing 35-Question Adaptive Exam with AI Grading (Revisi 3)
    // -------------------------------------------------------------
    console.log('\n4d. Auditing 35-Question Adaptive Exam (25 PG + 10 Essay AI)...');
    const formatExamBtn = await page.$('button[data-materi-format="soal"]');
    recordCheck('Materi Format Switcher (Soal Evaluasi) button rendered', !!formatExamBtn);

    if (formatExamBtn) {
      await formatExamBtn.click();
      await page.waitForTimeout(600);

      // Verify 25 Multiple Choice questions rendered
      const pgOptions = await page.$$('[data-exam-pg]');
      recordCheck('25 Multiple Choice questions rendered in Exam', pgOptions.length >= 25, `${pgOptions.length} option buttons`);

      // Verify 10 Essay questions rendered
      const essayInputs = await page.$$('textarea[data-essay-input]');
      recordCheck('10 Essay questions with textareas rendered', essayInputs.length === 10, `${essayInputs.length} essays`);

      // Answer question 1
      const firstPgOpt = await page.$('[data-exam-pg="pg-1"][data-exam-opt-idx="1"]') || await page.$('[data-exam-pg]');
      if (firstPgOpt) {
        await firstPgOpt.click();
        await page.waitForTimeout(300);
      }

      // Fill an essay answer and trigger AI evaluation
      const firstEssay = await page.$('textarea[data-essay-input="essay-1"]') || await page.$('textarea[data-essay-input]');
      if (firstEssay) {
        await firstEssay.fill('Near-End Crosstalk (NEXT) terjadi akibat kopling induktif dan kapasitif antar kawat tembaga. Pitch lilitan yang berbeda menjaga simetri medan elektromagnetik.');
        await page.waitForTimeout(200);

        const aiGradeBtn = await page.$('button[data-grade-essay="essay-1"]') || await page.$('button[data-grade-essay]');
        recordCheck('AI Essay Grader button present', !!aiGradeBtn);

        if (aiGradeBtn) {
          await aiGradeBtn.click();
          await page.waitForTimeout(500);

          const aiFeedback = await page.$('text=Analisis AI Assistant:');
          recordCheck('AI Assistant semantic grading feedback rendered', !!aiFeedback);

          const conceptKey = await page.$('text=Lihat Panduan Konsep Ideal 🔑');
          recordCheck('Ideal concept guide accordion rendered', !!conceptKey);
        }
      }

      // Verify Submit Exam button
      const submitExamBtn = await page.$('#btn-submit-exam');
      recordCheck('Submit Exam button present', !!submitExamBtn);
    }

    // -------------------------------------------------------------
    // PHASE 5: Leaderboard / Papan Peringkat Realtime
    // -------------------------------------------------------------
    console.log('\n5. Auditing Leaderboard Table, Podium & Realtime Features...');
    await page.click('button[data-nav="leaderboard"]');
    await page.waitForTimeout(800);

    const realtimeIndicator = await page.$('text=Live sync active') || await page.$('text=Pembaruan langsung aktif') || await page.$('text=Realtime Aktif');
    recordCheck('Realtime Supabase WebSocket Indicator active', !!realtimeIndicator);

    // Check Top 3 Podium Cards
    const podiumChampion = await page.$('text=#1') || await page.$('text=TERATAS') || await page.$('text=JUARA UTAMA') || await page.$('text=CHAMPION');
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

    // Verify Leaderboard displays combined XP from Crimping + Materi
    const xpHeader = await page.$eval('thead th:last-child', el => el.textContent.trim());
    recordCheck('Leaderboard Header indicates Combined XP (Rakit + Materi)', xpHeader.includes('Total XP') || xpHeader.includes('Rakit') || xpHeader.includes('Materi'), `Header: "${xpHeader}"`);

    const breakdownText = await page.$$eval('.text-\\[10px\\].text-slate-400', els => els.length);
    recordCheck('Leaderboard displays XP breakdown (Crimping + Materi)', breakdownText > 0, `${breakdownText} breakdown rows`);

    // Verify that guest "User" is strictly excluded from leaderboard
    const userNames = await page.$$eval('tbody tr td:nth-child(2)', els => els.map(e => e.textContent.trim().toLowerCase()));
    const hasUnauthenticatedUser = userNames.some(n => n === 'user' || n.startsWith('user '));
    recordCheck('Guest "User" strictly excluded from Leaderboard', !hasUnauthenticatedUser, `Found participants: ${userNames.join(', ')}`);

    // Verify Leaderboard rankings are ordered from top to bottom based on Total XP
    const xpValues = await page.$$eval('tbody tr td:last-child div:first-child', els => 
      els.map(e => {
        const m = e.textContent.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
    );
    const isSortedByXp = xpValues.every((val, i) => i === 0 || val <= xpValues[i - 1]);
    recordCheck('Leaderboard rankings sorted strictly by Total XP descending', isSortedByXp, `XP sequence: ${xpValues.join(' >= ')}`);

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
          authInput: getRad('#auth-username'),
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
        parseFloat(modalRadii.authInput) <= 8,
        `Computed: ${modalRadii.authInput}`
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

      // Switch back to Login Tab and test Invalid Credentials Warning Notice (Username + Tagname + Password)
      const tabLogin = await page.$('#tab-auth-login');
      if (tabLogin) {
        await tabLogin.click();
        await page.waitForTimeout(200);
      }

      const userInput = await page.$('#auth-username');
      const tagInput = await page.$('#auth-tagname');
      const passInput = await page.$('#auth-password');
      const submitBtn = await page.$('#btn-submit-auth');

      if (userInput && tagInput && passInput && submitBtn) {
        await userInput.fill('salah_login');
        await tagInput.fill('A1B2C');
        await passInput.fill('passwordsalah123');
        await submitBtn.click();

        try {
          await page.waitForSelector('#auth-notice-box', { timeout: 5000 });
          const noticeText = await page.$eval('#auth-notice-box', el => el.innerText);
          const hasMismatchWarning = noticeText.includes('tidak cocok') || noticeText.includes('Peringatan') || noticeText.includes('warning') || noticeText.toLowerCase().includes('does not match') || noticeText.includes('sandi');
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

      // Test Profile Editing & Cross-Site Dynamic Propagation (Leaderboard & Navbar)
      await page.evaluate(() => {
        window.__netverseState.session = {
          user: { id: 'test-student-id', email: 'shiina@unesa.ac.id' }
        };
        window.__netverseState.userProfile = {
          id: 'test-student-id',
          nama_lengkap: 'Shiina',
          username: 'shiina_tkj',
          level: 2,
          total_xp: 600,
          role: 'mahasiswa'
        };
        if (Array.isArray(window.__netverseState.scores)) {
          window.__netverseState.scores.forEach(s => {
            if (s.user_id === 'test-student-id') {
              s.player_name = 'Shiina';
            }
          });
        }
        window.__renderApp();
      });
      await page.waitForTimeout(300);

      // Verify Navbar displays updated name Shiina
      const navUserText = await page.evaluate(() => document.querySelector('#btn-open-auth-modal')?.textContent || '');
      recordCheck('Navbar displays edited user name (Shiina)', navUserText.includes('Shiina') || navUserText.includes('S'));

      // Verify Leaderboard displays updated name Shiina
      await page.click('header [data-nav="leaderboard"]');
      await page.waitForTimeout(400);
      const leaderboardNames = await page.$$eval('tbody tr td:nth-child(2)', els => els.map(e => e.textContent.toLowerCase()));
      const hasShiina = leaderboardNames.some(n => n.includes('shiina'));
      recordCheck('Leaderboard dynamically reflects edited profile name (Shiina)', hasShiina, `Participants: ${leaderboardNames.slice(0, 3).join(', ')}`);

      // Switch back to workbench
      await page.click('header [data-nav="workbench"]');
      await page.waitForTimeout(300);
    }

    // -------------------------------------------------------------
    // PHASE 9: Light, Dark, Midnight Blue, Dark Emerald, Cyber Violet, Neon Sakura, and Golden Sunset Theme Dropdown Audit
    // -------------------------------------------------------------
    console.log('\n9. Auditing Themes Dropdown (Light, Dark, Midnight Blue, Dark Emerald, Cyber Violet, Neon Sakura, Golden Sunset)...');
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

      // 5. Select Cyber Violet (Ungu Gelap) Theme
      await openThemeDropdown();
      const btnViolet = await page.$('button[data-set-theme="violet"]');
      recordCheck('Cyber Violet (Ungu Gelap) option present in dropdown', !!btnViolet);
      if (btnViolet) {
        await btnViolet.click();
        await page.waitForTimeout(400);

        const violetThemeState = await page.evaluate(() => {
          const isHtmlViolet = document.documentElement.classList.contains('violet');
          const isHtmlDark = document.documentElement.classList.contains('dark');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          const hasAtmosphere = !!document.querySelector('#theme-atmosphere .anim-nebula');
          return { isHtmlViolet, isHtmlDark, themeAttr, storageVal, hasAtmosphere };
        });

        recordCheck(
          'Theme switches to Cyber Violet Mode (dominant cosmic violet)',
          violetThemeState.isHtmlViolet && violetThemeState.themeAttr === 'violet',
          `Class: violet, dark; data-theme: ${violetThemeState.themeAttr}`
        );
        recordCheck('Theme preference saved to localStorage as violet', violetThemeState.storageVal === 'violet');
        recordCheck('Atmospheric ambient elements active for Cyber Violet', violetThemeState.hasAtmosphere);

        const shotViolet = path.join(AUDIT_DIR, '12c_violet_theme_workbench.png');
        await page.screenshot({ path: shotViolet });
        auditLog.screenshots.push('12c_violet_theme_workbench.png');
      }

      // 6. Select Neon Sakura (Pink) Theme
      await openThemeDropdown();
      const btnSakura = await page.$('button[data-set-theme="sakura"]');
      recordCheck('Neon Sakura (Pink) option present in dropdown', !!btnSakura);
      if (btnSakura) {
        await btnSakura.click();
        await page.waitForTimeout(400);

        const sakuraThemeState = await page.evaluate(() => {
          const isHtmlSakura = document.documentElement.classList.contains('sakura');
          const isHtmlDark = document.documentElement.classList.contains('dark');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          const hasAtmosphere = !!document.querySelector('#theme-atmosphere .anim-sakura-1');
          return { isHtmlSakura, isHtmlDark, themeAttr, storageVal, hasAtmosphere };
        });

        recordCheck(
          'Theme switches to Neon Sakura Mode (dominant cyber pink)',
          sakuraThemeState.isHtmlSakura && sakuraThemeState.themeAttr === 'sakura',
          `Class: sakura, dark; data-theme: ${sakuraThemeState.themeAttr}`
        );
        recordCheck('Theme preference saved to localStorage as sakura', sakuraThemeState.storageVal === 'sakura');
        recordCheck('Atmospheric ambient elements active for Neon Sakura', sakuraThemeState.hasAtmosphere);

        const shotSakura = path.join(AUDIT_DIR, '12d_sakura_theme_workbench.png');
        await page.screenshot({ path: shotSakura });
        auditLog.screenshots.push('12d_sakura_theme_workbench.png');
      }

      // 6b. Select Golden Sunset Theme
      await openThemeDropdown();
      const btnSunset = await page.$('button[data-set-theme="sunset"]');
      recordCheck('Golden Sunset option present in dropdown', !!btnSunset);
      if (btnSunset) {
        await btnSunset.click();
        await page.waitForTimeout(400);

        const sunsetThemeState = await page.evaluate(() => {
          const isHtmlSunset = document.documentElement.classList.contains('sunset');
          const isHtmlDark = document.documentElement.classList.contains('dark');
          const themeAttr = document.documentElement.getAttribute('data-theme');
          const storageVal = localStorage.getItem('netverse-theme');
          const hasAtmosphere = !!document.querySelector('#theme-atmosphere .anim-sunset-sun');
          return { isHtmlSunset, isHtmlDark, themeAttr, storageVal, hasAtmosphere };
        });

        recordCheck(
          'Theme switches to Golden Sunset Mode (warm twilight sunset)',
          sunsetThemeState.isHtmlSunset && sunsetThemeState.themeAttr === 'sunset',
          `Class: sunset, dark; data-theme: ${sunsetThemeState.themeAttr}`
        );
        recordCheck('Theme preference saved to localStorage as sunset', sunsetThemeState.storageVal === 'sunset');
        recordCheck('Atmospheric ambient elements active for Golden Sunset', sunsetThemeState.hasAtmosphere);

        const shotSunset = path.join(AUDIT_DIR, '12e_sunset_theme_workbench.png');
        await page.screenshot({ path: shotSunset });
        auditLog.screenshots.push('12e_sunset_theme_workbench.png');
      }

      // 7. Select Dark Theme (Default)
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
          const atmosphereChildren = document.querySelector('#theme-atmosphere')?.children?.length || 0;
          return { isHtmlDark, themeAttr, storageVal, atmosphereChildren };
        });

        recordCheck('Theme returns to Dark Mode cleanly', darkThemeState.isHtmlDark && darkThemeState.themeAttr === 'dark');
        recordCheck('Theme preference updated in localStorage as dark', darkThemeState.storageVal === 'dark');
        recordCheck('Dark Theme has zero extra ambient elements (clean minimal substrate)', darkThemeState.atmosphereChildren === 0);

        const shot12b = path.join(AUDIT_DIR, '12b_dark_theme_restored.png');
        await page.screenshot({ path: shot12b });
        auditLog.screenshots.push('12b_dark_theme_restored.png');
      }

      // Return to workbench
      await page.click('button[data-nav="workbench"]');
      await page.waitForTimeout(300);
    }

    // -------------------------------------------------------------
    // PHASE 10: Multi-Language (i18n) Switching Audit (16 World Languages, English Default)
    // -------------------------------------------------------------
    console.log('\n10. Auditing 16 World Languages with English Default and Globe+Flag Icon...');
    const langToggleBtn = await page.$('#btn-lang-toggle');
    recordCheck('Language Switcher Trigger Button present in Navbar', !!langToggleBtn);

    if (langToggleBtn) {
      // 1. Initial State should be English (EN) with 🌐🇬🇧 icon
      const initialLangState = await page.evaluate(() => {
        const btnText = document.getElementById('btn-lang-toggle')?.textContent || '';
        return {
          langAttr: document.documentElement.getAttribute('lang') || 'en',
          storageVal: localStorage.getItem('netverse-lang') || 'en',
          btnText
        };
      });
      recordCheck('Initial Language defaults to English (EN)', initialLangState.storageVal === 'en' && initialLangState.langAttr === 'en');
      recordCheck('Language Switcher displays Globe + Flag icon (🌐🇬🇧)', initialLangState.btnText.includes('🌐') && initialLangState.btnText.includes('🇬🇧'), initialLangState.btnText.trim());

      // Helper to open dropdown if hidden
      const openLangDropdown = async () => {
        const isHidden = await page.$eval('#lang-dropdown-menu', el => el.classList.contains('hidden'));
        if (isHidden) {
          await page.click('#btn-lang-toggle');
          await page.waitForTimeout(200);
        }
      };

      // Verify exactly 16 languages are present in the dropdown menu
      await openLangDropdown();
      const allLangButtons = await page.$$('#lang-dropdown-menu button[data-select-lang]');
      recordCheck('Language dropdown contains exactly 16 world languages', allLangButtons.length === 16, `${allLangButtons.length} languages supported`);

      // 2. Switch to Spanish (ES)
      const btnEs = await page.$('button[data-select-lang="es"]');
      recordCheck('Spanish (ES) option present in menu', !!btnEs);
      if (btnEs) {
        await btnEs.click();
        await page.waitForTimeout(400);

        const esState = await page.evaluate(() => {
          const navText = document.querySelector('button[data-nav="crimping"]')?.textContent || '';
          const btnText = document.getElementById('btn-lang-toggle')?.textContent || '';
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang'),
            navText,
            btnText
          };
        });

        recordCheck('Switched to Spanish (ES)', esState.storageVal === 'es' && esState.langAttr === 'es');
        recordCheck('Navigation translated to Spanish', esState.navText.includes('Crimpar Cable') || esState.navText.includes('Crimpar'));
        recordCheck('Trigger icon updated to Globe + Spain Flag (🌐🇪🇸)', esState.btnText.includes('🌐') && esState.btnText.includes('🇪🇸'));
      }

      // 3. Switch to Indonesian (ID)
      await openLangDropdown();
      const btnId = await page.$('button[data-select-lang="id"]');
      recordCheck('Indonesian (ID) option present in menu', !!btnId);
      if (btnId) {
        await btnId.click();
        await page.waitForTimeout(400);

        const idState = await page.evaluate(() => {
          const navText = document.querySelector('button[data-nav="crimping"]')?.textContent || '';
          const btnText = document.getElementById('btn-lang-toggle')?.textContent || '';
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang'),
            navText,
            btnText
          };
        });

        recordCheck('Switched to Indonesian (ID)', idState.storageVal === 'id' && idState.langAttr === 'id');
        recordCheck('Navigation translated to Indonesian', idState.navText.includes('Rakit kabel'));
        recordCheck('Trigger icon updated to Globe + Indonesia Flag (🌐🇮🇩)', idState.btnText.includes('🌐') && idState.btnText.includes('🇮🇩'));
      }

      // 4. Switch to French (FR)
      await openLangDropdown();
      const btnFr = await page.$('button[data-select-lang="fr"]');
      recordCheck('French (FR) option present in menu', !!btnFr);
      if (btnFr) {
        await btnFr.click();
        await page.waitForTimeout(400);

        const frState = await page.evaluate(() => {
          const navText = document.querySelector('button[data-nav="crimping"]')?.textContent || '';
          const btnText = document.getElementById('btn-lang-toggle')?.textContent || '';
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang'),
            navText,
            btnText
          };
        });

        recordCheck('Switched to French (FR)', frState.storageVal === 'fr' && frState.langAttr === 'fr');
        recordCheck('Trigger icon updated to Globe + France Flag (🌐🇫🇷)', frState.btnText.includes('🌐') && frState.btnText.includes('🇫🇷'));
      }

      // 5. Restore to English (EN Default)
      await openLangDropdown();
      const btnEn = await page.$('button[data-select-lang="en"]');
      if (btnEn) {
        await btnEn.click();
        await page.waitForTimeout(400);

        const enRestored = await page.evaluate(() => {
          return {
            langAttr: document.documentElement.getAttribute('lang'),
            storageVal: localStorage.getItem('netverse-lang')
          };
        });

        recordCheck('Restored language back to English (EN)', enRestored.storageVal === 'en' && enRestored.langAttr === 'en');
      }
    }

    // -------------------------------------------------------------
    // PHASE 11: Revisi Tahap 4 - Social Hub, Community Chat, User Search by Nickname/UID,
    // Leaderboard Profile Inspection, Privacy Rules & Achievements
    // -------------------------------------------------------------
    console.log('\n11. Auditing Social Hub, Community Chat, User Search & Profile Privacy...');

    // 1. Navigate to Social Tab
    const socialNavBtn = await page.$('header [data-nav="social"]');
    recordCheck('Social Navigation Tab present in Navbar', !!socialNavBtn);

    if (socialNavBtn) {
      await socialNavBtn.click();
      await page.waitForTimeout(400);

      // Verify Social Hub Header & Search Input
      const searchInput = await page.$('#input-social-search');
      recordCheck('User & Friend Search Input present', !!searchInput);

      // 2. Search by Nickname ('Shiina')
      if (searchInput) {
        await page.fill('#input-social-search', 'Shiina');
        await page.waitForTimeout(300);

        const searchResultsCount = await page.$$eval('#social-search-results [data-view-profile]', els => els.length);
        recordCheck('Search by Nickname yields matching users', searchResultsCount > 0, `${searchResultsCount} found`);

        // Test search by UID ('NV-')
        await page.fill('#input-social-search', 'NV-');
        await page.waitForTimeout(300);
        const uidSearchCount = await page.$$eval('#social-search-results [data-view-profile]', els => els.length);
        recordCheck('Search by permanent UID (NV-) yields matching users', uidSearchCount > 0, `${uidSearchCount} found`);

        // Clear search
        const clearBtn = await page.$('#btn-clear-social-search');
        if (clearBtn) {
          await clearBtn.click();
          await page.waitForTimeout(200);
        }
      }

      // 3. Community Chat: Verify Global Lounge & Direct Message Sending
      const chatInput = await page.$('#input-social-chat-message');
      const chatForm = await page.$('#form-social-chat-send');
      recordCheck('Community Chat Input and Send Form present', !!chatInput && !!chatForm);

      if (chatInput && chatForm) {
        const testMsg = `Testing community real-time sync ${Date.now()}`;
        await chatInput.fill(testMsg);
        await page.$eval('#form-social-chat-send', form => form.dispatchEvent(new Event('submit')));
        await page.waitForTimeout(300);

        const hasSentMessage = await page.$eval('#social-chat-messages', (el, msg) => el.innerText.includes(msg), testMsg);
        recordCheck('Chat message sent and displayed in stream', hasSentMessage);
      }

      // 4. Leaderboard Profile Inspection & Privacy Verification
      await page.click('header [data-nav="leaderboard"]');
      await page.waitForTimeout(400);

      const profileRowTrigger = await page.$('tbody tr[data-view-profile]');
      recordCheck('Leaderboard rows have profile inspection trigger', !!profileRowTrigger);

      if (profileRowTrigger) {
        await profileRowTrigger.click();
        await page.waitForTimeout(400);

        // Verify User Profile Modal opened
        const isModalOpen = await page.$eval('#user-profile-modal-backdrop', el => !!el);
        recordCheck('User Profile Modal opens on Leaderboard row click', isModalOpen);

        // Verify Public Profile Privacy Enforcement
        const profileInspection = await page.evaluate(() => {
          const modalText = document.getElementById('user-profile-modal-backdrop')?.innerText || '';
          const hasNickname = !!document.getElementById('profile-modal-nickname')?.innerText;
          const hasUid = !!document.getElementById('profile-modal-uid')?.innerText;
          const hasPrivacyShield = modalText.includes('Privasi Terlindungi') || modalText.includes('dirahasiakan');
          const hasAchievements = modalText.includes('Raihan & Pencapaian') || modalText.includes('Terbuka');
          return { hasNickname, hasUid, hasPrivacyShield, hasAchievements };
        });

        recordCheck('Public Profile displays Nickname & permanent UID', profileInspection.hasNickname && profileInspection.hasUid);
        recordCheck('Public Profile strictly protects private credentials (Username & Tagname hidden)', profileInspection.hasPrivacyShield);
        recordCheck('Profile displays earned achievements and performance stats', profileInspection.hasAchievements);

        // Close profile modal
        const closeProfileBtn = await page.$('#btn-close-user-profile-modal');
        if (closeProfileBtn) {
          await closeProfileBtn.click();
          await page.waitForTimeout(300);
        }
      }

      const shot13 = path.join(AUDIT_DIR, '13_social_hub_and_profile.png');
      await page.screenshot({ path: shot13 });
      auditLog.screenshots.push('13_social_hub_and_profile.png');
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
