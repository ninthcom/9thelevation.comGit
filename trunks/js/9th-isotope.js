/// <reference path="../Scripts/jquery-1.8.2.js" />
/// <reference path="jquery.isotope.min.js" />
/// <reference path="igt-systems.js" />

// Isotope management class constructor.
function IsoSet() {
    // Constants.
    this.ITEM_COLLAPSE_CLASS = 'iso_small_style';
    this.ITEM_EXPAND_CLASS = 'small-long';
    this.ITEM_SELECTED_CLASS = 'current';
    this.ITEM_CONTAINER_SELECTOR = '.items';
    this.ITEM_SELECTOR = '.iso_item';
    this.ITEM_IDENTIFIER_ATTRIBUTE = 'data-id';
    this.LAYOUT_MODE = 'masonry';
    //this.COLUMN_WIDTH = 240;
    this.COLUMN_WIDTH = 320;
    this.SCROLL_DURATION = 1500;
    this.SCROLL_OFFSET_FROM_TOP = 35;

    // Fields.
    this.$itemContainer = $(this.ITEM_CONTAINER_SELECTOR);
    this.$items = this.$itemContainer.find(this.ITEM_SELECTOR);

    // Methods.
    this.update = function () {
        // Setup for sorting alpha by iso name (uses the contents of the h3 tag).
        this.$itemContainer.isotope({
            getSortData: {
                name: function ($elem) { return $elem.attr('data-id'); }
            }
        });

        // Establish the isotope layout mode and column width, Important: this statement must follow setup statement for sort.
        this.$itemContainer.isotope({ itemSelector: this.ITEM_SELECTOR, layoutMode: this.LAYOUT_MODE, masonry: { columnWidth: this.COLUMN_WIDTH } });
    }
    this.getCurrentItemObj = function () { return this.$items.filter('.' + this.ITEM_SELECTED_CLASS); }
    this.getSpecificItemObj = function (itemIdentifier) { return this.$items.filter('[' + this.ITEM_IDENTIFIER_ATTRIBUTE + '="' + itemIdentifier + '"]'); }

    // Collapses all selected iso items.
    this.collapseSelectedItems = function () { this.getCurrentItemObj().removeClass(this.ITEM_EXPAND_CLASS).removeClass(this.ITEM_SELECTED_CLASS).addClass(this.ITEM_COLLAPSE_CLASS); }

    // Selects (expands) a specified iso item, scrolling the item to the top of the page if indicated.
    this.selectSpecificItem = function (itemIdentifier, scrollToItem) {
        var $item = this.getSpecificItemObj(itemIdentifier);
        $item.addClass(this.ITEM_SELECTED_CLASS).removeClass(this.ITEM_COLLAPSE_CLASS).addClass(this.ITEM_EXPAND_CLASS);
        if (scrollToItem) {
            $('html, body').animate({ scrollTop: $item.offset().top - this.SCROLL_OFFSET_FROM_TOP }, this.SCROLL_DURATION);
        }
    }

    // Filters the iso items based on a selector.
    this.filter = function (filterSelector) { this.$itemContainer.isotope({ filter: filterSelector }); }

    // Sorts the iso items based on a named sortBySelector object.
    this.sort = function (sortBySelectorName) { this.$itemContainer.isotope({ sortBy: sortBySelectorName }); }

    // Refreshes the layout of the iso items.  This usually is not necessary.
    this.reLayout = function () { this.$itemContainer.isotope('reLayout'); }

    // Initialize the object.
    this.update()
}

// Details managment class constructor.
// Manages expanding and contracting the container holding the tabset content blocks.
function Details() {
    // Constants.
    this.DETAILS_CONTAINER_SELECTOR = '.read_more_wrapper .details_container';
    this.DETAILS_ANCHOR_SELECTOR = '.read_more_wrapper .see_more a';
    this.DETAILS_ANCHOR_CONTAINER_SELECTOR = '.read_more_wrapper .see_more';
    this.DETAILS_CONTRACT_CLASS = 'see_less_up';
    this.DETAILS_EXPAND_CLASS = 'see_more_down';
    this.CONTRACT_HEIGHT = 100;
    this.EXPAND_CONTRACT_DURATION = 600;
    this.EXPAND_DELAY = 1000;
    this.EXPAND_ADDITIONAL_HEIGHT = 10;

    // Fields.
    this.$detailsContainer = $(this.DETAILS_CONTAINER_SELECTOR);
    this.$seeMoreToggleAnchor = $(this.DETAILS_ANCHOR_SELECTOR);
    this.$seeMoreAnchorContainer = $(this.DETAILS_ANCHOR_CONTAINER_SELECTOR);

    // Methods.
    // Gets the full height of the contents of the container.
    this.getExpandHeight = function () {
        var origHeight = this.$detailsContainer.height();
        this.$detailsContainer.height('auto');
        var fullHeight = this.$detailsContainer.height();
        this.$detailsContainer.height(origHeight < this.CONTRACT_HEIGHT ? this.CONTRACT_HEIGHT : origHeight);
        return fullHeight;
    }
    // Expand (drop down) the content conainer.
    // If delayFirst is true then there is a delay before the container expands;
    // this is to allow the content to change before the height of the content is measured.
    this.expand = function (delayFirst) {
        var thisObj = this;
        this.$detailsContainer.animate({ height: thisObj.$detailsContainer.height()} ,(delayFirst ? this.EXPAND_DELAY : 0), function () { thisObj.$detailsContainer.animate({ height: (thisObj.getExpandHeight() + thisObj.EXPAND_ADDITIONAL_HEIGHT) + 'px' }, thisObj.EXPAND_CONTRACT_DURATION, function () { thisObj.$seeMoreToggleAnchor.removeClass(thisObj.DETAILS_EXPAND_CLASS).addClass(thisObj.DETAILS_CONTRACT_CLASS); }); });
    }
    // Contract the content area to the short height specified in the constant.
    this.contract = function () {
        if (this.$detailsContainer.height() != this.CONTRACT_HEIGHT) {
            var thisObj = this;
            this.$detailsContainer.animate({ height: this.CONTRACT_HEIGHT + 'px' }, this.EXPAND_CONTRACT_DURATION, function () { thisObj.$seeMoreToggleAnchor.removeClass(thisObj.DETAILS_CONTRACT_CLASS).addClass(thisObj.DETAILS_EXPAND_CLASS); });
        }
    }
    // Switch between the short height and the full height.
    this.toggleExpandContract = function () {
        if (this.$detailsContainer.height() == this.CONTRACT_HEIGHT) {
            this.expand();
        }
        else {
            this.contract();
        }
    }
    // Set the click event handler for the link to expand / contract the container.
    var thisObj = this;
    this.$seeMoreAnchorContainer.click(function () { thisObj.toggleExpandContract(); return false; });
    this.$seeMoreAnchorContainer.css('cursor','pointer');
}

// Tabset management class constructor.
function Tabset(tabsetSelector) {
    // Constants.
    this.TAB_SELECTOR = 'a';
    this.CONTENT_POINTER_ATTRIBUTE = 'data-rel';
    this.HREF_ATTRIBUTE = 'href';
    this.TAB_IDENTITY_ATTRIBUTE = 'data-id';
    this.ITEM_SORT_ATTRIBUTE = 'data-sort';
    this.ITEM_SORT_DEFAULT = 'original-order';
    this.SELECTION_INDICATOR_CLASS = 'selected';
    this.TAB_CONTENT_HIDE_DURATION = 'normal';
    this.TAB_CONTENT_SHOW_DURATION = 'normal';

    // Fields.
    this.selector = tabsetSelector;
    this.$tabset = $(this.selector);
    this.$tabs = this.$tabset.find(this.TAB_SELECTOR);

    // Methods.
    this.getTabContentObj = function ($tab) { return $('#' + $tab.attr(this.CONTENT_POINTER_ATTRIBUTE)); }
    // Get newly chosen tab jQuery object.
    this.getNewTab = function (tabIdentifier) { return this.$tabs.filter('[' + this.TAB_IDENTITY_ATTRIBUTE + '="' + tabIdentifier + '"]'); }
    // Get the previously selected tab jQuery object.
    this.getSelectedTab = function () { return this.$tabs.filter('.' + this.SELECTION_INDICATOR_CLASS) }
    // Get the isotope sort specifier associated with the tab.  Defaults to the original order of the tabs if the attribute is not specified.
    this.getTabSortValue = function ($tab) { var attrVal = $tab.attr(this.ITEM_SORT_ATTRIBUTE); return (attrVal ? attrVal : this.ITEM_SORT_DEFAULT); }
    // Deselect the previously selected tab and select the newly chosen tab.
    this.deselectAndSelect = function (newTabIdentifier) {
        var $newTab = this.getNewTab(newTabIdentifier);
        var $newContent = this.getTabContentObj($newTab);
        var $selectedTab = this.getSelectedTab();
        if ($selectedTab.attr(this.HREF_ATTRIBUTE) == $newTab.attr(this.HREF_ATTRIBUTE)) { return; }
        $newTab.addClass(this.SELECTION_INDICATOR_CLASS);
        if ($selectedTab.length == 0) {
            if (!$newContent.visible) {
                $newContent.fadeIn(this.TAB_CONTENT_SHOW_DURATION);
            }
        }
        else {
            var $selectedContent = this.getTabContentObj($selectedTab);
            $selectedTab.removeClass(this.SELECTION_INDICATOR_CLASS);
            var showDuration = this.TAB_CONTENT_SHOW_DURATION;
            $selectedContent.fadeOut(this.TAB_CONTENT_HIDE_DURATION, function () { $newContent.fadeIn(showDuration); });
        }
    }
}

// HashInfo class constructor.
// Helper class with hash information relevant to Isotope, hash, and tab functionality.
function HashInfo() {
    // Constants.
    this.SCROLL_TOKEN = 'scroll';
    this.DETAILS_TOKEN = 'details';

    // Fields.
    this.hash = new Hash();

    // Methods.
    this.getTopMenuValue = function () { return this.hash.getFirstValue(); }
    this.getCategory = function () { return this.hash.getSecondValue(); }
    this.getSelectedItemIdentifier = function () { return this.hash.getThirdValue(); }
    this.isScroll = function () { return this.hash.containsSubhash(this.SCROLL_TOKEN) }
    this.isDetails = function () { return this.hash.containsSubhash(this.DETAILS_TOKEN) }

}

// Hash class construtor.
// Hash is a class modeling the hash functionality for the IGT Isotope implementation.
function Hash() {
    // Constants
    this.HASH_DELIMITER = '#';
    this.SUBHASH_DELIMITER = '*';
    this.HASH_VALUE_DELIMITER = "/";
    this.SUBHASH_VALUE_DELIMITER = ",";

    // Fields.
    this.url = '';
    this.hashValues = [];
    this.subhashValues = [];

    // Methods.
    this.getFirstValue = function () { if (this.hashValues.length > 1) { return this.hashValues[1]; } else { return ''; } };
    this.getSecondValue = function () { if (this.hashValues.length > 2) { return this.hashValues[2]; } else { return ''; } };
    this.getThirdValue = function () { if (this.hashValues.length > 3) { return this.hashValues[3]; } else { return ''; } };
    this.containsSubhash = function (value) { return (this.subhashValues.indexOf(value.toLowerCase()) != -1) };
    this.getHashValuestring = function () { return this.hashValues.join(this.HASH_VALUE_DELIMITER) }
    this.getSubhashValueString = function () { return this.subhashValues.join(this.SUBHASH_VALUE_DELIMITER) }
    this.getHashString = function () {
        if (this.hashValues.length < 2) { return; }
        var hashs = [this.getHashValuestring()];
        if (this.subhashValues.length > 0) { hashs[1] = this.getSubhashValueString() }
        return this.HASH_DELIMITER + hashs.join(this.SUBHASH_DELIMITER);
    }
    // Parses a passed url (or the current page url if none is passed) into the hash and subhash elements, resetting the values.
    this.update = function (optionalNewUrl) {
        if (arguments.length == 0) {
            this.url = new String(window.location);
        }
        else {
            this.url = optionalNewUrl;
        }
        this.hashValues = [];
        this.subhashValues = [];
        var urlSplit = this.url.split(this.HASH_DELIMITER);
        if (urlSplit.length > 1) {
            var hashSplit = urlSplit[1].split(this.SUBHASH_DELIMITER);
            this.hashValues = hashSplit[0].split(this.HASH_VALUE_DELIMITER);
            if (hashSplit.length > 1) {
                this.subhashValues = hashSplit[1].split(this.SUBHASH_VALUE_DELIMITER);
            }
        }
    }
    // Replaces the hash values and adds any subhash values to the current subhash
    this.mergeHash = function (hashToMerge) {
        var hashSplit = hashToMerge.split(this.HASH_DELIMITER);
        if (hashSplit.length < 2) { hashSplit = ['', ''] }
        var subhashSplit = hashSplit[1].split(this.SUBHASH_DELIMITER);
        var newHash = this.HASH_DELIMITER + subhashSplit[0];
        var newSubhashValues = [];
        if (subhashSplit.length > 1) {
            newSubhashValues[0] = subhashSplit[1];
        }
        if (this.getSubhashValueString()) {
            newSubhashValues[newSubhashValues.length] = this.getSubhashValueString();
        }
        if (newSubhashValues.length > 0) {
            newHash += this.SUBHASH_DELIMITER + newSubhashValues.join(this.SUBHASH_VALUE_DELIMITER);
        }
        this.update(newHash);
    }
    // Navigates the window to the current hash combination.
    this.setHash = function () {
        window.location = this.getHashString();
    }
    // Changes a value element in the hash values array.  Value number is 1 based.
    this.changeSingleValue = function (valueNumberToChange, newValue) {
        this.hashValues[valueNumberToChange] = newValue;
    }
    // Inserts a value into the subhash array.
    this.addSubhashItem = function (newItem) {
        if (this.containsSubhash(newItem)) { return; }
        this.subhashValues[this.subhashValues.length] = newItem;
    }
    // Removes a value from the subhash array.
    this.removeSubhashItem = function (itemToRemove) {
        if (!this.containsSubhash(itemToRemove)) { return; }
        var newSubhashItems = [];
        $.each(this.subhashValues, function (index, item) { if (item != itemToRemove) { newSubhashItems[newSubhashItems.length] = item; } });
        this.subhashValues = newSubhashItems;
    }

    // Initialize the object.
    this.update();
}