import ListingOverridePlugin from './script/listing-override.plugin';

const PluginManager = window.PluginManager;

PluginManager.override('Listing', ListingOverridePlugin, '[data-listing]');

if (module.hot) {
    module.hot.accept();
}
