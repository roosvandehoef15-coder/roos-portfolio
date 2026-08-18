// Factory view: 3 zones — INPUTS (stakeholders + enablers) · GSS workshop · OUTPUTS (outcomes grouped by value type).
// Click an outcome card for the evidence panel.

(function () {
  const VT = window.VALUE_TYPES;
  const DATA = window.FLOW_DATA;

  // ---------- Monochrome SVG icon library ----------
  const ICONS = {
    stall:      `<svg viewBox="0 0 24 24"><path d="M3 9l2-4h14l2 4M3 9h18M5 9v11M19 9v11M5 20h14"/><path d="M9 13h6v7H9z"/></svg>`,
    truck:      `<svg viewBox="0 0 24 24"><rect x="2" y="8" width="12" height="9"/><path d="M14 11h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`,
    bank:       `<svg viewBox="0 0 24 24"><path d="M3 9l9-5 9 5zM4 9v10M20 9v10M3 19h18M8 11v6M12 11v6M16 11v6"/></svg>`,
    dove:       `<svg viewBox="0 0 24 24"><path d="M3 14c2-1 5-1 7 1 1 1 2 2 4 2 3 0 5-2 6-5l-1-2-3 1c-1-1-2-2-4-2-3 0-5 2-6 3z"/><path d="M14 10l3-1"/></svg>`,
    cap:        `<svg viewBox="0 0 24 24"><path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v4c2 1 4 2 6 2s4-1 6-2v-4M20 10v5"/></svg>`,
    pencil:     `<svg viewBox="0 0 24 24"><path d="M4 20l3-1 11-11-2-2L5 17z"/><path d="M14 6l2 2M5 17l1 1"/></svg>`,
    people:     `<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M3 19c0-3 2-5 5-5s5 2 5 5M13 18c0-2 2-4 3.5-4S20 16 20 18"/></svg>`,
    person:     `<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/></svg>`,
    tomato:     `<svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="7"/><path d="M9 7l3-2 3 2M12 5v2M8 7c0 1 1 2 2 2M14 9c1 0 2-1 2-2"/></svg>`,
    box:        `<svg viewBox="0 0 24 24"><path d="M4 8v12h16V8M4 8l4-4h8l4 4M4 8h16M12 4v16M9 12h6"/></svg>`,
    bottle:     `<svg viewBox="0 0 24 24"><path d="M10 3h4v3l2 2v11a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l2-2z"/><path d="M10 12h4"/></svg>`,
    tree:       `<svg viewBox="0 0 24 24"><path d="M12 3l-5 6h3l-4 6h4l-3 4h10l-3-4h4l-4-6h3z"/><path d="M12 19v3"/></svg>`,
    leaf:       `<svg viewBox="0 0 24 24"><path d="M5 19c4-1 8-3 11-7s4-8 4-8-7 1-12 5-5 9-4 11z"/><path d="M5 19c2-4 5-7 9-9"/></svg>`,
    apple:      `<svg viewBox="0 0 24 24"><path d="M12 8c-2-2-5-2-6 0s-1 7 1 10c1 1 3 2 5 2s4-1 5-2c2-3 2-8 1-10s-4-2-6 0z"/><path d="M12 8V5l2-2"/></svg>`,
    euro:       `<svg viewBox="0 0 24 24"><path d="M16 6c-2-1-5-1-7 1s-2 8 0 10c2 2 5 2 7 1M4 10h9M4 14h9"/></svg>`,
    paper:      `<svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v3h3M9 11h6M9 14h6M9 17h4"/></svg>`,
    heart:      `<svg viewBox="0 0 24 24"><path d="M12 20l-7-7c-2-2-2-6 0-8s5-2 7 0c2-2 5-2 7 0s2 6 0 8z"/></svg>`,
    brain:      `<svg viewBox="0 0 24 24"><path d="M9 4c-2 0-4 2-4 4 0 1 0 1 1 2-1 1-1 2 0 3-1 1-1 3 1 4 0 2 2 3 3 3M15 4c2 0 4 2 4 4 0 1 0 1-1 2 1 1 1 2 0 3 1 1 1 3-1 4 0 2-2 3-3 3"/><path d="M12 5v15"/></svg>`,
    book:       `<svg viewBox="0 0 24 24"><path d="M4 4h7v15H4zM13 4h7v15h-7zM4 4c-1 0-1 1-1 2v13h18V6c0-1 0-2-1-2"/></svg>`,
    eye:        `<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`,
    handshake:  `<svg viewBox="0 0 24 24"><path d="M2 13l3-3 4 4-2 2zM22 13l-3-3-4 4 2 2zM8 14l3-3 3 3 3-3"/><path d="M8 9l4-2 4 2"/></svg>`,
    arch:       `<svg viewBox="0 0 24 24"><path d="M4 20V10a8 8 0 0116 0v10M4 20h16M10 20v-6h4v6"/></svg>`,
    camera:     `<svg viewBox="0 0 24 24"><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/></svg>`,
    quote:      `<svg viewBox="0 0 24 24"><path d="M6 7c-2 1-3 3-3 6v4h5v-7H4M16 7c-2 1-3 3-3 6v4h5v-7h-4"/></svg>`
  };
  function iconSvg(key) {
    return ICONS[key] || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>`;
  }
  function iconCircle(key, wrapClass) {
    return `<span class="${wrapClass}">${iconSvg(key)}</span>`;
  }

  // ---------- Icon maps (data → icon key) ----------
  const STAKE_ICON = {
    market_vendors:   "stall",
    renes:            "truck",
    municipality_in:  "bank",
    afrik_coop_in:    "dove",
    knowledge:        "cap",
    designers_in:     "pencil",
    citizens_in:      "people"
  };

  const ENABLER_ICON = {
    veggies:       "tomato",
    karton:        "box",
    plastic:       "bottle",
    hout:          "tree",
    agf:           "apple",
    renes_service: "truck",
    subsidy:       "euro",
    permits:       "paper",
    coop_labour:   "person",
    coop_mission:  "heart",
    research:      "brain",
    students:      "cap",
    design:        "pencil",
    engagement:    "people"
  };

  // For outcomes we use the *value-type icon* on a coloured circle, so we only need 5 icons total.
  const VT_ICON = {
    social:      "heart",
    ecological:  "leaf",
    financial:   "euro",
    cultural:    "book",
    aesthetical: "eye"
  };

  // Real GSS photos mapped to outcomes (one photo, one outcome — no duplicates).
  const OUTCOME_PHOTOS = {
    cheap_food:            "img/potatoes.jpg",               // blue crate of yellow potatoes
    wijkkeuken_food:       "img/buurtbuik_kitchen.jpg",      // Buurtbuik cook plating fruit
    veggies_products:      "img/juices_from_waste.jpg",      // jars of waste-simmered syrups
    veggies_to_renes:      "img/renes_organic.jpg",          // Renes Doosan crane scooping peppers
    karton_income:         "img/cardboard_collect.jpg",      // vendors handing in cardboard
    coop_employment:       "img/cardboard_processing.jpg",   // worker at the cardboard press
    hout_reused:           "img/pallets.jpg",                // stacks of pallets at the GSS
    permits_physical_site: "img/gss_building.jpg",           // GSS building exterior with sign
    engagement_community:  "img/vrijheidsmaaltijden.jpg",    // people eating outside at GSS
    design_award:          "img/gss_architecture.jpg"        // architectuurprijs — sunny exterior
  };

  // ---------- How-to-use: dismiss, re-open, and auto-hide on scroll ----------
  const howTo = document.querySelector(".how-to");
  const howToBtn = document.getElementById("how-to-dismiss");
  const howToReopen = document.getElementById("how-to-reopen");

  if (howTo && howToBtn) {
    try {
      if (localStorage.getItem("factoryHowToDismissed") === "1") {
        howTo.classList.add("dismissed");
      }
    } catch (e) { /* ignore */ }

    howToBtn.addEventListener("click", () => {
      howTo.classList.add("dismissed");
      try { localStorage.setItem("factoryHowToDismissed", "1"); } catch (e) { /* ignore */ }
    });
  }

  if (howToReopen) {
    howToReopen.addEventListener("click", () => {
      if (howTo) howTo.classList.remove("dismissed");
      document.body.classList.remove("how-to-hidden");
      try { localStorage.removeItem("factoryHowToDismissed"); } catch (e) { /* ignore */ }
      // Scroll up so the manual is visible
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Auto-hide manual on scroll past a threshold. Re-shows when scrolled back to top.
  // Doesn't override an explicit user dismissal — those stay dismissed.
  const scrollHideThreshold = 80;
  let scrollFrame = false;
  function onScrollManualHide() {
    if (scrollFrame) return;
    scrollFrame = true;
    requestAnimationFrame(() => {
      if (window.scrollY > scrollHideThreshold) {
        document.body.classList.add("how-to-hidden");
      } else {
        document.body.classList.remove("how-to-hidden");
      }
      scrollFrame = false;
    });
  }
  window.addEventListener("scroll", onScrollManualHide, { passive: true });

  // ---------- Value-type filter pills + flower-petal analytics view ----------
  const activeValueTypes = new Set(Object.keys(VT));
  const VT_ORDER = ["social", "ecological", "financial", "cultural", "aesthetical"];

  // Pills (multi-toggle filter)
  const filtersEl = document.getElementById("value-filters");
  Object.entries(VT).forEach(([key, def]) => {
    const pill = document.createElement("span");
    pill.className = "filter-pill";
    pill.dataset.vt = key;
    pill.innerHTML = `<span class="dot" style="background:${def.color}"></span>${def.label}`;
    pill.addEventListener("click", () => toggleVT(key));
    filtersEl.appendChild(pill);
  });

  // Count outcomes per value type (any value type the outcome carries)
  const outcomeCountsByVT = {};
  VT_ORDER.forEach(k => outcomeCountsByVT[k] = 0);
  DATA.stakeholders.forEach(s => s.enablers.forEach(e => e.outcomes.forEach(oc => {
    oc.value_types.forEach(vt => { if (outcomeCountsByVT[vt] !== undefined) outcomeCountsByVT[vt]++; });
  })));
  const maxCount = Math.max(...Object.values(outcomeCountsByVT));

  // Flower petals (analytics view + alternative filter UI)
  const petalsSvg = document.getElementById("petals-svg");
  const petalsLegend = document.getElementById("petals-legend");
  const petalsToggle = document.getElementById("petals-toggle");
  const petalsPanel = document.getElementById("petals-panel");

  // CVF flower — five almond-leaf petals around a small centre.
  const CENTER = 130, BASE_LEN = 45, MAX_LEN = 110;
  const SVG_NS = "http://www.w3.org/2000/svg";
  function svgEl(name, attrs) {
    const el = document.createElementNS(SVG_NS, name);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  // Set the SVG viewBox to 260x260 to match our coordinate space.
  petalsSvg.setAttribute("viewBox", "0 0 260 260");

  VT_ORDER.forEach((vt, i) => {
    const count = outcomeCountsByVT[vt];
    const len = BASE_LEN + (count / maxCount) * (MAX_LEN - BASE_LEN);
    const halfWidth = 28;
    const angle = i * 72;
    const color = VT[vt].color;

    // Outer group: rotate around the SVG centre using SVG syntax (no CSS involved).
    const g = svgEl("g", {
      "data-vt": vt,
      class: "petal",
      transform: `rotate(${angle}, ${CENTER}, ${CENTER})`
    });

    // Inner group: translate to centre so all the path coords are in local space.
    const inner = svgEl("g", {
      transform: `translate(${CENTER}, ${CENTER})`
    });

    // Almond-leaf petal path — starts at origin, curves outward to the tip and back.
    const tipY = -(len + 14);          // tip distance from centre (after a 14px gap)
    const baseY = -14;                  // base of the petal sits 14px above centre, outside the central circle
    const ctlY = (tipY + baseY) / 2;    // control point at midway
    const d = `M 0,${baseY}
               C ${-halfWidth},${ctlY} ${-halfWidth},${tipY + 12} 0,${tipY}
               C ${halfWidth},${tipY + 12} ${halfWidth},${ctlY} 0,${baseY} Z`;

    inner.appendChild(svgEl("path", {
      d, fill: color,
      stroke: "#1F2A44", "stroke-width": 1.4,
      "stroke-linejoin": "round",
      class: "petal-shape"
    }));

    // Count circle near the tip
    inner.appendChild(svgEl("circle", {
      cx: 0, cy: tipY + 16,
      r: 11,
      fill: "rgba(255,255,255,0.18)",
      stroke: "#FFFFFF",
      "stroke-width": 1.2
    }));
    const countText = svgEl("text", {
      class: "petal-count",
      x: 0, y: tipY + 16
    });
    countText.textContent = count;
    inner.appendChild(countText);

    g.appendChild(inner);
    g.addEventListener("click", () => toggleVT(vt));
    petalsSvg.appendChild(g);
  });

  // Small centre dot — keeps the eye anchored without competing with the petals
  petalsSvg.appendChild(svgEl("circle", {
    cx: CENTER, cy: CENTER, r: 10,
    fill: "#FFFFFF",
    stroke: "#1F2A44",
    "stroke-width": 1.6
  }));

  // Legend rows (informational + clickable)
  VT_ORDER.forEach(vt => {
    const li = document.createElement("li");
    li.dataset.vt = vt;
    li.innerHTML = `
      <span class="lg-dot" style="background:${VT[vt].color}"></span>
      <span class="lg-name">${VT[vt].label}</span>
      <span class="lg-count">${outcomeCountsByVT[vt]} outcomes</span>
    `;
    li.addEventListener("click", () => toggleVT(vt));
    petalsLegend.appendChild(li);
  });

  // Multi-toggle behaviour shared by pills, petals and legend rows
  function toggleVT(vt) {
    if (activeValueTypes.has(vt)) activeValueTypes.delete(vt);
    else activeValueTypes.add(vt);
    syncFilterUI();
    applyValueFilter();
  }

  function syncFilterUI() {
    filtersEl.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("off", !activeValueTypes.has(p.dataset.vt));
    });
    petalsSvg.querySelectorAll(".petal").forEach(p => {
      p.classList.toggle("dimmed", !activeValueTypes.has(p.dataset.vt));
    });
    petalsLegend.querySelectorAll("li").forEach(li => {
      li.classList.toggle("dimmed", !activeValueTypes.has(li.dataset.vt));
    });
  }

  petalsToggle.addEventListener("click", () => {
    const expanded = petalsToggle.getAttribute("aria-expanded") === "true";
    petalsToggle.setAttribute("aria-expanded", !expanded);
    petalsPanel.hidden = expanded;
  });

  syncFilterUI();

  // ---------- INPUTS column ----------
  const inputsList = document.getElementById("inputs-list");
  const enablerEls = {}; // enablerId -> chip element
  const stakeEls   = {}; // stakeholderId -> input-group element
  DATA.stakeholders.forEach(stake => {
    const card = document.createElement("div");
    card.className = "input-group";
    card.dataset.stakeholderId = stake.id;

    let html = `
      <div class="stake-title">
        ${iconCircle(STAKE_ICON[stake.id] || "people", "stake-icon-wrap")}
        <div>
          <div>${stake.name}</div>
          <div class="stake-name-detail">${stake.group}</div>
        </div>
      </div>
      <div class="enabler-chips">
    `;
    stake.enablers.forEach(en => {
      const eIconKey = ENABLER_ICON[en.id] || "box";
      html += `<span class="enabler-chip" data-enabler-id="${en.id}" title="${en.short || ""}">
        ${iconCircle(eIconKey, "icon-wrap")}${en.name}
      </span>`;
    });
    html += `</div>`;
    card.innerHTML = html;
    inputsList.appendChild(card);
    stakeEls[stake.id] = card;
    // Stash chip refs + attach click handlers (fan out to all outcomes from this enabler)
    card.querySelectorAll(".enabler-chip").forEach(chip => {
      const enId = chip.dataset.enablerId;
      enablerEls[enId] = chip;
      const enabler = stake.enablers.find(e => e.id === enId);
      if (!enabler) return;
      chip.addEventListener("click", (ev) => {
        ev.stopPropagation();
        focusEnabler(chip, enabler, stake);
      });
    });
  });

  // ---------- OUTPUTS column — grouped by primary value type ----------
  // Collect every (outcome, source stakeholder, enabler) — one card per outcome (its primary value type).
  const outcomesByVT = {};
  Object.keys(VT).forEach(k => outcomesByVT[k] = []);

  DATA.stakeholders.forEach(stake => {
    stake.enablers.forEach(en => {
      en.outcomes.forEach(oc => {
        const primary = oc.value_types[0];
        outcomesByVT[primary].push({ oc, stake, enabler: en });
      });
    });
  });

  // Pick a short "headline" line for each outcome from its evidence numbers, otherwise its description.
  function outcomeHeadline(oc) {
    if (oc.evidence && oc.evidence.numbers && oc.evidence.numbers.length > 0) {
      return oc.evidence.numbers[0];
    }
    return oc.description;
  }

  // Render outcomes in VT_ORDER (already declared above for the filter pills/petals).
  const outputsList = document.getElementById("outputs-list");

  VT_ORDER.forEach(vtKey => {
    const items = outcomesByVT[vtKey];
    if (!items || items.length === 0) return;
    const def = VT[vtKey];

    const group = document.createElement("div");
    group.className = "value-group";
    group.dataset.vt = vtKey;

    const header = document.createElement("div");
    header.className = "value-group-header";
    header.style.borderBottomColor = def.color;
    header.innerHTML = `
      <span class="vg-icon-wrap" style="background:${def.color}">${iconSvg(VT_ICON[vtKey])}</span>
      <span class="vg-title" style="color:${def.color}">${def.label}</span>
      <span class="vg-count">${items.length} outcomes</span>
    `;
    group.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "outcomes-grid";

    items.forEach(({ oc, stake, enabler }) => {
      const card = document.createElement("div");
      card.className = "outcome-card";
      card.dataset.valueTypes = oc.value_types.join(",");
      card.dataset.outcomeId = oc.id;
      card.dataset.enablerId = enabler.id;
      card.dataset.stakeholderId = stake.id;
      const primaryVT = oc.value_types[0];
      const primaryColor = VT[primaryVT].color;
      card.style.borderLeftColor = primaryColor;
      card.style.setProperty("--vt-color", primaryColor);
      const iconHtml = iconSvg(VT_ICON[primaryVT] || "heart");
      const photo = OUTCOME_PHOTOS[oc.id];

      const headline = outcomeHeadline(oc);
      const beneficiaryNames = oc.beneficiaries.map(b => b.name).join(", ");
      const firstStory = (oc.evidence?.stories && oc.evidence.stories[0]) ? oc.evidence.stories[0] : "";

      const photoBtn = photo
        ? `<button class="extra-btn" data-extra="photo" type="button">${iconSvg("camera")}Photo</button>`
        : "";
      const quoteBtn = firstStory
        ? `<button class="extra-btn" data-extra="quote" type="button">${iconSvg("quote")}Quote</button>`
        : "";
      const extrasButtons = (photo || firstStory)
        ? `<div class="extras">${photoBtn}${quoteBtn}</div>`
        : "";

      const photoPanel = photo
        ? `<div class="extra-panel" data-content="photo"><img src="${photo}" alt="" loading="lazy"></div>`
        : "";
      const quotePanel = firstStory
        ? `<div class="extra-panel" data-content="quote"><blockquote>${firstStory}</blockquote></div>`
        : "";
      const extrasContent = (photo || firstStory)
        ? `<div class="extras-content">${photoPanel}${quotePanel}</div>`
        : "";

      card.innerHTML = `
        <div class="card-body">
          <div class="icon-box">${iconHtml}</div>
          <div class="body">
            <div class="oc-headline">${oc.title}</div>
            <div class="oc-title">${headline}</div>
            <div class="oc-for">For: ${beneficiaryNames}</div>
            <div class="oc-tags">
              ${oc.value_types.map(vt =>
                `<span class="vt-tag" style="background:${VT[vt].color}">${VT[vt].label}</span>`
              ).join("")}
            </div>
            ${extrasButtons}
          </div>
        </div>
        ${extrasContent}
      `;

      // Main click → open panel + draw path
      card.addEventListener("click", (ev) => {
        ev.stopPropagation();
        openPanel({ oc, stake, enabler });
        setTimeout(() => focusOutcome(card, oc, stake, enabler), 240);
      });

      // Extra-button clicks → toggle inline panel, don't bubble up to card
      card.querySelectorAll(".extra-btn").forEach(btn => {
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const target = btn.dataset.extra;
          const targetPanel = card.querySelector(`.extra-panel[data-content="${target}"]`);
          if (!targetPanel) return;
          const wasOpen = targetPanel.classList.contains("visible");
          card.querySelectorAll(".extra-panel.visible").forEach(p => p.classList.remove("visible"));
          card.querySelectorAll(".extra-btn.active").forEach(b => b.classList.remove("active"));
          if (!wasOpen) {
            targetPanel.classList.add("visible");
            btn.classList.add("active");
          }
        });
      });

      grid.appendChild(card);
    });

    group.appendChild(grid);
    outputsList.appendChild(group);
  });

  // ---------- Value-type filter ----------
  function applyValueFilter() {
    document.querySelectorAll(".outcome-card").forEach(el => {
      const types = (el.dataset.valueTypes || "").split(",");
      const visible = types.some(v => activeValueTypes.has(v));
      el.classList.toggle("value-faded", !visible);
    });
    // Also fade entire value groups whose primary type is off
    document.querySelectorAll(".value-group").forEach(g => {
      g.style.opacity = activeValueTypes.has(g.dataset.vt) ? 1 : 0.25;
    });
  }

  // ---------- Path tracing ----------
  // Click outcome → trace back to its enabler.
  // Click enabler chip → fan out to all its outcomes.
  // Streams "enter" GSS on its left wall and "exit" on its right wall (two segments per chain).
  // Paths redraw on scroll, so the sticky GSS stays aligned with the lines.

  const pathSvg = document.getElementById("path-svg");
  const main = document.querySelector("main.three-zones");
  const gssZone = document.querySelector(".zone-gss");
  let currentFocus = null; // { type: "outcome" | "enabler", ... }

  function rectInMain(el) {
    const r = el.getBoundingClientRect();
    const m = main.getBoundingClientRect();
    return {
      left:   r.left - m.left,
      right:  r.right - m.left,
      top:    r.top - m.top,
      bottom: r.bottom - m.top,
      width:  r.width,
      height: r.height,
      cx: r.left - m.left + r.width / 2,
      cy: r.top - m.top + r.height / 2
    };
  }

  function sizeSvg() {
    pathSvg.setAttribute("width", main.scrollWidth);
    pathSvg.setAttribute("height", main.scrollHeight);
    pathSvg.style.width = main.scrollWidth + "px";
    pathSvg.style.height = main.scrollHeight + "px";
  }

  function drawFlow(start, end, color) {
    // Single smooth bezier from start to end. No forced midpoint.
    const dx = Math.max(40, (end.x - start.x) * 0.45);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M ${start.x},${start.y} C ${start.x + dx},${start.y} ${end.x - dx},${end.y} ${end.x},${end.y}`
    );
    path.setAttribute("stroke", color);
    path.setAttribute("class", "path-line visible");
    pathSvg.appendChild(path);

    // Single arrowhead at the destination
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    arrow.setAttribute(
      "points",
      `${end.x - 12},${end.y - 7} ${end.x},${end.y} ${end.x - 12},${end.y + 7}`
    );
    arrow.setAttribute("fill", color);
    arrow.setAttribute("opacity", "1");
    pathSvg.appendChild(arrow);
  }

  function drawCurrentPath() {
    pathSvg.innerHTML = "";
    if (!currentFocus) return;
    sizeSvg();

    if (currentFocus.type === "outcome") {
      drawOutcomeChain(currentFocus);
    } else if (currentFocus.type === "enabler") {
      drawEnablerChain(currentFocus);
    }
  }

  function drawOutcomeChain({ card, oc, enabler }) {
    const chip = enablerEls[enabler.id];
    if (!chip) return;
    const chipR = rectInMain(chip);
    const cardR = rectInMain(card);
    const color = VT[oc.value_types[0]].color;

    drawFlow(
      { x: chipR.right + 4, y: chipR.cy },
      { x: cardR.left - 4,  y: cardR.cy },
      color
    );
  }

  function drawEnablerChain({ chip, enabler, outcomeCards }) {
    const chipR = rectInMain(chip);
    const start = { x: chipR.right + 4, y: chipR.cy };

    // One flowing line per outcome, each in its own value-type colour.
    outcomeCards.forEach(card => {
      const ocId = card.dataset.outcomeId;
      const oc = enabler.outcomes.find(o => o.id === ocId);
      if (!oc) return;
      const cardR = rectInMain(card);
      const color = VT[oc.value_types[0]].color;
      drawFlow(start, { x: cardR.left - 4, y: cardR.cy }, color);
    });
  }

  function focusOutcome(cardEl, oc, stake, enabler) {
    clearFocus();
    const chip = enablerEls[enabler.id];
    const stakeEl = stakeEls[stake.id];
    if (!chip || !stakeEl) return;

    document.body.classList.add("path-focused");
    stakeEl.classList.add("is-active");
    chip.classList.add("is-active");
    cardEl.classList.add("is-active");
    gssZone.classList.add("gss-pulse");

    currentFocus = { type: "outcome", card: cardEl, oc, stake, enabler };
    drawCurrentPath();
  }

  function focusEnabler(chipEl, enabler, stake) {
    const panelEl = document.getElementById("panel");
    const layoutWasShifted = document.body.classList.contains("panel-open");
    panelEl.classList.remove("open");
    document.body.classList.remove("panel-open");
    clearFocus();

    document.body.classList.add("path-focused");
    const stakeEl = stakeEls[stake.id];
    if (stakeEl) stakeEl.classList.add("is-active");
    chipEl.classList.add("is-active");
    gssZone.classList.add("gss-pulse");

    const outcomeCards = Array.from(
      document.querySelectorAll(`.outcome-card[data-enabler-id="${enabler.id}"]`)
    );
    outcomeCards.forEach(c => c.classList.add("is-active"));

    currentFocus = { type: "enabler", chip: chipEl, enabler, outcomeCards };

    const delay = layoutWasShifted ? 240 : 30;
    setTimeout(() => drawCurrentPath(), delay);
  }

  function clearFocus() {
    document.body.classList.remove("path-focused");
    document.querySelectorAll(".is-active").forEach(el => el.classList.remove("is-active"));
    gssZone.classList.remove("gss-pulse");
    pathSvg.innerHTML = "";
    currentFocus = null;
  }

  // Scroll listener — redraw paths so they follow the sticky GSS zone
  let scrollFrameRequested = false;
  function onScrollRedraw() {
    if (!currentFocus || scrollFrameRequested) return;
    scrollFrameRequested = true;
    requestAnimationFrame(() => {
      drawCurrentPath();
      scrollFrameRequested = false;
    });
  }
  window.addEventListener("scroll", onScrollRedraw, { passive: true });
  window.addEventListener("resize", onScrollRedraw, { passive: true });

  // Click outside cards clears focus AND closes the panel
  main.addEventListener("click", (e) => {
    if (e.target.closest(".outcome-card")) return;
    closeEverything();
  });

  // ---------- Side panel ----------
  const panel = document.getElementById("panel");

  function closeEverything() {
    panel.classList.remove("open");
    document.body.classList.remove("panel-open");
    clearFocus();
  }

  document.getElementById("panel-close").addEventListener("click", closeEverything);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEverything();
  });

  function openPanel({ oc, stake, enabler }) {
    document.body.classList.add("panel-open");
    document.getElementById("panel-title").textContent = oc.title;
    document.getElementById("panel-desc").textContent = oc.description;
    const beneficiaryNames = oc.beneficiaries.map(b => b.name).join(", ");
    document.getElementById("panel-route").textContent =
      `${stake.name} · ${enabler.name}  →  ${beneficiaryNames}`;

    const petals = document.getElementById("panel-petals");
    petals.innerHTML = oc.value_types.map(vt => {
      const c = VT[vt].color;
      return `<div class="petal">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <g transform="translate(22,22)">
            ${[0,72,144,216,288].map(d =>
              `<ellipse cx="0" cy="-10" rx="5" ry="10" fill="${c}" opacity="0.85" transform="rotate(${d})"/>`
            ).join("")}
            <circle cx="0" cy="0" r="4" fill="#FFF" stroke="${c}" stroke-width="1.5"/>
          </g>
        </svg>
        <span>${VT[vt].label}</span>
      </div>`;
    }).join("");

    function renderList(items, kind) {
      if (!items || items.length === 0) return `<div class="evidence-empty">No ${kind} added yet.</div>`;
      return `<ul class="evidence-list">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    }
    document.getElementById("panel-numbers").innerHTML = renderList(oc.evidence?.numbers, "numbers");
    document.getElementById("panel-photos").innerHTML = renderList(oc.evidence?.photos, "photos");
    document.getElementById("panel-stories").innerHTML = renderList(oc.evidence?.stories, "stories");

    panel.classList.add("open");
  }

})();
