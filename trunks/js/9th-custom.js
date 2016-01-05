/// <reference path="../Scripts/jquery-1.8.2.js" />
/// <reference path="jquery.isotope.min.js" />
/// <reference path="igt-isotope.js" />

$(function () {
    // Constants.
    var TOP_LEVEL_TABSET_SELECTOR = '.top_tabs';
    var SUB_TABSET_SELECTOR = 'section.sub_tabs_filter';
    var ALL_CATEGORY_NAMES = ['all', 'all_casino_role', 'all_services'];
    var DEFAULT_URL = '#/services/all_services';
    var FIRST_LOAD_ISO_FADEIN_DURATION = 'slow';
    var CELL_CLASS = 'cell_content';
    var TESTIMONIAL_CLASS = 'testimonial'

    // Globals.
    var iso = new IsoSet();
    var details = new Details();
    var topLevelTabset = new Tabset(TOP_LEVEL_TABSET_SELECTOR);
    var combinedSubTabsets = new Tabset(SUB_TABSET_SELECTOR);
    var hashInfo = new HashInfo();

    // Tab click event handlers.
    topLevelTabset.$tabs.click(function () { hashInfo.hash.mergeHash($(this).attr('href')); hashInfo.hash.setHash(); return false; });
    combinedSubTabsets.$tabs.click(function () { hashInfo.hash.mergeHash($(this).attr('href')); hashInfo.hash.setHash(); return false; });

    // Isotope click handler.
    iso.$items.click(function () {
        // Skip response if iso box is testimonial
        if ($(this).hasClass(TESTIMONIAL_CLASS)) {
            return false;
        }
        if ($(this).hasClass(CELL_CLASS)) {
            return false;
        }
        var itemId = $(this).attr(iso.ITEM_IDENTIFIER_ATTRIBUTE);
        // Second click to same item to close.
        if (itemId == hashInfo.getSelectedItemIdentifier()) {
            hashInfo.hash.changeSingleValue(3, '');
        }
            // First click to open item.
        else {
            hashInfo.hash.changeSingleValue(3, itemId);
        }
        hashInfo.hash.removeSubhashItem(hashInfo.SCROLL_TOKEN);
        hashInfo.hash.setHash();
        return false;
    });

    // Hash change event handler.
    $(window).bind('hashchange', function () {
        hashInfo.hash.update();
        var newCategory = hashInfo.getCategory();

        // Set default hash values if needed.
        if (hashInfo.getTopMenuValue() == '' || newCategory == '') {
            hashInfo.hash.update(DEFAULT_URL);
            hashInfo.hash.setHash();
            return;
        }

        // Select / deselect tabsets, tabs, and tab content.
        topLevelTabset.deselectAndSelect(hashInfo.getTopMenuValue());
        combinedSubTabsets.deselectAndSelect(newCategory);

        // Select / deselect iso items.
        iso.collapseSelectedItems();
        var selectedItemIdentifier = hashInfo.getSelectedItemIdentifier();
        if (selectedItemIdentifier != '') {
            iso.selectSpecificItem(selectedItemIdentifier, hashInfo.isScroll());
        }
        hashInfo.hash.removeSubhashItem(hashInfo.SCROLL_TOKEN);

        // Filter, sort and show iso items.
        if (!iso.$itemContainer.visible) {
            iso.$itemContainer.fadeIn(FIRST_LOAD_ISO_FADEIN_DURATION);
        }
        var filterString = (ALL_CATEGORY_NAMES.indexOf(newCategory) != -1 ? '*' : '.' + newCategory);
        if (hashInfo.hash.containsSubhash('no_casinolink')) {
            filterString += ':not(.category_04)';
            combinedSubTabsets.getNewTab('category_04').hide(0);
            combinedSubTabsets.getNewTab('category_03').show(0);
        }
        if (hashInfo.hash.containsSubhash('no_category_03')) {
            filterString += ':not(.category_03)';
            combinedSubTabsets.getNewTab('category_04').show(0);
            combinedSubTabsets.getNewTab('category_03').hide(0);
        }
        iso.filter(filterString);
        iso.sort(combinedSubTabsets.getTabSortValue(combinedSubTabsets.getNewTab(newCategory)));

        // Contract / expand details.
        if (hashInfo.isDetails()) {
            details.expand(true);
        }
        else {
            details.contract();
        }
        hashInfo.hash.removeSubhashItem(hashInfo.DETAILS_TOKEN);
    });

    $(window).trigger('hashchange');

    $('#no_casinolink, #no_category_03, #show_both').click(function () {
        hashInfo.hash.removeSubhashItem('no_casinolink');
        hashInfo.hash.removeSubhashItem('no_category_03');
        var id = $(this).attr('id');
        if (id != 'show_both') {
            hashInfo.hash.addSubhashItem(id);
        }
        else {
            combinedSubTabsets.getNewTab('category_04').show(0);
            combinedSubTabsets.getNewTab('category_03').show(0);
        }
        hashInfo.hash.setHash();
        $('.igt_global_ribbon_right a').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
        return false;
    });
});

