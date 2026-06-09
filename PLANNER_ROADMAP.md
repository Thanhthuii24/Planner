# Personal Planner App Roadmap

## 1. Product Vision

App nay la mot planner ca nhan, duoc thiet ke de giup ban:

- Biet hom nay can lam gi.
- Ket noi task hang ngay voi muc tieu lon hon.
- Giam qua tai khi co qua nhieu viec can nho.
- Theo doi tien do, nang luong, thoi quen va uu tien theo tuan.
- Tao mot he thong van hanh ca nhan, khong chi la todo list.

Nguyen tac san pham:

- Mo app len la thay ngay viec quan trong nhat.
- It man hinh, it nhieu, thao tac nhanh.
- Du lieu ca nhan phai ro rang, de xem lai, de sua.
- Bat dau local-first, sau do moi tinh den sync va account.
- Planner phai giup ban ra quyet dinh, khong chi luu danh sach viec.

## 2. Target User

Nguoi dung chinh la chinh ban.

Nhu cau cot loi:

- Lap ke hoach ngay va tuan.
- Quan ly task ca nhan, cong viec, hoc tap, du an.
- Theo doi muc tieu dai han.
- Ghi nhanh y tuong hoac viec bat chot.
- Review de biet minh dang di dung huong hay khong.

## 3. Core Modules

### 3.1 Today

Man hinh chinh khi mo app.

Chuc nang:

- Chon 3 viec quan trong nhat trong ngay.
- Xem task den han hom nay.
- Xem task qua han.
- Them note nhanh.
- Chon muc nang luong trong ngay: low, medium, high.
- Xem time blocks cua ngay.
- Danh dau hoan thanh task.

Muc tieu UX:

- Khong can mo nhieu tab de biet hom nay lam gi.
- Task quan trong phai noi bat hon task binh thuong.
- Neu nang luong thap, app nen giup chon viec nho va quan trong.

### 3.2 Tasks

Noi quan ly tat ca viec can lam.

Chuc nang:

- Tao, sua, xoa task.
- Gan priority: low, medium, high.
- Gan status: inbox, planned, doing, done, archived.
- Gan due date.
- Gan estimated duration.
- Gan context: home, computer, outside, call, deep work.
- Gan task vao goal hoac project.
- Loc task theo status, date, priority, goal, context.

Muc tieu UX:

- Them task phai cuc nhanh.
- Loc va sap xep phai de hieu.
- Task qua han nen duoc hien ro nhung khong gay cam giac bi phat.

### 3.3 Goals

Noi dat muc tieu lon hon task.

Chuc nang:

- Tao goal theo thang, quy, nam.
- Gan category: health, work, learning, finance, relationships, personal.
- Viet ly do cua goal.
- Dat deadline.
- Dat progress metric.
- Gan task vao goal.
- Xem tien do dua tren task da hoan thanh.

Muc tieu UX:

- Goal khong chi la ten, ma phai co ly do.
- App nen giup thay goal nao dang bi bo quen.
- Moi goal nen co next action ro rang.

### 3.4 Weekly Review

Noi nhin lai moi tuan.

Chuc nang:

- Tong hop task da hoan thanh trong tuan.
- Tong hop task bi tre hoac bi doi lich nhieu lan.
- Hoi cac cau hoi review:
  - Tuan nay minh da lam duoc gi?
  - Viec nao quan trong nhung bi tri hoan?
  - Dieu gi lam minh mat nang luong?
  - Tuan toi nen tap trung vao dau?
- Tao ke hoach tuan moi tu review.

Muc tieu UX:

- Review khong nen dai.
- Co the hoan thanh trong 10-15 phut.
- Sau review phai ra duoc 1-3 uu tien cho tuan sau.

### 3.5 Notes / Capture

Noi ghi nhanh moi thu.

Chuc nang:

- Tao note nhanh.
- Gan tag.
- Chuyen note thanh task.
- Chuyen note thanh goal idea.
- Luu note theo ngay.

Muc tieu UX:

- Input nhanh hon viec mo app ghi chu rieng.
- Note khong bi tro thanh bai rac: can co inbox de xu ly sau.

### 3.6 Personal Operating System

Noi luu cac nguyen tac va thiet lap song ca nhan.

Chuc nang:

- Luu current priorities.
- Luu routines: morning, evening, weekly.
- Luu principles.
- Luu things to avoid.
- Luu decision rules.
- Luu life areas dang uu tien.

Vi du:

- Current priority: suc khoe, xay san pham, ngu dung gio.
- Avoid: nhan them viec le, hoc lan man, lam qua nhieu feature cung luc.
- Rule: neu task mat duoi 5 phut va quan trong thi lam ngay.

## 4. Development Phases

## Phase 0: Product Definition

Muc tieu:

- Chot pham vi ban dau.
- Xac dinh flow chinh.
- Xac dinh data model so bo.
- Tao roadmap va checklist.

Deliverables:

- Roadmap Markdown.
- Danh sach tinh nang MVP.
- Wireframe text cho cac man hinh chinh.
- Data model ban dau.

Checklist:

- [ ] Chot app se chay web, desktop hay mobile-first.
- [ ] Chot tech stack.
- [ ] Chot local storage hay database.
- [ ] Chot style UI.
- [ ] Chot MVP scope.

Definition of Done:

- Co tai lieu ro rang de bat dau code.
- Biet man hinh nao se lam truoc.
- Biet tinh nang nao se bi de lai sau.

## Phase 1: MVP Local Planner

Muc tieu:

- Co app dung duoc hang ngay o muc co ban.
- Du lieu luu local.
- Tap trung vao Today, Tasks, Goals, Weekly Review.

Screens:

- Today
- Tasks
- Goals
- Weekly Review

Features:

- Them, sua, xoa task.
- Danh dau task hoan thanh.
- Gan due date cho task.
- Gan priority cho task.
- Gan task vao goal.
- Tao goal.
- Xem goal detail.
- Chon 3 task quan trong nhat hom nay.
- Tao weekly review don gian.
- Luu du lieu bang localStorage hoac IndexedDB.

Suggested Data Model:

```ts
type Task = {
  id: string;
  title: string;
  description?: string;
  status: "inbox" | "planned" | "doing" | "done" | "archived";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  estimatedMinutes?: number;
  context?: "home" | "computer" | "outside" | "call" | "deep-work";
  goalId?: string;
  isTodayFocus?: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

type Goal = {
  id: string;
  title: string;
  reason?: string;
  category: "health" | "work" | "learning" | "finance" | "relationships" | "personal";
  deadline?: string;
  status: "active" | "paused" | "done" | "archived";
  progressMetric?: string;
  createdAt: string;
  updatedAt: string;
};

type WeeklyReview = {
  id: string;
  weekStart: string;
  wins: string;
  blockers: string;
  lessons: string;
  nextWeekFocus: string[];
  createdAt: string;
};
```

Definition of Done:

- Co the dung app de lap ke hoach mot ngay that.
- Reload trinh duyet khong mat du lieu.
- Co the tao goal va gan task vao goal.
- Co the lam weekly review co ban.

## Phase 2: Better Planning Experience

Muc tieu:

- Planner tro nen de dung hon trong doi song that.
- Them capture, notes, routines va habit tracking.

Screens:

- Capture Inbox
- Notes
- Routines
- Habits
- Settings

Features:

- Ghi note nhanh.
- Chuyen note thanh task.
- Tao routine sang/toi.
- Tao habit va track theo ngay.
- Track mood va energy.
- Loc Today theo energy.
- Them recurring tasks.
- Them calendar-like daily layout.

Suggested Data Model Additions:

```ts
type Note = {
  id: string;
  content: string;
  tags: string[];
  linkedTaskId?: string;
  linkedGoalId?: string;
  createdAt: string;
  updatedAt: string;
};

type Habit = {
  id: string;
  title: string;
  frequency: "daily" | "weekly";
  targetCount?: number;
  createdAt: string;
};

type HabitLog = {
  id: string;
  habitId: string;
  date: string;
  value: number;
};

type DailyLog = {
  id: string;
  date: string;
  energy: "low" | "medium" | "high";
  mood?: string;
  notes?: string;
};
```

Definition of Done:

- Co the capture y tuong nhanh ma khong pha flow.
- Co the theo doi habit co ban.
- Today co tinh den energy cua ngay.
- Co routine sang/toi de bam theo.

## Phase 3: Review, Insights, And Personal OS

Muc tieu:

- Bien planner thanh he thong van hanh ca nhan.
- Giup ban nhin ra pattern, khong chi ghi viec.

Screens:

- Insights
- Personal OS
- Goal Progress
- Review History

Features:

- Thong ke task hoan thanh theo tuan.
- Thong ke goal nao co tien do, goal nao bi bo quen.
- Hien task bi tri hoan nhieu lan.
- Hien habit streak.
- Luu principles.
- Luu current priorities.
- Luu things to avoid.
- Luu decision rules.
- Review thang.

Suggested Data Model Additions:

```ts
type PersonalOS = {
  currentPriorities: string[];
  principles: string[];
  routines: {
    morning: string[];
    evening: string[];
    weekly: string[];
  };
  avoidList: string[];
  decisionRules: string[];
  updatedAt: string;
};

type RescheduleLog = {
  id: string;
  taskId: string;
  fromDate?: string;
  toDate?: string;
  createdAt: string;
};
```

Definition of Done:

- Co the xem lai tien do theo tuan/thang.
- App chi ra task nao dang bi day lui lap lai.
- Co khu vuc luu nguyen tac song va uu tien hien tai.
- Weekly review co lien ket voi ke hoach tuan moi.

## Phase 4: Sync, Account, And Reliability

Muc tieu:

- Du lieu an toan hon.
- Co the dung tren nhieu thiet bi.
- San sang mo rong thanh san pham nghiem tuc.

Features:

- Login.
- Cloud sync.
- Backup/export data.
- Import data.
- Conflict handling khi nhieu thiet bi cung sua.
- Database migration.
- Offline-first sync neu can.

Suggested Technical Direction:

- Neu muon nhanh: Supabase Auth + Postgres.
- Neu muon local-first manh: IndexedDB + sync layer sau.
- Neu muon desktop: Tauri hoac Electron sau khi web app on dinh.

Definition of Done:

- Du lieu khong mat khi doi may.
- Co export JSON.
- Co backup co ban.
- Login/logout on dinh.

## Phase 5: Smart Assistant Layer

Muc tieu:

- Them lop goi y thong minh, nhung khong lam app tro nen phuc tap.

Features:

- Goi y 3 task nen lam hom nay.
- Tom tat tuan tu completed tasks va review.
- Phat hien goal bi bo quen.
- Goi y chia nho task qua lon.
- Goi y routine dua tren priority hien tai.
- Hoi cau hoi review thong minh hon.

Important Rule:

- Assistant chi nen goi y, khong nen tu dong quyet dinh thay ban.
- Moi goi y phai co nut accept, edit, dismiss.

Definition of Done:

- Assistant giup tiet kiem thoi gian lap ke hoach.
- Goi y co the sua truoc khi ap dung.
- Khong lam Today screen bi roi.

## 5. Suggested MVP Screen Structure

### Today Screen

Sections:

- Header: date, energy selector.
- Focus: 3 important tasks.
- Schedule: time blocks.
- Due Today: tasks due today.
- Quick Capture: note/task input.

### Tasks Screen

Sections:

- Filters.
- Inbox.
- Planned.
- Doing.
- Done.
- Task detail panel.

### Goals Screen

Sections:

- Active goals.
- Goal progress.
- Linked tasks.
- Next action.

### Weekly Review Screen

Sections:

- Completed this week.
- Delayed tasks.
- Review questions.
- Next week focus.

## 6. Suggested Tech Stack

Option A: Fast Web MVP

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand or Redux Toolkit
- localStorage or IndexedDB

Option B: More Structured Web App

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Postgres

Option C: Desktop-first Personal Tool

- React
- TypeScript
- Tauri
- SQLite

Recommendation:

- Bat dau voi React + TypeScript + Vite + localStorage/IndexedDB.
- Khi flow dung on moi them backend.

## 7. Prioritized Backlog

P0:

- Today screen.
- Task CRUD.
- Goal CRUD.
- Link task to goal.
- 3 focus tasks.
- Local persistence.
- Weekly review basic.

P1:

- Notes/capture inbox.
- Habit tracker.
- Daily energy/mood.
- Recurring tasks.
- Search and filters.

P2:

- Personal OS.
- Insights.
- Monthly review.
- Export/import JSON.
- Calendar integration.

P3:

- Login.
- Cloud sync.
- AI suggestions.
- Mobile app or desktop app.

## 8. Risks And Decisions

Risks:

- Qua nhieu tinh nang lam app kho dung.
- Todo list co the tach roi khoi goal.
- Weekly review neu dai se bi bo qua.
- AI layer neu them som co the lam phuc tap hoa MVP.

Decisions:

- MVP chi can lam tot Today, Tasks, Goals, Weekly Review.
- Notes, habits, insights de phase sau.
- Sync va account de phase sau nua.
- Uu tien workflow ca nhan that hon la feature dep.

## 9. Success Metrics

Cho ban than:

- Moi sang mo app duoi 2 phut la biet viec can lam.
- Moi ngay co toi da 3 focus tasks.
- Moi tuan lam review it nhat 1 lan.
- Moi goal active co next action.
- Task inbox duoc xu ly thuong xuyen, khong thanh noi ton dong.

Cho san pham:

- Khong mat du lieu sau reload.
- Them task trong duoi 10 giay.
- Today screen tai nhanh va de doc.
- Weekly review co the hoan thanh trong 10-15 phut.

## 10. First Build Plan

Thu tu nen code:

1. Tao project frontend.
2. Tao layout chinh: sidebar + content.
3. Tao data store cho tasks va goals.
4. Lam Task CRUD.
5. Lam Today screen.
6. Lam Goal CRUD.
7. Link task voi goal.
8. Lam Weekly Review.
9. Them local persistence.
10. Polish UI va empty states.

Ket qua mong muon sau first build:

- Ban co the dung app that cho ngay hom sau.
- Chua can login.
- Chua can sync.
- Chua can AI.
- App nho, nhanh, ro rang, va dung vao viec lap ke hoach moi ngay.
