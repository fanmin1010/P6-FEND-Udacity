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


        /* This is the second test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("feeds' urls are defined", function(){
            var testResult = false, len = allFeeds.length;
            for(var iter = 0; iter<len; iter++){
                // reset testResult for each iteration
                testResult = false;
                // first test feed has url then test url is not empty
                if(allFeeds[iter].hasOwnProperty('url') && allFeeds[iter].url !=='')
                    testResult = true;
                else
                    break;
            }
            expect(testResult).toBe(true);
        });
        

        /* This is the third test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("feeds' names are defined", function(){
            var nameResult = false, len = allFeeds.length;
            for(var iter = 0; iter<len; iter++){
                // reset nameResult for each iteration
                nameResult = false;
                // first test feed has url then test url is not empty
                if(allFeeds[iter].hasOwnProperty('name') && allFeeds[iter].name !=='')
                    nameResult = true;
                else
                    break;
            }
            expect(nameResult).toBe(true);
        });
    });


    /* This is a new test suite named "The menu".
    * This suite is all about menu element and menu icon functionality
    */
    describe('The menu', function(){
        /* The first test ensures the menu element is
         * hidden by default.
         */
         it('is initially hidden', function(){
            // get the absolute left position of the menu
            // and evaluate whether it is negative or not
            expect($('.menu:first').position().left<0).toBe(true);
         });

        /* The second test ensures the menu changes
          * visibility when the menu icon is clicked. It has
          * two expectations: the menu displays when
          * clicked and dhides when clicked again.
          */
        it('changes upon click', function(){
            // use jQuery to mimic click event
            $('.icon-list:first').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            // second click
            $('.icon-list:first').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
         
    /* This new test suite named "Initial Entries" tests
    * the functionality of loadFeed function
    */
    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
        /* The test ensures when the loadFeed function is
        * called and completes its work, there is at least
        * a single .entry element within the .feed container
        */
        it('loads feeds successfully', function(){
            // expect at least one .entry element
            expect($('.feed').find('.entry').length>0).toBe(true);
        });

    });

        

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        var curTitle, curContent;
        beforeEach(function(done){
            // random select a feed
            var randomNum = Math.ceil(Math.random()*3);
            loadFeed(0, function(){
                // store the title and content before the change
                curTitle = $('.header-title').html();
                curContent = $('.feed:first').html();
                loadFeed(randomNum, function(){
                    done();
            });
            });
        });
        /* This test ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        it('changes upon selection', function(){
            // store the title and content after the change and compare them
            var changedTitle = $('.header-title').html();
            var changedContent = $('.feed').html();
            expect(curTitle === changedTitle).toBe(false);
            expect(curContent === changedContent).toBe(false);
        });
    }); 
}());
