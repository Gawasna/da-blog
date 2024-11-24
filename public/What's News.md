# What's New

## New Features

### Dark Mode Toggle
- Implemented a dark mode toggle in the header. Users can now switch between light and dark themes.
- The theme preference is saved in `sessionStorage` and applied on page load.

### Search Functionality
- Added a live search feature in the header. Users can search for posts and see live results as they type.
- The search results include post titles and thumbnails, and clicking on a result navigates to the post detail page.

### Forgot Password
- Added a "Forgot Password" page where users can request a password reset link.
- The page includes a form to enter the email address, and upon submission, an OTP is sent to the user's email.

### Comment Section
- Enhanced the comment section on post detail pages.
- Users can view comments, add new comments, and see the total number of comments.
- The comment section supports both light and dark themes.

## API Enhancements

### New Endpoints
- Added new API endpoints for fetching banners, latest posts, live search results, categories, post comments, and popular posts.
- Implemented endpoints for liking/unliking posts and checking if a post is liked by the user.

### Authorization
- Integrated Bearer token authorization for secure API requests.
- Implemented token refresh logic to handle expired access tokens.

## UI Improvements

### Header
- Redesigned the header to include a navigation menu, search form, and user menu.
- The user menu provides options to log in, sign up, or log out based on the user's authentication status.

### Post Detail Page
- Improved the post detail page to display post content, comments, and related posts.
- Added a like button for users to like or unlike posts.

### Pagination
- Added pagination to the comment section to handle large numbers of comments efficiently.

## Bug Fixes
- Fixed various styling issues in both light and dark themes.
- Resolved issues with API request handling and error reporting.

## Miscellaneous
- Updated project dependencies to the latest versions.
- Improved code structure and readability by refactoring components and API functions.

For more details, please refer to the individual component and API documentation.