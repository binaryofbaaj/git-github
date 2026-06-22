/* ============================================================
   Git & GitHub Learning Site — Shared JavaScript
   ============================================================ */

(function() {
  'use strict';

  /* ---------- Scroll Progress Bar ---------- */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  /* ---------- Intersection Observer (animate on view) ---------- */
  function initIntersectionObserver() {
    const els = document.querySelectorAll('.animate-on-view, .diagram-container, [data-animate]');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
  }

  /* ---------- Copy to Clipboard ---------- */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.command-block');
        if (!block) return;
        const code = block.querySelector('pre')?.textContent || '';
        navigator.clipboard.writeText(code).then(() => {
          btn.classList.add('copied');
          const orig = btn.innerHTML;
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = orig;
          }, 2000);
        });
      });
    });
  }

  /* ---------- Sidebar Toggle ---------- */
  function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const hamburger = document.querySelector('.hamburger-btn');
    if (!sidebar || !hamburger) return;

    function toggle() {
      const open = sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open);
    }

    hamburger.addEventListener('click', toggle);
    if (overlay) overlay.addEventListener('click', toggle);

    // Mark current page active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });

    // Mark visited pages
    const visited = JSON.parse(localStorage.getItem('gitguide-visited') || '[]');
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href');
      if (visited.includes(href)) {
        link.classList.add('visited');
      }
    });
  }

  /* ---------- Track Page Visit ---------- */
  function trackPageVisit() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const visited = JSON.parse(localStorage.getItem('gitguide-visited') || '[]');
    if (!visited.includes(currentPage)) {
      visited.push(currentPage);
      localStorage.setItem('gitguide-visited', JSON.stringify(visited));
    }
  }

  /* ---------- Reading Time ---------- */
  function initReadingTime() {
    const el = document.querySelector('.reading-time-value');
    if (!el) return;
    const text = document.querySelector('.page-content')?.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    el.textContent = mins + ' min read';
  }

  /* ---------- Glossary Tooltips ---------- */
  function initGlossaryTooltips() {
    document.querySelectorAll('.glossary-term').forEach(term => {
      term.setAttribute('tabindex', '0');
      term.setAttribute('role', 'button');
      term.setAttribute('aria-describedby', 'tooltip-' + Math.random().toString(36).substr(2, 9));
    });
  }

  /* ---------- OS Tabs ---------- */
  function initOSTabs() {
    document.querySelectorAll('.os-tabs').forEach(tabGroup => {
      const parent = tabGroup.parentElement;
      const tabs = tabGroup.querySelectorAll('.os-tab');
      const contents = parent.querySelectorAll('.os-content');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.os;
          tabs.forEach(t => t.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          tab.classList.add('active');
          const targetContent = parent.querySelector(`.os-content[data-os="${target}"]`);
          if (targetContent) targetContent.classList.add('active');
        });
      });
    });
  }

  /* ---------- Terminal Simulator ---------- */
  function initTerminalSims() {
    document.querySelectorAll('.terminal-sim').forEach(sim => {
      const input = sim.querySelector('.terminal-sim-input');
      const body = sim.querySelector('.terminal-sim-body');
      const commands = JSON.parse(sim.dataset.commands || '{}');
      const quickBtns = sim.querySelectorAll('.terminal-sim-btn');

      function runCommand(cmd) {
        if (!cmd.trim()) return;

        // Add command line to output
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-sim-line';
        cmdLine.innerHTML = '<span class="cmd-prompt">$ </span><span class="cmd-command">' + escapeHtml(cmd) + '</span>';
        body.appendChild(cmdLine);

        // Find matching output
        const output = commands[cmd.trim()] || commands[cmd.trim().split(' ').slice(0, 3).join(' ')] || 'Command not recognized in this simulation. Try one of the suggested commands.';

        // Add output with typing effect
        const lines = output.split('\n');
        lines.forEach((line, i) => {
          setTimeout(() => {
            const outLine = document.createElement('div');
            outLine.className = 'terminal-sim-line cmd-output';
            outLine.innerHTML = formatOutput(line);
            body.appendChild(outLine);
            body.scrollTop = body.scrollHeight;
          }, (i + 1) * 80);
        });

        // Add empty line after output
        setTimeout(() => {
          body.scrollTop = body.scrollHeight;
        }, (lines.length + 1) * 80);
      }

      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            runCommand(input.value);
            input.value = '';
          }
        });
      }

      quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const cmd = btn.dataset.cmd;
          if (cmd) runCommand(cmd);
        });
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatOutput(line) {
    // Color formatting for git status style output
    if (line.startsWith('+') || line.includes('new file:') || line.includes('added:')) {
      return '<span class="cmd-added">' + escapeHtml(line) + '</span>';
    }
    if (line.startsWith('-') || line.includes('deleted:')) {
      return '<span class="cmd-removed">' + escapeHtml(line) + '</span>';
    }
    if (line.startsWith('#') || line.startsWith('//')) {
      return '<span class="cmd-comment">' + escapeHtml(line) + '</span>';
    }
    if (line.includes('modified:') || line.includes('warning')) {
      return '<span style="color: var(--accent-orange)">' + escapeHtml(line) + '</span>';
    }
    return escapeHtml(line);
  }

  /* ---------- Before/After Slider ---------- */
  function initBeforeAfterSliders() {
    document.querySelectorAll('.before-after-slider').forEach(slider => {
      const divider = slider.querySelector('.ba-divider');
      const leftSide = slider.querySelector('.ba-side:first-child');
      if (!divider || !leftSide) return;

      let isDragging = false;

      function onMove(clientX) {
        const rect = slider.getBoundingClientRect();
        let pct = ((clientX - rect.left) / rect.width) * 100;
        pct = Math.max(10, Math.min(90, pct));
        divider.style.left = pct + '%';
        leftSide.style.flex = '0 0 ' + pct + '%';
      }

      divider.addEventListener('mousedown', () => { isDragging = true; });
      window.addEventListener('mousemove', (e) => { if (isDragging) onMove(e.clientX); });
      window.addEventListener('mouseup', () => { isDragging = false; });

      divider.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (isDragging) onMove(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchend', () => { isDragging = false; });
    });
  }

  /* ---------- Cheatsheet Search / Command Finder ---------- */
  function initCommandFinder() {
    const input = document.getElementById('command-search');
    if (!input) return;

    input.addEventListener('input', () => {
      const query = input.value.toLowerCase();
      document.querySelectorAll('.cheat-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });

      // Show/hide category sections that have no visible cards
      document.querySelectorAll('.category-section').forEach(section => {
        const visibleCards = section.querySelectorAll('.cheat-card:not([style*="display: none"])');
        section.style.display = visibleCards.length ? '' : 'none';
      });
    });
  }

  /* ---------- Git Commit Simulator (Page 06) ---------- */
  function initCommitSimulator() {
    const container = document.getElementById('commit-simulator');
    if (!container) return;

    const state = {
      workingFiles: [],
      stagedFiles: [],
      commits: [],
      commitCount: 0
    };

    const fileInput = container.querySelector('#sim-file-name');
    const contentInput = container.querySelector('#sim-file-content');
    const createBtn = container.querySelector('#sim-create-file');
    const addBtn = container.querySelector('#sim-git-add');
    const commitBtn = container.querySelector('#sim-git-commit');
    const msgInput = container.querySelector('#sim-commit-msg');
    const workingZone = container.querySelector('#sim-working');
    const stagedZone = container.querySelector('#sim-staged');
    const timeline = container.querySelector('#sim-timeline');

    if (createBtn) {
      createBtn.addEventListener('click', () => {
        const name = fileInput?.value.trim();
        if (!name) return;
        state.workingFiles.push({ name, content: contentInput?.value || '' });
        if (fileInput) fileInput.value = '';
        if (contentInput) contentInput.value = '';
        renderState();
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (state.workingFiles.length === 0) return;
        state.stagedFiles.push(...state.workingFiles);
        state.workingFiles = [];
        renderState();
      });
    }

    if (commitBtn) {
      commitBtn.addEventListener('click', () => {
        if (state.stagedFiles.length === 0) return;
        state.commitCount++;
        const msg = msgInput?.value || 'Update files';
        const hash = Math.random().toString(16).substr(2, 7);
        state.commits.push({
          hash,
          message: msg,
          files: [...state.stagedFiles]
        });
        state.stagedFiles = [];
        if (msgInput) msgInput.value = '';
        renderState();
      });
    }

    function renderState() {
      // Working files
      if (workingZone) {
        workingZone.innerHTML = state.workingFiles.length === 0
          ? '<span class="text-muted" style="font-size:var(--fs-xs)">No files</span>'
          : state.workingFiles.map(f => `<div class="staging-file">📄 ${escapeHtml(f.name)}</div>`).join('');
      }

      // Staged files
      if (stagedZone) {
        stagedZone.innerHTML = state.stagedFiles.length === 0
          ? '<span class="text-muted" style="font-size:var(--fs-xs)">No files staged</span>'
          : state.stagedFiles.map(f => `<div class="staging-file" style="color:var(--accent-green)">✓ ${escapeHtml(f.name)}</div>`).join('');
      }

      // Timeline
      if (timeline) {
        if (state.commits.length === 0) {
          timeline.innerHTML = '<span class="text-muted" style="font-size:var(--fs-sm)">No commits yet. Create a file, stage it, and commit!</span>';
        } else {
          timeline.innerHTML = state.commits.map((c, i) => `
            <div class="commit-node">
              <div class="commit-dot${i === state.commits.length - 1 ? ' green' : ''}">${i + 1}</div>
              <div class="commit-label" title="${escapeHtml(c.message)}">${escapeHtml(c.message.substring(0, 20))}</div>
              ${i === state.commits.length - 1 ? '<span class="commit-tag head-tag">HEAD</span>' : ''}
            </div>
            ${i < state.commits.length - 1 ? '<div class="commit-connector"></div>' : ''}
          `).join('');
        }
      }
    }

    renderState();
  }

  /* ---------- Branch Visualizer (Page 07) ---------- */
  function initBranchVisualizer() {
    const container = document.getElementById('branch-visualizer');
    if (!container) return;

    const state = {
      branches: { main: [{ hash: 'a1b2c3d', msg: 'Initial commit' }] },
      currentBranch: 'main',
      commitCounter: 1
    };

    const branchInput = container.querySelector('#viz-branch-name');
    const createBranchBtn = container.querySelector('#viz-create-branch');
    const addCommitBtn = container.querySelector('#viz-add-commit');
    const branchSelect = container.querySelector('#viz-switch-branch');
    const display = container.querySelector('#viz-display');
    const currentLabel = container.querySelector('#viz-current-branch');

    if (createBranchBtn) {
      createBranchBtn.addEventListener('click', () => {
        const name = branchInput?.value.trim();
        if (!name || state.branches[name]) return;
        // Branch from current branch
        state.branches[name] = [...state.branches[state.currentBranch]];
        state.currentBranch = name;
        if (branchInput) branchInput.value = '';
        updateBranchSelect();
        renderBranches();
      });
    }

    if (addCommitBtn) {
      addCommitBtn.addEventListener('click', () => {
        state.commitCounter++;
        const hash = Math.random().toString(16).substr(2, 7);
        state.branches[state.currentBranch].push({
          hash,
          msg: 'Commit #' + state.commitCounter
        });
        renderBranches();
      });
    }

    if (branchSelect) {
      branchSelect.addEventListener('change', () => {
        state.currentBranch = branchSelect.value;
        renderBranches();
      });
    }

    function updateBranchSelect() {
      if (!branchSelect) return;
      branchSelect.innerHTML = Object.keys(state.branches).map(b =>
        `<option value="${b}" ${b === state.currentBranch ? 'selected' : ''}>${b}</option>`
      ).join('');
    }

    const branchColors = ['blue', 'purple', 'green', 'orange'];

    function renderBranches() {
      if (currentLabel) {
        currentLabel.textContent = state.currentBranch;
      }

      if (!display) return;
      display.innerHTML = '';

      const branchNames = Object.keys(state.branches);
      branchNames.forEach((name, bIdx) => {
        const branchDiv = document.createElement('div');
        branchDiv.style.marginBottom = 'var(--space-lg)';

        const label = document.createElement('div');
        label.style.cssText = 'font-family:var(--font-mono);font-size:var(--fs-sm);margin-bottom:var(--space-sm);display:flex;align-items:center;gap:var(--space-sm);';
        const colorClass = branchColors[bIdx % branchColors.length];
        label.innerHTML = `<span class="commit-tag branch-tag">${escapeHtml(name)}</span>${name === state.currentBranch ? ' <span class="commit-tag head-tag">HEAD</span>' : ''}`;
        branchDiv.appendChild(label);

        const timelineDiv = document.createElement('div');
        timelineDiv.className = 'commit-timeline';
        timelineDiv.style.paddingTop = '0';

        state.branches[name].forEach((c, i) => {
          if (i > 0) {
            const conn = document.createElement('div');
            conn.className = 'commit-connector';
            timelineDiv.appendChild(conn);
          }
          const node = document.createElement('div');
          node.className = 'commit-node';
          node.innerHTML = `<div class="commit-dot ${colorClass}">${c.hash.substr(0, 3)}</div><div class="commit-label">${escapeHtml(c.msg)}</div>`;
          timelineDiv.appendChild(node);
        });

        branchDiv.appendChild(timelineDiv);
        display.appendChild(branchDiv);
      });

      updateBranchSelect();
    }

    renderBranches();
  }

  /* ---------- Merge Conflict Resolver (Page 08) ---------- */
  function initMergeConflictResolver() {
    const container = document.getElementById('merge-resolver');
    if (!container) return;

    const oursBtn = container.querySelector('#resolve-ours');
    const theirsBtn = container.querySelector('#resolve-theirs');
    const bothBtn = container.querySelector('#resolve-both');
    const resultArea = container.querySelector('#resolve-result');
    const commitResolve = container.querySelector('#resolve-commit');
    const successMsg = container.querySelector('#resolve-success');

    const oursText = container.dataset.ours || 'Our version';
    const theirsText = container.dataset.theirs || 'Their version';

    if (oursBtn) oursBtn.addEventListener('click', () => showResult(oursText));
    if (theirsBtn) theirsBtn.addEventListener('click', () => showResult(theirsText));
    if (bothBtn) bothBtn.addEventListener('click', () => showResult(oursText + '\n' + theirsText));

    function showResult(text) {
      if (resultArea) {
        resultArea.textContent = text;
        resultArea.style.display = 'block';
      }
      if (commitResolve) commitResolve.style.display = 'inline-flex';
    }

    if (commitResolve) {
      commitResolve.addEventListener('click', () => {
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.innerHTML = '<div class="success-box"><p>🎉 Merge conflict resolved and committed! You just handled your first merge conflict like a pro.</p></div>';
        }
        commitResolve.style.display = 'none';
      });
    }
  }

  /* ---------- PR Simulator (Page 11) ---------- */
  function initPRSimulator() {
    const container = document.getElementById('pr-simulator');
    if (!container) return;

    const submitBtn = container.querySelector('#pr-submit');
    const titleInput = container.querySelector('#pr-title-input');
    const descInput = container.querySelector('#pr-desc-input');
    const prHeader = container.querySelector('#pr-header-form');
    const prReview = container.querySelector('#pr-review-section');
    const respondBtn = container.querySelector('#pr-respond');
    const mergeBtn = container.querySelector('#pr-merge');
    const mergeAnim = container.querySelector('#pr-merge-anim');
    const responseSection = container.querySelector('#pr-response-section');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const title = titleInput?.value.trim();
        if (!title) {
          if (titleInput) titleInput.style.borderColor = 'var(--accent-red)';
          return;
        }
        if (prHeader) prHeader.style.display = 'none';
        if (prReview) {
          prReview.style.display = 'block';
          // Update PR title in display
          const displayTitle = prReview.querySelector('.pr-display-title');
          if (displayTitle) displayTitle.textContent = title;
        }
      });
    }

    if (respondBtn) {
      respondBtn.addEventListener('click', () => {
        if (responseSection) responseSection.style.display = 'block';
        if (mergeBtn) mergeBtn.style.display = 'inline-flex';
        respondBtn.style.display = 'none';
      });
    }

    if (mergeBtn) {
      mergeBtn.addEventListener('click', () => {
        if (prReview) prReview.style.display = 'none';
        if (responseSection) responseSection.style.display = 'none';
        if (mergeAnim) {
          mergeAnim.classList.add('show');
          mergeAnim.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: var(--space-lg);">🎉</div>
            <h3 style="color: var(--accent-green); margin-bottom: var(--space-md);">Pull Request Merged!</h3>
            <p style="color: var(--text-secondary);">Your changes have been successfully merged into the main branch.</p>
            <div style="margin-top: var(--space-lg);">
              <span class="commit-tag head-tag" style="font-size: var(--fs-sm);">✓ Merged</span>
            </div>
          `;
        }
        mergeBtn.style.display = 'none';
      });
    }
  }

  /* ---------- Light/Dark Theme Toggle ---------- */
  function initTheme() {
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('gitguide-theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    // Insert theme toggle button dynamically into navbar-right
    const navbarRight = document.querySelector('.navbar-right');
    if (navbarRight) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'nav-btn theme-toggle-btn';
      toggleBtn.setAttribute('aria-label', 'Toggle theme');
      toggleBtn.innerHTML = `
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      `;

      // Insert as the first element in navbar-right
      navbarRight.insertBefore(toggleBtn, navbarRight.firstChild);

      // Toggle action
      toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('gitguide-theme', isLight ? 'light' : 'dark');
      });
    }
  }

  /* ---------- Footer Attribution ---------- */
  function initFooter() {
    const footer = document.querySelector('.page-footer');
    if (footer) {
      if (!footer.textContent.includes('baaj')) {
        const p = document.createElement('p');
        p.style.cssText = 'font-size: var(--fs-xs); margin-top: var(--space-xs); opacity: 0.8;';
        p.innerHTML = 'Built with ❤️ by baaj to help everyone learn Git & GitHub. No prior experience needed.';
        footer.appendChild(p);
      }
    }
  }

  /* ---------- Keyboard Navigation ---------- */
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Arrow keys for page navigation
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const link = e.key === 'ArrowRight'
          ? document.querySelector('.page-nav-link.next')
          : document.querySelector('.page-nav-link.prev');
        if (link) {
          e.preventDefault();
          window.location.href = link.getAttribute('href');
        }
      }
    });
  }

  /* ---------- Init All ---------- */
  function init() {
    initTheme();
    initFooter();
    initScrollProgress();
    initIntersectionObserver();
    initCopyButtons();
    initSidebar();
    trackPageVisit();
    initReadingTime();
    initGlossaryTooltips();
    initOSTabs();
    initTerminalSims();
    initBeforeAfterSliders();
    initCommandFinder();
    initCommitSimulator();
    initBranchVisualizer();
    initMergeConflictResolver();
    initPRSimulator();
    initKeyboardNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
