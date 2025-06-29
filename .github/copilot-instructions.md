# Cortex Client - GitHub Copilot Instructions

This file provides GitHub Copilot with context about the project's architecture, patterns, and conventions to ensure consistent code generation.

## Project Overview

A modern React application built with TypeScript, Vite, React Router, React Query, and shadcn/ui components following kebab-case naming conventions.

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Code Quality**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components (kebab-case)
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── common/          # Common app components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   └── feature/         # Feature-specific components
│       ├── user-profile.tsx
│       ├── data-table.tsx
│       └── ...
├── pages/               # Page components (kebab-case)
│   ├── home-page.tsx
│   ├── about-page.tsx
│   ├── user-profile-page.tsx
│   └── not-found-page.tsx
├── hooks/               # Custom React hooks (kebab-case)
│   ├── use-auth.ts
│   ├── use-local-storage.ts
│   └── api/             # React Query hooks
│       ├── use-users.ts
│       ├── use-posts.ts
│       └── ...
├── services/            # API and external services (kebab-case)
│   ├── api.ts           # Axios instance configuration
│   ├── auth-service.ts
│   ├── user-service.ts
│   └── ...
├── types/               # TypeScript type definitions (kebab-case)
│   ├── api-types.ts
│   ├── user-types.ts
│   └── ...
├── utils/               # Utility functions (kebab-case)
│   ├── format-date.ts
│   ├── validation.ts
│   └── ...
├── providers/           # React context providers
│   ├── app-providers.tsx
│   ├── react-query-provider.tsx
│   └── ...
├── assets/              # Static assets
│   ├── images/
│   ├── icons/
│   └── global.css
├── lib/                 # Third-party library configurations
│   └── utils.ts         # shadcn/ui utilities
├── router.tsx           # React Router configuration
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite type definitions
```

## 🎯 Naming Conventions (IMPORTANT - Always Follow)

### Files and Directories
- **ALWAYS use kebab-case** for all files and directories
- Component files: `my-component.tsx`
- Hook files: `use-my-hook.ts`
- Service files: `my-service.ts`
- Type files: `my-types.ts`

### React Components
- **PascalCase** for component names
- **kebab-case** for file names

```tsx
// ✅ CORRECT: user-profile.tsx
export function UserProfile() {
  return <div>User Profile</div>
}

// ❌ WRONG: UserProfile.tsx
export function UserProfile() {
  return <div>User Profile</div>
}
```

### Hooks
- **camelCase** starting with "use"
- **kebab-case** for file names

```tsx
// ✅ CORRECT: use-user-data.ts
export function useUserData() {
  // hook logic
}
```

### Services and Utilities
- **camelCase** for function names
- **kebab-case** for file names

```tsx
// ✅ CORRECT: user-service.ts
export const userService = {
  fetchUser: () => {},
  updateUser: () => {},
}
```

## 🔄 React Query Patterns (MANDATORY)

### 1. Query Hooks Structure

Always create custom hooks in `src/hooks/api/` following this exact pattern:

```tsx
// src/hooks/api/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user-service'
import type { User, CreateUserData } from '@/types/user-types'

// Query Keys Factory - ALWAYS include this
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

// Queries
export function useUsers(filters?: string) {
  return useQuery({
    queryKey: userKeys.list(filters || ''),
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  })
}

// Mutations - ALWAYS invalidate relevant queries
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserData) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
```

### 2. Service Layer Pattern (MANDATORY)

Always create services in `src/services/` following this pattern:

```tsx
// src/services/user-service.ts
import { api } from './api'
import type { User, CreateUserData } from '@/types/user-types'

export const userService = {
  async getUsers(filters?: string): Promise<User[]> {
    const response = await api.get('/users', { params: { filters } })
    return response.data
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  async createUser(data: CreateUserData): Promise<User> {
    const response = await api.post('/users', data)
    return response.data
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await api.patch(`/users/${id}`, data)
    return response.data
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`)
  },
}
```

## 🎨 shadcn/ui Component Patterns (MANDATORY)

### 1. Always Import from @/components/ui/

```tsx
// ✅ CORRECT
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ❌ WRONG - Don't use relative imports for UI components
import { Button } from '../ui/button'
```

### 2. Component Structure Pattern

```tsx
// src/components/user/user-form.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function UserForm() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter name" />
        </div>
        <Button type="submit" className="w-full">
          Create User
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🛣️ React Router Patterns (MANDATORY)

### 1. Route Configuration

```tsx
// src/router.tsx - ALWAYS use lazy loading for pages
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

// Lazy load pages
const HomePage = lazy(() => import('@/pages/home-page'))
const UserProfilePage = lazy(() => import('@/pages/user-profile-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users/:id',
    element: <UserProfilePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter(routes)
```

### 2. Page Component Pattern

```tsx
// src/pages/user-profile-page.tsx - ALWAYS handle loading and error states
import { useParams } from 'react-router-dom'
import { useUser } from '@/hooks/api/use-users'
import { UserProfile } from '@/components/user/user-profile'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { data: user, isLoading, error } = useUser(id!)

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!user) return <div>User not found</div>

  return <UserProfile user={user} />
}
```

## 📝 TypeScript Patterns (MANDATORY)

### 1. Type Definitions

Always create types in `src/types/` with kebab-case file names:

```tsx
// src/types/user-types.ts
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  name: string
  email: string
}

export interface UpdateUserData {
  name?: string
  email?: string
}
```

### 2. API Types

```tsx
// src/types/api-types.ts
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}
```

## 🌙 Dark Mode & Styling Guidelines (MANDATORY)

### 1. Always Use shadcn/ui Design Tokens

**NEVER** use hardcoded colors. Always use the design tokens from `src/assets/global.css`:

```tsx
// ✅ CORRECT - Using design tokens that adapt to dark mode
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
  <button className="bg-primary text-primary-foreground">Button</button>
</div>

// ❌ WRONG - Hardcoded colors that don't adapt to dark mode
<div className="bg-white text-black">
  <h1 className="text-blue-600">Title</h1>
  <p className="text-gray-600">Description</p>
  <button className="bg-blue-600 text-white">Button</button>
</div>
```

### 2. Available Design Tokens

Always use these design tokens for consistent dark mode support:

#### Background & Text Colors
- `bg-background` / `text-foreground` - Main background and text
- `bg-card` / `text-card-foreground` - Card backgrounds
- `bg-popover` / `text-popover-foreground` - Popover backgrounds
- `text-muted-foreground` - Secondary text
- `bg-muted` / `text-muted-foreground` - Muted backgrounds

#### Interactive Elements
- `bg-primary` / `text-primary-foreground` - Primary buttons and accents
- `text-primary` - Primary text color
- `bg-secondary` / `text-secondary-foreground` - Secondary buttons
- `bg-accent` / `text-accent-foreground` - Hover states and accents

#### Borders & Inputs
- `border-border` - Standard borders
- `bg-input` - Input field backgrounds
- `ring-ring` - Focus rings

#### Chart Colors (for icons and visual elements)
- `text-chart-1` through `text-chart-5` - Predefined chart colors that work in both themes

### 3. Component Styling Pattern

```tsx
// ✅ CORRECT component with proper dark mode support
export function MyComponent() {
  return (
    <div className="bg-background border-b border-border px-4 py-3">
      <div className="container mx-auto">
        <h1 className="text-foreground font-bold">
          <Icon className="text-primary" />
          Title
        </h1>
        <p className="text-muted-foreground">Description</p>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Action
        </Button>
      </div>
    </div>
  )
}
```

### 4. Navigation & Interactive States

For navigation and interactive elements, use these patterns:

```tsx
// Active/Selected states
className={cn(
  "base-styles",
  isActive 
    ? "bg-primary/10 text-primary" 
    : "text-muted-foreground hover:text-foreground hover:bg-accent"
)}

// Button variants should use shadcn/ui button component
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="outline">Outline Button</Button>
```

### 5. Critical Dark Mode Rules

1. **NEVER use hardcoded colors** like `text-blue-600`, `bg-white`, `text-gray-900`
2. **ALWAYS use design tokens** from the global.css configuration
3. **ALWAYS test components in both light and dark modes**
4. **USE chart colors** (`text-chart-1` to `text-chart-5`) for colorful icons and elements
5. **PREFER shadcn/ui components** over custom styled elements
6. **USE semantic color names** (primary, secondary, muted) over specific colors

### 6. Common Patterns

```tsx
// Cards
<Card className="bg-card text-card-foreground border-border">
  <CardHeader>
    <CardTitle className="text-foreground">Title</CardTitle>
    <CardDescription className="text-muted-foreground">Description</CardDescription>
  </CardHeader>
</Card>

// Forms
<Input className="bg-input border-border text-foreground" />
<Label className="text-foreground">Label</Label>

// Icons with semantic colors
<Icon className="text-primary" />        // Primary brand color
<Icon className="text-chart-1" />        // Chart color 1
<Icon className="text-muted-foreground" /> // Muted/secondary
```

## 🚨 CRITICAL RULES - NEVER BREAK THESE

1. **ALWAYS use kebab-case for file names** - no exceptions
2. **ALWAYS use React Query for API calls** - never use useEffect for data fetching
3. **ALWAYS create query key factories** for React Query hooks
4. **ALWAYS handle loading and error states** in page components
5. **ALWAYS use lazy loading** for page components
6. **ALWAYS import UI components from @/components/ui/**
7. **ALWAYS create services** in the service layer, don't put API calls directly in components
8. **ALWAYS use TypeScript** - no `any` types without explicit need
9. **ALWAYS follow the established folder structure**
10. **ALWAYS use the established import patterns** with path aliases
11. **NEVER use hardcoded colors** - always use shadcn/ui design tokens for dark mode support
12. **ALWAYS test components in both light and dark modes**

## 🔧 Import Patterns

```tsx
// ✅ CORRECT import order and style
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { userService } from '@/services/user-service'
import type { User } from '@/types/user-types'

// ❌ WRONG - inconsistent import style
import React from 'react'
import '../styles/component.css'
import { Button } from '../../ui/button'
```

## 📦 When Adding New Features

1. Create types in `src/types/`
2. Create service in `src/services/`
3. Create React Query hooks in `src/hooks/api/`
4. Create components in `src/components/`
5. Create pages in `src/pages/`
6. Add routes to `src/router.tsx`

## 🎯 Code Generation Guidelines

When generating code:
- Always check existing patterns in the codebase first
- Follow the naming conventions strictly
- Use the established folder structure
- Include proper TypeScript types
- Handle loading and error states
- Use React Query for all API operations
- Follow the import patterns with path aliases
- Use shadcn/ui components when building UI
