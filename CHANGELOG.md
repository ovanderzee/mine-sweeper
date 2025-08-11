# Changelog

## [Unreleased]

### Problems
- Zoom slider becomes more jumpy when the font size increases
- Gameboard could technically be 36 * 36 but board starts to jump when the game is operated by keyboard

### Features
- Make navbar sticky in landscape screen
- Make header of hiscores sticky
- Playmode: Play without flags
- Playmode: Win or loose when flag count equals mine count
- Pause button, correct time on unpause
- Replay game from High Scores
- Sort High Scores on various properties
- Routing on gamecode, about, config and hiscores 
- Save a game on a new list page (with comment)
- Zoom slider on gamepage


## [3.0.0] - 2025-08-11

### Added
- Configurable clock
- Calculate score based on minimal and maximal clicks (see https://minesweeper.fandom.com/wiki/3bv)
- Store unique boardcode in score

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
- Consistent SVG icons in navbar
- Text changes
- Optimized cell iteration


## [2.1.0] - 2025-06-21

### Added
- Interface for storing locally
- Unit tests
- Integration tests

### Changes
- Refine appearance
