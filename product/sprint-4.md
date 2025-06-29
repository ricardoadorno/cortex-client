# Sprint 4: Habits Foundation 🌱

**Duration:** 2 weeks  
**Sprint Goal:** Establish the core habits management system with basic habit creation, frequency settings, and simple check-in functionality.

## 📋 User Stories

### Basic Habit Management

- **As a user**, I want to create habits so that I can track consistent behaviors
- **As a user**, I want to edit habit details so that I can refine my tracking
- **As a user**, I want to delete habits so that I can remove ones I no longer want to track
- **As a user**, I want to view all my habits so that I can see my current commitments

### Habit Frequency & Scheduling

- **As a user**, I want to set daily habits so that I can track daily routines
- **As a user**, I want to set weekly habits with specific frequency so that I can track "3x per week" goals
- **As a user**, I want to set habits for specific days so that I can have different routines for different days
- **As a user**, I want to set custom frequencies so that I can handle unique patterns

### Basic Check-ins

- **As a user**, I want to mark a habit as complete for today so that I can track my progress
- **As a user**, I want to see my completion status so that I know if I've done my habits today
- **As a user**, I want to see basic streak information so that I can stay motivated

## 🎯 Acceptance Criteria

### Habit CRUD Operations

- [ ] User can create a new habit with name and description
- [ ] User can edit existing habit properties
- [ ] User can delete a habit (with confirmation)
- [ ] User can view a list of all active habits
- [ ] Habits persist between sessions

### Frequency Settings

- [ ] User can set daily habits (every day)
- [ ] User can set weekly habits with target frequency (e.g., "3 times per week")
- [ ] User can set habits for specific days of the week
- [ ] User can set custom patterns (every other day, weekdays only, etc.)
- [ ] Frequency settings determine when check-ins are available

### Check-in System

- [ ] User can check-in for habits that are scheduled for today
- [ ] Check-ins are time-stamped
- [ ] User can see completion status for today's habits
- [ ] User can view simple streak counter (consecutive days completed)
- [ ] System prevents duplicate check-ins for daily habits
- [ ] System tracks partial completion for weekly frequency habits

### Basic Validation

- [ ] Habit name is required and must be unique per user
- [ ] Frequency settings must be valid
- [ ] Check-ins can only be done for current day (no future check-ins)
- [ ] Cannot check-in for habits not scheduled for today

## 🛠️ Technical Tasks

### Backend Implementation

- [ ] Create Habit entity with core properties
- [ ] Create HabitFrequency entity for flexible scheduling
- [ ] Create HabitCheckIn entity for tracking completions
- [ ] Implement HabitService with CRUD operations
- [ ] Create HabitController with REST endpoints
- [ ] Implement frequency calculation logic
- [ ] Create check-in validation and tracking
- [ ] Add basic streak calculation

### Database Schema

```sql
-- Habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- Will be needed for multi-user support
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name)
);

-- Habit frequency patterns
CREATE TABLE habit_frequencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  frequency_type VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'custom'
  target_count INTEGER, -- for weekly: how many times per week
  days_of_week INTEGER[], -- [1,2,3,4,5] for weekdays, [1,3,5] for MWF
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Habit check-ins
CREATE TABLE habit_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  checkin_date DATE NOT NULL,
  checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(habit_id, checkin_date) -- Prevent duplicate daily check-ins
);

-- Indexes for performance
CREATE INDEX idx_habit_checkins_habit_date ON habit_checkins(habit_id, checkin_date);
CREATE INDEX idx_habit_checkins_date ON habit_checkins(checkin_date);
```

### API Endpoints

- `GET /habits` - List all habits
- `POST /habits` - Create new habit
- `GET /habits/:id` - Get specific habit
- `PUT /habits/:id` - Update habit
- `DELETE /habits/:id` - Delete habit
- `POST /habits/:id/checkin` - Check-in for habit
- `GET /habits/:id/streak` - Get current streak
- `GET /habits/today` - Get today's habits with completion status

### Business Logic

- [ ] Frequency calculation service
- [ ] Streak calculation algorithm
- [ ] Today's habits determination logic
- [ ] Check-in eligibility validation

## 📊 Definition of Done

- [ ] All acceptance criteria met
- [ ] Habit CRUD operations functional
- [ ] Frequency settings work correctly
- [ ] Check-in system tracks completions accurately
- [ ] Basic streak calculation implemented
- [ ] Database migrations completed
- [ ] Unit tests written and passing (min 80% coverage)
- [ ] Integration tests for API endpoints
- [ ] Code reviewed and approved

## 🔍 Testing Strategy

- **Unit Tests**: Frequency calculations, streak algorithms, validation logic
- **Integration Tests**: API endpoints, database operations
- **Manual Tests**: Various frequency patterns, check-in scenarios
- **Edge Cases**: Timezone handling, weekend habits, leap years

## 📈 Success Metrics

- Habit creation and management works seamlessly
- Check-in system is intuitive and reliable
- Streak calculations are accurate
- System handles various frequency patterns correctly
- API response times under 200ms

## 🚀 Sprint Retrospective Questions

1. Is the habit frequency system flexible enough for user needs?
2. How intuitive is the check-in process?
3. Are there frequency patterns we haven't considered?
4. What improvements can be made to streak calculation?

---

**Next Sprint Preview:** Sprint 5 will enhance the habits system with gamification features including streak visualization, progress charts, and journaling capabilities.
