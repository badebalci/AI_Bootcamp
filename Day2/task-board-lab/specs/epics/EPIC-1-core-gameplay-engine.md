# Epic: Core Gameplay Engine

## Description
Build the fundamental game mechanics that form the heart of the Rabbit Escape experience. This includes rabbit movement controls, bear AI chasing behavior, collision detection, and real-time scoring system. Players will be able to control a rabbit using keyboard inputs while being pursued by an intelligent bear opponent, with survival time tracked as the primary score metric.

## Primary Persona
Sarah Chen (office worker) - benefits most from the core escape mechanics that provide immediate, engaging gameplay during short breaks.

## Success Criteria
- Players can control rabbit movement smoothly using arrow keys or WASD
- Bear AI provides realistic chasing behavior that creates tension and challenge
- Collision detection accurately determines when rabbit is caught by bear
- Score displays survival time in real-time during gameplay
- Average session duration reaches 8-12 minutes per the PRD target
- Score improvement rate shows players beating previous records in 40% of sessions

## Scope & Complexity

**Estimate: L**

**Justification:** Large scope involving complex game physics, AI algorithms, real-time rendering with Canvas API, and TypeScript implementation. Requires 4+ sprints due to the need for smooth 60 FPS performance, precise collision detection, and balanced difficulty curves.

## Dependencies
- None - This is the foundational epic that other features build upon

**Note:** Standalone feature that can ship as a basic working game

## Related Stories

### Story 1
- **Title:** Implement Rabbit Movement Controls
- **Description:** Add keyboard input handling for arrow keys/WASD to move rabbit smoothly
- **Acceptance Criteria:**
  - Arrow keys and WASD move rabbit in corresponding directions
  - Movement is smooth and responsive at 60 FPS
  - Rabbit stays within game boundaries

### Story 2
- **Title:** Create Bear AI Chasing Behavior
- **Description:** Implement intelligent bear that continuously pursues the rabbit
- **Acceptance Criteria:**
  - Bear moves toward rabbit position continuously
  - AI includes basic pathfinding around obstacles
  - Bear speed is balanced for engaging but winnable gameplay

### Story 3
- **Title:** Add Collision Detection System
- **Description:** Detect when bear catches rabbit to end the game
- **Acceptance Criteria:**
  - Precise collision detection between rabbit and bear sprites
  - Game ends immediately when collision occurs
  - Visual feedback shows collision (flash, sound, etc.)

### Story 4
- **Title:** Implement Real-Time Scoring
- **Description:** Track and display survival time as the game score
- **Acceptance Criteria:**
  - Timer starts when game begins
  - Score updates every second during gameplay
  - Score displays prominently on screen

### Story 5
- **Title:** Add Game Over State
- **Description:** Show final score and restart option when caught
- **Acceptance Criteria:**
  - Game pauses when collision detected
  - Final score displayed clearly
  - Restart button allows immediate new game

## Notes
This epic focuses purely on the core game loop mechanics. UI polish, persistence, and difficulty progression are handled in separate epics to maintain clear boundaries and independent deployability.