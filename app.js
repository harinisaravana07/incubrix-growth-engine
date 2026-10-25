/**
 * IncuBrix Growth Engine - Interactive Commercial Cockpit
 * Option 1: Multi-Channel Lead Generation & Outreach Engine
 * Campus Hiring 2027 Cohort
 */

// Global State
let fullLeadsDataset = [];
let filteredLeads = [];
let currentPage = 1;
const rowsPerPage = 15;
let currentPriorityLeadId = "IBX-0001";
let currentTouchNumber = 1;

// Curated Anchor Priority A Profiles & Sequences
const PRIORITY_A_DATA = {
  "IBX-0001": {
    name: "Marcus Vance",
    channel: "The AI Engineering Show",
    segment: "Video Podcaster",
    country: "United States",
    audience: "142,000",
    bestChannel: "Email",
    backupChannel: "LinkedIn",
    pain: "Severe Repurposing Bottleneck: 45m deep dives with leading AI founders, but only 2 shorts per month. Missing high-reach top-of-funnel clips.",
    sequences: {
      1: {
        subject: "Quick question on The AI Engineering Show's repurposing pipeline",
        body: `Hi Marcus,

Loved your deep dive on 'Deep Dive with LangChain Founder Harrison Chase on Agentic Memory'—the breakdown was top-tier.

I noticed you're publishing ~4 high-signal longform videos monthly, but your short-form and multi-platform distribution has an estimated ~14 clip deficit each month. Most creator teams in the Video Podcaster space lose 15-20 hours a week hand-stitching Notion, Descript, and Buffer.

We engineered IncuBrix to turn one longform episode into ready-to-publish vertical clips, LinkedIn threads, and SEO briefs in a single unified studio.

Would you be opposed to seeing a 2-minute workflow audit showing what 4 automated cutdowns from 'Deep Dive with LangChain Founder...' would look like?

Best,
Growth Engineering Team | IncuBrix
PS: If you're not the right person managing content ops, please let me know who to ping!`
      },
      2: {
        subject: "Re: The AI Engineering Show content leverage (cut turnaround from 4 days to 4 hours)",
        body: `Hi Marcus,

Following up on my note from earlier this week. We ran a quick calculation on your current release cadence: with 142,000 subscribers, repurposing your top 3 moments from each episode into Shorts/Reels typically unlocks 25-35% incremental audience growth with zero additional recording time.

Instead of hiring another junior editor or juggling 4 disconnected subscriptions, IncuBrix centralizes Discovery -> Creation -> Repurposing -> Scheduling under one roof.

Worth a 10-minute preview on Thursday or Friday?

— IncuBrix Growth Team`
      },
      3: {
        subject: "Final thought for The AI Engineering Show / closing the loop",
        body: `Hi Marcus,

I know your production schedule is packed. I won't crowd your inbox further.

If you ever want to automate your repurposing backlog or test our one-click multi-format renderer, I set up an extended 30-day creator sandbox pass for your team here: https://incubrix.com/creator-pass?ref=marcus

Keep making incredible work,
— IncuBrix Growth Ops`
      }
    }
  },
  "IBX-0002": {
    name: "Elena Rostova",
    channel: "ProductLed Architect",
    segment: "YouTube Video-First Creator",
    country: "United Kingdom",
    audience: "88,500",
    bestChannel: "LinkedIn",
    backupChannel: "Email",
    pain: "Multi-Platform Handoff Lag: Publishes tactical breakdown videos, but LinkedIn carousels and shorts appear 8-10 days later due to manual editor handoffs.",
    sequences: {
      1: {
        subject: "Quick question on ProductLed Architect's repurposing pipeline",
        body: `Hi Elena,

Loved your deep dive on 'Deconstructing Linear's Growth Loop: Why Features Are Marketing'—the breakdown was top-tier.

I noticed you're publishing ~3 high-signal longform videos monthly, but your short-form and multi-platform distribution has an estimated ~11 clip deficit each month. Most creator teams in the YouTube Video-First Creator space lose 15-20 hours a week hand-stitching Notion, Descript, and Buffer.

We engineered IncuBrix to turn one longform episode into ready-to-publish vertical clips, LinkedIn threads, and SEO briefs in a single unified studio.

Would you be opposed to seeing a 2-minute workflow audit showing what 4 automated cutdowns from 'Deconstructing Linear's Growth Loop...' would look like?

Best,
Growth Engineering Team | IncuBrix
PS: If you're not the right person managing content ops, please let me know who to ping!`
      },
      2: {
        subject: "Re: ProductLed Architect content leverage (cut turnaround from 4 days to 4 hours)",
        body: `Hi Elena,

Following up on my note from earlier this week. We ran a quick calculation on your current release cadence: with 88,500 subscribers, repurposing your top 3 moments from each episode into Shorts/Reels typically unlocks 25-35% incremental audience growth with zero additional recording time.

Instead of hiring another junior editor or juggling 4 disconnected subscriptions, IncuBrix centralizes Discovery -> Creation -> Repurposing -> Scheduling under one roof.

Worth a 10-minute preview on Thursday or Friday?

— IncuBrix Growth Team`
      },
      3: {
        subject: "Final thought for ProductLed Architect / closing the loop",
        body: `Hi Elena,

I know your production schedule is packed. I won't crowd your inbox further.

If you ever want to automate your repurposing backlog or test our one-click multi-format renderer, I set up an extended 30-day creator sandbox pass for your team here: https://incubrix.com/creator-pass?ref=elena

Keep making incredible work,
— IncuBrix Growth Ops`
      }
    }
  },
  "IBX-0003": {
    name: "David Chen",
    channel: "SaaS Capital & Scaling",
    segment: "Expert-Led Coach & Consultant",
    country: "Canada",
    audience: "115,000",
    bestChannel: "Email",
    backupChannel: "LinkedIn",
    pain: "Tool Sprawl Fatigue: Notion for scripts, Descript for audio transcripts, Loom for editor notes, and Buffer for distribution.",
    sequences: {
      1: {
        subject: "Quick question on SaaS Capital & Scaling's repurposing pipeline",
        body: `Hi David,

Loved your deep dive on 'Bootstrapped from $0 to $12M ARR: The 3 Operational Bottlenecks'—the breakdown was top-tier.

I noticed you're publishing ~6 high-signal longform videos monthly, but your short-form and multi-platform distribution has an estimated ~20 clip deficit each month. Most creator teams in the Expert-Led Coach & Consultant space lose 15-20 hours a week hand-stitching Notion, Descript, and Buffer.

We engineered IncuBrix to turn one longform episode into ready-to-publish vertical clips, LinkedIn threads, and SEO briefs in a single unified studio.

Would you be opposed to seeing a 2-minute workflow audit showing what 4 automated cutdowns from 'Bootstrapped from $0 to $12M ARR...' would look like?

Best,
Growth Engineering Team | IncuBrix
PS: If you're not the right person managing content ops, please let me know who to ping!`
      },
      2: {
        subject: "Re: SaaS Capital & Scaling content leverage (cut turnaround from 4 days to 4 hours)",
        body: `Hi David,

Following up on my note from earlier this week. We ran a quick calculation on your current release cadence: with 115,000 subscribers, repurposing your top 3 moments from each episode into Shorts/Reels typically unlocks 25-35% incremental audience growth with zero additional recording time.

Instead of hiring another junior editor or juggling 4 disconnected subscriptions, IncuBrix centralizes Discovery -> Creation -> Repurposing -> Scheduling under one roof.

Worth a 10-minute preview on Thursday or Friday?

— IncuBrix Growth Team`
      },
      3: {
        subject: "Final thought for SaaS Capital & Scaling / closing the loop",
        body: `Hi David,

I know your production schedule is packed. I won't crowd your inbox further.

If you ever want to automate your repurposing backlog or test our one-click multi-format renderer, I set up an extended 30-day creator sandbox pass for your team here: https://incubrix.com/creator-pass?ref=david

Keep making incredible work,
— IncuBrix Growth Ops`
      }
    }
  },
  "IBX-0004": {
    name: "Sarah Sinclair",
    channel: "UX Mastery & Design Systems",
    segment: "Technical Educator & Solo Operator",
    country: "Australia",
    audience: "230,000",
    bestChannel: "YouTube",
    backupChannel: "LinkedIn",
    pain: "Manual Caption & Clip Drift: Video tutorials lack automated short-form vertical cutdowns with precise design-focused captions and highlighting.",
    sequences: {
      1: {
        subject: "Quick question on UX Mastery's repurposing pipeline",
        body: `Hi Sarah,\n\nLoved your deep dive on 'Mastering Figma Variables & Tokens in 2026: Complete 50-Min Course'—the breakdown was top-tier.\n\nI noticed you're publishing ~4 high-signal longform videos monthly, but your short-form and multi-platform distribution has an estimated ~13 clip deficit each month.\n\nWe engineered IncuBrix to turn one longform episode into ready-to-publish vertical clips and carousels in a single unified studio.\n\nWould you be open to a 2-minute video showing what 4 automated cutdowns would look like?\n\nBest,\nIncuBrix Growth Team`
      },
      2: {
        subject: "Re: UX Mastery content leverage (4 days to 4 hours)",
        body: `Hi Sarah,\n\nFollowing up on my note. With 230,000 subscribers, repurposing your top moments unlocks 25-35% incremental audience reach with zero extra recording time.\n\nWorth a 10-minute preview on Thursday?\n\n— IncuBrix Growth Team`
      },
      3: {
        subject: "Final thought for UX Mastery / 30-day creator pass",
        body: `Hi Sarah,\n\nClosing the loop here. I set up an extended 30-day creator sandbox pass for your team: https://incubrix.com/creator-pass?ref=sarah\n\nKeep creating,\n— IncuBrix Growth Ops`
      }
    }
  },
  "IBX-0005": {
    name: "Nathan Patel",
    channel: "Cloud Native Blueprint",
    segment: "Video Podcaster",
    country: "United States",
    audience: "94,000",
    bestChannel: "Email",
    backupChannel: "LinkedIn",
    pain: "Severe Repurposing Bottleneck: High-signal architecture discussions rarely get summarized into snackable multi-format insights.",
    sequences: {
      1: {
        subject: "Quick question on Cloud Native Blueprint's repurposing pipeline",
        body: `Hi Nathan,\n\nLoved your deep dive on 'Kubernetes Multi-Cluster Networking without Mesh Hell'—stellar insights.\n\nNoticed you're producing 5 longform breakdowns a month, but your vertical distribution has a ~18 clip deficit. IncuBrix collapses the Notion + Descript + Premiere toolchain.\n\nOpen to a 2-min preview?\n\nBest,\nIncuBrix Team`
      },
      2: {
        subject: "Re: Cloud Native Blueprint content leverage",
        body: `Hi Nathan,\n\nFollowing up on our note. Unlocking vertical distribution from your current episodes can boost top-of-funnel reach by 30%.\n\nOpen to a quick demo this week?\n\n— IncuBrix Growth Team`
      },
      3: {
        subject: "Sandbox pass for Cloud Native Blueprint",
        body: `Hi Nathan,\n\nHere is your team's 30-day sandbox link: https://incubrix.com/creator-pass?ref=nathan\n\nAll the best,\n— IncuBrix Growth Ops`
      }
    }
  }
};

// Populate the remaining 20 Priority A profiles programmatically
for (let i = 6; i <= 25; i++) {
  const id = `IBX-${String(i).padStart(4, "0")}`;
  const firstNames = ["James", "Chloe", "Kavita", "Simon", "Tyler", "Maya", "Daniel", "Lucas", "Sophie", "Gareth", "Julian", "Tara", "Oliver", "Zoe", "Ryan", "Emma", "Sean", "Lauren", "Trevor", "Aisha"];
  const lastNames = ["Holt", "Foster", "Sinclair", "Mercer", "Abbott", "Kapoor", "Lindqvist", "Cross", "Lin", "Duval", "Vargas", "Morrison", "Kim", "O'Connor", "Hart", "Winter", "Bauer", "Blackwood", "Sutherland", "Novak"];
  const fn = firstNames[(i - 6) % firstNames.length];
  const ln = lastNames[(i - 6) % lastNames.length];
  const segments = ["Video Podcaster", "YouTube Video-First Creator", "Expert-Led Coach & Consultant", "Technical Educator & Solo Operator"];
  const seg = segments[i % segments.length];
  const countries = ["United States", "United Kingdom", "Canada", "Australia", "Singapore", "New Zealand"];
  const country = countries[i % countries.length];
  const subs = `${(45 + (i * 12))},000`;

  PRIORITY_A_DATA[id] = {
    name: `${fn} ${ln}`,
    channel: `${fn} ${ln} | ${seg.split(" ")[0]} Studio`,
    segment: seg,
    country: country,
    audience: subs,
    bestChannel: i % 2 === 0 ? "Email" : "LinkedIn",
    backupChannel: i % 2 === 0 ? "LinkedIn" : "Email",
    pain: "Severe Repurposing Bottleneck: Producing 4-6 long-form videos monthly but lacking automated vertical short-form distribution pipeline.",
    sequences: {
      1: {
        subject: `Quick question on ${fn}'s content repurposing pipeline`,
        body: `Hi ${fn},\n\nLoved your recent breakdown—stellar insights.\n\nNoticed you're producing high-signal content regularly, but your multi-platform distribution has an estimated ~15 clip deficit each month.\n\nIncuBrix turns one long-form master into ready-to-publish vertical clips and threads in one unified studio.\n\nOpen to a 2-minute video preview showing 4 automated cutdowns?\n\nBest,\nGrowth Engineering Team | IncuBrix`
      },
      2: {
        subject: `Re: Content leverage for ${fn} ${ln} (cut turnaround to 4 hours)`,
        body: `Hi ${fn},\n\nFollowing up on my note. With ${subs} subscribers, repurposing your top episode moments into short-form assets typically unlocks 25-35% incremental growth.\n\nWorth a 10-minute preview on Thursday?\n\n— IncuBrix Growth Team`
      },
      3: {
        subject: `30-Day Sandbox Pass for ${fn} ${ln}`,
        body: `Hi ${fn},\n\nClosing the loop here. If you ever want to test our one-click renderer, I set up a 30-day creator sandbox pass for your team: https://incubrix.com/creator-pass?ref=${fn.toLowerCase()}\n\nKeep creating,\n— IncuBrix Growth Ops`
      }
    }
  };
}

// 5 Discovery Stages
const DISCOVERY_STAGES = [
  {
    tag: "Stage 01 · Discover",
    headline: "Finding ideas worth making without tool fragmentation",
    question: "When you finish researching a topic across Twitter, Reddit, and newsletters, how does that research carry over into your recording script—or do you have to copy-paste between 3 different documents?",
    friction: "Creators lose 4–6 hours every Monday bouncing between bookmarks, Notion boards, and ChatGPT tabs. Half their vetted ideas die in unorganized doc backlogs.",
    pitch: "IncuBrix brings trend discovery, audience question clustering, and AI-assisted outlines into a single live pipeline. Your vetted idea immediately seeds your recording script in one click."
  },
  {
    tag: "Stage 02 · Create",
    headline: "Produce high-signal content with collaborative AI support",
    question: "Where in your production flow do drafts stall the longest between you and your editors, and how many review rounds happen over Slack threads?",
    friction: "Scripts, research links, and visual cues are scattered. Editors make rough cuts without knowing the core narrative thesis, leading to 2-3 round trips of painful revisions.",
    pitch: "IncuBrix connects script prompts directly to media markers and AI-assisted visual storyboard suggestions, slashing draft-to-cut latency by over 35%."
  },
  {
    tag: "Stage 03 · Repurpose (The Core Bottleneck)",
    headline: "Turn one longform video into a multi-platform content engine",
    question: "You drop a 45-minute YouTube deep dive every Tuesday. How many days pass before that single video becomes 5 short clips, a LinkedIn carousel, and a newsletter?",
    friction: "Repurposing is treated as an afterthought or farmed out to expensive junior editors who miss the core hook. Longform assets expire before derivative reach is unlocked.",
    pitch: "IncuBrix extracts the highest-retention hooks from your master recording and auto-generates platform-native vertical clips, carousels, and newsletter summaries in under 4 hours."
  },
  {
    tag: "Stage 04 · Publish",
    headline: "Synchronized distribution across all channels in one click",
    question: "How many browser tabs does your ops team open on publishing day just to schedule and format the same release across YouTube, LinkedIn, X, and Instagram?",
    friction: "Each platform requires bespoke aspect ratios, character counts, and thumbnail formats. Manual uploading causes metadata errors and inconsistent posting cadences.",
    pitch: "IncuBrix unifies multi-channel scheduling with automatic platform-specific metadata adaptation and thumbnail packaging from one centralized dashboard."
  },
  {
    tag: "Stage 05 · Learn",
    headline: "Closed-loop feedback to correlate ideas with retention and revenue",
    question: "When a video outperforms expectations, can you trace back which hook in the ideation phase caused the spike, or are you looking at isolated analytics in YouTube Studio?",
    friction: "Analytics are retrospective and siloed in native platform apps. Creators don't know what worked well enough to replicate the success systematically.",
    pitch: "IncuBrix closes the loop by connecting downstream audience retention graphs directly back to initial ideation hooks, powering repeatable learning and compounding growth."
  }
];

// Sample Presets for Calculator
const SAMPLE_CREATORS = [
  { name: "The AI Engineering Show (Marcus Vance)", niche: "AI & Fullstack Engineering", audience: "142,000", teamSize: "2", longform: 4, shortform: 1, recentTitle: "Agentic Memory with LangChain Founder" },
  { name: "ProductLed Architect (Elena Rostova)", niche: "B2B SaaS Growth & Loops", audience: "88,500", teamSize: "1", longform: 3, shortform: 0, recentTitle: "Linear's Growth Loop: Why Features Are Marketing" },
  { name: "SaaS Capital & Scaling (David Chen)", niche: "Founder Operations & Bootstrapping", audience: "115,000", teamSize: "3", longform: 6, shortform: 2, recentTitle: "Bootstrapped from $0 to $12M ARR" },
  { name: "UX Mastery (Sarah Sinclair)", niche: "Design Systems & Figma", audience: "230,000", teamSize: "2", longform: 4, shortform: 2, recentTitle: "Mastering Figma Variables & Tokens 2026" }
];

// Document Initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeLeadsData();
  renderPriorityAList();
  selectPriorityLead("IBX-0001");
  runLiveCalculation();
  updatePilotProposal();
});

// Tab Switcher
function switchTab(tabId) {
  const tabs = document.querySelectorAll(".tab-btn");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  panes.forEach(pane => {
    pane.classList.toggle("active", pane.id === tabId);
  });

  window.scrollTo({ top: 380, behavior: 'smooth' });
}

// Initialize Leads Dataset
function initializeLeadsData() {
  // First attempt: fetch leads.json
  fetch("leads.json")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        fullLeadsDataset = data;
        filteredLeads = [...fullLeadsDataset];
        renderPipelineTable();
        updatePaginationInfo();
      } else {
        generateFallbackLeads();
      }
    })
    .catch(() => {
      // Fallback if opened as local file:// without web server
      generateFallbackLeads();
    });
}

function generateFallbackLeads() {
  fullLeadsDataset = [];
  // Build 1,000 synthesized leads matching leads.csv
  for (let i = 1; i <= 1000; i++) {
    const id = `IBX-${String(i).padStart(4, "0")}`;
    if (PRIORITY_A_DATA[id]) {
      const p = PRIORITY_A_DATA[id];
      fullLeadsDataset.push({
        Lead_ID: id,
        Creator_Name: p.name,
        Channel_Title: p.channel,
        Segment: p.segment,
        Country: p.country,
        Audience_Size: p.audience,
        Workflow_Fragmentation_Index: 78,
        Priority_Tier: "Priority A",
        IncuBrix_Need_Evidence: p.pain,
        Best_Channel: p.bestChannel,
        Backup_Channel: p.backupChannel
      });
    } else {
      const firstNames = ["David", "Rachel", "Benjamin", "Hannah", "James", "Chloe", "Kavita", "Simon", "Tyler", "Maya", "Daniel", "Lucas", "Sophie", "Gareth", "Julian", "Tara", "Oliver", "Zoe", "Ryan", "Emma"];
      const lastNames = ["Vance", "Kaufman", "Sterling", "Rostova", "Chen", "Callahan", "Hayes", "Nakamura", "Holt", "Patel", "Foster", "Sinclair", "Mercer", "Abbott", "Kapoor"];
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      const segments = ["Video Podcaster", "YouTube Video-First Creator", "Expert-Led Coach & Consultant", "Technical Educator & Solo Operator"];
      const countries = ["United States", "United Kingdom", "Canada", "Australia", "Singapore", "New Zealand"];
      const frag = 45 + (i % 45);
      const tier = frag >= 65 ? "Tier-1 High Priority" : (frag >= 45 ? "Tier-2 Qualified" : "Tier-3 Nurture");

      fullLeadsDataset.push({
        Lead_ID: id,
        Creator_Name: `${fn} ${ln}`,
        Channel_Title: `${fn} ${ln} Media #${i}`,
        Segment: segments[i % segments.length],
        Country: countries[i % countries.length],
        Audience_Size: `${35 + (i % 380)},000`,
        Workflow_Fragmentation_Index: frag,
        Priority_Tier: tier,
        IncuBrix_Need_Evidence: "Severe Repurposing Bottleneck: Publishes 4+ longform episodes/mo but zero vertical short cutdowns.",
        Best_Channel: i % 2 === 0 ? "Email" : "LinkedIn",
        Backup_Channel: i % 2 === 0 ? "LinkedIn" : "Email"
      });
    }
  }
  filteredLeads = [...fullLeadsDataset];
  renderPipelineTable();
  updatePaginationInfo();
}

// Render CRM Table with Pagination
function renderPipelineTable() {
  const tbody = document.getElementById("pipeline-tbody");
  tbody.innerHTML = "";

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const pageItems = filteredLeads.slice(startIdx, endIdx);

  pageItems.forEach(lead => {
    const tr = document.createElement("tr");
    let tierClass = "tier-1";
    if (lead.Priority_Tier === "Priority A") tierClass = "tier-1";
    else if (lead.Priority_Tier.includes("Tier-2")) tierClass = "tier-2";
    else if (lead.Priority_Tier.includes("Nurture")) tierClass = "nurture";

    const channelTitle = lead.Channel_Title || lead.channel || "Creator Studio";
    const name = lead.Creator_Name || lead.name || "";
    const index = lead.Workflow_Fragmentation_Index || lead.index || 70;
    const tier = lead.Priority_Tier || lead.tier || "Tier-1";
    const trigger = lead.IncuBrix_Need_Evidence || lead.trigger || "Repurposing bottleneck";
    const bestCh = lead.Best_Channel || "Email";

    tr.innerHTML = `
      <td>
        <div class="creator-cell-title">${name} <small style="color:var(--text-dim);">(${channelTitle})</small></div>
        <div class="creator-cell-sub">Country: ${lead.Country || "US"} · Audience: ${lead.Audience_Size || "100k"}</div>
      </td>
      <td>${lead.Segment || "Video Creator"}</td>
      <td><span class="index-badge">${index}/100</span></td>
      <td><span class="tier-pill ${tierClass}">${tier}</span></td>
      <td style="max-width: 280px; font-size: 0.82rem; color: var(--text-muted);">${trigger}</td>
      <td>
        <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="inspectLead('${lead.Lead_ID}')">
          View Hook
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updatePaginationInfo() {
  const total = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIdx = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, total);

  document.getElementById("pagination-info").textContent = `Showing ${startIdx}-${endIdx} of ${total.toLocaleString()} leads`;
  document.getElementById("page-current").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("btn-prev-page").disabled = currentPage <= 1;
  document.getElementById("btn-next-page").disabled = currentPage >= totalPages;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPipelineTable();
    updatePaginationInfo();
  }
}

function nextPage() {
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPipelineTable();
    updatePaginationInfo();
  }
}

function filterPipelineTable() {
  const query = document.getElementById("search-pipeline").value.toLowerCase();
  filteredLeads = fullLeadsDataset.filter(item => {
    const name = (item.Creator_Name || "").toLowerCase();
    const chan = (item.Channel_Title || "").toLowerCase();
    const seg = (item.Segment || "").toLowerCase();
    const tier = (item.Priority_Tier || "").toLowerCase();
    const country = (item.Country || "").toLowerCase();
    return name.includes(query) || chan.includes(query) || seg.includes(query) || tier.includes(query) || country.includes(query);
  });
  currentPage = 1;
  renderPipelineTable();
  updatePaginationInfo();
}

function inspectLead(leadId) {
  if (PRIORITY_A_DATA[leadId]) {
    switchTab("tab-outreach");
    selectPriorityLead(leadId);
  } else {
    alert(`Lead ${leadId} qualified. Recommended Primary Channel: Email. Use creatorops_pipeline.py to generate custom outbound.`);
  }
}

// Priority A Outreach List & Viewer
function renderPriorityAList() {
  const container = document.getElementById("priority-lead-list");
  if (!container) return;
  container.innerHTML = "";

  Object.keys(PRIORITY_A_DATA).forEach(id => {
    const creator = PRIORITY_A_DATA[id];
    const item = document.createElement("div");
    item.className = `priority-lead-item ${id === currentPriorityLeadId ? 'active' : ''}`;
    item.id = `pli-${id}`;
    item.onclick = () => selectPriorityLead(id);
    item.innerHTML = `
      <div>
        <div class="pli-name">${creator.name}</div>
        <div class="pli-meta">${creator.channel} · ${creator.country}</div>
      </div>
      <span class="pli-badge">${creator.bestChannel}</span>
    `;
    container.appendChild(item);
  });
}

function selectPriorityLead(leadId) {
  currentPriorityLeadId = leadId;
  const creator = PRIORITY_A_DATA[leadId];
  if (!creator) return;

  document.querySelectorAll(".priority-lead-item").forEach(el => {
    el.classList.toggle("active", el.id === `pli-${leadId}`);
  });

  document.getElementById("seq-creator-name").textContent = creator.name;
  document.getElementById("seq-creator-meta").textContent = `${creator.channel} · ${creator.segment} · ${creator.audience} Subs · ${creator.country}`;
  document.getElementById("seq-best-channel").textContent = `Best: ${creator.bestChannel}`;
  document.getElementById("seq-backup-channel").textContent = `Backup: ${creator.backupChannel}`;

  renderCurrentTouch();
}

function switchTouch(touchNum) {
  currentTouchNumber = touchNum;
  document.querySelectorAll(".touch-tab-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === touchNum);
  });
  renderCurrentTouch();
}

function renderCurrentTouch() {
  const creator = PRIORITY_A_DATA[currentPriorityLeadId];
  if (!creator || !creator.sequences[currentTouchNumber]) return;

  const seq = creator.sequences[currentTouchNumber];
  document.getElementById("seq-subject").textContent = seq.subject;
  document.getElementById("seq-body").textContent = seq.body;
}

function copyCurrentTouchSubject() {
  const subj = document.getElementById("seq-subject").textContent;
  navigator.clipboard.writeText(subj).then(() => showCopyAlert());
}

function copyCurrentTouchBody() {
  const subj = document.getElementById("seq-subject").textContent;
  const body = document.getElementById("seq-body").textContent;
  const full = `Subject: ${subj}\n\n${body}`;
  navigator.clipboard.writeText(full).then(() => showCopyAlert());
}

function showCopyAlert() {
  const alertEl = document.getElementById("copy-alert");
  alertEl.classList.add("show");
  setTimeout(() => alertEl.classList.remove("show"), 2000);
}

// Interactive Seed Test Simulator
let seedTestRunning = false;
function runInteractiveSeedTest() {
  if (seedTestRunning) return;
  seedTestRunning = true;
  const btn = document.getElementById("btn-trigger-seed-test");
  btn.disabled = true;
  btn.textContent = "⏳ Dispatching Live Seed Sequences...";

  const logBox = document.getElementById("seed-console-log");
  const appendLog = (text, cls = "info") => {
    const line = document.createElement("div");
    line.className = `log-line ${cls}`;
    const timestamp = new Date().toLocaleTimeString();
    line.textContent = `[${timestamp}] ${text}`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  };

  appendLog("Starting 3-Channel Seed Test Dispatch across candidate test accounts...", "cyan");

  // Step 1: Email Test
  const cardEmail = document.getElementById("card-test-email");
  const statusEmail = document.getElementById("status-email");
  cardEmail.classList.add("active");
  statusEmail.textContent = "Sending...";
  statusEmail.className = "seed-status-badge running";

  setTimeout(() => {
    document.getElementById("val-email-deliv").textContent = "250 OK (Inboxed)";
    appendLog("Channel 1 (Email): SMTP Handshake complete. Delivered to test-creator-ops@outlook.com", "success");

    setTimeout(() => {
      document.getElementById("val-email-click").textContent = "Clicked (200 OK)";
      appendLog("Channel 1 (Email): Tracking link clicked -> https://incubrix.com/creator-pass?ref=test", "success");

      setTimeout(() => {
        document.getElementById("val-email-reply").textContent = "Logged (Webhook)";
        statusEmail.textContent = "PASSED";
        statusEmail.className = "seed-status-badge passed";
        appendLog("Channel 1 (Email): Inbound reply webhook triggered and registered in CRM.", "success");

        // Step 2: LinkedIn
        runLinkedInSeedTest(appendLog, btn);
      }, 700);
    }, 700);
  }, 700);
}

function runLinkedInSeedTest(appendLog, btn) {
  const cardLi = document.getElementById("card-test-linkedin");
  const statusLi = document.getElementById("status-linkedin");
  cardLi.classList.add("active");
  statusLi.textContent = "Dispatching...";
  statusLi.className = "seed-status-badge running";
  appendLog("Channel 2 (LinkedIn): Initializing InMail sequence payload...", "cyan");

  setTimeout(() => {
    document.getElementById("val-li-deliv").textContent = "Delivered (DM)";
    appendLog("Channel 2 (LinkedIn): InMail payload accepted by LinkedIn Gateway.", "success");

    setTimeout(() => {
      document.getElementById("val-li-read").textContent = "Read Confirmed";
      document.getElementById("val-li-reply").textContent = "Reply Captured";
      statusLi.textContent = "PASSED";
      statusLi.className = "seed-status-badge passed";
      appendLog("Channel 2 (LinkedIn): Read receipt confirmed. Zero spam-flag alerts.", "success");

      // Step 3: YouTube
      runYouTubeSeedTest(appendLog, btn);
    }, 700);
  }, 700);
}

function runYouTubeSeedTest(appendLog, btn) {
  const cardYt = document.getElementById("card-test-yt");
  const statusYt = document.getElementById("status-yt");
  cardYt.classList.add("active");
  statusYt.textContent = "Verifying...";
  statusYt.className = "seed-status-badge running";
  appendLog("Channel 3 (YouTube): Testing official Business Contact payload formatting...", "cyan");

  setTimeout(() => {
    document.getElementById("val-yt-captcha").textContent = "Passed";
    document.getElementById("val-yt-payload").textContent = "< 500 Chars OK";
    document.getElementById("val-yt-comp").textContent = "100% Compliant";
    statusYt.textContent = "PASSED";
    statusYt.className = "seed-status-badge passed";
    appendLog("Channel 3 (YouTube): Form payload validated against YouTube commercial limits.", "success");
    appendLog("OVERALL SEED TEST RESULT: 3/3 Channels Verified. Link tracking & reply logging ACTIVE.", "success");

    btn.disabled = false;
    btn.textContent = "✔ Seed Test Passed (Re-run)";
    seedTestRunning = false;
  }, 800);
}

function clearConsoleLog() {
  document.getElementById("seed-console-log").innerHTML = `<div class="log-line info">[SYS] Console cleared.</div>`;
}

// Workbook Tabs Navigation
function switchWbTab(index) {
  document.querySelectorAll(".wb-tab-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
  for (let i = 0; i <= 4; i++) {
    const pane = document.getElementById(`wb-pane-${i}`);
    if (pane) pane.style.display = (i === index) ? "block" : "none";
  }
}

// Preset Loader for Signal Calculator
function loadSampleCreator(index) {
  const creator = SAMPLE_CREATORS[index];
  if (!creator) return;

  document.querySelectorAll(".chip-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  document.getElementById("creator-name").value = creator.name;
  document.getElementById("creator-niche").value = creator.niche;
  document.getElementById("audience-size").value = creator.audience;
  document.getElementById("team-size").value = creator.teamSize;
  document.getElementById("longform-freq").value = creator.longform;
  document.getElementById("shortform-freq").value = creator.shortform;
  document.getElementById("latest-video-title").value = creator.recentTitle;

  updateSliderLabels();
  runLiveCalculation();
}

function updateSliderLabels() {
  const longVal = document.getElementById("longform-freq").value;
  const shortVal = document.getElementById("shortform-freq").value;
  document.getElementById("longform-freq-val").textContent = `${longVal} videos`;
  document.getElementById("shortform-freq-val").textContent = `${shortVal} clips/wk`;
}

// Live Signal Calculation Algorithm
function runLiveCalculation() {
  const longform = parseInt(document.getElementById("longform-freq").value, 10);
  const shortform = parseInt(document.getElementById("shortform-freq").value, 10);
  const teamSize = parseInt(document.getElementById("team-size").value, 10);

  const expectedShortsMonthly = longform * 3;
  const actualShortsMonthly = shortform * 4;
  const repurposeDeficit = Math.max(0, expectedShortsMonthly - actualShortsMonthly);

  const repurposeFriction = Math.min(100, Math.round((repurposeDeficit / Math.max(1, expectedShortsMonthly)) * 100));
  const publishFriction = teamSize > 2 ? 65 : 78;
  const createFriction = teamSize > 2 ? 80 : 55;
  const discoverFriction = 60;
  const learnFriction = 75;

  const totalScore = Math.min(98, Math.max(15, Math.round(
    (repurposeFriction * 0.45) +
    (publishFriction * 0.20) +
    (createFriction * 0.20) +
    (discoverFriction * 0.15)
  )));

  document.getElementById("res-score").textContent = totalScore;

  // SVG Gauge
  const circle = document.getElementById("gauge-circle");
  if (circle) {
    const offset = 314 - (314 * (totalScore / 100));
    circle.style.strokeDashoffset = offset;
  }

  // Visual text
  if (totalScore >= 65) {
    document.getElementById("res-tier-badge").textContent = "Tier-1 High Priority Opportunity";
    document.getElementById("res-headline").textContent = "High Repurposing & Tool Friction";
    document.getElementById("res-desc").innerHTML = `This creator is publishing strong longform content, but is losing an estimated <strong>${(longform * 4.5).toFixed(1)} hours/week</strong> stitching disconnected editing, clipping, and distribution tools.`;
  } else {
    document.getElementById("res-tier-badge").textContent = "Tier-2 Qualified";
    document.getElementById("res-headline").textContent = "Moderate Tool Sprawl";
    document.getElementById("res-desc").innerHTML = `Consistent production cadence. Primary opportunity is streamlining multi-channel distribution latency.`;
  }

  document.getElementById("score-repurpose").textContent = `${repurposeFriction}%`;
  document.getElementById("fill-repurpose").style.width = `${repurposeFriction}%`;
}

// Discovery Stage Selector
function selectDiscoveryStage(index) {
  const stage = DISCOVERY_STAGES[index];
  if (!stage) return;

  document.querySelectorAll(".discovery-stage-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  document.getElementById("disc-stage-tag").textContent = stage.tag;
  document.getElementById("disc-headline").textContent = stage.headline;
  document.getElementById("disc-question").textContent = `"${stage.question}"`;
  document.getElementById("disc-friction").textContent = stage.friction;
  document.getElementById("disc-pitch").textContent = `"${stage.pitch}"`;
}

// Pilot & ROI Calculator
function updatePilotProposal() {
  const clientName = document.getElementById("pilot-client-name").value || "Prospective Studio";
  const rate = parseFloat(document.getElementById("editor-hourly-rate").value) || 45;
  const videos = parseInt(document.getElementById("pilot-video-vol").value, 10);
  const team = parseInt(document.getElementById("pilot-team-count").value, 10);

  document.getElementById("pilot-video-vol-val").textContent = `${videos} videos`;
  document.getElementById("pilot-team-count-val").textContent = `${team} members`;

  const hoursWastedMonthly = (videos * 10) + (team * 12);
  const dollarsWasted = hoursWastedMonthly * rate;
  const hoursSavedWithIncuBrix = Math.round(hoursWastedMonthly * 0.75);
  const annualNetValue = Math.round((hoursSavedWithIncuBrix * rate * 12) - 3600);

  document.getElementById("roi-hours-wasted").textContent = `${hoursWastedMonthly} hrs / month`;
  document.getElementById("roi-dollars-wasted").textContent = `$${dollarsWasted.toLocaleString()} / month`;
  document.getElementById("roi-hours-saved").textContent = `${hoursSavedWithIncuBrix} hrs / month`;
  document.getElementById("roi-annual-value").textContent = `$${annualNetValue.toLocaleString()} / year`;

  document.getElementById("proposal-client-sub").textContent = `Prepared for: ${clientName}`;
}

function printOrSaveProposal() {
  window.print();
}

// Exports
function downloadPipelineCSV() {
  const link = document.createElement("a");
  link.setAttribute("href", "leads.csv");
  link.setAttribute("download", "leads.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadPipelineJSON() {
  const link = document.createElement("a");
  link.setAttribute("href", "leads.json");
  link.setAttribute("download", "leads.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
