# User Story: Add Game Over State

## Story Statement

**As a** player  
**I want** to see my final score and restart immediately when caught  
**So that** I can quickly try to beat my score and continue playing

## Description

The game over state provides closure to each play session and enables the replay loop. Players need to see their final survival time clearly and have an easy way to start a new game without friction. This creates the complete play session cycle that encourages repeated attempts and score improvement.

## Acceptance Criteria

- [ ] Game pauses immediately when collision is detected
- [ ] Final score displays prominently in large, clear text
- [ ] Game over screen shows "Game Over" message
- [ ] Restart button is clearly visible and clickable
- [ ] Clicking restart immediately starts a new game
- [ ] No page refresh required for restart functionality

## Definition of Done

- [ ] Code written and peer reviewed
- [ ] Unit tests written for game state transitions (minimum 80% coverage)
- [ ] Integration tests passed for restart functionality
- [ ] Code merged to main branch
- [ ] QA has tested game over flow and restart behavior
- [ ] Documentation updated for game state management
- [ ] Performance validated (state transitions are instant)

## Effort Estimate

**Story Points: 2**

## Priority

**Priority Level: HIGH**

## Technical Notes

Implement game state machine with states: playing, gameOver. Use Canvas for overlay rendering. Restart should reset all game objects and timers without reloading the page. Consider adding a brief pause before showing restart button to let player see final score.

## Testing Notes

- Test game over triggers correctly on collision
- Verify final score display is readable and accurate
- Check restart button is accessible and functional
- Test multiple rapid restarts work correctly
- Ensure game state resets completely on restart

## Related Items

- **Epic:** EPIC-1-core-gameplay-engine
- **Related Stories:** STORY-core-gameplay.003-collision-detection, STORY-core-gameplay.004-real-time-scoring
- **Blocked By:** Collision detection and scoring must be implemented

## Attachments

[Game over screen UI mockups]
[Restart button design specifications]
