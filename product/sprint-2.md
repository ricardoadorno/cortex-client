# Sprint 2: Task Organization & Prioritization 🎯

**Duration:** 2 weeks  
**Sprint Goal:** Implement task categorization, tagging system, and Eisenhower Matrix for effective task prioritization and organization.

## 📋 User Stories

### Task Categorization

- **As a user**, I want to assign categories to tasks so that I can group related tasks together
- **As a user**, I want to create custom tags so that I can organize tasks by context (#work, #personal, #studies)
- **As a user**, I want to filter tasks by category/tag so that I can focus on specific contexts

### Eisenhower Matrix

- **As a user**, I want to prioritize tasks using the Eisenhower Matrix so that I can focus on what's most important
- **As a user**, I want to see tasks organized by urgency and importance so that I can make better decisions
- **As a user**, I want suggested actions for each quadrant so that I know how to handle different types of tasks

### Task Breakdown

- **As a user**, I want to create sub-tasks so that I can break down complex tasks into manageable pieces
- **As a user**, I want to see atomic task suggestions so that I can work in focused 25-minute sessions

## 🎯 Acceptance Criteria

### Categories & Tags

- [ ] User can create custom categories
- [ ] User can assign multiple tags to a task using hashtag format (#tag)
- [ ] User can filter tasks by category
- [ ] User can filter tasks by single or multiple tags
- [ ] Tags are auto-suggested based on previous usage
- [ ] Categories and tags are visually distinct in the UI

### Eisenhower Matrix Implementation

- [ ] User can set task importance (High/Low)
- [ ] User can set task urgency (High/Low)
- [ ] Tasks are automatically categorized into 4 quadrants:
  - **Do First**: High Importance + High Urgency
  - **Schedule**: High Importance + Low Urgency
  - **Delegate**: Low Importance + High Urgency
  - **Eliminate**: Low Importance + Low Urgency
- [ ] User can view tasks organized by Eisenhower Matrix quadrants
- [ ] Each quadrant shows suggested action and description

### Sub-tasks & Atomic Tasks

- [ ] User can add sub-tasks to any main task
- [ ] Sub-tasks can be marked complete independently
- [ ] Parent task shows completion progress based on sub-tasks
- [ ] System suggests breaking down tasks longer than 25 minutes
- [ ] Sub-tasks inherit parent task's category and tags by default

## 🛠️ Technical Tasks

### Backend Enhancements

- [ ] Add category and tags fields to Task entity
- [ ] Create Category entity with CRUD operations
- [ ] Implement tag parsing and storage system
- [ ] Add importance and urgency fields for Eisenhower Matrix
- [ ] Create sub-task relationship (self-referencing foreign key)
- [ ] Implement filtering endpoints for categories and tags
- [ ] Add Eisenhower Matrix view endpoint
- [ ] Create sub-task management endpoints

### Database Schema Updates

```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7), -- Hex color code
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  usage_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task-Tag junction table
CREATE TABLE task_tags (
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, tag_id)
);

-- Update tasks table
ALTER TABLE tasks ADD COLUMN category_id UUID REFERENCES categories(id);
ALTER TABLE tasks ADD COLUMN importance VARCHAR(10) CHECK (importance IN ('High', 'Low'));
ALTER TABLE tasks ADD COLUMN urgency VARCHAR(10) CHECK (urgency IN ('High', 'Low'));
ALTER TABLE tasks ADD COLUMN parent_task_id UUID REFERENCES tasks(id);
ALTER TABLE tasks ADD COLUMN estimated_duration INTEGER; -- in minutes
```

### New API Endpoints

- `GET /tasks/matrix` - Get tasks organized by Eisenhower Matrix
- `GET/POST /categories` - Category management
- `GET /tags/suggestions` - Get tag suggestions
- `GET /tasks/filter?category=&tags=` - Filter tasks
- `POST /tasks/:id/subtasks` - Create sub-task
- `GET /tasks/:id/subtasks` - Get sub-tasks

## 📊 Definition of Done

- [ ] All acceptance criteria met
- [ ] Categories and tags system fully functional
- [ ] Eisenhower Matrix visualization working
- [ ] Sub-task creation and management operational
- [ ] Filtering by categories and tags implemented
- [ ] Database migrations completed
- [ ] API documentation updated
- [ ] Unit and integration tests passing
- [ ] Code reviewed and approved

## 🔍 Testing Strategy

- **Unit Tests**: Category/tag parsing, Eisenhower Matrix logic, sub-task relationships
- **Integration Tests**: Filtering endpoints, matrix view endpoint
- **Manual Tests**: Tag auto-suggestions, matrix visualization, sub-task creation

## 📈 Success Metrics

- Users can successfully categorize and tag tasks
- Eisenhower Matrix correctly categorizes tasks
- Sub-task creation reduces average task completion time
- Filtering performance remains under 300ms with 1000+ tasks

## 🚀 Sprint Retrospective Questions

1. How effective is the Eisenhower Matrix for task prioritization?
2. Are users finding the tagging system intuitive?
3. What improvements can be made to sub-task management?
4. How can we better encourage atomic task creation?

---

**Next Sprint Preview:** Sprint 3 will implement task recurrence patterns and multi-completion functionality for habit-like behaviors.
