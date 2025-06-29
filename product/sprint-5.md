# Sprint 5: Habit Tracking & Gamification 🎮

**Duration:** 2 weeks  
**Sprint Goal:** Enhance the habits system with engaging gamification features, comprehensive progress tracking, and user insights through journaling.

## 📋 User Stories

### Streak Visualization & Gamification

- **As a user**, I want to see my habit streaks visually so that I feel motivated to continue
- **As a user**, I want to see my longest streak so that I can celebrate achievements
- **As a user**, I want streak badges/milestones so that I feel rewarded for consistency
- **As a user**, I want to see streak recovery information so that I can get back on track after missing days

### Progress Charts & Analytics

- **As a user**, I want to see my habit completion over weeks and months so that I can identify patterns
- **As a user**, I want to see success rates for each habit so that I can understand my consistency
- **As a user**, I want to compare different habits' performance so that I can focus on areas needing improvement
- **As a user**, I want to see trends in my habit formation so that I can optimize my routines

### Notes & Journaling

- **As a user**, I want to add notes to my check-ins so that I can track context and feelings
- **As a user**, I want to see my habit journal so that I can reflect on my journey
- **As a user**, I want to track mood or energy when completing habits so that I can understand correlations
- **As a user**, I want to see insights from my notes so that I can improve my approach

### Reminders & Notifications

- **As a user**, I want to set custom reminders for habits so that I don't forget to do them
- **As a user**, I want smart reminder timing so that I'm reminded at optimal times
- **As a user**, I want to be notified about streak milestones so that I can celebrate achievements
- **As a user**, I want gentle encouragement when I miss habits so that I stay motivated

## 🎯 Acceptance Criteria

### Streak Visualization

- [ ] Visual streak calendar showing completion patterns
- [ ] Current streak counter prominently displayed
- [ ] Longest streak achievement tracking
- [ ] Streak milestone badges (7, 30, 100, 365 days)
- [ ] Streak recovery suggestions when broken
- [ ] Different visual styles for different habit types

### Progress Charts

- [ ] Weekly completion rate chart for each habit
- [ ] Monthly overview with success percentages
- [ ] Habit comparison dashboard
- [ ] Trend analysis (improving, stable, declining)
- [ ] Customizable date ranges for analysis
- [ ] Export progress data functionality

### Journaling System

- [ ] Optional notes field for each check-in
- [ ] Mood tracking (1-5 scale or emoji selection)
- [ ] Energy level tracking before/after habit
- [ ] Context tags (location, time of day, with others, etc.)
- [ ] Journal view with chronological entries
- [ ] Search and filter journal entries

### Smart Reminders

- [ ] Customizable reminder times for each habit
- [ ] Smart suggestions based on past completion patterns
- [ ] Streak milestone notifications
- [ ] Gentle encouragement for missed habits
- [ ] Weekly progress summary notifications
- [ ] Reminder snooze functionality

### Gamification Elements

- [ ] Achievement badges for various milestones
- [ ] Habit completion streaks leaderboard (personal)
- [ ] Progress levels (Beginner, Committed, Expert, Master)
- [ ] Visual rewards for consistency
- [ ] Celebration animations for milestones

## 🛠️ Technical Tasks

### Backend Enhancements

- [ ] Extend HabitCheckIn with notes, mood, energy fields
- [ ] Create Achievement system for badges and milestones
- [ ] Implement analytics calculation service
- [ ] Create notification scheduling service
- [ ] Add progress calculation endpoints
- [ ] Implement trend analysis algorithms
- [ ] Create reminder management system

### Database Schema Updates

```sql
-- Update habit_checkins table
ALTER TABLE habit_checkins ADD COLUMN notes TEXT;
ALTER TABLE habit_checkins ADD COLUMN mood INTEGER CHECK (mood BETWEEN 1 AND 5);
ALTER TABLE habit_checkins ADD COLUMN energy_before INTEGER CHECK (energy_before BETWEEN 1 AND 5);
ALTER TABLE habit_checkins ADD COLUMN energy_after INTEGER CHECK (energy_after BETWEEN 1 AND 5);
ALTER TABLE habit_checkins ADD COLUMN context_tags TEXT[]; -- location, social, etc.

-- Achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'streak', 'consistency', 'milestone'
  name VARCHAR(255) NOT NULL,
  description TEXT,
  criteria JSONB, -- flexible criteria storage
  badge_icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  habit_id UUID REFERENCES habits(id),
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  streak_count INTEGER, -- for streak achievements
  UNIQUE(user_id, habit_id, achievement_id)
);

-- Habit reminders
CREATE TABLE habit_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  reminder_time TIME NOT NULL,
  days_of_week INTEGER[], -- which days to remind
  is_active BOOLEAN DEFAULT true,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progress snapshots (for analytics)
CREATE TABLE habit_progress_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  completion_rate DECIMAL(5,2), -- percentage
  current_streak INTEGER,
  total_completions INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(habit_id, snapshot_date)
);
```

### New API Endpoints

- `GET /habits/:id/analytics` - Get habit analytics and trends
- `GET /habits/:id/streak` - Enhanced streak information
- `GET /habits/:id/journal` - Get habit journal entries
- `PUT /habit-checkins/:id` - Update check-in with notes/mood
- `GET /achievements` - Get available achievements
- `GET /users/:id/achievements` - Get user's earned achievements
- `POST /habits/:id/reminders` - Set habit reminders
- `GET /habits/progress-summary` - Get weekly/monthly progress summary

### Background Services

- [ ] Daily progress snapshot generation
- [ ] Achievement evaluation service
- [ ] Reminder notification service
- [ ] Weekly progress report generation

## 📊 Definition of Done

- [ ] All gamification features implemented
- [ ] Progress charts display accurate data
- [ ] Journaling system captures rich context
- [ ] Reminder system sends notifications reliably
- [ ] Achievement system rewards milestones
- [ ] Analytics provide actionable insights
- [ ] Performance remains good with large datasets
- [ ] All tests passing
- [ ] Code reviewed and approved

## 🔍 Testing Strategy

- **Unit Tests**: Analytics calculations, achievement criteria, streak algorithms
- **Integration Tests**: Progress chart data, notification delivery
- **Manual Tests**: Gamification user experience, chart visualizations
- **Performance Tests**: Large datasets with months of habit data

## 📈 Success Metrics

- Users engage with gamification features (badge views, streak checking)
- Average habit completion rate increases by 15%
- Users add notes to 40%+ of their check-ins
- Reminder system has 90%+ delivery success rate
- Progress charts load in under 1 second

## 🚀 Sprint Retrospective Questions

1. Which gamification features are most engaging for users?
2. How effective are the progress charts for habit improvement?
3. What additional insights can we provide through analytics?
4. How can we improve the journaling experience?

---

**Next Sprint Preview:** Sprint 6 will establish the Goals foundation with SMART goal creation, target dates, milestones, and life categories.
