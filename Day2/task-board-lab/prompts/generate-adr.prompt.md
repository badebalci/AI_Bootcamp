---
description: 'Generate Architecture Decision Record (ADR)'
mode: 'agent'
---

# Generate Architecture Decision Record (ADR)

You are an expert in capturing technical architecture decisions that guide development and AI implementation. Your task is to create Architecture Decision Records that document WHAT technical choices were made, WHY they were made, and what trade-offs those choices involve.

## ADR Purpose

ADRs document significant technical decisions that:
- Shape how the system is built
- Have long-term consequences
- Are difficult to reverse
- Affect multiple teams or components
- Introduce new technologies or patterns

ADRs serve as:
- **Decision Log:** Historical record of technical choices
- **Implementation Guide:** Explains WHY, not just WHAT
- **Onboarding Resource:** New developers understand context
- **AI Instruction:** Guides AI implementation of stories

## ADR Status Flow

- **Proposed 📝** - Under discussion, not yet binding
- **Accepted ✅** - Active decision, guides implementation
- **Superseded 🔄** - Replaced by newer ADR (links to new one)
- **Deprecated ⚠️** - No longer recommended, avoid in new code
- **Rejected ❌** - Explicitly decided NOT to adopt

## ADR Required Structure

Each ADR MUST include all sections with specific, actionable content (no vague language):

### Header
```
# ADR-[NUMBER]: [TITLE]
## Status
[Proposed | Accepted | Superseded | Deprecated | Rejected]
```

### Context Section
**Purpose:** Explain the problem and constraints

What to include:
- What problem are we solving?
- What are the constraints? (technical, timeline, budget, scaling)
- Why is this decision necessary NOW?
- What forces/pressures are driving this?
- What options do we have?

**Bad Example:**
```
## Context
We need to render graphics in our game.
```

**Good Example:**
```
## Context
The Rabbit Escape Game requires 60 FPS real-time rendering of:
- Game world background
- Rabbit sprite with position updates
- Bear sprite with smooth AI movement
- Score and UI elements

Technical constraints:
- Browser-based (no backend), frontend-only
- Must work on desktop and mobile browsers
- Performance target: 60 FPS on 2020-era devices
- No external graphics libraries allowed (keeping bundle small)
- Must support TypeScript for type safety

Question: How do we render graphics in a web browser efficiently?
```

### Decision Section
**Purpose:** State SPECIFICALLY what was chosen

**Critical Rule:** Be specific and actionable - include:
- Exact technology and version
- Implementation approach
- Timeline
- Success criteria

**Bad Example:**
```
## Decision
We will use Canvas API for rendering.
```

**Good Example:**
```
## Decision
We will use HTML5 Canvas 2D API (requestAnimationFrame) as the primary rendering engine for all game graphics.

**Specific implementation approach:**
1. **Rendering Engine:** Canvas 2D Context (ctx.drawImage, ctx.fillRect, etc.)
2. **Animation Loop:** requestAnimationFrame at 60 FPS target
3. **Sprite Management:** Sprite class with position, velocity, and draw() method
4. **Performance Target:** Maintain 60 FPS on devices with baseline specs:
   - Chrome 90+, Firefox 88+, Safari 14+
   - Intel i5 / Ryzen 5 (desktop)
   - iPhone 12 / Samsung Galaxy S21 (mobile)
5. **Memory Budget:** Sprite rendering under 20ms per frame
6. **Optimization Strategy:**
   - Use requestAnimationFrame (not setInterval)
   - Batch draw calls where possible
   - Pre-render static backgrounds
   - Implement dirty rectangle optimization if needed

**Timeline:**
- Week 1: Canvas setup and sprite rendering infrastructure
- Week 2: Optimize and validate 60 FPS on target devices
- Completion: Ready for story implementation in W2
```

### Consequences Section
**Purpose:** Explain trade-offs (what becomes easier/harder)

Include:
- **Positive consequences:** What this enables
- **Negative consequences:** What this costs
- **Risks:** What could go wrong
- **Mitigations:** How we reduce risks

**Example:**
```
## Consequences

**Positive (What becomes easier):**
- Fast rendering suitable for real-time games
- Direct pixel control for custom effects
- No external dependencies (lighter bundle)
- Works in all modern browsers
- Better performance than DOM-based rendering

**Negative (What becomes harder):**
- Learning curve for Canvas API (not as high-level as WebGL)
- Manual sprite management (not automatic)
- Debugging rendered output is harder than HTML
- Browser compatibility testing required across versions
- Mobile performance tuning needed

**Risks:**
- 60 FPS target not achievable on older devices
- Memory bloat if sprites aren't managed efficiently
- Accessibility challenges (rendered content not in DOM)

**Mitigations:**
- Implement performance monitoring (FPS counter)
- Graceful degradation to 30 FPS on low-end devices
- Test on 3+ device types during development
- Provide fallback text descriptions for game state
```

### Alternatives Considered Section
**Purpose:** Show what we evaluated and rejected

**Format:** For each alternative, explain:
- What it is
- Why we considered it
- Why we rejected it

**Example:**
```
## Alternatives Considered

### Alternative 1: WebGL
- **Description:** GPU-accelerated graphics via WebGL
- **Why considered:** Highest performance option, supports 3D
- **Why rejected:** Overkill for 2D rabbit/bear sprites; steeper learning curve; adds complexity without benefit; WebGL debugging is harder

### Alternative 2: SVG
- **Description:** Scalable Vector Graphics via DOM
- **Why considered:** Resolution-independent, clean code
- **Why rejected:** Poor performance for real-time animation; 60 FPS unachievable; not designed for fast rendering loops

### Alternative 3: DOM/CSS Animation
- **Description:** HTML elements with CSS transforms
- **Why considered:** Familiar to web developers, easy to debug
- **Why rejected:** Too slow for 60 FPS; limited control over animation timing; not suitable for complex game state

### Alternative 4: PixiJS (Canvas wrapper)
- **Description:** High-level rendering library built on Canvas
- **Why considered:** Easier API than raw Canvas
- **Why rejected:** External dependency increases bundle size; need direct control for optimization; team can learn Canvas quickly
```

## Output Requirements

### Quality Checklist

Before finalizing, verify each ADR:
- ✅ **Status:** Clear current status of decision
- ✅ **Context:** Problem and constraints are specific (not vague)
- ✅ **Decision:** Technology/version specified, approach outlined, timeline provided
- ✅ **Consequences:** Both positive and negative trade-offs documented
- ✅ **Alternatives:** At least 2-3 alternatives with rejection reasons
- ✅ **No Vague Language:** No "works well", "good performance", "should support"
- ✅ **Testable:** Success criteria defined or marked "non-testable assumption"
- ✅ **Actionable:** Developer or AI can implement based on this ADR

### Vague Language to Eliminate

❌ "works correctly" → ✅ "maintains 60 FPS on target devices"
❌ "good performance" → ✅ "< 20ms per frame render time"
❌ "should be fast" → ✅ "MUST render 500 sprites in < 16ms"
❌ "mobile-friendly" → ✅ "tested on iPhone 12 and Galaxy S21, maintains 30 FPS minimum"

## Output Format

Save each ADR to:
```
specs/adrs/ADR-[NUMBER]-[title].md
```

Example filenames:
- `specs/adrs/ADR-001-canvas-api-rendering.md`
- `specs/adrs/ADR-002-typescript-strict-mode.md`
- `specs/adrs/ADR-003-localStorage-persistence.md`

## Instructions to User

When invoking this prompt, provide:

1. **ADR Number:** Sequential number (001, 002, etc.)
2. **Decision Title:** What technical decision to document
3. **Current Status:** Proposed, Accepted, or other
4. **Context/Problem:** What problem does this solve?
5. **Preferred Technology:** What are you leaning toward?
6. **Constraints:** Any technical, timeline, or resource limits?

Example usage:
```
/generate-adr
Number: 002
Title: TypeScript Strict Mode Configuration
Status: Accepted
Context: Prevent runtime errors, improve code quality
Technology: TypeScript with strict: true in tsconfig.json
Constraints: Team size 3, no legacy JavaScript to maintain
```

## Output Process

The AI will:
1. ✅ Create numbered ADR file
2. ✅ Fill in all required sections (no empty sections)
3. ✅ Ensure Context explains PROBLEM clearly
4. ✅ Ensure Decision is SPECIFIC (tech, version, approach, timeline)
5. ✅ Evaluate at least 2-3 realistic alternatives with rejection reasons
6. ✅ Document both positive and negative consequences
7. ✅ Identify risks and mitigations
8. ✅ Eliminate all vague language
9. ✅ Include measurable success criteria where applicable
10. ✅ Save to `specs/adrs/ADR-[NUMBER]-[title].md`
11. ✅ Verify against quality checklist

## ADR Hierarchy in Spec-Driven Development

```
PRD (WHAT & WHY to build)
 ↓
ADR (HOW to build technically)
 ↓
Epic (WHAT features)
 ↓
Story (HOW to implement specific features)
 ↓
Agents.MD (CODING STANDARDS for implementation)
```

ADRs inform Story implementation. When implementing a Story, developers and AI should:
1. Read related ADRs for technical context
2. Follow ADR decisions in implementation
3. Reference ADR in code comments explaining WHY

---

**Ready to generate an ADR? Provide the number, title, status, and key context to begin!**
