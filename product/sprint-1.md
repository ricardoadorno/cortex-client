# Sprint 1: Foundation & Basic Tasks 🏗️

**Duration:** 2 weeks  
**Sprint Goal:** Establish the core task management foundation with basic CRUD operations and essential task properties.

## 📋 User Stories

### Epic: Core Task Management

- **As a user**, I want to create tasks so that I can track what needs to be done
- **As a user**, I want to edit tasks so that I can update details as needed
- **As a user**, I want to delete tasks so that I can remove completed or cancelled items
- **As a user**, I want to view all my tasks so that I can see what needs attention

### Core Task Properties

- **As a user**, I want to add a title to my task so that I can quickly identify what needs to be done
- **As a user**, I want to add a description to my task so that I can provide additional context
- **As a user**, I want to set a due date so that I can track deadlines
- **As a user**, I want to update task status so that I can track progress (To Do, In Progress, Done)

## 🎯 Acceptance Criteria

### Task CRUD Operations

- [ ] User can create a new task with title (required)
- [ ] User can edit existing task properties
- [ ] User can delete a task (with confirmation)
- [ ] User can view a list of all tasks
- [ ] Tasks persist between sessions

### Task Properties

- [ ] Task must have a title (required field)
- [ ] Task can have an optional description
- [ ] Task can have an optional due date
- [ ] Task has a status field with options: To Do, In Progress, Done
- [ ] Default status is "To Do" for new tasks

### Basic Validation

- [ ] Title cannot be empty
- [ ] Due date must be valid date format
- [ ] Status must be one of the predefined values

## 🛠️ Technical Tasks

### Backend (NestJS)

- [ ] Set up Task entity/model with basic properties
- [ ] Create TaskService with CRUD operations
- [ ] Create TaskController with REST endpoints
- [ ] Set up database schema for tasks
- [ ] Add basic validation using class-validator
- [ ] Write unit tests for TaskService
- [ ] Write integration tests for TaskController

### Frontend (Future Sprint)

- [ ] Design task list component wireframes
- [ ] Plan task creation/editing form design

### Database Schema

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'To Do' CHECK (status IN ('To Do', 'In Progress', 'Done')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📊 Definition of Done

- [ ] All acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing (min 80% coverage)
- [ ] Integration tests written and passing
- [ ] API endpoints documented
- [ ] Database migrations created and tested
- [ ] No critical bugs in QA environment

## 🔍 Testing Strategy

- **Unit Tests**: TaskService methods, validation logic
- **Integration Tests**: API endpoints, database operations
- **Manual Tests**: CRUD operations via API client (Postman/Insomnia)

## 📈 Success Metrics

- All CRUD operations functional
- API response times < 200ms
- Zero data loss during operations
- Successful task persistence

## 🚀 Sprint Retrospective Questions

1. Did we successfully establish the task foundation?
2. Are the API endpoints intuitive and well-designed?
3. What challenges did we face with the basic setup?
4. How can we improve our testing approach for future sprints?

---

**Next Sprint Preview:** Sprint 2 will focus on task organization through categories/tags and implementing the Eisenhower Matrix for prioritization.
