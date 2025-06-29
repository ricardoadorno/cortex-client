# Sprint 6: Goals Foundation 🎯

**Duration:** 2 weeks  
**Sprint Goal:** Establish the core goals management system with SMART goal creation, milestone tracking, and life category organization.

## 📋 User Stories

### SMART Goal Creation

- **As a user**, I want to create SMART goals so that I have clear, achievable objectives
- **As a user**, I want guidance on making goals Specific, Measurable, Achievable, Relevant, and Time-bound
- **As a user**, I want to see examples of well-formed goals so that I can create better ones
- **As a user**, I want validation that my goals meet SMART criteria so that I'm more likely to succeed

### Goal Management

- **As a user**, I want to edit my goals so that I can refine them as I learn
- **As a user**, I want to archive completed goals so that I can celebrate achievements
- **As a user**, I want to view all my goals so that I can see my aspirations
- **As a user**, I want to prioritize goals so that I focus on what matters most

### Milestones & Breakdown

- **As a user**, I want to break down large goals into milestones so that I can track progress
- **As a user**, I want to set target dates for milestones so that I stay on track
- **As a user**, I want to see milestone progress so that I feel motivated
- **As a user**, I want to reorder milestones so that I can adjust my approach

### Life Categories

- **As a user**, I want to organize goals by life areas so that I maintain balance
- **As a user**, I want predefined categories so that I can quickly categorize goals
- **As a user**, I want to create custom categories so that I can organize goals my way
- **As a user**, I want to see goals by category so that I can focus on specific life areas

## 🎯 Acceptance Criteria

### SMART Goal Framework

- [ ] Goal creation wizard guides through SMART criteria
- [ ] Each criterion has helpful prompts and examples
- [ ] System validates goals against SMART framework
- [ ] Users can see SMART score/completeness for their goals
- [ ] Examples provided for each SMART component

### Goal CRUD Operations

- [ ] User can create goals with title, description, and target date
- [ ] User can edit existing goals
- [ ] User can mark goals as completed
- [ ] User can archive/delete goals
- [ ] User can set goal priority (High, Medium, Low)
- [ ] Goals persist between sessions

### Milestone System

- [ ] User can add multiple milestones to any goal
- [ ] Milestones have title, description, and target date
- [ ] Milestones can be reordered
- [ ] Milestone completion contributes to goal progress
- [ ] User can see percentage completion based on milestones
- [ ] System suggests logical milestone breakdowns

### Life Categories

- [ ] Predefined categories: Career, Health, Finances, Personal Development, Relationships, Hobbies
- [ ] User can create custom categories
- [ ] Goals can be assigned to categories
- [ ] User can filter goals by category
- [ ] Category-based goal balance visualization
- [ ] Each category has customizable color

### Validation & Guidance

- [ ] SMART criteria validation with helpful feedback
- [ ] Goal title must be unique per user
- [ ] Target dates must be in the future
- [ ] Milestone dates should be before goal target date
- [ ] Helpful tips and suggestions throughout creation process

## 🛠️ Technical Tasks

### Backend Implementation

- [ ] Create Goal entity with SMART framework fields
- [ ] Create Milestone entity linked to goals
- [ ] Create GoalCategory entity with predefined and custom categories
- [ ] Implement GoalService with CRUD operations
- [ ] Create MilestoneService for milestone management
- [ ] Add SMART validation logic
- [ ] Implement progress calculation based on milestones
- [ ] Create goal prioritization system

### Database Schema

```sql
-- Goal categories
CREATE TABLE goal_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID, -- NULL for system-defined categories
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#007bff', -- Hex color
  is_system_defined BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name)
);

-- Insert system-defined categories
INSERT INTO goal_categories (name, description, is_system_defined) VALUES
('Career', 'Professional development and work-related goals', true),
('Health', 'Physical and mental health objectives', true),
('Finances', 'Financial planning and money management goals', true),
('Personal Development', 'Learning, skills, and personal growth', true),
('Relationships', 'Family, friends, and social connections', true),
('Hobbies', 'Leisure activities and personal interests', true);

-- Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category_id UUID REFERENCES goal_categories(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- SMART criteria fields
  specific_details TEXT, -- What exactly will be accomplished?
  measurable_criteria TEXT, -- How will progress be measured?
  achievable_plan TEXT, -- How is this goal attainable?
  relevant_why TEXT, -- Why is this goal important?
  time_bound_date DATE, -- When will this be completed?

  priority VARCHAR(10) DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Paused', 'Archived')),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,

  UNIQUE(user_id, title)
);

-- Milestones table
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_category ON goals(category_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_milestones_goal_id ON milestones(goal_id);
```

### API Endpoints

- `GET /goals` - List all goals with filtering options
- `POST /goals` - Create new goal with SMART validation
- `GET /goals/:id` - Get specific goal with milestones
- `PUT /goals/:id` - Update goal
- `DELETE /goals/:id` - Delete/archive goal
- `POST /goals/:id/milestones` - Add milestone to goal
- `PUT /milestones/:id` - Update milestone
- `DELETE /milestones/:id` - Delete milestone
- `GET /goal-categories` - Get available categories
- `POST /goal-categories` - Create custom category
- `GET /goals/progress-summary` - Get overall progress summary

### SMART Validation Service

- [ ] Specific validation (clear, well-defined)
- [ ] Measurable validation (quantifiable metrics)
- [ ] Achievable validation (realistic assessment)
- [ ] Relevant validation (aligned with values)
- [ ] Time-bound validation (specific deadline)

## 📊 Definition of Done

- [ ] All acceptance criteria met
- [ ] SMART goal creation wizard functional
- [ ] Milestone system tracks progress accurately
- [ ] Life categories organize goals effectively
- [ ] Validation provides helpful feedback
- [ ] Progress calculations are correct
- [ ] Database migrations completed
- [ ] Unit tests written and passing (min 80% coverage)
- [ ] Integration tests for API endpoints
- [ ] Code reviewed and approved

## 🔍 Testing Strategy

- **Unit Tests**: SMART validation logic, progress calculations, milestone ordering
- **Integration Tests**: Goal CRUD operations, milestone management
- **Manual Tests**: Goal creation wizard, category filtering, progress tracking
- **Edge Cases**: Leap years, past dates, long-term goals (5+ years)

## 📈 Success Metrics

- Users create well-formed SMART goals (80%+ pass validation)
- Average goal has 3-5 milestones
- Goal completion rate improves with milestone tracking
- Users actively use life categories for organization
- API response times under 300ms

## 🚀 Sprint Retrospective Questions

1. How effective is the SMART goal creation wizard?
2. Are users finding the milestone system helpful for tracking progress?
3. What additional life categories are users requesting?
4. How can we improve goal validation and guidance?

---

**Next Sprint Preview:** Sprint 7 will enhance the goals system with advanced progress tracking, milestone management, and goal-to-milestone relationship optimization.
