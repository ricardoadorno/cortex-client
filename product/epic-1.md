# Epic 1: Core Features

This document outlines the initial breakdown of the core domains for the life organization app: **Tasks**, **Habits**, and **Goals**, and explains how they interconnect.

## 1. Tasks 📋

The Tasks domain focuses on managing one-off activities with a defined start and end.

### Core Features

- **Create, Edit, Delete Tasks**: Basic functionality to manage items
- **Title and Description**: A clear name for the task and a field for additional details
- **Due Date**: Set a deadline for completion
- **Status**: Track progress (e.g., To Do, In Progress, Done)
- **Categories/Tags**: Group tasks by context (e.g., #work, #personal, #studies)
- **Reminders & Notifications**: Alert the user about approaching deadlines
- **Recurrence**: Set tasks to repeat on a schedule
  - **Daily**: Task repeats every day
  - **Weekly**: Task repeats every week (specific days can be selected)
  - **Monthly**: Task repeats every month (specific date or relative date like "first Monday")
  - **Custom**: Define custom intervals (e.g., every 3 days, every 2 weeks)
- **Multi-Completion**: Allow tasks to be completed multiple times within their recurrence period
  - Track completion count vs. target count
  - Example: "Drink 8 glasses of water" (daily task, can be checked 8 times per day)
  - Example: "Go to gym" (weekly task, target 3 times per week)

### Organizational Concepts

#### The Eisenhower Matrix

A prioritization system based on two axes: **Importance** and **Urgency**.

| Quadrant                       | Description                                                                                            | Action        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------- |
| **Urgent & Important**         | Crises, pressing problems, deadlines                                                                   | **Do First**  |
| **Not Urgent & Important**     | Prevention, planning, new opportunities, relationship building                                         | **Schedule**  |
| **Urgent & Not Important**     | Interruptions, some meetings, activities that demand immediate attention but don't contribute to goals | **Delegate**  |
| **Not Urgent & Not Important** | Distractions, trivial matters, time-wasters                                                            | **Eliminate** |

> **Note**: The "Not Urgent & Important" quadrant is the sweet spot for strategic growth.

#### Atomic Tasks & Sub-tasks

Encourage the user to break down large tasks into smaller, manageable "sub-tasks." An **atomic task** is the smallest possible unit of work that can be completed in a single session (ideally under 25 minutes), making it easier to start and complete.

#### Task-Habit Relationship

Tasks and Habits are closely interconnected in the system:

- **Habits as Recurring Tasks**: Every habit can be viewed as a recurring task with specific frequency requirements
- **Task-to-Habit Promotion**: When a user consistently completes a recurring task, the system can suggest promoting it to a habit for better tracking and streak visualization
- **Habit Breakdown**: Complex habits can be broken down into multiple related tasks
  - **Example**: Habit "Maintain Healthy Morning Routine" can include tasks:
    - "Drink a glass of water" (daily, 1x)
    - "Do 10 minutes of stretching" (daily, 1x)
    - "Read for 15 minutes" (daily, 1x)
- **Habit Foundation**: Before creating a habit, users are encouraged to first track it as a recurring task to establish the routine

---

## 2. Habits 🔄

The Habits domain is designed to help the user build and maintain consistent routines that automate progress over time.

### Core Features

- **Create & Manage Habits**: Define the habits the user wants to track
- **Frequency**: Set the schedule (e.g., Daily, 3x per week, specific days)
- **Check-ins**: A simple mechanism to mark a habit as complete for the period
- **Streak Visualization**: Display consecutive days a habit has been maintained to gamify the experience
- **Progress Charts**: Visualize consistency over weeks and months
- **Customizable Reminders**: Notify the user to perform their habit
- **Notes/Journal**: Allow the user to log observations about their progress or difficulties

---

## 3. Goals 🎯

The Goals domain focuses on long-term objectives. It's the system's "North Star."

### Core Features

- **SMART Goal Setting**: Guide the user to create goals that are Specific, Measurable, Achievable, Relevant, and Time-bound
- **Target Date**: Establish an end date for achieving the goal
- **Milestones**: Break down a large goal into smaller, measurable steps
- **Progress Tracking**: Measure progress by percentage or through the completion of milestones
- **Life Categories**: Organize goals into areas like Career, Health, Finances, and Personal Development

---

## 4. Logical Relationships: The Productivity Pyramid 🔺

The three domains don't operate in isolation. They form a logical hierarchy that connects daily actions with long-term ambitions.

### Goals (The "Why") 🎯

- Sit at the top of the pyramid, defining direction and purpose
- **Example Goal**: _"Run a marathon in 6 months"_

### Habits (The System) 🔄

- Automated systems that ensure consistent progress toward goals
- Answer the question: _"What system do I need to create to achieve my goal?"_
- **Relationship**: A Habit can be directly linked to a Goal to show how daily consistency contributes to the final objective
- **Example Habit** linked to the Goal: _"Run 3 times a week"_

### Tasks (The Action) 📋

- Concrete, one-time, executable actions
- Form the base of the pyramid—where things get done

#### Task Relationships:

**Tasks → Goals/Milestones**

- Tasks can be linked to Goals/Milestones as specific actions to reach a milestone
- **Examples**:
  - _"Research and buy proper running shoes"_
  - _"Create the weekly training plan"_

**Tasks → Habits**

- Tasks can support Habits as necessary actions to maintain a habit
- **Recurring Tasks as Habit Foundation**: Regular recurring tasks can be promoted to habits when consistency is established
- **Habit Support Tasks**: One-time tasks that help establish or maintain habits
- **Examples**:
  - _"Lay out running clothes the night before"_ (support task for running habit)
  - _"Buy a water bottle"_ (setup task for hydration habit)
  - _"Download meditation app"_ (setup task for meditation habit)

---

## Summary 📝

This model creates a flow where:

- **Goals** provide clarity and direction
- **Habits** build momentum and consistency
- **Tasks** represent the executable steps in daily life

The interconnection ensures that every action taken contributes to the larger vision of personal growth and achievement.
