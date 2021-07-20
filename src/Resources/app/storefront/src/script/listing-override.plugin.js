import ListingPlugin from 'src/plugin/listing/listing.plugin'
import DomAccess from 'src/helper/dom-access.helper';

export default class ListingOverridePlugin extends ListingPlugin {

    /**
     * Template for an active filter label.
     *
     * @param {Object} label
     * @returns {string}
     */
    getLabelTemplate(label) {
        //Get corresponding label with label.id if exists (label.id should be unique)
        const filterSelector = DomAccess.querySelector(document, `[for='${label.id}']`, false);

        if (filterSelector) {
            //Find corresponding filter with data attribute
            const selectedFilter = filterSelector.closest('.filter-multi-select').getAttribute('data-filter-property-select-options');
            const json = JSON.parse(selectedFilter);

            //Parse json and get propertyName
            const propertyName = json.propertyName;

            // Return with propertyName
            return `
                <span class="${this.options.activeFilterLabelClass}">
                    ${this.getLabelPreviewTemplate(label)}
                    <!-- Put filter name in front of label -->
                    <span class="filter-active-name">${propertyName}:</span>
                    ${label.label}
                    <button class="${this.options.activeFilterLabelRemoveClass}"
                            data-id="${label.id}">
                        &times;
                    </button>
                </span>
            `;
        } else {
            super.getLabelTemplate(label);
        }
    }
}
