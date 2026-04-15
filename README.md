# Personal Content Page Builder

A modern, high-fidelity drag-and-drop page builder that allows users to create personalized content layouts with ease. Built with a focus on performance, aesthetics, and intuitive user experience.

## 🚀 Overview

The Personal Content Page Builder is a professional-grade web application designed to bridge the gap between simple text editors and complex site builders. It features a robust "Palette-to-Canvas" workflow, enabling users to assemble pages from predefined blocks, reorder them dynamically, and customize their properties in real-time.

---

## ✨ Features

### 🛠 Core Functionality
- **Block Palette**: A curated selection of content blocks (Header, Text, Image, Markdown, and Rich Text).
- **Interactive Canvas**: A main building area where blocks can be dropped and arranged.
- **Vertical Reordering**: Seamlessly change the layout by dragging blocks to different positions.
- **Real-time Configuration**: Instantly edit text, headings, and image URLs via the context-aware Settings Panel.
- **Persistence**: Your work is automatically saved to LocalStorage, ensuring session continuity.

### 🎨 Creative Choices (UI/UX)
- **"Midnight" Aesthetic**: A premium dark-themed interface utilizing a sophisticated color palette (OKLCH colors) for high contrast and reduced eye strain.
- **Glassmorphism**: Subtle translucent backgrounds and borders create a sense of depth and hierarchy.
- **Micro-animations**: Powered by **Framer Motion**, the UI feels alive with smooth entrance animations, layout transitions, and interactive hover states.
- **Responsive Design**: Fluid layouts that adapt to various screen sizes, ensuring the builder remains functional on tablets and desktops alike.

---

## 🏗 Component Design

The application follows an **Atomic Design** philosophy, separated into logical layers:

### 1. The Registry System (`BlockRegistry.ts`)
A centralized mapping system that decouples block definitions from the core builder logic. This makes adding new block types as simple as registering a component and its default properties.

### 2. The Builder Architecture
- **Palette**: Uses `@dnd-kit/core` to facilitate dragging new blocks onto the canvas.
- **Canvas Area**: Implements `@dnd-kit/sortable` for vertical list reordering with immediate layout feedback.
- **Block Wrappers**: Generic wrappers that handle focus states, selection, and drag handles, keeping the individual block components lean and focused only on rendering content.

---

## 🧠 State Management Strategy

The project utilizes **Zustand** for lightweight yet powerful state management.

### Data Model
The state is centered around a normalized `blocks` array. Each block is represented as:
```typescript
{
  id: string;      // Unique nanoid
  type: BlockType; // header, text, image, markdown, rich-text
  props: Record<string, any>; // Component-specific data
}
```

### Arrangement Logic
- **Adding Blocks**: When a block is dropped, it's injected into the array at the target index.
- **Reordering**: The `reorderBlocks` action uses efficient array splicing to move items, triggering Framer Motion's `layout` prop for smooth transitions.
- **Undo/Redo**: A manual history stack (`past` and `future`) captures snapshots of the block array before each destructive action.

---

## 💾 Persistence Implementation

Persistence is handled via an automated **Persistence Layer** integrated directly into the Zustand store.

1. **Subscription-based Sync**: The store uses `useBuilderStore.subscribe` to listen for any state changes.
2. **Debounced Saves**: To prevent disk I/O bottlenecks, changes are debounced by 1 second before being serialized to `localStorage` under the key `builder_page_state`.
3. **Hydration Engine**: On application startup, the `initializeStoreFromStorage` function attempts to load and validate the saved state, restoring the user's progress instantly.

---

## 🛠 Tech Stack

- **React 19**: Modern UI library with the latest hooks.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS 4**: Utility-first styling with OKLCH color support.
- **Shadcn UI**: Accessible and beautiful foundational components.
- **dnd-kit**: The industry standard for accessible drag-and-drop primitives.
- **Framer Motion**: Production-ready animation library.
- **Zustand**: Fast and scalable state management.

---

## 🏃‍♂️ Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
