/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
      /* a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it('have non-empty URLs', () => {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe('');
        });
      });
      /* a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it('have non-empty names', () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe('');
        });
      });
    });
    /* New test suite for the menu */
    describe('The menu', () => {
      /* a test that ensures the menu element is
       * hidden by default.
       */
      it('should be hidden by default', () => {
        expect(document.body.classList).toContain('menu-hidden');
      });
      /* a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * has two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('should be toggled when icon is clicked', () => {
        const icon = document.querySelector('.menu-icon-link');
        icon.click();
        expect(document.body.classList).not.toContain('menu-hidden');
        icon.click();
        expect(document.body.classList).toContain('menu-hidden');
      });
    });
    /* New test suite*/
    describe('Initial Entries', () => {
      /* a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      beforeEach(() => {
        return new Promise(function(resolve, reject) {
          // do something asynchronous
          loadFeed(0, resolve);
        });
      });

      it('should have a minimum of one entry', () => {
        expect(document.querySelector('.feed').children.length).toBeGreaterThan(
          0
        );
      });
    });
    /*New test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
      let firstFeed, secondFeed;
      const feed = document.querySelector('.feed');
      /* a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
      beforeEach(() => {
        return new Promise(function(resolve, reject) {
          // promise based solution for testing async loadFeed()
          loadFeed(0, () => {
            firstFeed = feed.innerText;
            resolve();
          });
        });
      });
      beforeEach(() => {
        return new Promise(function(resolve, reject) {
          // promise based solution for testing async loadFeed()
          loadFeed(1, () => {
            secondFeed = feed.innerText;
            resolve();
          });
        });
      });

      it('content changes when new feed is loaded', () => {
        expect(firstFeed).not.toBe(secondFeed);
      });
    });
  })()
);
