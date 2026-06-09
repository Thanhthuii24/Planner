const STORAGE_KEY = "personal-planner-phase-1";

const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString();
const makeId = () => {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const seedState = {
  activeView: "today",
  energyByDate: {},
  tasks: [
    {
      id: makeId(),
      title: "Chon 3 viec quan trong cho hom nay",
      description: "Dung Today screen de giu ngay moi gon va ro.",
      status: "planned",
      priority: "high",
      dueDate: todayISO(),
      estimatedMinutes: 15,
      context: "computer",
      goalId: "",
      isTodayFocus: true,
      createdAt: nowISO(),
      updatedAt: nowISO()
    }
  ],
  goals: [
    {
      id: makeId(),
      title: "Xay planner ca nhan dung hang ngay",
      reason: "Co mot noi de giu uu tien, task va review tuan.",
      category: "personal",
      deadline: "",
      status: "active",
      progressMetric: "Dung app 5 ngay lien tiep",
      createdAt: nowISO(),
      updatedAt: nowISO()
    }
  ],
  reviews: [],
  notes: [],
  habits: [],
  habitLogs: [],
  dailyLogs: [],
  monthPlans: [],
  personalOS: {
    currentPriorities: [],
    principles: [],
    routines: {
      morning: [],
      evening: [],
      weekly: []
    },
    avoidList: [],
    decisionRules: [],
    updatedAt: ""
  }
};

let state = loadState();

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  render();
});

function cacheElements() {
  document.querySelectorAll("[id]").forEach((el) => {
    els[el.id] = el;
  });
  els.navTabs = document.querySelectorAll(".nav-tab");
  els.views = document.querySelectorAll(".view");
}

function bindEvents() {
  els.navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeView = tab.dataset.view;
      saveState();
      render();
    });
  });

  els["energy-select"].addEventListener("change", (event) => {
    state.energyByDate[todayISO()] = event.target.value;
    saveState();
  });

  els["quick-task-form"].addEventListener("submit", (event) => {
    event.preventDefault();
    const title = els["quick-task-title"].value.trim();
    if (!title) return;
    createTask({ title, dueDate: todayISO(), status: "planned", priority: "medium" });
    els["quick-task-title"].value = "";
  });

  els["task-form"].addEventListener("submit", handleTaskSubmit);
  els["task-reset"].addEventListener("click", resetTaskForm);
  els["task-search"].addEventListener("input", renderTasks);
  els["task-filter"].addEventListener("change", renderTasks);

  els["goal-form"].addEventListener("submit", handleGoalSubmit);
  els["goal-reset"].addEventListener("click", resetGoalForm);

  els["review-form"].addEventListener("submit", handleReviewSubmit);
  els["capture-form"].addEventListener("submit", handleCaptureSubmit);
  els["note-search"].addEventListener("input", renderNotes);
  els["note-filter"].addEventListener("change", renderNotes);
  els["daily-log-form"].addEventListener("submit", handleDailyLogSubmit);
  els["habit-form"].addEventListener("submit", handleHabitSubmit);
  els["month-form"].addEventListener("submit", handleMonthSubmit);
  els["month-reset"].addEventListener("click", resetMonthForm);
  els["os-form"].addEventListener("submit", handleOSSubmit);
  els["share-app"].addEventListener("click", shareApp);

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js");
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneState(seedState);
    const parsed = JSON.parse(raw);
    return {
      ...cloneState(seedState),
      ...parsed,
      energyByDate: parsed.energyByDate || {},
      tasks: parsed.tasks || [],
      goals: parsed.goals || [],
      reviews: parsed.reviews || [],
      notes: parsed.notes || [],
      habits: parsed.habits || [],
      habitLogs: parsed.habitLogs || [],
      dailyLogs: parsed.dailyLogs || [],
      monthPlans: parsed.monthPlans || [],
      personalOS: {
        ...cloneState(seedState.personalOS),
        ...(parsed.personalOS || {}),
        routines: {
          ...cloneState(seedState.personalOS.routines),
          ...((parsed.personalOS && parsed.personalOS.routines) || {})
        }
      }
    };
  } catch {
    return cloneState(seedState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  renderNavigation();
  renderGoalOptions();
  renderToday();
  renderTasks();
  renderGoals();
  renderReview();
  renderNotes();
  renderDailyLog();
  renderHabits();
  renderMonthPlans();
  renderInsights();
  renderPersonalOS();
}

function renderNavigation() {
  els.navTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === state.activeView);
  });
  els.views.forEach((view) => {
    view.classList.toggle("active", view.id === `${state.activeView}-view`);
  });
}

function renderToday() {
  const date = new Date();
  els["today-label"].textContent = date.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  els["energy-select"].value = state.energyByDate[todayISO()] || "medium";

  const openTasks = state.tasks.filter((task) => task.status !== "done" && task.status !== "archived");
  const focusTasks = openTasks.filter((task) => task.isTodayFocus).slice(0, 3);
  const dueToday = openTasks.filter((task) => task.dueDate === todayISO());
  const overdue = openTasks.filter((task) => task.dueDate && task.dueDate < todayISO());

  els["focus-count"].textContent = `${focusTasks.length}/3`;
  els["due-count"].textContent = dueToday.length;
  els["overdue-count"].textContent = overdue.length;

  renderTaskList(els["focus-list"], focusTasks, "Chua co focus task. Hay bam Focus tren task quan trong.");
  renderTaskList(els["due-today-list"], dueToday, "Hom nay chua co task den han.");
  renderTaskList(els["overdue-list"], overdue, "Khong co task qua han.");
}

function renderTasks() {
  const search = els["task-search"].value.trim().toLowerCase();
  const filter = els["task-filter"].value;
  const tasks = state.tasks
    .filter((task) => filter === "all" || task.status === filter)
    .filter((task) => {
      if (!search) return true;
      return `${task.title} ${task.description || ""}`.toLowerCase().includes(search);
    })
    .sort(sortTasks);

  renderTaskList(els["task-list"], tasks, "Chua co task nao. Them task dau tien o form ben tren.");
}

function renderGoals() {
  if (!state.goals.length) {
    els["goal-list"].innerHTML = emptyHTML("Chua co goal nao. Them goal dau tien de gan task vao muc tieu.");
    return;
  }

  els["goal-list"].innerHTML = state.goals.map((goal) => {
    const linked = state.tasks.filter((task) => task.goalId === goal.id);
    const done = linked.filter((task) => task.status === "done").length;
    const percent = linked.length ? Math.round((done / linked.length) * 100) : 0;
    const nextAction = linked.find((task) => task.status !== "done" && task.status !== "archived");

    return `
      <article class="goal-card">
        <div class="task-top">
          <div>
            <h3>${escapeHTML(goal.title)}</h3>
            <div class="meta-row">
              <span class="pill">${goal.category}</span>
              <span class="pill">${goal.status}</span>
              ${goal.deadline ? `<span class="pill">Deadline ${formatDate(goal.deadline)}</span>` : ""}
            </div>
          </div>
          <div class="task-actions">
            <button class="ghost" data-action="edit-goal" data-id="${goal.id}">Sua</button>
            <button class="ghost" data-action="delete-goal" data-id="${goal.id}">Xoa</button>
          </div>
        </div>
        ${goal.reason ? `<p>${escapeHTML(goal.reason)}</p>` : ""}
        ${goal.progressMetric ? `<p><strong>Metric:</strong> ${escapeHTML(goal.progressMetric)}</p>` : ""}
        <div>
          <div class="section-title">
            <span>Tien do task</span>
            <span>${done}/${linked.length}</span>
          </div>
          <div class="progress"><span style="width: ${percent}%"></span></div>
        </div>
        <p><strong>Next action:</strong> ${nextAction ? escapeHTML(nextAction.title) : "Chua co next action"}</p>
      </article>
    `;
  }).join("");

  els["goal-list"].querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handleGoalAction);
  });
}

function renderReview() {
  const weekStart = getWeekStart();
  const completed = state.tasks.filter((task) => task.completedAt && task.completedAt >= weekStart);
  const overdue = state.tasks.filter((task) => task.status !== "done" && task.status !== "archived" && task.dueDate && task.dueDate < todayISO());

  els["completed-week-count"].textContent = completed.length;
  els["review-overdue-count"].textContent = overdue.length;

  renderTaskList(els["completed-week-list"], completed, "Tuan nay chua co task nao hoan thanh.");
  renderTaskList(els["review-overdue-list"], overdue, "Khong co task tre can xu ly.");

  if (!state.reviews.length) {
    els["review-history"].innerHTML = emptyHTML("Chua co review nao. Viet review tuan nay de bat dau lich su.");
    return;
  }

  els["review-history"].innerHTML = state.reviews
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((review) => `
      <article class="review-item">
        <div class="section-title">
          <h3>Tuan bat dau ${formatDate(review.weekStart)}</h3>
          <span>${formatDate(review.createdAt.slice(0, 10))}</span>
        </div>
        <p><strong>Wins:</strong> ${escapeHTML(review.wins || "Chua ghi")}</p>
        <p><strong>Blockers:</strong> ${escapeHTML(review.blockers || "Chua ghi")}</p>
        <p><strong>Lessons:</strong> ${escapeHTML(review.lessons || "Chua ghi")}</p>
        <p><strong>Focus tuan toi:</strong> ${review.nextWeekFocus.map(escapeHTML).join(", ") || "Chua ghi"}</p>
      </article>
    `).join("");
}

function renderGoalOptions() {
  const options = [`<option value="">Khong gan goal</option>`]
    .concat(state.goals.map((goal) => `<option value="${goal.id}">${escapeHTML(goal.title)}</option>`));
  els["task-goal"].innerHTML = options.join("");
}

function renderTaskList(container, tasks, emptyMessage) {
  if (!tasks.length) {
    container.innerHTML = emptyHTML(emptyMessage);
    return;
  }

  container.innerHTML = tasks.map((task) => {
    const goal = state.goals.find((item) => item.id === task.goalId);
    const isDone = task.status === "done";
    const isOverdue = task.dueDate && task.dueDate < todayISO() && !isDone;

    return `
      <article class="task-item">
        <div class="task-top">
          <div class="task-title-row">
            <input type="checkbox" data-action="toggle-done" data-id="${task.id}" ${isDone ? "checked" : ""} />
            <div>
              <p class="task-name ${isDone ? "done" : ""}">${escapeHTML(task.title)}</p>
              ${task.description ? `<p class="task-description">${escapeHTML(task.description)}</p>` : ""}
            </div>
          </div>
          <div class="task-actions">
            <button class="ghost" data-action="toggle-focus" data-id="${task.id}">${task.isTodayFocus ? "Unfocus" : "Focus"}</button>
            <button class="ghost" data-action="edit-task" data-id="${task.id}">Sua</button>
            <button class="ghost" data-action="delete-task" data-id="${task.id}">Xoa</button>
          </div>
        </div>
        <div class="meta-row">
          <span class="pill ${task.priority}">${task.priority}</span>
          <span class="pill">${task.status}</span>
          ${task.dueDate ? `<span class="pill ${isOverdue ? "overdue" : ""}">${formatDate(task.dueDate)}</span>` : ""}
          ${task.estimatedMinutes ? `<span class="pill">${task.estimatedMinutes} phut</span>` : ""}
          ${task.context ? `<span class="pill">${task.context}</span>` : ""}
          ${goal ? `<span class="pill">${escapeHTML(goal.title)}</span>` : ""}
        </div>
      </article>
    `;
  }).join("");

  container.querySelectorAll("button, input[type='checkbox']").forEach((control) => {
    control.addEventListener("click", handleTaskAction);
  });
}

function emptyHTML(message) {
  return `<div class="empty">${escapeHTML(message)}</div>`;
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const id = els["task-id"].value;
  const payload = readTaskForm();

  if (id) {
    state.tasks = state.tasks.map((task) => {
      if (task.id !== id) return task;
      const wasDone = task.status === "done";
      const completedAt = payload.status === "done" ? task.completedAt || nowISO() : "";
      return { ...task, ...payload, completedAt, updatedAt: nowISO(), isTodayFocus: wasDone && payload.status !== "done" ? false : task.isTodayFocus };
    });
  } else {
    createTask(payload, false);
  }

  saveState();
  resetTaskForm();
  render();
}

function readTaskForm() {
  return {
    title: els["task-title"].value.trim(),
    description: els["task-description"].value.trim(),
    status: els["task-status"].value,
    priority: els["task-priority"].value,
    dueDate: els["task-due"].value,
    estimatedMinutes: Number(els["task-minutes"].value) || 0,
    context: els["task-context"].value,
    goalId: els["task-goal"].value
  };
}

function createTask(payload, shouldRender = true) {
  state.tasks.unshift({
    id: makeId(),
    title: payload.title,
    description: payload.description || "",
    status: payload.status || "inbox",
    priority: payload.priority || "medium",
    dueDate: payload.dueDate || "",
    estimatedMinutes: payload.estimatedMinutes || 0,
    context: payload.context || "",
    goalId: payload.goalId || "",
    isTodayFocus: false,
    createdAt: nowISO(),
    updatedAt: nowISO(),
    completedAt: payload.status === "done" ? nowISO() : ""
  });
  saveState();
  if (shouldRender) render();
}

function handleTaskAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;

  if (action === "toggle-done") {
    const done = event.currentTarget.checked;
    task.status = done ? "done" : "planned";
    task.completedAt = done ? nowISO() : "";
    task.updatedAt = nowISO();
  }

  if (action === "toggle-focus") {
    const focusCount = state.tasks.filter((item) => item.isTodayFocus && item.id !== id && item.status !== "done").length;
    if (!task.isTodayFocus && focusCount >= 3) {
      alert("Hom nay chi nen co toi da 3 focus tasks.");
      return;
    }
    task.isTodayFocus = !task.isTodayFocus;
    task.updatedAt = nowISO();
  }

  if (action === "edit-task") {
    fillTaskForm(task);
    state.activeView = "tasks";
  }

  if (action === "delete-task") {
    state.tasks = state.tasks.filter((item) => item.id !== id);
  }

  saveState();
  render();
}

function fillTaskForm(task) {
  els["task-id"].value = task.id;
  els["task-title"].value = task.title;
  els["task-description"].value = task.description || "";
  els["task-status"].value = task.status;
  els["task-priority"].value = task.priority;
  els["task-due"].value = task.dueDate || "";
  els["task-minutes"].value = task.estimatedMinutes || "";
  els["task-context"].value = task.context || "";
  els["task-goal"].value = task.goalId || "";
  els["task-submit"].textContent = "Luu task";
}

function resetTaskForm() {
  els["task-form"].reset();
  els["task-id"].value = "";
  els["task-submit"].textContent = "Them task";
}

function handleGoalSubmit(event) {
  event.preventDefault();
  const id = els["goal-id"].value;
  const payload = readGoalForm();

  if (id) {
    state.goals = state.goals.map((goal) => goal.id === id ? { ...goal, ...payload, updatedAt: nowISO() } : goal);
  } else {
    state.goals.unshift({
      id: makeId(),
      ...payload,
      createdAt: nowISO(),
      updatedAt: nowISO()
    });
  }

  saveState();
  resetGoalForm();
  render();
}

function readGoalForm() {
  return {
    title: els["goal-title"].value.trim(),
    reason: els["goal-reason"].value.trim(),
    category: els["goal-category"].value,
    deadline: els["goal-deadline"].value,
    status: els["goal-status"].value,
    progressMetric: els["goal-metric"].value.trim()
  };
}

function handleGoalAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  const goal = state.goals.find((item) => item.id === id);
  if (!goal) return;

  if (action === "edit-goal") {
    fillGoalForm(goal);
  }

  if (action === "delete-goal") {
    state.goals = state.goals.filter((item) => item.id !== id);
    state.tasks = state.tasks.map((task) => task.goalId === id ? { ...task, goalId: "", updatedAt: nowISO() } : task);
  }

  saveState();
  render();
}

function fillGoalForm(goal) {
  els["goal-id"].value = goal.id;
  els["goal-title"].value = goal.title;
  els["goal-reason"].value = goal.reason || "";
  els["goal-category"].value = goal.category;
  els["goal-deadline"].value = goal.deadline || "";
  els["goal-status"].value = goal.status;
  els["goal-metric"].value = goal.progressMetric || "";
  els["goal-submit"].textContent = "Luu goal";
}

function resetGoalForm() {
  els["goal-form"].reset();
  els["goal-id"].value = "";
  els["goal-submit"].textContent = "Them goal";
}

function handleReviewSubmit(event) {
  event.preventDefault();
  state.reviews.unshift({
    id: makeId(),
    weekStart: getWeekStart(),
    wins: els["review-wins"].value.trim(),
    blockers: els["review-blockers"].value.trim(),
    lessons: els["review-lessons"].value.trim(),
    nextWeekFocus: els["review-focus"].value.split("\n").map((line) => line.trim()).filter(Boolean),
    createdAt: nowISO()
  });

  els["review-form"].reset();
  saveState();
  render();
}

function sortTasks(a, b) {
  const statusWeight = { doing: 0, planned: 1, inbox: 2, done: 3, archived: 4 };
  const priorityWeight = { high: 0, medium: 1, low: 2 };
  return (
    (statusWeight[a.status] ?? 9) - (statusWeight[b.status] ?? 9) ||
    (priorityWeight[a.priority] ?? 9) - (priorityWeight[b.priority] ?? 9) ||
    (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31")
  );
}

function getWeekStart() {
  const date = new Date();
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return date.toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

async function shareApp() {
  const shareData = {
    title: "Personal Planner",
    text: "Planner ca nhan mien phi, dung duoc tren web va mobile.",
    url: location.href
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(location.href);
    alert("Da copy link app vao clipboard.");
    return;
  }

  prompt("Copy link app:", location.href);
}
