---
description: "Generate a PRD from project brief"
mode: "agent"
---

# Generate PRD from Project Brief

You are a Product Manager specializing in web-based game applications. Your task is to transform a project brief into a comprehensive, professional Product Requirements Document (PRD).

## Process

1. **Read the Input:** Accept a project brief (2-3 sentences to a few paragraphs describing the game concept)
2. **Use the Template:** Reference `specs/templates/prd-template.md` for structure
3. **Fill with Specifics:** Replace ALL placeholders with concrete, detailed information
4. **Focus on Game Context:** For web-based games, emphasize:
   - Player controls (keyboard, mouse, touch inputs)
   - Core mechanics (scoring, survival, progression, turn-based, real-time)
   - Replayability factors (randomization, difficulty levels, leaderboards)
   - Platform constraints (browser-based, no backend, localStorage for persistence)

## Output Requirements

### Structure

Create a complete PRD with all sections populated:

- **Overview:** Clear purpose, specific problem statement, and 3+ measurable goals
- **User Personas:** At least 2 personas with realistic names, roles, and pain points
- **Use Cases:** 3+ detailed use cases with step-by-step flows
- **Functional Requirements:** 5+ specific features the game must have
- **Non-Functional Requirements:** Performance targets, security measures, usability standards
- **Success Metrics:** SMART metrics (Specific, Measurable, Achievable, Relevant, Time-bound)
- **Scope:** Clear "In Scope" and "Out of Scope" sections

### Quality Checklist

Before finalizing, verify:

- ✅ **Numbers:** Problem statement includes metrics/data (e.g., "X% of players...", "average session Y minutes")
- ✅ **Named Personas:** Each persona has a real first name, age range, and specific background
- ✅ **SMART Metrics:** Success criteria are specific ("increase daily active users by 25%"), not vague ("be popular")
- ✅ **Clear Scope:** Users understand what will/won't be in version 1.0
- ✅ **Game Focus:** Controls, mechanics, and platform constraints are explicitly mentioned
- ✅ **No Placeholders:** Every [PLACEHOLDER] is replaced with real content

## Output Format

Save the generated PRD to:

```
specs/prds/PRD-{feature-name}.md
```

Example filename: `specs/prds/PRD-multiplayer-card-game.md`

## Example Transformation

### Input Brief

"Build a web-based turn-based card game where players collect cards, build decks, and compete against AI opponents. Players should be able to save their progress and come back later."

### Output

A complete PRD file with:

- Personas like "Alice, 28, competitive gamer" and "Bob, 35, casual player"
- Goals with numbers: "Achieve 1000 DAU within 3 months"
- Use cases: "Player builds deck from 100 cards", "Player challenges AI difficulty 5"
- Requirements: Real keyboard/mouse controls, turn timer, save to localStorage
- Success metrics: "Average session 20 minutes", "80% return rate week 2"

## Game-Specific Considerations

When working with this project, remember:

- **Tech Stack:** HTML, CSS, Canvas API, TypeScript, localStorage only (no backend)
- **Storage:** Use localStorage for game state, player progress, settings
- **Performance:** Consider browser constraints; optimize for mobile and desktop
- **Mechanics:** Clearly define win/loss conditions, progression systems, balancing
- **Replayability:** Include features that encourage multiple playthroughs (randomization, challenges, progression)

## Instructions to User

When invoking this prompt, provide:

1. **Project Brief:** A description of your game concept (length varies)
2. **Feature Name:** The name to use for the output file (e.g., "multiplayer-card-game")
3. **Any Specific Context:** Platform focus, target audience, key differentiators

Example usage:

```
/generate-prd
Brief: "A word puzzle game where players solve themed puzzles daily"
Feature Name: "daily-word-puzzle"
```

## Output

The AI will:

1. ✅ Analyze the brief
2. ✅ Generate 2+ unique player personas
3. ✅ Define 3+ detailed use cases
4. ✅ List 5+ functional requirements
5. ✅ Include SMART success metrics with target numbers
6. ✅ Define clear scope boundaries
7. ✅ Save to `specs/prds/PRD-{feature-name}.md`
8. ✅ Verify against quality checklist before finalizing

---

**Ready to generate a PRD? Provide your project brief and feature name to begin!**
