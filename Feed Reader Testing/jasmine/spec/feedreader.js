/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        //cecks all feeds are defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //check all feeds have url and ins't null
        it('Has url defined and not null', function() {
            for(var i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length > 0).toBe(true);
            }
        });

        // checks all feed have name and isn't null
        it("Has name and isn't null", function() {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length > 0).toBe(true);
            }
        });
    });


    describe('The menu', function() {

        // check menu item is hidden by default
        it('Has menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //check for menu display/hide on click
        it('Display/hide menu on click', function() {
            $('.menu-icon-link').click();  //stimulating click to show menu
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();  //stimulating click to hide the menu
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //checks for atleast single entry in feed container
        it('as url defined and not null', function(done) {
            expect($('.feed .entry').length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var before, after;
        beforeEach(function(done) {
            expect(allFeeds.length >= 2).toBe(true);

            /* Load the first feed at index 0 */
            loadFeed(0, function() {
                /* Set the before to content of feed */
                before = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                /* Load second feed at index 1 */
                loadFeed(1, function() {
                    /* Set the after to content of new feed */
                    after = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                    done();
                });
            });
        });

        /* Tests that when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it('changes content', function(done) {
            expect(before != after).toBe(true);
            done();
        });
    });

}());
