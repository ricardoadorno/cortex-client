# Sprint 3: Task Recurrence & Multi-Completion 🔄

**Duration:** 2 weeks  
**Sprint Goal:** Implement recurring task functionality and multi-completion capabilities to bridge the gap between tasks and habits.

## 📋 User Stories

### Recurring Tasks

- **As a user**, I want to create daily recurring tasks so that I can track daily routines
- **As a user**, I want to create weekly recurring tasks so that I can manage weekly commitments
- **As a user**, I want to create monthly recurring tasks so that I can handle monthly responsibilities
- **As a user**, I want to set custom recurrence patterns so that I can handle unique scheduling needs

### Multi-Completion

- **As a user**, I want to complete a task multiple times in a period so that I can track frequency-based goals
- **As a user**, I want to set target completion counts so that I can track progress toward frequency goals
- **As a user**, I want to see completion progress so that I know how many times I've completed a task vs. target

### Recurrence Management

- **As a user**, I want to see upcoming recurring task instances so that I can plan ahead
- **As a user**, I want to modify recurrence patterns so that I can adapt to changing schedules
- **As a user**, I want to skip recurring instances so that I can handle exceptions

## 🎯 Acceptance Criteria

### Recurrence Patterns

- [ ] User can set daily recurrence (every day, weekdays only, every N days)
- [ ] User can set weekly recurrence (specific days of week, every N weeks)
- [ ] User can set monthly recurrence (specific date, relative date like "first Monday")
- [ ] User can set custom intervals (every 3 days, every 2 weeks, etc.)
- [ ] Recurring tasks automatically generate new instances based on schedule
- [ ] User can see next 30 days of upcoming recurring instances

### Multi-Completion Features

- [ ] User can enable multi-completion for any task
- [ ] User can set target completion count per recurrence period
- [ ] User can complete the same task multiple times within the period
- [ ] Progress indicator shows current completions vs. target
- [ ] Examples work correctly:
  - "Drink 8 glasses of water" (daily, target: 8)
  - "Go to gym" (weekly, target: 3)
  - "Call family member" (weekly, target: 2)

### Recurrence Management

- [ ] User can modify recurrence pattern for future instances
- [ ] User can skip a specific recurring instance without affecting the pattern
- [ ] User can stop recurrence while keeping historical data
- [ ] User can view completion history across all instances
- [ ] System handles edge cases (Feb 29, month-end dates, etc.)

## 🛠️ Technical Tasks

### Backend Implementation

- [ ] Create RecurrencePattern entity with flexible pattern storage
- [ ] Implement recurrence calculation algorithms
- [ ] Create TaskInstance entity for individual occurrences
- [ ] Add multi-completion tracking to TaskInstance
- [ ] Create recurring task generation service (scheduled job)
- [ ] Implement recurrence modification logic
- [ ] Add endpoints for recurrence management
- [ ] Create completion tracking service

### Database Schema Updates

```sql
-- Recurrence patterns table
CREATE TABLE recurrence_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  pattern_type VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly', 'custom'
  frequency INTEGER DEFAULT 1, -- every N days/weeks/months
  days_of_week INTEGER[], -- for weekly: [1,3,5] for Mon,Wed,Fri
  day_of_month INTEGER, -- for monthly: specific day
  relative_day VARCHAR(20), -- for monthly: 'first_monday', 'last_friday'
  end_date DATE, -- when recurrence stops
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task instances (individual occurrences)
CREATE TABLE task_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  recurrence_pattern_id UUID REFERENCES recurrence_patterns(id),
  due_date DATE NOT NULL,
  completion_count INTEGER DEFAULT 0,
  target_completion_count INTEGER DEFAULT 1,
  is_completed BOOLEAN DEFAULT false,
  is_skipped BOOLEAN DEFAULT false,
  completed_at TIMESTAMP[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update tasks table
ALTER TABLE tasks ADD COLUMN is_recurring BOOLEAN DEFAULT false;
ALTER TABLE tasks ADD COLUMN allows_multi_completion BOOLEAN DEFAULT false;
ALTER TABLE tasks ADD COLUMN default_target_count INTEGER DEFAULT 1;
```

### New API Endpoints

- `POST /tasks/:id/recurrence` - Set up recurrence pattern
- `PUT /tasks/:id/recurrence` - Modify recurrence pattern
- `DELETE /tasks/:id/recurrence` - Stop recurrence
- `GET /tasks/recurring/upcoming` - Get upcoming recurring instances
- `POST /task-instances/:id/complete` - Complete task instance
- `POST /task-instances/:id/skip` - Skip task instance
- `GET /tasks/:id/completion-history` - Get completion history

### Scheduled Jobs

- [ ] Daily job to generate recurring task instances
- [ ] Cleanup job to remove old completed instances
- [ ] Notification job for upcoming recurring tasks

## 📊 Definition of Done

- [ ] All recurrence patterns work correctly
- [ ] Multi-completion tracking is accurate
- [ ] Recurring task generation runs reliably
- [ ] Users can modify and manage recurrence patterns
- [ ] Edge cases are handled properly
- [ ] Performance is acceptable with 1000+ recurring tasks
- [ ] All tests passing
- [ ] Code reviewed and approved

## 🔍 Testing Strategy

- **Unit Tests**: Recurrence calculation algorithms, edge cases (leap years, month-ends)
- **Integration Tests**: Task instance generation, completion tracking
- **Manual Tests**: Complex recurrence patterns, multi-completion scenarios
- **Performance Tests**: Large datasets of recurring tasks

## 📈 Success Metrics

- Recurring tasks generate accurately for 99.9% of cases
- Multi-completion tracking shows correct progress
- System handles 10,000+ recurring task instances efficiently
- Zero data corruption in completion tracking

## 🚀 Sprint Retrospective Questions

1. How intuitive is the recurrence pattern setup for users?
2. Are there any edge cases we missed in recurrence calculation?
3. How effective is multi-completion for habit-like tracking?
4. What performance optimizations are needed for recurring tasks?

---

**Next Sprint Preview:** Sprint 4 will establish the foundation for the Habits domain with basic habit creation and tracking capabilities.
