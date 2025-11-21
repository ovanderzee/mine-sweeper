# Changelog

## [Unreleased]

### Problems
- Gameboard could technically be 36 * 36 but board starts to jump when the game is operated by keyboard: provide zoom buttons next to clock
- Fade out of dialog goes smooth but ends abrupt
- The shield looks like plastic. Make a dent in the shield to add realism
- Debt after porting tests to vitest, see TODOs and it.skip 
- Gameboard jumps when using the keyboard and covering the fullscreen mode
- Run tests in browser instead of jsdom, mainly for dialog, popover and fullscreen
- Look at disabled 'set-state-in-effect' and 'exhaustive-deps', might have to do with 'value cannot be modified' or 'cannot access refs during render' lint errors

### Features
- Playmode Tough: Play without flags or mine counters
- Playmode Risky: Win or loose when flag count equals mine count
- Pause button, correct time on unpause
- Routing on gamecode, about, config and hiscores
- Replay game from High Scores (when routing)
- Save a game on a new list page (with comment)
- Show gamelevel and number of neighbouring mines in graph
- Calculate coagulation (mine-mine borders | blank to mine ratio)
- Enter key to start new game after game end
- Eliminate outliers in graph
- Browser tests on fullscreen feature
- Remember last focussed game cell, as starting point for move with arrow key 


## [3.5.1]

### Added
- Methods for managing scores in the browser console

### Changed
- Solved lint problems
- Robuster fullscreen functionality


## [3.5.0]

### Added
- Show score details in popover, list better readable
- Sort scores by gamelevel

### Changed
- Game better scrollable

### Removed
- Deleted dysfunctional id on .screen


## [3.4.0]

### Added
- Show the game fullscreen
- Tips just below the game
- Zoom game by containing or covering in fullscreen mode
- Mines minus flags moved to tips
- Conform to WCAG 2.1 Level AA

### Changed
- Replaced Jest by Vitest


## [3.3.2] - 2025-10-11

### Changed
- Ease rendering mine bursts, now limited to about 13

### Fixed
- Shield can be clicked to close game-won dialog
- Fix screen content width

### Removed
- Drop analog clock type


## [3.3.1] - 2025-10-06

### Changed
- Lower threshold for showing score diagram
- Text and color changes in diagram
- Get width of Hall of Fame in line with other screens


## [3.3.0] - 2025-09-25

### Added
- Toggle focus between game and option-bar with Alt+Tab
- Notice about data storage
- Diagram of sorted property
- Thresholds for sorting and showing a diagram

### Fixed
- Keep Zoom Display from covering Language Selection
- Fix style bug with range input for Google Chrome
- Let a dialog only respond to click on button or backdrop


## [3.2.0] - 2025-08-31

### Added
- New component to manage options
- Horizontal options bar scrollable

### Changed
- Clearer color for signaling when function was executed
- Some more margin on mine count 
- Smaller radio-buttons and checkboxes

### Removed
- No more filling of slender areas of app background when viewport narrower than 512px.


## [3.1.1]- 2025-08-22

### Fixed
- Ignore or replace unparseable data from storage
- Appearance sortpanel and sorted values
- Zoom slider stays in viewport

### Changed
- Stored game persists in browser


## [3.1.0] - 2025-08-19

### Added
- Sort High Scores on various properties
- Sticky page options in landscape screen
- Sticky High-Score property sorter


## [3.0.0] - 2025-08-11

### Added
- Configurable clock
- Calculate score based on minimal and maximal clicks (see https://minesweeper.fandom.com/wiki/3bv)
- Store unique boardcode in score
- Mark last score in Hall of Fame

### Changed
- Comment on configuration page now looks like a warning
- Development could be served on wifi network

### Fixed
- Correct time measurement on load
- No more scrollbars when mines explode
- Show plain icons on about page


## [2.2.0] - 2025-07-16

### Added
- Change icon color temporary when function was executed
- Lower mine count when flagging
- Demo page (on localhost)
- Interface for storing locally
- Show version in about page

### Changed
- Consistent SVG icons in option-bar
- Text changes
- Optimized cell iteration


## [2.1.0] - 2025-06-21

### Added
- Interface for storing data locally
- Unit tests
- Integration tests
- Readme

### Changes
- Refine appearance
- Structure About page


## [2.0.0] - 2025-05-11

### Added
- Waterball on win, exploding fireball on loose
- Show a shield on win
- Accessibility
- Typescript
- ESLint

### Changes
- Scroll the body
- Use dialog element for modal
- Develop with Vite
- Update to React 19


## [1.1.0] - 2023-04-24

### Added
- Cross browser styling
- Infer Language

### Changes
- Building for Relative Paths
- Use React 18
- Finalise modal with buttons
- Flagging with long-click
- Use pointer events


## [1.0.0] - 2021-07-31

Fix font error


## [0.2.0] - 2021-07-29

### Added
- Modals
- Scores
- About, Hall of Fame, Configuration pages

## [0.1.0] - 2021-07-02

Playable game app

### Features
- Leading Animation
- Internationalisation
- Flagging
- Replay


