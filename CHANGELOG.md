# Changelog

## [Unreleased]

### Problems
- Gameboard could technically be 36 * 36 = 1296 cells, but the cells will be very small, even fullscreen
- Fade out of dialog goes smooth but ends abrupt
- Debt after porting tests to vitest, see comment-disabled tests
- Added click listeners on range-inputs to test them, remove when vitest/browser starts supporting change listeners on inputs
- How to calculate efficacy? Mines per move? Mines per second? Pristine cells left?

### Features
- Routing on gamecode, about, config and hiscores
- Show number of neighbouring mines in graph
- Calculate coagulation (mine-mine borders | blank to mine ratio)
- Open/close mark section
- Tests on marking
- Consent for ending playing game and changing the config when replaying from score list
- Calculate efficiency in sharp mode according to lower minimal number of moves
- Similar Game button with score details, Soortgelijk Spel
- Rename user with score details
- Fix alignment in mediaquery for magnification buttons in tips
- Change Zoom Display from range to numeric input, better user experience


## [4.0.0] - 2026-06-28

### Added
- Animation on pausing screen
- Logic for updating data in storage
- Console tools overview in markdown
- Toggle descriptions for navigation and option buttons, show by default
- Write level always and mode when selected in game section of scoreItem
- Toggle descriptions for navigation and option buttons
- Added gamelevels between the existing levels
- Ability to update stored data

### Changed
- Levels refined with intermediate values, level values have been doubled and localStorage is adapted accordingly.
- BREAKING: from version 4 there is no way back to previous versions without data loss.
- No text selection on the playground and navigation sections
- Solved some lint issues
- Gamelevel parameter in score
- Refactored Hall of Fame
- Restyled range, radio and checkbox inputs
- Minor text changes on configuration screen

### Removed
- Removed max scores entry. Not really necessary.

### Fixed
- Apply current language when reverting to defaults - the select-element cannot be by attribute alone
- Normal text color in Hall-of-Fame list


## [3.11.0] - 2026-06-21

### Added
- Playwright end-to-end tests
- Tests for longpress
- Target screen for pausing

### Changed
- Renamed app to 'MineSweep'
- Renamed 'Tough' mode to 'Bare'
- Playtimer only runs when playground is visible
- Remove no-flagging icon in bare-mode

### Fixed
- Prevent too high first game screen 


## [3.10.1] - 2026-05-03

### Added
- Separate magnification for tips and dialog in playground
- Theoretical win case with zero moves in sharp mode is not stored

### Changed
- When game in sharp mode is decided, make all cells immutable, and show the mines
- Restyled tips


## [3.10.0] - 2026-04-29

### Added
- Playmode Tough: Play without flags or mine counters
- Playmode Sharp: Win or loose when flag count equals mine count

### Fixed
- Replaced most waitFor blocks and used expect.element in test files


## [3.9.1] - 2026-04-14

### Fixed
- CSS production build


## [3.9.0] - 2026-04-13

### Added
- Polling random cells to start playing
- Focus last touched game cell when returning to game view

### Changed
- Update vite, vitest and other devdependencies

### Fixed
- Improved some tests


## [3.8.0] - 2026-03-07

### Added
- Analyse scores by marking ranges of score parameters
- Score threshold for marking
- Persist board magnification in session

### Fixed
- Suppress scrollbars when game is lost
- Attended test stability


## [3.7.0] - 2026-02-11

### Added
- Individual scores can be deleted in Score popover
- Replay game from Score popover

### Changed
- Compose Diagram by a dropdown for the x- and y-axis
- Score ListItems
- Equal ranks for equal points

### Removed
- Removed too easy 3*3 and 4*4 boards and levels 1 and 6


## [3.6.1] - 2026-01-12

### Changed
- Refined ARIA roles on Game screen
- Focus new-game button after winning or losing, for keyboard users
- The Game screen buttonbar will show functionality first, then screen navigation, like on the other screens
- Alt+Tab will visit the toolbar in Game screen
- Conform page-provider to lint rules
- Refined game-won shield
- Refined game-lost animation
- Keep rank out of storage

### Fixed
- The exploding mine animation is no longer clipped
- Toggling Fullscreen mode will keep on working when mixing up app UI and browser UI
- Prevent the board from jumping while tabbing.


## [3.6.0] - 2025-12-30

### Changed
- Component tests running in the browser, to upgrade the specification tests running in jsdom.
- Alt+Tab sets focus to first element in a region
- Refactored focussing between main and navigation regions
- Cover/contain game zooming without fullscreen ability

### Fixed
- Fixed navbar for iphone

### Removed
- createPortal layering


## [3.5.2] - 2025-12-06

### Changed
- Enhanced score popover


## [3.5.1] - 2025-11-25

### Added
- Methods for managing scores in the browser console

### Changed
- Solved lint problems
- Robuster fullscreen functionality


## [3.5.0] - 2025-11-12

### Added
- Show score details in popover, list better readable
- Sort scores by gamelevel

### Changed
- Game better scrollable

### Removed
- Deleted dysfunctional id on .screen


## [3.4.0] - 2025-10-26

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


