# User Story: Implement Real-Time Scoring

## Story Statement

**As a** player  
**I want** to see my survival time displayed in real-time  
**So that** I can track my progress and feel motivated to survive longer

## Description

Real-time scoring provides immediate feedback on player performance and creates a sense of achievement. Players need to see their survival time updating constantly to understand how well they're doing and stay motivated to beat their previous records. This creates the core progression loop of the game.

## Acceptance Criteria

- [ ] Timer starts automatically when game begins
- [ ] Survival time displays prominently on screen during gameplay
- [ ] Score updates smoothly every second (or more frequently)
- [ ] Timer format shows minutes:seconds (MM:SS)
- [ ] Score remains visible but doesn't obstruct gameplay
- [ ] Timer pauses when game ends on collision

## Definition of Done

- [ ] Code written and peer reviewed
- [ ] Unit tests written for timer logic (minimum 80% coverage)
- [ ] Integration tests passed for score display and updates
- [ ] Code merged to main branch
- [ ] QA has tested timer accuracy and display clarity
- [ ] Documentation updated for scoring system
- [ ] Performance validated (timer updates don't impact 60 FPS)

## Effort Estimate

**Story Points: 2**

## Priority

**Priority Level: HIGH**

## Technical Notes

Use Date.now() or performance.now() for accurate timing. Update timer in game loop and render to Canvas. Consider using a monospace font for consistent digit display. Timer should be stored as milliseconds internally but displayed in user-friendly format.

## Testing Notes

- Test timer accuracy over extended periods (5+ minutes)
- Verify timer display updates smoothly without flickering
- Check timer formatting for various time lengths
- Test timer behavior when game is paused/resumed
- Ensure timer is readable on both desktop and mobile

## Related Items

- **Epic:** EPIC-1-core-gameplay-engine
- **Related Stories:** STORY-core-gameplay.003-collision-detection (for game end timing)
- **Blocked By:** Basic game loop must be established

## Attachments

[Score display UI mockups]
[Timer font and positioning specifications]
